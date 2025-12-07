import { ValueInfo, StoryValue } from '@/types/story';

// UAE Values Configuration
export const VALUES: ValueInfo[] = [
    {
        id: StoryValue.COURAGE,
        name: 'Courage',
        nameAr: 'الشجاعة',
        description: 'Facing fears and standing up for what is right',
        icon: '🦅',
        color: 'from-desert-gold to-desert-light',
        gradient: 'bg-gradient-to-br from-amber-500 to-orange-300',
    },
    {
        id: StoryValue.KINDNESS,
        name: 'Kindness',
        nameAr: 'اللطف',
        description: 'Showing compassion and helping others',
        icon: '💝',
        color: 'from-winter-blue to-winter-light',
        gradient: 'bg-gradient-to-br from-blue-500 to-cyan-300',
    },
    {
        id: StoryValue.RESILIENCE,
        name: 'Resilience',
        nameAr: 'المرونة',
        description: 'Persisting through challenges and bouncing back',
        icon: '🌟',
        color: 'from-crimson to-desert-gold',
        gradient: 'bg-gradient-to-br from-rose-600 to-amber-400',
    },
    {
        id: StoryValue.RESPECT,
        name: 'Respect',
        nameAr: 'الاحترام',
        description: 'Honoring traditions and showing courtesy to all',
        icon: '🤝',
        color: 'from-winter-light to-desert-light',
        gradient: 'bg-gradient-to-br from-sky-400 to-amber-200',
    },
    {
        id: StoryValue.TOLERANCE,
        name: 'Tolerance',
        nameAr: 'التسامح',
        description: 'Accepting differences and embracing diversity',
        icon: '🌍',
        color: 'from-desert-light to-winter-blue',
        gradient: 'bg-gradient-to-br from-amber-300 to-blue-600',
    },
    {
        id: StoryValue.CREATIVITY,
        name: 'Creativity',
        nameAr: 'الإبداع',
        description: 'Thinking innovatively and expressing yourself',
        icon: '🎨',
        color: 'from-crimson to-winter',
        gradient: 'bg-gradient-to-br from-purple-600 to-pink-500',
    },
];

// UAE Traditions
export const UAE_TRADITIONS = [
    'Falconry and falcon racing',
    'Desert camping and Bedouin culture',
    'Traditional dhow boats',
    'Majlis and hospitality',
    'Camel racing',
    'Traditional crafts (henna, weaving, pottery)',
    'Souq (traditional markets)',
    'Traditional Emirati cuisine',
    'Arabic calligraphy',
    'Heritage sites and museums',
] as const;

// Winter Activities
export const WINTER_ACTIVITIES = [
    'Desert camping under cool skies',
    'Outdoor festivals and events',
    'Beach activities',
    'Heritage village visits',
    'Traditional winter gatherings',
    'Falcon hunting expeditions',
    'Dhow cruises',
    'Winter sports and activities',
] as const;

// Art Styles
export const ART_STYLES = [
    'manga-inspired digital comic art',
    'western comic book style',
    'anime style illustration',
    'realistic digital painting',
] as const;

// Panel Compositions
export const PANEL_COMPOSITIONS = [
    'wide establishing shot',
    'medium shot showing characters',
    'close-up on character expressions',
    'dynamic action shot',
    'dialogue scene medium shot',
    'emotional wide shot',
] as const;

// App Configuration
export const APP_CONFIG = {
    appName: 'Mirbad Express',
    appNameAr: 'ميرباد إكسبرس',
    tagline: 'Adventures to the Ski Point',
    maxSavedComics: 50,
    panelsPerStory: 4,
    version: '3.0.0',
} as const;

// Image Generation Parameters
export const IMAGE_PARAMS = {
    model: 'dall-e-3',
    size: '1024x1024' as const,
    quality: 'hd' as const,
    style: 'vivid' as const,
    n: 1,
} as const;
