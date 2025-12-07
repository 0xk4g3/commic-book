import { imagenAPI } from './imagenAPI';
import { ART_STYLES, PANEL_COMPOSITIONS } from '../utils/constants';

/**
 * Story Generator Service
 * Handles character consistency and panel prompt generation
 */

class StoryGeneratorService {
    /**
     * Format panel prompt for Imagen API
     * Ensures character consistency and UAE cultural elements
     */
    formatPanelPrompt(story, panelIndex) {
        const panel = story.panels[panelIndex];
        const characters = story.characters;
        const artStyle = this.selectArtStyle();

        // Build detailed character descriptions
        const characterDescriptions = characters
            .map(char => `${char.name}: ${char.description}`)
            .join(', ');

        // Construct the panel prompt
        const prompt = `
Comic book panel ${panel.number} of 6,
Scene: ${panel.scene},
Characters: ${characterDescriptions},
Setting: ${story.setting},
Action: ${panel.action},
Mood: ${panel.mood},
Cultural element: ${panel.tradition},
Art style: ${artStyle},
Colors: vibrant and detailed with warm desert tones,
Season: winter in UAE with cool comfortable weather,
Composition: ${this.selectComposition()},
Quality: high quality professional comic book art, detailed faces, consistent character appearance,
No text, no speech bubbles, no watermarks
    `.trim();

        return prompt;
    }

    /**
     * Select art style (can be randomized or fixed)
     */
    selectArtStyle() {
        // Using manga-inspired for consistency, but can randomize
        return 'manga-inspired digital comic art';
        // return ART_STYLES[Math.floor(Math.random() * ART_STYLES.length)];
    }

    /**
     * Select appropriate composition based on panel number
     */
    selectComposition() {
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
     * Generate all panels for a story
     * @param {Object} story - Story object with characters and panels
     * @param {Function} onProgress - Callback for progress updates (panelIndex, imageData)
     * @returns {Promise<Array>} - Array of generated panel image data
     */
    async generateStoryPanels(story, onProgress = null) {
        const generatedPanels = [];
        const totalPanels = story.panels.length;

        for (let i = 0; i < totalPanels; i++) {
            try {
                // Generate prompt for this panel
                const prompt = this.formatPanelPrompt(story, i);

                console.log(`Generating panel ${i + 1}/${totalPanels}...`);
                console.log('Prompt:', prompt);

                // Generate image
                const base64Image = await imagenAPI.generateImage(prompt);
                const imageDataUrl = imagenAPI.base64ToDataUrl(base64Image);

                const panelData = {
                    number: i + 1,
                    imageUrl: imageDataUrl,
                    prompt: prompt,
                    scene: story.panels[i].scene,
                    tradition: story.panels[i].tradition,
                };

                generatedPanels.push(panelData);

                // Call progress callback
                if (onProgress) {
                    onProgress(i, panelData);
                }

                // Small delay between requests to avoid rate limiting
                if (i < totalPanels - 1) {
                    await this.delay(1500);
                }
            } catch (error) {
                console.error(`Error generating panel ${i + 1}:`, error);
                throw new Error(`Failed to generate panel ${i + 1}: ${error.message}`);
            }
        }

        return generatedPanels;
    }

    /**
     * Generate a single panel (for regeneration)
     */
    async generateSinglePanel(story, panelIndex) {
        const prompt = this.formatPanelPrompt(story, panelIndex);
        const base64Image = await imagenAPI.generateImage(prompt);
        const imageDataUrl = imagenAPI.base64ToDataUrl(base64Image);

        return {
            number: panelIndex + 1,
            imageUrl: imageDataUrl,
            prompt: prompt,
            scene: story.panels[panelIndex].scene,
            tradition: story.panels[panelIndex].tradition,
        };
    }

    /**
     * Create a complete comic book object
     */
    createComicBook(story, generatedPanels, valueId) {
        return {
            id: `comic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            storyId: story.id,
            valueId: valueId,
            title: story.title,
            titleAr: story.titleAr,
            characters: story.characters,
            setting: story.setting,
            panels: generatedPanels,
            createdAt: new Date().toISOString(),
        };
    }

    /**
     * Utility delay function
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Validate story structure
     */
    validateStory(story) {
        if (!story) {
            throw new Error('Story is required');
        }
        if (!story.characters || story.characters.length !== 2) {
            throw new Error('Story must have exactly 2 characters');
        }
        if (!story.panels || story.panels.length !== 6) {
            throw new Error('Story must have exactly 6 panels');
        }
        return true;
    }
}

// Export singleton instance
export const storyGenerator = new StoryGeneratorService();

// Export class for testing
export default StoryGeneratorService;
