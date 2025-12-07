import { Story, StoryValue } from '@/types/story';
// Import all stories from the JavaScript file for now
// This will be properly typed once we convert
import { STORY_PROMPTS } from '../utils/prompts';

// Helper function to get stories by value
export function getStoriesForValue(valueId: StoryValue): Story[] {
    return (STORY_PROMPTS as any)[valueId] || [];
}

// Helper function to get random story for a value
export function getRandomStoryForValue(valueId: StoryValue): Story | null {
    const stories = getStoriesForValue(valueId);
    if (stories.length === 0) return null;
    return stories[Math.floor(Math.random() * stories.length)];
}

// Helper function to get story by ID
export function getStoryById(storyId: string): Story | null {
    for (const valueKey in STORY_PROMPTS) {
        const stories = (STORY_PROMPTS as any)[valueKey as StoryValue] as Story[];
        const found = stories.find((s: any) => s.id === storyId);
        if (found) return found as Story;
    }
    return null;
}

// Re-export for convenience
export { STORY_PROMPTS, FIXED_CHARACTERS } from '../utils/prompts';

