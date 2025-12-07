'use client';

import { useRouter } from 'next/navigation';
import { VALUES } from '@/constants/values';
import { StoryValue } from '@/types/story';
import Header from '@/components/Header';

export default function HomePage() {
    const router = useRouter();

    const handleValueSelect = (valueId: StoryValue) => {
        router.push(`/generator?value=${valueId}`);
    };

    const handleSurpriseMe = () => {
        const randomValue = VALUES[Math.floor(Math.random() * VALUES.length)];
        router.push(`/generator?value=${randomValue.id}`);
    };

    return (
        <div className="min-h-screen">
            <Header currentPage="home" />

            <main className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="mb-12 text-center animate-fade-in">
                    <h1 className="mb-4 text-5xl font-bold gradient-text md:text-6xl">
                        UAE Winter Tales
                    </h1>
                    <p className="mb-2 text-xl text-gray-700">
                        🇦🇪 حكايات الشتاء الإماراتية 🦅
                    </p>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        Create educational comic books featuring UAE winter traditions and
                        cultural values
                    </p>
                </div>

                {/* Value Cards */}
                <div className="mb-8">
                    <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
                        Choose a Value
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {VALUES.map((value, index) => (
                            <button
                                key={value.id}
                                onClick={() => handleValueSelect(value.id)}
                                className="card-hover group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-smooth hover:shadow-2xl"
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                }}
                            >
                                {/* Icon */}
                                <div className="mb-4 text-6xl transition-transform group-hover:scale-110">
                                    {value.icon}
                                </div>

                                {/* Title */}
                                <h3 className="mb-2 text-2xl font-bold text-gray-800">
                                    {value.name}
                                </h3>
                                <p className="mb-3 font-amiri text-lg text-gray-600">
                                    {value.nameAr}
                                </p>

                                {/* Description */}
                                <p className="text-sm text-gray-600">{value.description}</p>

                                {/* Gradient Bar */}
                                <div
                                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color}`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Surprise Me Button */}
                <div className="text-center">
                    <button
                        onClick={handleSurpriseMe}
                        className="rounded-full bg-gradient-to-r from-desert-gold to-winter-blue px-8 py-4 text-lg font-bold text-white shadow-lg transition-smooth hover:scale-105 hover:shadow-xl"
                    >
                        ✨ Surprise Me! ✨
                    </button>
                </div>

                {/* Features Section */}
                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="rounded-xl bg-white/50 p-6 text-center backdrop-blur-sm">
                        <div className="mb-3 text-4xl">🎨</div>
                        <h3 className="mb-2 text-xl font-bold text-gray-800">
                            AI-Generated Art
                        </h3>
                        <p className="text-sm text-gray-600">
                            Beautiful comic panels created with advanced AI technology
                        </p>
                    </div>

                    <div className="rounded-xl bg-white/50 p-6 text-center backdrop-blur-sm">
                        <div className="mb-3 text-4xl">📚</div>
                        <h3 className="mb-2 text-xl font-bold text-gray-800">
                            Educational Stories
                        </h3>
                        <p className="text-sm text-gray-600">
                            18+ pre-written stories teaching important UAE values
                        </p>
                    </div>

                    <div className="rounded-xl bg-white/50 p-6 text-center backdrop-blur-sm">
                        <div className="mb-3 text-4xl">🦅</div>
                        <h3 className="mb-2 text-xl font-bold text-gray-800">
                            Cultural Heritage
                        </h3>
                        <p className="text-sm text-gray-600">
                            Authentic Emirati traditions and winter celebrations
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
