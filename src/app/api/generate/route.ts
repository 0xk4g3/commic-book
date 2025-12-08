import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import type { ImageGenerationRequest, ImageGenerationResponse } from '@/types/comic';
import { IMAGE_PARAMS } from '@/constants/values';

// Rate limiting (simple in-memory implementation)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = requestCounts.get(ip);

    if (!record || now > record.resetTime) {
        requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
        return true;
    }

    if (record.count >= RATE_LIMIT) {
        return false;
    }

    record.count++;
    return true;
}

export async function POST(request: NextRequest) {
    try {
        // Get client IP for rate limiting
        const ip = request.headers.get('x-forwarded-for') || 'unknown';

        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { success: false, error: 'Rate limit exceeded. Please try again later.' },
                { status: 429 }
            );
        }

        // Validate API key
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.error('OPENAI_API_KEY not configured');
            return NextResponse.json(
                { success: false, error: 'API key not configured' },
                { status: 500 }
            );
        }

        // Parse and validate request body
        const body: ImageGenerationRequest = await request.json();
        const { prompt, panelNumber } = body;

        if (!prompt || typeof prompt !== 'string') {
            return NextResponse.json(
                { success: false, error: 'Invalid prompt' },
                { status: 400 }
            );
        }

        console.log(`🎨 Generating panel ${panelNumber}...`);

        // Call OpenAI DALL-E 3 API
        const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
                model: IMAGE_PARAMS.model,
                prompt: prompt,
                n: IMAGE_PARAMS.n,
                size: IMAGE_PARAMS.size,
                quality: IMAGE_PARAMS.quality,
                style: IMAGE_PARAMS.style,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                timeout: 120000, // 2 minutes
            }
        );

        // Extract image URL from response
        const imageUrl = response.data?.data?.[0]?.url;

        if (!imageUrl) {
            throw new Error('No image URL in response');
        }

        console.log(`✅ Panel ${panelNumber} generated successfully`);
        console.log(`🔗 Image URL: ${imageUrl}`);

        // Return the image URL directly instead of downloading it
        // This bypasses network issues with Azure blob storage
        const result: ImageGenerationResponse = {
            success: true,
            imageUrl: imageUrl, // Use the OpenAI-provided URL directly
        };

        return NextResponse.json(result);

    } catch (error: any) {
        console.error('❌ Image generation error:', error.message);
        console.error('Error details:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            code: error.code,
        });

        // Log the prompt that caused the error for debugging
        if (error.response?.status === 400 || error.response?.status === 500) {
            console.error('Problematic prompt:', prompt);
        }

        let errorMessage = 'Failed to generate image';
        let statusCode = 500;

        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.error?.message || error.message;

            switch (status) {
                case 401:
                    errorMessage = '🔐 Invalid API key';
                    statusCode = 401;
                    break;
                case 429:
                    errorMessage = '⏱️ Rate limit exceeded. Please wait and try again.';
                    statusCode = 429;
                    break;
                case 400:
                    errorMessage = `⚠️ Bad request: ${message}`;
                    statusCode = 400;
                    break;
                default:
                    errorMessage = `API Error (${status}): ${message}`;
                    statusCode = status;
            }
        } else if (error.code === 'ECONNABORTED') {
            errorMessage = 'Request timeout. Please try again.';
            statusCode = 504;
        }

        const result: ImageGenerationResponse = {
            success: false,
            error: errorMessage,
        };

        return NextResponse.json(result, { status: statusCode });
    }
}

// Health check endpoint
export async function GET() {
    return NextResponse.json({
        status: 'operational',
        service: 'UAE Winter Tales Image Generation API',
        version: '2.0.0',
        provider: 'OpenAI DALL-E 3',
    });
}
