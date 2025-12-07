// Comic-related TypeScript types
import { Character, Story, StoryValue } from './story';

export interface GeneratedPanel {
    number: number;
    imageUrl: string;
    prompt: string;
    scene: string;
    tradition: string;
}

export interface Comic {
    id: string;
    storyId: string;
    valueId: StoryValue;
    title: string;
    titleAr: string;
    characters: Character[];
    setting: string;
    panels: GeneratedPanel[];
    createdAt: string;
}

export interface ComicMetadata {
    totalComics: number;
    lastCreated?: string;
    favoriteValue?: StoryValue;
}

export interface GenerationProgress {
    currentPanel: number;
    totalPanels: number;
    status: 'idle' | 'generating' | 'complete' | 'error';
    error?: string;
}

export interface ImageGenerationRequest {
    prompt: string;
    panelNumber: number;
}

export interface ImageGenerationResponse {
    success: boolean;
    imageUrl?: string;
    base64Image?: string;
    error?: string;
}
