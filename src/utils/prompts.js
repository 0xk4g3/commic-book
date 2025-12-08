// Mirbad Express Story Prompts
// 6 values, 1 story each, exactly 4 panels
// Fixed character appearance: 12-16 year old girl/boy in modest winter clothing
// UPDATED: All stories now use Grade 4 reading level (age 9-10) language

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
            setting: 'A brave journey on the Mirbad Express train. The train crosses scary mountain bridges on the way to the snowy ski point. With help from a kind conductor, the young traveler finds courage and becomes a confident adventurer.',
            panels: [
                {
                    number: 1,
                    scene: 'Standing at the entrance of the big Mirbad Express train. I feel nervous about traveling alone to the ski point. Golden evening light shines through the windows.',
                    action: 'Wide shot of the grand train with main character at the doorway',
                    mood: 'Nervous but ready',
                    tradition: 'Being brave to start new adventures',
                },
                {
                    number: 2,
                    scene: 'The train shakes as it goes over a high bridge. I look out the window and see the deep valley below. I hold on tight to my seat.',
                    action: 'Close-up showing scared eyes but not giving up',
                    mood: 'Scared but trying to be brave',
                    tradition: 'Finding strength when things are hard',
                },
                {
                    number: 3,
                    scene: 'The kind conductor puts a hand on my shoulder. He tells stories about other brave kids who rode this train. I listen carefully and start to feel braver.',
                    action: 'Friendly shot of the conductor helping',
                    mood: 'Feeling stronger and more confident',
                    tradition: 'Learning from others',
                },
                {
                    number: 4,
                    scene: 'We arrive at the snowy ski point! I stand proudly at the window looking at the beautiful snow-covered mountains. I did it!',
                    action: 'Big wide shot with mountains, main character looking confident',
                    mood: 'Happy and proud',
                    tradition: 'Growing through courage',
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
            setting: 'A kind story on the Mirbad Express. An old person needs help with their bags. A caring young traveler helps them and they share warm tea and stories as the train travels through the snow to the ski point.',
            panels: [
                {
                    number: 1,
                    scene: 'I see an old person trying to lift heavy bags on the train.',
                    action: 'Medium shot showing someone who needs help',
                    mood: 'Caring and noticing',
                    tradition: 'Helping others',
                },
                {
                    number: 2,
                    scene: 'I walk over and offer to help carry the bags.',
                    action: 'Close-up on kind gesture and warm smile',
                    mood: 'Being generous',
                    tradition: 'Being kind to older people',
                },
                {
                    number: 3,
                    scene: 'We sit together and share stories and tea while watching the snowy view.',
                    action: 'Medium shot of both sitting together, happy',
                    mood: 'Warm friendship',
                    tradition: 'Making new friends',
                },
                {
                    number: 4,
                    scene: 'We both arrive at the ski point together, thankful for the kindness we shared.',
                    action: 'Wide shot at arrival, both smiling warmly',
                    mood: 'Happy and grateful',
                    tradition: 'Being kind to others',
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
            setting: 'A story about not giving up on the Mirbad Express. Heavy snow stops the train on the way to the ski point. One traveler stays positive and cheers up the other passengers until the train can go again.',
            panels: [
                {
                    number: 1,
                    scene: 'The train stops because of heavy snow. All the passengers start to worry.',
                    action: 'Wide shot of stopped train in snowy place',
                    mood: 'Unexpected problem',
                    tradition: 'Facing hard times',
                },
                {
                    number: 2,
                    scene: 'I stay calm and positive while others get upset about the delay.',
                    action: 'Close-up showing patience and staying calm',
                    mood: 'Being strong inside',
                    tradition: 'Keeping hope',
                },
                {
                    number: 3,
                    scene: 'I cheer up other passengers and help everyone stay happy during the wait.',
                    action: 'Medium shot of helping others feel better',
                    mood: 'Staying positive',
                    tradition: 'Never giving up',
                },
                {
                    number: 4,
                    scene: 'The train moves again! We arrive at the ski point after waiting patiently.',
                    action: 'Wide shot of arrival with snow-covered mountains',
                    mood: 'Happy we kept trying',
                    tradition: 'Persistence pays off',
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
            setting: 'A lesson in respect on the Mirbad Express. In the quiet area of the train, a thoughtful passenger makes sure to be quiet so others can rest on the way to the ski point.',
            panels: [
                {
                    number: 1,
                    scene: 'I enter the quiet area of the train and see it is very peaceful.',
                    action: 'Medium shot showing the quiet place',
                    mood: 'Being aware and careful',
                    tradition: 'Respecting others\' space',
                },
                {
                    number: 2,
                    scene: 'I politely ask my loud friends to talk more quietly to respect others.',
                    action: 'Close-up on polite conversation',
                    mood: 'Being thoughtful',
                    tradition: 'Thinking of others',
                },
                {
                    number: 3,
                    scene: 'Everyone enjoys the peaceful trip together, reading and relaxing.',
                    action: 'Wide shot of peaceful quiet area',
                    mood: 'Everyone respecting each other',
                    tradition: 'Being polite to others',
                },
                {
                    number: 4,
                    scene: 'Passengers thank each other for being respectful as we arrive at the ski point.',
                    action: 'Medium shot of people saying thank you at arrival',
                    mood: 'Grateful and peaceful',
                    tradition: 'Showing respect to others',
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
            setting: 'A celebration of differences on the Mirbad Express. Travelers from many countries come together. They share stories, food, and customs as the train goes to the ski point. They all become friends.',
            panels: [
                {
                    number: 1,
                    scene: 'I meet travelers from many different countries, all going to the ski point.',
                    action: 'Wide shot of people from different places in train car',
                    mood: 'Curious and interested',
                    tradition: 'Accepting everyone',
                },
                {
                    number: 2,
                    scene: 'I listen to their stories and learn about different places and customs.',
                    action: 'Close-up showing interest and learning',
                    mood: 'Open mind and curiosity',
                    tradition: 'Learning about other cultures',
                },
                {
                    number: 3,
                    scene: 'We share food from different countries and teach each other new things.',
                    action: 'Medium shot of sharing and teaching',
                    mood: 'Happy connection',
                    tradition: 'Being united even though we are different',
                },
                {
                    number: 4,
                    scene: 'We arrive at the ski point together as new friends from around the world.',
                    action: 'Wide shot of group arriving together',
                    mood: 'Together and happy',
                    tradition: 'Celebrating our differences',
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
            setting: 'A creative story on the Mirbad Express. During the long trip to the ski point, bored kids get restless. One clever traveler tells exciting stories about the mountains and makes everyone happy.',
            panels: [
                {
                    number: 1,
                    scene: 'I see children getting bored and restless on the long trip to the ski point.',
                    action: 'Medium shot of fidgety children and worried parents',
                    mood: 'Noticing a problem',
                    tradition: 'Seeing when help is needed',
                },
                {
                    number: 2,
                    scene: 'I get a fun idea to tell them stories about the mountains we are passing.',
                    action: 'Close-up showing a good idea',
                    mood: 'Creative thinking',
                    tradition: 'Thinking of new ideas',
                },
                {
                    number: 3,
                    scene: 'I tell an exciting story using the beautiful view outside as part of the tale.',
                    action: 'Wide shot of children listening to the creative story',
                    mood: 'Using imagination',
                    tradition: 'Being creative',
                },
                {
                    number: 4,
                    scene: 'The children arrive at the ski point happy and excited from the creative stories.',
                    action: 'Medium shot of joyful arrival with grateful families',
                    mood: 'Happy from creativity',
                    tradition: 'Using imagination to help others',
                },
            ],
        },
    ],
};