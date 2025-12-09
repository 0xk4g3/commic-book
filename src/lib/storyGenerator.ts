import { Story } from '@/types/story';
import { ART_STYLES, PANEL_COMPOSITIONS } from '@/constants/values';
import type { GeneratedPanel, ImageGenerationRequest } from '@/types/comic';

export class StoryGeneratorService {
    private artStyle: string;

    constructor() {
        this.artStyle = 'manga-inspired digital comic art'; // Consistent art style
    }

    /**
     * Format panel prompt for image generation API
     */
    formatPanelPrompt(story: Story, panelIndex: number): string {
        const panel = story.panels[panelIndex];
        const characters = story.characters;

        // Extract main character for detailed description
        const mainChar = characters[0];
        const charName = mainChar.name;

        // Build all character descriptions
        const characterDescriptions = characters
            .map((char) => `${char.name}: ${char.description}`)
            .join('\n\n');

        // Ultra-strong consistency enforcement
        let prompt = '';

        if (panelIndex === 0) {
            // Panel 1: Establish the EXACT character template
            prompt = `
Studio Ghibli anime comic panel 1 of 4 - Mirbad Express Train

⭐ CHARACTER TEMPLATE (USE EXACT FEATURES IN ALL 4 PANELS):
${characterDescriptions}

SCENE: ${panel.scene}
SETTING: ${story.setting}
ACTION: ${panel.action}
MOOD: ${panel.mood}

VISUAL REQUIREMENTS:
- Studio Ghibli style: soft colors, warm lighting, expressive faces, magical atmosphere
- Main character ${charName}: Use EXACT features listed above - same hair color/style, same eye color, same face shape, same clothing colors
- Train interior: green velvet seats, plain beige carpet, wooden panels, warm golden lighting
- Art quality: High detail Ghibli animation style

CRITICAL - REMEMBER FOR NEXT PANELS:
- ${charName}'s exact facial features, hair, clothing colors
- Same art style and color palette
- Same character proportions and age appearance

NO text, speech bubbles, or words in image.
Winter landscape outside windows.
    `.trim();
        } else {
            // Panels 2-4: COPY EXACT character from Panel 1
            prompt = `
Studio Ghibli anime comic panel ${panel.number} of 4 - Mirbad Express Train

🔒 CRITICAL - CHARACTER CONSISTENCY:
USE THE EXACT SAME CHARACTER FROM PANEL 1. Copy these EXACT features:

${characterDescriptions}

⚠️ ${charName} MUST BE IDENTICAL TO PANEL 1:
- Same exact hair color and hairstyle
- Same exact eye color and size  
- Same exact face shape and features
- Same exact clothing (same hoodie color, same jeans, same boots)
- Same exact age appearance (13-14 years old)
- DO NOT change anything about ${charName}'s appearance

SCENE: ${panel.scene}
SETTING: ${story.setting}
ACTION: ${panel.action}
MOOD: ${panel.mood}

VISUAL REQUIREMENTS:
- Studio Ghibli style: SAME as Panel 1 - soft colors, warm lighting, expressive faces
- Train interior: green velvet seats, plain beige carpet, wooden panels
- ${charName}: COPY from Panel 1 - identical appearance
- Art quality: High detail Ghibli style, CONSISTENT with Panel 1

NO text, speech bubbles, or words in image.
Winter landscape outside windows.
    `.trim();
        }

        return prompt;
    }

    /**
     * Select appropriate composition
     */
    private selectComposition(): string {
        const compositions = [
            'wide establishing shot',
            'medium shot showing characters',
            'close-up on character expressions',
            'dynamic action shot',
            'dialogue scene medium shot',
            'emotional wide shot',
        ];
        return compositions[Math.floor(Math.random() * compositions.length)];
    }

    /**
     * Generate all panels for a story using the API
     */
    async generateStoryPanels(
        story: Story,
        onProgress?: (panelIndex: number, panel: GeneratedPanel) => void
    ): Promise<GeneratedPanel[]> {
        const generatedPanels: GeneratedPanel[] = [];
        const totalPanels = story.panels.length;

        for (let i = 0; i < totalPanels; i++) {
            try {
                const prompt = this.formatPanelPrompt(story, i);

                console.log(`🎨 Generating panel ${i + 1}/${totalPanels}...`);

                // Call the Next.js API route
                const requestBody: ImageGenerationRequest = {
                    prompt,
                    panelNumber: i + 1,
                };

                const response = await fetch('/api/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || `Failed to generate panel ${i + 1}`);
                }

                const data = await response.json();

                if (!data.success || !data.imageUrl) {
                    throw new Error(data.error || 'No image generated');
                }

                const panelData: GeneratedPanel = {
                    number: i + 1,
                    imageUrl: data.imageUrl,
                    prompt: prompt,
                    scene: story.panels[i].scene,
                    tradition: story.panels[i].tradition,
                };

                generatedPanels.push(panelData);

                // Call progress callback
                if (onProgress) {
                    onProgress(i, panelData);
                }

                console.log(`✅ Panel ${i + 1} generated successfully`);

                // Small delay between requests
                if (i < totalPanels - 1) {
                    await this.delay(1500);
                }
            } catch (error) {
                console.error(`❌ Error generating panel ${i + 1}:`, error);
                throw new Error(
                    `Failed to generate panel ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'
                    }`
                );
            }
        }

        return generatedPanels;
    }

    /**
     * Generate a single panel (for regeneration)
     */
    async generateSinglePanel(
        story: Story,
        panelIndex: number
    ): Promise<GeneratedPanel> {
        const prompt = this.formatPanelPrompt(story, panelIndex);

        const requestBody: ImageGenerationRequest = {
            prompt,
            panelNumber: panelIndex + 1,
        };

        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to generate panel');
        }

        const data = await response.json();

        return {
            number: panelIndex + 1,
            imageUrl: data.imageUrl,
            prompt: prompt,
            scene: story.panels[panelIndex].scene,
            tradition: story.panels[panelIndex].tradition,
        };
    }

    /**
     * Utility delay function
     */
    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /**
     * Validate story structure
     */
    validateStory(story: Story): boolean {
        if (!story) {
            throw new Error('Story is required');
        }
        if (!story.characters || story.characters.length !== 2) {
            throw new Error('Story must have exactly 2 characters');
        }
        if (!story.panels || story.panels.length !== 4) {
            throw new Error('Story must have exactly 4 panels');
        }
        return true;
    }
}

// Export singleton instance
export const storyGenerator = new StoryGeneratorService();
