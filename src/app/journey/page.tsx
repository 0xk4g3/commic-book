'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, User, Users, Sparkles } from 'lucide-react';
import { VALUES } from '@/constants/values';
import { StoryValue } from '@/types/story';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function JourneyPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState<'male' | 'female' | ''>('');
    const [selectedValue, setSelectedValue] = useState<StoryValue | ''>('');

    const handleNext = () => {
        if (step === 1 && fullName && gender) {
            setStep(2);
        }
    };

    const handleGenerateStory = () => {
        if (fullName && gender && selectedValue) {
            router.push(`/generator?name=${encodeURIComponent(fullName)}&gender=${gender}&value=${selectedValue}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <button
                    onClick={() => step === 1 ? router.push('/') : setStep(1)}
                    className="mb-6 flex items-center space-x-2 text-white/80 transition-colors hover:text-white group"
                >
                    <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Back</span>
                </button>

                {/* Progress Indicator */}
                <div className="mb-8 flex items-center justify-center gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-yellow-400 text-purple-900 shadow-glow' : 'bg-white/20 text-white'} font-bold transition-all duration-300`}>
                        1
                    </div>
                    <div className={`h-1 w-16 ${step >= 2 ? 'bg-yellow-400' : 'bg-white/20'} transition-all duration-300 rounded-full`}></div>
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-yellow-400 text-purple-900 shadow-glow' : 'bg-white/20 text-white'} font-bold transition-all duration-300`}>
                        2
                    </div>
                </div>

                {/* Step 1: Personal Info */}
                {step === 1 && (
                    <div className="mx-auto max-w-2xl animate-fade-in">
                        <Card variant="glass" padding="lg">
                            <h2 className="text-4xl font-bold text-white text-center mb-2">
                                Welcome Aboard!
                            </h2>
                            <p className="text-blue-200 text-center mb-8">
                                Let's get to know you before we start this adventure
                            </p>

                            {/* Full Name Input */}
                            <div className="mb-6">
                                <label className="block text-white font-semibold mb-3 text-lg">
                                    What's your full name?
                                </label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Enter your name..."
                                    className="w-full px-6 py-4 rounded-xl bg-white/90 text-gray-800 text-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-all"
                                />
                            </div>

                            {/* Gender Selection */}
                            <div className="mb-8">
                                <label className="block text-white font-semibold mb-3 text-lg">
                                    Choose your character
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setGender('male')}
                                        className={`p-6 rounded-2xl border-2 transition-all duration-300 ${gender === 'male'
                                            ? 'bg-blue-500 border-blue-300 shadow-lg shadow-blue-500/50 scale-105'
                                            : 'bg-white/10 border-white/30 hover:bg-white/20 hover:scale-105'
                                            }`}
                                    >
                                        <div className="mb-3 inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20">
                                            <User className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-white font-bold text-xl">Boy</div>
                                    </button>
                                    <button
                                        onClick={() => setGender('female')}
                                        className={`p-6 rounded-2xl border-2 transition-all duration-300 ${gender === 'female'
                                            ? 'bg-pink-500 border-pink-300 shadow-lg shadow-pink-500/50 scale-105'
                                            : 'bg-white/10 border-white/30 hover:bg-white/20 hover:scale-105'
                                            }`}
                                    >
                                        <div className="mb-3 inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20">
                                            <Users className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-white font-bold text-xl">Girl</div>
                                    </button>
                                </div>
                            </div>

                            {/* Next Button */}
                            <Button
                                onClick={handleNext}
                                disabled={!fullName || !gender}
                                variant="primary"
                                size="lg"
                                className="w-full"
                            >
                                Next Step
                                <ArrowRight className="w-6 h-6" />
                            </Button>
                        </Card>
                    </div>
                )}

                {/* Step 2: Topic Selection */}
                {step === 2 && (
                    <div className="mx-auto max-w-5xl animate-fade-in">
                        <Card variant="glass" padding="lg">
                            <h2 className="text-4xl font-bold text-white text-center mb-2">
                                Choose Your Adventure Topic
                            </h2>
                            <p className="text-blue-200 text-center mb-8">
                                What value would you like to learn about, {fullName}?
                            </p>

                            {/* Value Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {VALUES.map((value) => (
                                    <button
                                        key={value.id}
                                        onClick={() => setSelectedValue(value.id)}
                                        className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${selectedValue === value.id
                                            ? 'bg-white/90 border-yellow-400 shadow-lg shadow-yellow-500/50 scale-105'
                                            : 'bg-white/10 border-white/30 hover:bg-white/20 hover:scale-105'
                                            }`}
                                    >
                                        <div className="text-5xl mb-3">{value.icon}</div>
                                        <h3 className={`text-2xl font-bold mb-1 ${selectedValue === value.id ? 'text-gray-800' : 'text-white'}`}>
                                            {value.name}
                                        </h3>
                                        <p className={`text-sm ${selectedValue === value.id ? 'text-gray-600' : 'text-blue-200'}`}>
                                            {value.description}
                                        </p>
                                    </button>
                                ))}
                            </div>

                            {/* Generate Button */}
                            <Button
                                onClick={handleGenerateStory}
                                disabled={!selectedValue}
                                variant="success"
                                size="lg"
                                className="w-full"
                            >
                                <Sparkles className="w-6 h-6" />
                                Generate My Story
                                <Sparkles className="w-6 h-6" />
                            </Button>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
