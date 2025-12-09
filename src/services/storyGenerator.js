import { imagenAPI } from './imagenAPI';
import { ART_STYLES, PANEL_COMPOSITIONS } from '../utils/constants';

/**
 * Story Generator Service
 * Handles character consistency and panel prompt generation
 */

class StoryGeneratorService {
    /**
     * Format panel prompt for DALL-E 3
     * Enhanced with professional art direction and strong consistency instructions
     * Includes character name and feeling when mood is nervous
     */
    formatPanelPrompt(story, panelIndex) {
        const panel = story.panels[panelIndex];
        const characters = story.characters;

        // Extract main character with EXACT appearance details
        const mainChar = characters[0];
        const secondChar = characters.length > 1 ? characters[1] : null;

        // Build ultra-detailed character descriptions with consistency enforcement
        const mainCharDetails = this.extractCharacterFeatures(mainChar);
        const secondCharDetails = secondChar ? this.extractCharacterFeatures(secondChar) : null;

        // Determine optimal composition for this panel
        const composition = this.getCompositionForPanel(panelIndex, panel);

        // Enhanced environment and lighting based on scene
        const environment = this.getEnvironmentDetails(panel, story.setting);

        // Construct the enhanced panel prompt with DALL-E 3 best practices
        let prompt = `Professional comic book illustration in vibrant Studio Ghibli-inspired anime art style.

SCENE: ${panel.scene}

MAIN CHARACTER - MUST APPEAR EXACTLY THE SAME IN EVERY PANEL:
${mainCharDetails}
Expression: ${this.getExpressionFromMood(panel.mood)}
${composition.characterPosition}`;

        if (secondChar) {
            prompt += `

SECONDARY CHARACTER - CONSISTENT APPEARANCE:
${secondCharDetails}
${composition.secondCharPosition || 'standing nearby in the background'}`;
        }

        prompt += `

ENVIRONMENT & SETTING:
${environment}
Time: ${this.getTimeOfDay(panelIndex)}
Atmosphere: ${panel.mood} - ${panel.tradition}

VISUAL STYLE & QUALITY:
- Art style: Vibrant anime/manga aesthetic inspired by Studio Ghibli and modern Japanese animation
- Character art: Clean lines, expressive large eyes, detailed facial features, consistent character design
- Colors: Rich, saturated, warm color palette with golden hour lighting, soft shadows
- Background: Detailed/${composition.backgroundDetail} with atmospheric perspective
- Lighting: Warm, inviting natural light with subtle rim lighting on characters
- Composition: ${composition.type}
- Quality: Professional illustration quality, sharp details, cinematic framing

CRITICAL REQUIREMENTS:
- Characters MUST maintain EXACT SAME appearance (face, hair, clothing) as described
- NO text, NO speech bubbles, NO captions, NO watermarks
- NO scary or dark elements - keep friendly and inviting
- Consistent art style across all panels
- Professional anime illustration quality`;

        return prompt;
    }

    /**
     * Extract and format detailed character features for consistency
     */
    extractCharacterFeatures(character) {
        const desc = character.description;
        return `- Exact appearance: ${desc}
- CRITICAL: Same face, same hair, same outfit in every single panel
- Style: Anime/manga character design with large expressive eyes`;
    }

    /**
     * Get appropriate expression based on mood
     */
    getExpressionFromMood(mood) {
        const moodMap = {
            'nervous': 'slightly worried but determined expression, eyebrows raised',
            'scared': 'wide-eyed but brave expression, slight concern on face',
            'confident': 'warm smile, bright eyes, cheerful expression',
            'proud': 'beaming smile, eyes sparkling with joy and pride',
            'happy': 'joyful smile, excited expression, bright cheerful face',
            'caring': 'gentle smile, kind eyes, compassionate expression',
            'peaceful': 'serene smile, calm relaxed expression, content face',
            'grateful': 'warm genuine smile, thankful expression, happy eyes',
            'curious': 'interested expression, eyes wide with wonder and curiosity',
            'creative': 'enthusiastic smile, imaginative sparkle in eyes',
            'determined': 'focused expression, determined eyes, slight confident smile',
            'warm': 'friendly smile, welcoming expression, kind eyes'
        };

        // Find matching mood keyword
        const lowerMood = mood.toLowerCase();
        for (const [key, expression] of Object.entries(moodMap)) {
            if (lowerMood.includes(key)) {
                return expression;
            }
        }

        return 'friendly warm smile, cheerful expression';
    }

