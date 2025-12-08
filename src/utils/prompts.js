// Mirbad Express Story Prompts
// 6 values, 1 story each, exactly 4 panels
// Fixed character appearance: 12-16 year old girl/boy in modest winter clothing

// FIXED CHARACTER DESCRIPTIONS - DO NOT CHANGE
export const FIXED_CHARACTERS = {
    GIRL: {
        name: '[User Name]',
        description: 'A friendly 12-16 year old girl with long dark hair and bright expressive eyes, wearing a comfortable modest winter outfit: thick warm knit sweater, long winter pants, waterproof winter coat, wool scarf around neck, and warm winter boots. Traveling on the Mirbad Express train towards the ski point destination, with a determined and adventurous expression. Studio Ghibli animation style with soft hand-drawn aesthetic, expressive character design, magical realism atmosphere, consistent appearance across all panels.',
    },
    BOY: {
        name: '[User Name]',
        description: 'A friendly 12-16 year old boy with short dark hair and bright expressive eyes, wearing a comfortable modest winter outfit: thick warm knit sweater, long winter pants, waterproof winter coat, wool scarf around neck, and warm winter boots. Traveling on the Mirbad Express train towards the ski point destination, with a determined and adventurous expression. Studio Ghibli animation style with soft hand-drawn aesthetic, expressive character design, magical realism atmosphere, consistent appearance across all panels.',
    },
};

