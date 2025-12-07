// Application constants and configuration

export const VALUES = [
    {
        id: 'courage',
        nameEn: 'Courage',
        nameAr: 'الشجاعة',
        description: 'Facing fears and standing up for what is right',
        icon: '🦅',
        color: 'from-desert-gold to-desert-light',
    },
    {
        id: 'kindness',
        nameEn: 'Kindness',
        nameAr: 'اللطف',
        description: 'Showing compassion and helping others',
        icon: '💝',
        color: 'from-winter-blue to-winter-sky',
    },
    {
        id: 'resilience',
        nameEn: 'Resilience',
        nameAr: 'المرونة',
        description: 'Persisting through challenges and bouncing back',
        icon: '🌟',
        color: 'from-uae-crimson to-desert-gold',
    },
    {
        id: 'respect',
        nameEn: 'Respect',
        nameAr: 'الاحترام',
        description: 'Honoring traditions and showing courtesy to all',
        icon: '🤝',
        color: 'from-winter-sky to-desert-light',
    },
    {
        id: 'tolerance',
        nameEn: 'Tolerance',
        nameAr: 'التسامح',
        description: 'Accepting differences and embracing diversity',
        icon: '🌍',
        color: 'from-desert-light to-winter-blue',
    },
    {
        id: 'creativity',
        nameEn: 'Creativity',
        nameAr: 'الإبداع',
        description: 'Thinking innovatively and expressing yourself',
        icon: '🎨',
        color: 'from-uae-crimson to-winter-sky',
    },
];

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
];

export const WINTER_ACTIVITIES = [
    'Desert camping under cool skies',
    'Outdoor festivals and events',
    'Beach activities',
    'Heritage village visits',
    'Traditional winter gatherings',
    'Falcon hunting expeditions',
    'Dhow cruises',
    'Winter sports and activities',
];

export const CHARACTER_AGES = ['8-10', '11-13', '14-16'];

export const ART_STYLES = [
    'manga-inspired digital art',
    'western comic book style',
    'anime style',
    'realistic digital painting',
];

export const PANEL_COMPOSITIONS = [
    'wide establishing shot',
    'medium shot showing characters',
    'close-up on character face',
    'action shot with dynamic movement',
    'dialogue scene',
    'emotional moment',
];

// ============================================
// API CONFIGURATION (OpenAI DALL-E 3)
// ============================================
export const API_CONFIG = {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
    model: 'dall-e-3',
    baseUrl: 'https://api.openai.com/v1/images/generations'
};

export const IMAGE_PARAMS = {
    sampleCount: 1,
    aspectRatio: '1:1',
    guidanceScale: 15,
    negativePrompt: 'blurry, low quality, distorted faces, extra limbs, duplicate characters, text, watermark, ugly, bad anatomy, extra fingers, deformed',
};

export const APP_CONFIG = {
    appName: 'UAE Winter Tales',
    appNameAr: 'حكايات الشتاء الإماراتية',
    tagline: 'Create Educational Comic Books',
    maxSavedComics: 50,
    panelsPerStory: 6,
};
