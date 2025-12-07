'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Wand2 } from 'lucide-react';
import { StoryValue, Story } from '@/types/story';
import { VALUES } from '@/constants/values';
import { getStoriesForValue, getRandomStoryForValue, STORY_PROMPTS } from '@/lib/storyHelpers';
import { storyGenerator } from '@/lib/storyGenerator';
import { GeneratedPanel, Comic } from '@/types/comic';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

function GeneratorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const valueId = searchParams.get('value') as StoryValue;

    const [stories, setStories] = useState<Story[]>([]);
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [generatedPanels, setGeneratedPanels] = useState<GeneratedPanel[]>([]);

    // Load stories for the selected value
    useEffect(() => {
        if (valueId) {
            const valueStories = getStoriesForValue(valueId);
            setStories(valueStories);
        }
    }, [valueId]);

    const currentValue = VALUES.find((v) => v.id === valueId);

    const handleGenerateComic = async (story: Story) => {
        setSelectedStory(story);
        setIsGenerating(true);
        setError(null);
        setGeneratedPanels([]);
        setProgress(0);

        try {
            storyGenerator.validateStory(story);

            const panels = await storyGenerator.generateStoryPanels(
                story,
                (panelIndex, panelData) => {
                    setGeneratedPanels((prev) => [...prev, panelData]);
                    setProgress(((panelIndex + 1) / 4) * 100);
                }
            );

            // Create comic object
            const comic: Comic = {
                id: `comic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                storyId: story.id,
                valueId: valueId,
                title: story.title,
                titleAr: story.titleAr,
                characters: story.characters,
                setting: story.setting,
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
                {/* Back Button */}
                <button
                    onClick={() => router.push('/')}
                    className="mb-6 flex items-center space-x-2 text-gray-600 transition-smooth hover:text-gray-800"
                    disabled={isGenerating}
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Values</span>
                </button>

                {/* Value Header */}
                <div className="mb-8 text-center">
                    <div className="mb-4 text-6xl">{currentValue.icon}</div>
                    <h1 className="mb-2 text-4xl font-bold text-gray-800">
                        {currentValue.name}
                    </h1>
                    <p className="mb-3 font-amiri text-2xl text-gray-600">
                        {currentValue.nameAr}
                    </p>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        {currentValue.description}
                    </p>
                </div>

                {/* Content */}
                {isGenerating ? (
                    <div className="mx-auto max-w-2xl">
                        <div className="rounded-2xl bg-white p-8 shadow-xl">
                            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
                                Generating Your Comic...
                            </h2>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="mb-2 flex justify-between text-sm text-gray-600">
                                    <span>Panel {Math.floor(progress / (100 / 4)) || 0} of 4</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="h-4 overflow-hidden rounded-full bg-gray-200">
                                    <div
                                        className="h-full bg-gradient-to-r from-desert-gold to-winter-blue transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Generated Panels Preview */}
                            {generatedPanels.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                    {generatedPanels.map((panel) => (
                                        <div key={panel.number} className="animate-scale-in">
                                            <img
                                                src={panel.imageUrl}
                                                alt={`Panel ${panel.number}`}
                                                className="h-auto w-full rounded-lg shadow-md"
                                            />
                                            <p className="mt-2 text-center text-sm text-gray-600">
                                                Panel {panel.number}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <LoadingSpinner message="Creating beautiful artwork..." />
                        </div>

                        {error && (
                            <div className="mt-6">
                                <ErrorMessage
                                    message={error}
                                    onRetry={() => {
                                        if (selectedStory) {
                                            handleGenerateComic(selectedStory);
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Random Story Button */}
                        <div className="mb-8 text-center">
                            <button
                                onClick={handleRandomStory}
                                className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition-smooth hover:scale-105 hover:shadow-xl"
                            >
                                <Wand2 className="h-6 w-6" />
                                <span>Generate Random Story</span>
                            </button>
                        </div>

                        {/* Story Selection */}
                        <div>
                            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
                                Or Choose a Specific Story
                            </h2>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {stories.map((story, index) => (
                                    <div
                                        key={story.id}
                                        className="card-hover group overflow-hidden rounded-2xl bg-white p-6 shadow-lg"
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                        }}
                                    >
                                        <h3 className="mb-2 text-xl font-bold text-gray-800">
                                            {story.title}
                                        </h3>
                                        <p className="mb-4 font-amiri text-lg text-gray-600">
                                            {story.titleAr}
                                        </p>
                                        <p className="mb-4 text-sm text-gray-600">
                                            {story.description}
                                        </p>

                                        <button
                                            onClick={() => handleGenerateComic(story)}
                                            className="w-full rounded-lg bg-gradient-to-r from-desert-gold to-winter-blue px-4 py-3 font-bold text-white transition-smooth hover:scale-105 hover:shadow-lg"
                                        >
                                            Generate This Story
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
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
