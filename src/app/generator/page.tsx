'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Wand2 } from 'lucide-react';
import { StoryValue, Story } from '@/types/story';
import { VALUES } from '@/constants/values';
import { getStoriesForValue, getRandomStoryForValue, STORY_PROMPTS, FIXED_CHARACTERS } from '@/lib/storyHelpers';
import { storyGenerator } from '@/lib/storyGenerator';
import { GeneratedPanel, Comic } from '@/types/comic';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

function GeneratorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const valueId = searchParams.get('value') as StoryValue;
    const userName = searchParams.get('name') || '';
    const userGender = searchParams.get('gender') as 'male' | 'female' || 'male';

    const [stories, setStories] = useState<Story[]>([]);
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [generatedPanels, setGeneratedPanels] = useState<GeneratedPanel[]>([]);
    const hasStartedGeneration = React.useRef(false);

    // Auto-generate story on load with user's data (only once)
    useEffect(() => {
        if (valueId && userName && !hasStartedGeneration.current) {
            hasStartedGeneration.current = true;
            // Auto-generate a random story for the selected value
            const randomStory = getRandomStoryForValue(valueId);
            if (randomStory) {
                handleGenerateComic(randomStory);
            }
        }
    }, [valueId, userName]); // Remove handleGenerateComic from dependencies

    const currentValue = VALUES.find((v) => v.id === valueId);

    // Helper function to personalize story with user's data
    const personalizeStory = (story: Story): Story => {
        // Use fixed character descriptions from prompts.js
        const fixedChar = userGender === 'male' ? FIXED_CHARACTERS.BOY : FIXED_CHARACTERS.GIRL;
        const characterDescription = fixedChar.description.replace('[User Name]', userName);

        // Create personalized story with user as main character
        const personalizedStory: Story = {
            ...story,
            characters: [
                {
                    name: userName,
                    description: characterDescription
                },
                ...story.characters.slice(1) // Keep supporting characters
            ],
            setting: `Mirbad Express train to ski point. Green seats, simple plain carpet, clean interior, warm lighting. Winter landscape. Studio Ghibli style.`,
        };

        return personalizedStory;
    };


    const handleGenerateComic = async (story: Story) => {
        // Personalize the story with user's data
        const personalizedStory = personalizeStory(story);

        setSelectedStory(personalizedStory);
        setIsGenerating(true);
        setError(null);
        setGeneratedPanels([]);
        setProgress(0);

        try {
            storyGenerator.validateStory(personalizedStory);

            const panels = await storyGenerator.generateStoryPanels(
                personalizedStory,
                (panelIndex, panelData) => {
                    setGeneratedPanels((prev) => [...prev, panelData]);
                    setProgress(((panelIndex + 1) / 4) * 100);
                }
            );

            // Create comic object
            const comic: Comic = {
                id: `comic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                storyId: personalizedStory.id,
                valueId: valueId,
                title: `${userName}'s ${personalizedStory.title}`,
                titleAr: personalizedStory.titleAr,
                characters: personalizedStory.characters,
                setting: personalizedStory.setting,
                panels: panels,
                createdAt: new Date().toISOString(),
            };

            // Navigate to viewer
            localStorage.setItem('current-comic', JSON.stringify(comic));
            router.push('/viewer');
        } catch (err: any) {
            console.error('Generation error:', err);
            setError(err.message || 'Failed to generate comic');
            setIsGenerating(false);
        }
    };

    const handleRandomStory = () => {
        const randomStory = getRandomStoryForValue(valueId);
        if (randomStory) {
            handleGenerateComic(randomStory);
        }
    };

    if (!valueId || !currentValue) {
        return (
            <div className="min-h-screen">
                <Header />
                <main className="container mx-auto px-4 py-8">
                    <ErrorMessage
                        message="Invalid value selected. Please go back to home."
                        onRetry={() => router.push('/')}
                    />
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Header currentPage="generator" />

            <main className="container mx-auto px-4 py-8">
                {error && (
                    <div className="mb-6">
                        <ErrorMessage
                            message={error}
                            onRetry={() => {
                                const randomStory = getRandomStoryForValue(valueId);
                                if (randomStory) {
                                    handleGenerateComic(randomStory);
                                }
                            }}
                        />
                    </div>
                )}

                {/* Content */}
                {isGenerating ? (
                    <div className="mx-auto max-w-2xl">
                        <Card variant="elevated" padding="lg">
                            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
                                Creating your adventure, {userName}
                            </h2>

                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="mb-2 flex justify-between text-sm text-gray-600">
                                    <span>Panel {Math.min(generatedPanels.length + 1, 4)} of 4</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                                    <div
                                        className="h-full bg-gradient-to-r from-desert-gold to-winter-blue transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Generated Panels Preview */}
                            {generatedPanels.length > 0 && (
                                <div className="mb-6">
                                    <p className="mb-3 text-center text-sm text-gray-600">
                                        Generated so far:
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {generatedPanels.map((panel, index) => (
                                            <div
                                                key={panel.number}
                                                className="overflow-hidden rounded-lg shadow-md"
                                            >
                                                <img
                                                    src={panel.imageUrl}
                                                    alt={`Panel ${panel.number}`}
                                                    className="h-auto w-full"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <LoadingSpinner message="Creating beautiful artwork..." />
                        </Card>
                    </div>
                ) : (
                    <div className="mx-auto max-w-2xl text-center">
                        <Card variant="elevated" padding="lg">
                            <h2 className="mb-4 text-2xl font-bold text-gray-800">
                                Generating your story...
                            </h2>
                            <p className="text-gray-600">
                                Please wait while we create your personalized Mirbad Express adventure.
                            </p>
                            <LoadingSpinner message="Preparing..." />
                        </Card>
                    </div>
                )}
            </main>
        </div>
    );
}

export default function GeneratorPage() {
    return (
        <Suspense fallback={<LoadingSpinner message="Loading generator..." />}>
            <GeneratorContent />
        </Suspense>
    );
}