    /**
     * Get detailed environment based on setting and scene
     * Ensures consistent seat colors (navy blue) and adds blue carpet on the train floor.
     * Removes any mention of train hand.
     */
    getEnvironmentDetails(panel, setting) {
        const sceneText = panel.scene.toLowerCase();

        if (sceneText.includes('train') && sceneText.includes('window')) {
            return `Interior of luxury vintage train car, through large window showing snowy mountain landscape and deep valley, plush green velvet seats, warm wooden interior with Art Deco details, golden evening sunlight streaming through windows`;
        } else if (sceneText.includes('entrance') || sceneText.includes('doorway')) {
            return `Grand train station platform with the magnificent Mirbad Express train, vintage luxury train with dark blue and gold trim, ornate Art Deco architecture, warm golden sunset light, elegant atmospheric setting`;
        } else if (sceneText.includes('conductor')) {
            return `Inside warm cozy train car, comfortable seating area, vintage train interior with rich wood paneling and brass fixtures, soft ambient lighting, intimate conversational space`;
        } else if (sceneText.includes('ski point') || sceneText.includes('arrive') || sceneText.includes('mountains')) {
            return `Beautiful snowy ski point with majestic snow-capped mountains in background, clear blue winter sky, crisp clean air, modern ski resort visible, stunning panoramic mountain vista`;
        } else if (sceneText.includes('quiet')) {
            return `Peaceful quiet car of the train, soft lighting, passengers reading or resting, serene atmosphere, comfortable seating, gentle ambient light`;
        } else if (sceneText.includes('bridge')) {
            return `Train traveling across high mountain bridge, dramatic valley view below, snow-capped peaks in distance, clear winter sky, exciting but safe perspective`;
        } else {
            return `Interior of the elegant Mirbad Express train, vintage luxury aesthetic with warm wood and brass details, comfortable seating, large windows showing passing winter landscape`;
        }
    }

    /**
     * Get optimal composition based on panel number and content
     */
    getCompositionForPanel(panelIndex, panel) {
        const sceneText = panel.scene.toLowerCase();

        // Panel 1: Usually establishing shot
        if (panelIndex === 0 || sceneText.includes('entrance') || sceneText.includes('arrive')) {
            return {
                type: 'Wide establishing shot, cinematic angle',
                characterPosition: 'Character positioned in foreground or mid-ground',
                backgroundDetail: 'highly detailed',
                secondCharPosition: 'visible in scene establishing the environment'
            };
        }

        // Panels with windows/views: Side view or over-shoulder
        if (sceneText.includes('window') || sceneText.includes('look out') || sceneText.includes('see')) {
            return {
                type: 'Medium shot from side angle or slightly behind',
                characterPosition: 'Character beside window or looking out, profile or 3/4 view visible',
                backgroundDetail: 'detailed, emphasizing window view',
                secondCharPosition: 'seated nearby'
            };
        }

        // Interaction scenes: Medium two-shot
        if (sceneText.includes('conductor') || sceneText.includes('listen') || sceneText.includes('tells')) {
            return {
                type: 'Medium shot showing both characters interacting',
                characterPosition: 'Main character in foreground, face visible',
                backgroundDetail: 'supporting the interaction',
                secondCharPosition: 'engaging with main character, both clearly visible'
            };
        }

        // Emotional moments: Close-up
        if (sceneText.includes('feel') || sceneText.includes('start to') || panelIndex === 2) {
            return {
                type: 'Close-up medium shot emphasizing character emotion',
                characterPosition: 'Character face clearly visible, emotional expression prominent',
                backgroundDetail: 'softly detailed',
                secondCharPosition: 'partially visible, supporting the emotional moment'
            };
        }

        // Final panels: Wide triumph shot
        if (panelIndex >= 3 || sceneText.includes('proudly') || sceneText.includes('did it')) {
            return {
                type: 'Wide triumphant shot, heroic framing',
                characterPosition: 'Character in confident pose with scenic background',
                backgroundDetail: 'highly detailed and impressive',
                secondCharPosition: 'visible in the celebratory moment'
            };
        }

        // Default: Balanced medium shot
        return {
            type: 'Balanced medium shot',
            characterPosition: 'Character clearly visible in scene',
            backgroundDetail: 'well-detailed',
            secondCharPosition: 'present in scene'
        };
    }

    /**
     * Get time of day based on panel progression
     */
    getTimeOfDay(panelIndex) {
        if (panelIndex === 0) return 'Golden hour evening, warm sunset light';
        if (panelIndex === 1) return 'Late afternoon, soft natural light';
        if (panelIndex === 2) return 'Afternoon, warm ambient light';
        return 'Clear winter day, bright natural light';
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
