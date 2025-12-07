import React, { useState } from 'react';
import { ArrowLeft, Wand2 } from 'lucide-react';
import { getStoriesForValue, getRandomStoryForValue } from '../utils/prompts';
import { storyGenerator } from '../services/storyGenerator';
import { VALUES } from '../utils/constants';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const ComicGenerator = ({ valueId, onBack, onComicGenerated }) => {
    const [selectedStory, setSelectedStory] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentPanel, setCurrentPanel] = useState(0);
    const [generatedPanels, setGeneratedPanels] = useState([]);
    const [error, setError] = useState(null);

    const stories = getStoriesForValue(valueId);
    const valueInfo = VALUES.find(v => v.id === valueId);

    const handleGenerateComic = async (story) => {
        setSelectedStory(story);
        setIsGenerating(true);
        setError(null);
        setGeneratedPanels([]);
        setCurrentPanel(0);

        try {
            // Validate story structure
            storyGenerator.validateStory(story);

            // Generate panels with progress callback
            const panels = await storyGenerator.generateStoryPanels(
                story,
                (panelIndex, panelData) => {
                    setCurrentPanel(panelIndex + 1);
                    setGeneratedPanels(prev => [...prev, panelData]);
                }
            );

            // Create complete comic book object
            const comicBook = storyGenerator.createComicBook(story, panels, valueId);

            setIsGenerating(false);
            onComicGenerated(comicBook);
        } catch (err) {
            console.error('Comic generation error:', err);
            setError(err);
            setIsGenerating(false);
        }
    };

    const handleRandomStory = () => {
        const randomStory = getRandomStoryForValue(valueId);
        if (randomStory) {
            handleGenerateComic(randomStory);
        }
    };

    const progress = selectedStory ? (currentPanel / 6) * 100 : 0;

    // If generating, show loading screen
    if (isGenerating) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl p-8">
                        <h2 className="text-3xl font-bold text-center mb-6 text-gradient">
                            Creating Your Comic Book...
                        </h2>

                        <LoadingSpinner
                            message={`Generating Panel ${currentPanel} of 6`}
                            progress={progress}
                        />

                        {/* Show generated panels as they come in */}
                        {generatedPanels.length > 0 && (
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                {generatedPanels.map((panel, index) => (
                                    <div key={index} className="comic-panel animate-panel-reveal">
                                        <div className="comic-panel-number">{panel.number}</div>
                                        <img
                                            src={panel.imageUrl}
                                            alt={`Panel ${panel.number}: ${panel.scene}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <p className="text-center text-gray-600 mt-6">
                            This may take a few minutes. Each panel is being carefully crafted...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // If error occurred
    if (error) {
        return (
            <div className="container mx-auto px-4 py-12">
                <button
                    onClick={onBack}
                    className="btn-secondary mb-6 inline-flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Values
                </button>

                <ErrorMessage
                    title="Comic Generation Failed"
                    message={error.message}
                    details={error.stack}
                    onRetry={() => {
                        setError(null);
                        if (selectedStory) {
                            handleGenerateComic(selectedStory);
                        }
                    }}
                />
            </div>
        );
    }

    // Story selection screen
    return (
        <div className="container mx-auto px-4 py-12 pattern-background">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="btn-secondary mb-6 inline-flex items-center gap-2"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Values
            </button>

            {/* Value Header */}
            <div className="text-center mb-12 animate-fade-in">
                <div className="text-7xl mb-4">{valueInfo.icon}</div>
                <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-3">
                    {valueInfo.nameEn}
                </h2>
                <p className="text-2xl font-amiri text-gray-700 arabic-text mb-4">
                    {valueInfo.nameAr}
                </p>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {valueInfo.description}
                </p>
            </div>

            {/* Random Story Button */}
            <div className="text-center mb-8">
                <button
                    onClick={handleRandomStory}
                    className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-3"
                >
                    <Wand2 className="w-5 h-5" />
                    Generate Random Story
                </button>
            </div>

            {/* Story Selection */}
            <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-center mb-6 text-winter-blue">
                    Or Choose a Specific Story:
                </h3>

                <div className="grid gap-6">
                    {stories.map((story, index) => (
                        <div
                            key={story.id}
                            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1 animate-slide-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Story Info */}
                                <div className="flex-1">
                                    <h4 className="text-2xl font-bold text-winter-blue mb-2">
                                        {story.title}
                                    </h4>
                                    <p className="text-lg font-amiri text-gray-600 arabic-text mb-4">
                                        {story.titleAr}
                                    </p>

                                    {/* Characters */}
                                    <div className="mb-3">
                                        <p className="font-semibold text-desert-gold mb-1">Characters:</p>
                                        <div className="space-y-1">
                                            {story.characters.map((char, i) => (
                                                <p key={i} className="text-sm text-gray-700">
                                                    <span className="font-semibold">{char.name}:</span> {char.description}
                                                </p>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Setting */}
                                    <div className="mb-3">
                                        <p className="font-semibold text-desert-gold mb-1">Setting:</p>
                                        <p className="text-sm text-gray-700">{story.setting}</p>
                                    </div>

                                    {/* Panel Count */}
                                    <p className="text-sm text-gray-600">
                                        📖 6 Comic Panels • Winter in UAE • {story.characters.length} Characters
                                    </p>
                                </div>

                                {/* Generate Button */}
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleGenerateComic(story)}
                                        className="btn-primary whitespace-nowrap"
                                    >
                                        Generate This Story →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Info Note */}
            <div className="mt-12 max-w-2xl mx-auto p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                <p className="text-center text-blue-900">
                    <span className="font-semibold">ℹ️ Note:</span> Each story features exactly 2 characters and 6 beautifully illustrated panels showcasing UAE winter traditions. Generation takes approximately 1-2 minutes.
                </p>
            </div>
        </div>
    );
};

export default ComicGenerator;
