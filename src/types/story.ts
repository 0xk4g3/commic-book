// Story-related TypeScript types

export enum StoryValue {
    COURAGE = 'courage',
    KINDNESS = 'kindness',
    RESILIENCE = 'resilience',
    RESPECT = 'respect',
    TOLERANCE = 'tolerance',
    CREATIVITY = 'creativity',
}

export interface Character {
    name: string;
    description: string;
}

export interface Panel {
    number: number;
    scene: string;
    action: string;
    mood: string;
    tradition: string;
}

export interface Story {
    id: string;
    valueId: StoryValue;
    title: string;
    titleAr: string;
    description: string;
    characters: Character[];
    setting: string;
    panels: Panel[];
}

export interface ValueInfo {
    id: StoryValue;
    name: string;
    nameAr: string;
    description: string;
    icon: string;
    color: string;
    gradient: string;
}