export const STORY_PROMPTS = {
    courage: [
        {
            id: 'courage-1',
            title: 'The Brave Journey',
            titleAr: 'الرحلة الشجاعة',
            description: 'A thrilling adventure of courage on the legendary Mirbad Express',
            characters: [
                {
                    name: 'Protagonist',
                    description: 'A 12-16 year old child wearing comfortable winter clothing (warm sweater, long pants, winter coat, scarf), traveling on the Mirbad Express train towards the ski point. Studio Ghibli animation style with expressive features and magical atmosphere',
                },
                {
                    name: 'Wise Conductor',
                    description: 'An experienced elderly train conductor with kind eyes, wearing a distinguished uniform',
                },
            ],
            setting: 'A brave journey aboard the magnificent Mirbad Express, where fear turns to courage as the train crosses treacherous mountain bridges on its way to the snowy ski point. With the help of a wise conductor, the traveler discovers inner strength and transforms from nervous passenger to confident adventurer.',
            panels: [
                {
                    number: 1,
                    scene: 'Standing at the magnificent entrance of the Mirbad Express, heart pounding with nervousness about the solo journey to the distant ski point, golden evening light streaming through ornate windows',
                    action: 'Wide dramatic shot of the grand train interior with protagonist silhouetted at the doorway',
                    mood: 'Anxious but determined',
                    tradition: 'Courage to embark on new adventures',
                },
                {
                    number: 2,
                    scene: 'Sudden turbulence shakes the train as it crosses a high mountain bridge, fear gripping as the protagonist sees the deep valley below through the window, clutching the seat',
                    action: 'Dynamic close-up showing fear in the eyes mixed with determination not to give up',
                    mood: 'Facing a terrifying moment',
                    tradition: 'Finding strength in difficulty',
                },
                {
                    number: 3,
                    scene: 'The wise conductor places a reassuring hand on the shoulder, sharing stories of countless brave travelers who conquered their fears on this very train, protagonist listening intently and feeling courage grow',
                    action: 'Warm medium shot of meaningful connection and mentorship',
                    mood: 'Inspiration and growing confidence',
                    tradition: 'Strength through community wisdom',
                },
                {
                    number: 4,
                    scene: 'Triumphantly arriving at the snowy ski point destination, standing proudly at the window as majestic snow-covered peaks come into view, radiating accomplishment and newfound courage',
                    action: 'Epic wide shot with mountains visible, protagonist transformed and confident',
                    mood: 'Victorious joy and pride',
                    tradition: 'Personal transformation through courage',
                },
            ],
        },
    ],

    kindness: [
        {
            id: 'kindness-1',
            title: 'The Helping Hand',
            titleAr: 'يد العون',
            description: 'A story about showing kindness to others on the journey',
            characters: [
                {
                    name: 'Protagonist',
                    description: 'A 12-16 year old child wearing comfortable winter clothing (warm sweater, long pants, winter coat, scarf), traveling on the Mirbad Express train towards the ski point. Studio Ghibli animation style with expressive features and magical atmosphere',
                },
                {
                    name: 'Elderly Passenger',
                    description: 'A kind elderly person, looking tired from the journey',
                },
            ],
            setting: 'A heartwarming tale of kindness on the Mirbad Express. When a struggling elderly passenger needs help, a compassionate traveler extends a helping hand, sharing warmth, stories, and tea as the train journeys through the snowy landscape to the ski point.',
            panels: [
                {
                    number: 1,
                    scene: 'Noticing an elderly passenger struggling with heavy luggage on the train',
                    action: 'Medium shot showing awareness of someone in need',
                    mood: 'Compassionate observation',
                    tradition: 'Helping others',
                },
                {
                    number: 2,
                    scene: 'Approaching the elderly passenger and offering to help with their bags',
                    action: 'Close-up on kind gesture and warm smile',
                    mood: 'Generous spirit',
                    tradition: 'Kindness to elders',
                },
                {
                    number: 3,
                    scene: 'Sharing stories and tea together as the train travels through snowy landscape',
                    action: 'Medium shot of both sitting together, enjoying company',
                    mood: 'Warm connection',
                    tradition: 'Building friendships',
                },
                {
                    number: 4,
                    scene: 'Both arriving at ski point together, grateful for the kindness shared',
                    action: 'Wide shot of arrival, both smiling warmly',
                    mood: 'Joyful gratitude',
                    tradition: 'Acts of kindness',
                },
            ],
        },
    ],

    resilience: [
        {
            id: 'resilience-1',
            title: 'The Persistent Traveler',
            titleAr: 'المسافر المثابر',
            description: 'A story about persistence through challenges',
            characters: [
                {
                    name: 'Protagonist',
                    description: 'A 12-16 year old child wearing comfortable winter clothing (warm sweater, long pants, winter coat, scarf), traveling on the Mirbad Express train towards the ski point. Studio Ghibli animation style with expressive features and magical atmosphere',
                },
                {
                    name: 'Fellow Traveler',
                    description: 'Another passenger who is discouraged by delays',
                },
            ],
            setting: 'A story of resilience aboard the Mirbad Express. When heavy snow delays the journey to the ski point, one traveler demonstrates the power of persistence, staying positive and encouraging fellow passengers until the train completes its journey.',
            panels: [
                {
                    number: 1,
                    scene: 'Train encounters unexpected delay due to heavy snow, passengers becoming worried',
                    action: 'Wide shot of stopped train in snowy landscape',
                    mood: 'Unexpected challenge',
                    tradition: 'Facing difficulties',
                },
                {
                    number: 2,
                    scene: 'Staying calm and positive while others become frustrated with the situation',
                    action: 'Close-up showing patience and composure',
                    mood: 'Inner strength',
                    tradition: 'Maintaining hope',
                },
                {
                    number: 3,
                    scene: 'Encouraging fellow passengers and helping keep spirits up during the wait',
                    action: 'Medium shot of inspiring others with positive attitude',
                    mood: 'Determined optimism',
                    tradition: 'Perseverance',
                },
                {
                    number: 4,
                    scene: 'Train finally moving again, arriving at ski point after overcoming the delay',
                    action: 'Wide shot of successful arrival, snow-covered mountains ahead',
                    mood: 'Rewarded persistence',
                    tradition: 'Never giving up',
                },
            ],
        },
    ],

    respect: [
        {
            id: 'respect-1',
            title: 'The Respectful Passenger',
            titleAr: 'المسافر المحترم',
            description: 'A story about showing respect on the journey',
            characters: [
                {
                    name: 'Protagonist',
                    description: 'A 12-16 year old child wearing comfortable winter clothing (warm sweater, long pants, winter coat, scarf), traveling on the Mirbad Express train towards the ski point. Studio Ghibli animation style with expressive features and magical atmosphere',
                },
                {
                    name: 'Quiet Zone Passenger',
                    description: 'A passenger trying to rest in the quiet section of the train',
                },
            ],
            setting: 'A lesson in respect on the Mirbad Express. In the quiet zone of the train, a mindful passenger shows consideration for others who wish to rest, creating a peaceful atmosphere for all travelers heading to the ski point.',
            panels: [
                {
                    number: 1,
                    scene: 'Entering the quiet zone of the train and noticing the peaceful atmosphere',
                    action: 'Medium shot showing awareness of the quiet environment',
                    mood: 'Mindful observation',
                    tradition: 'Respecting space',
                },
                {
                    number: 2,
                    scene: 'Politely asking loud companions to lower their voices to respect others',
                    action: 'Close-up on courteous conversation',
                    mood: 'Considerate action',
                    tradition: 'Thoughtfulness',
                },
                {
                    number: 3,
                    scene: 'Everyone enjoying the peaceful journey together, reading and relaxing',
                    action: 'Wide shot of harmonious quiet zone',
                    mood: 'Mutual respect',
                    tradition: 'Community courtesy',
                },
                {
                    number: 4,
                    scene: 'Passengers thanking each other for the respectful atmosphere as they arrive',
                    action: 'Medium shot of grateful exchanges at ski point arrival',
                    mood: 'Appreciative harmony',
                    tradition: 'Respect for others',
                },
            ],
        },
    ],

    tolerance: [
        {
            id: 'tolerance-1',
            title: 'The Diverse Journey',
            titleAr: 'رحلة التنوع',
            description: 'A story about celebrating diversity and differences',
            characters: [
                {
                    name: 'Protagonist',
                    description: 'A 12-16 year old child wearing comfortable winter clothing (warm sweater, long pants, winter coat, scarf), traveling on the Mirbad Express train towards the ski point. Studio Ghibli animation style with expressive features and magical atmosphere',
                },
                {
                    name: 'International Travelers',
                    description: 'A group of travelers from different cultures and backgrounds',
                },
            ],
            setting: 'A celebration of diversity on the Mirbad Express. Travelers from different cultures and backgrounds come together, sharing stories, food, and customs as the train carries them to the ski point, becoming friends through embracing their differences.',
            panels: [
                {
                    number: 1,
                    scene: 'Meeting travelers from many different countries, all heading to the ski point',
                    action: 'Wide shot of diverse group in train car',
                    mood: 'Curious interest',
                    tradition: 'Embracing diversity',
                },
                {
                    number: 2,
                    scene: 'Listening to stories and learning about different cultures and traditions',
                    action: 'Close-up on engaged conversation and learning',
                    mood: 'Open-minded curiosity',
                    tradition: 'Cultural appreciation',
                },
                {
                    number: 3,
                    scene: 'Sharing food and customs from different backgrounds, everyone teaching each other',
                    action: 'Medium shot of cultural exchange and sharing',
                    mood: 'Joyful connection',
                    tradition: 'Unity in diversity',
                },
                {
                    number: 4,
                    scene: 'Arriving at ski point together as newfound friends from around the world',
                    action: 'Wide shot of united group arriving together',
                    mood: 'Harmonious unity',
                    tradition: 'Celebrating differences',
                },
            ],
        },
    ],

    creativity: [
        {
            id: 'creativity-1',
            title: 'The Creative Solution',
            titleAr: 'الحل الإبداعي',
            description: 'A story about using creativity to solve problems',
            characters: [
                {
                    name: 'Protagonist',
                    description: 'A 12-16 year old child wearing comfortable winter clothing (warm sweater, long pants, winter coat, scarf), traveling on the Mirbad Express train towards the ski point. Studio Ghibli animation style with expressive features and magical atmosphere',
                },
                {
                    name: 'Bored Children',
                    description: 'A group of young children who are restless during the long journey',
                },
            ],
            setting: 'An inspiring story of creativity on the Mirbad Express. During the long journey to the ski point, bored children become restless until one clever traveler uses creative storytelling about the mountains to captivate everyone and transform the journey.',
            panels: [
                {
                    number: 1,
                    scene: 'Noticing children becoming bored and restless on the long journey to ski point',
                    action: 'Medium shot of fidgety children and concerned parents',
                    mood: 'Observing a need',
                    tradition: 'Problem awareness',
                },
                {
                    number: 2,
                    scene: 'Getting a creative idea to entertain them with storytelling about the mountains',
                    action: 'Close-up on moment of inspiration',
                    mood: 'Creative spark',
                    tradition: 'Innovative thinking',
                },
                {
                    number: 3,
                    scene: 'Animately telling an engaging story using the passing scenery as inspiration',
                    action: 'Wide shot of captivated children listening to creative tale',
                    mood: 'Imaginative engagement',
                    tradition: 'Creative expression',
                },
                {
                    number: 4,
                    scene: 'Children happily arrive at ski point, inspired and excited by the creative stories',
                    action: 'Medium shot of joyful arrival with grateful families',
                    mood: 'Fulfilled creativity',
                    tradition: 'Using imagination to help others',
                },
            ],
        },
    ],
};