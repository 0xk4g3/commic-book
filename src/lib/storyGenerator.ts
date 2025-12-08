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

        // Construct the panel prompt with STRICT style consistency requirements
        const prompt = `
PANEL ${panel.number} OF 4 - MIRBAD EXPRESS TRAIN STORY

Scene: ${panel.scene}
Characters: ${characterDescriptions}
Setting: ${story.setting}

VISUAL STYLE REQUIREMENTS (MUST BE IDENTICAL ACROSS ALL 4 PANELS):
- Art Style: Studio Ghibli animation style - soft hand-drawn aesthetic, warm and magical atmosphere, expressive character designs, whimsical storytelling
- Magical Realism: Gentle enchanting atmosphere reminiscent of Spirited Away and Kiki's Delivery Service
- Character Design: EXACT SAME character appearance in all panels - same face, same hair, same clothing, same proportions. Characters are 12-16 years old with youthful, innocent features
- Train Interior: Luxurious vintage oriental train with ornate arabesque patterns, carved wood panels, brass fixtures, rich velvet fabrics in deep jewel tones, geometric Islamic art motifs
- Color Palette: Warm desert tones (amber, gold, terracotta) mixed with rich jewel colors (deep blues, emerald greens, ruby reds), consistent soft Ghibli-style lighting
- Lighting: Soft warm golden lighting from ornate brass lamps and fixtures, creating a dreamy magical atmosphere
- Quality: High detail professional Studio Ghibli anime art, cinematic composition, consistent artistic style across all panels

ACTION & MOOD:
- Action: ${panel.action}
- Emotional Tone: ${panel.mood}
- Cultural Element: ${panel.tradition}

STRICT PROHIBITIONS:
- NO TEXT of any kind - no speech bubbles, no captions, no word balloons, no dialogue boxes
- NO WORDS or letters visible anywhere in the image
- NO watermarks, logos, or signatures
- Visual storytelling only through character expressions and actions
- Age-appropriate content - characters are young (12-16 years old) on a magical train adventure

Train must show vintage luxury oriental design with Middle Eastern aesthetic, NOT modern metro.
Winter season atmosphere with cool comfortable weather visible through windows.
Studio Ghibli magic and wonder throughout.
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
