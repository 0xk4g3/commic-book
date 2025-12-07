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

        // Build detailed character descriptions
        const characterDescriptions = characters
            .map((char) => `${char.name}: ${char.description}`)
            .join(', ');

        // Construct the panel prompt with emphasis on oriental train aesthetic
        const prompt = `
Comic book panel ${panel.number} of 4,
Scene: ${panel.scene},
Characters: ${characterDescriptions},
Setting: ${story.setting},
IMPORTANT: Must show ORIENTAL LUXURY TRAIN interior with vintage classic design, NOT modern metro. Features: ornate arabesque patterns, carved wood panels, brass fixtures, rich velvet fabrics, geometric Islamic art, traditional Middle Eastern decorative elements,
Action: ${panel.action},
Mood: ${panel.mood},
Cultural element: ${panel.tradition},
Art style: ${this.artStyle},
Train Style: vintage luxury oriental train with traditional Arabic architectural details, reminiscent of classic Orient Express but with Middle Eastern aesthetic,
Colors: vibrant and detailed with warm desert tones and rich jewel colors,
Season: winter in UAE with cool comfortable weather,
Composition: ${this.selectComposition()},
Quality: high quality professional comic book art, detailed faces, consistent character appearance,
No text, no speech bubbles, no watermarks
    `.trim();

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
