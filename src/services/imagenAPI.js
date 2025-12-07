import axios from 'axios';
import { API_CONFIG, IMAGE_PARAMS } from '../utils/constants';

/**
 * OpenAI DALL-E 3 API Service
 * 
 * API key automatically loaded from .env file
 */

class OpenAIImageService {
    constructor() {
        // Auto-load from environment variables
        this.apiKey = API_CONFIG.apiKey;
        this.baseUrl = API_CONFIG.baseUrl;
        this.model = API_CONFIG.model;
        this.retryAttempts = 3;
        this.retryDelay = 2000;
        this.isReady = !!this.apiKey;

        // Log initialization status
        if (this.apiKey) {
            console.log('✅ OpenAI API key loaded from environment!');
            console.log('🎨 DALL-E 3 ready to generate comics!');
            console.log('💡 No setup needed - start creating immediately!');
        } else {
            console.warn('⚠️  OpenAI API key not found in .env file');
        }

        // Allow manual override
        if (typeof window !== 'undefined') {
            window.setOpenAIKey = (key) => {
                this.apiKey = key;
                this.isReady = true;
                console.log('✅ OpenAI API key updated!');
            };
            window.imagenAPI = this;
        }
    }

    setApiKey(key) {
        this.apiKey = key;
    }

    async generateImage(prompt) {
        if (!this.apiKey) {
            throw new Error('⚠️  OpenAI API key not set!');
        }

        await this.delay(500);

        const requestBody = {
            model: this.model,
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            quality: 'hd',
            style: 'vivid'
        };

        console.log('🎨 Generating image with DALL-E 3...');

        try {
            const response = await this.makeRequestWithRetry(requestBody);
            const imageUrl = this.extractImageFromResponse(response);
            console.log('✅ Image generated successfully!');
            return imageUrl;
        } catch (error) {
            console.error('❌ Image generation error:', error);
            throw this.handleError(error);
        }
    }

    async makeRequestWithRetry(requestBody, attempt = 1) {
        try {
            const response = await axios.post(this.baseUrl, requestBody, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                timeout: 120000,
            });
            return response.data;
        } catch (error) {
            if (attempt < this.retryAttempts && this.shouldRetry(error)) {
                console.log(`⚠️  Retry ${attempt}/${this.retryAttempts}...`);
                await this.delay(this.retryDelay * attempt);
                return this.makeRequestWithRetry(requestBody, attempt + 1);
            }
            throw error;
        }
    }

    shouldRetry(error) {
        if (!error.response) return true;
        const status = error.response.status;
        return status === 429 || status === 503 || status >= 500;
    }

    extractImageFromResponse(responseData) {
        try {
            if (responseData.data && responseData.data.length > 0) {
                const imageUrl = responseData.data[0].url;
                return this.convertUrlToBase64(imageUrl);
            }
            throw new Error('No image data in response');
        } catch (error) {
            console.error('Error extracting image:', error);
            throw new Error('Failed to extract image');
        }
    }

    async convertUrlToBase64(imageUrl) {
        try {
            const response = await axios.get(imageUrl, {
                responseType: 'arraybuffer'
            });
            const base64 = Buffer.from(response.data, 'binary').toString('base64');
            return base64;
        } catch (error) {
            return imageUrl;
        }
    }

    base64ToDataUrl(data) {
        if (typeof data === 'string' && data.startsWith('http')) {
            return data;
        }
        return `data:image/png;base64,${data}`;
    }

    handleError(error) {
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.error?.message || 'Unknown error';

            switch (status) {
                case 401:
                    return new Error('🔐 Invalid API key');
                case 429:
                    return new Error('⏱️  Rate limit exceeded');
                case 400:
                    return new Error('⚠️  Bad request: ' + message);
                default:
                    return new Error(`API Error (${status}): ${message}`);
            }
        }
        return error;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async testConnection() {
        return { success: true, message: 'OpenAI ready!' };
    }
}

export const imagenAPI = new OpenAIImageService();
export default OpenAIImageService;
