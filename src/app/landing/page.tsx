'use client';

import { useRouter } from 'next/navigation';
import { Sparkles, Train } from 'lucide-react';

export default function LandingPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
                {/* Logo/Icon */}
                <div className="mb-8 animate-bounce">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                        <Train className="w-12 h-12 text-white" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-6xl md:text-8xl font-bold text-white text-center mb-6 animate-fade-in">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
                        Mirbad Express
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-2xl md:text-3xl text-blue-100 text-center mb-4 animate-fade-in font-medium" style={{ animationDelay: '0.2s' }}>
                    Adventures to the Ski Point
                </p>

                {/* Description */}
                <p className="text-lg md:text-xl text-blue-200 text-center max-w-2xl mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    Embark on a magical journey where <span className="font-bold text-yellow-300">YOU</span> become the hero of your own story.
                    Choose your values, shape your character, and travel on the legendary Mirbad Express train.
                </p>

                {/* CTA Button */}
                <button
                    onClick={() => router.push('/journey')}
                    className="group relative px-12 py-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-full text-white text-2xl font-bold shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-110 animate-fade-in overflow-hidden"
                    style={{ animationDelay: '0.6s' }}
                >
                    <span className="relative z-10 flex items-center gap-3">
                        <Sparkles className="w-8 h-8" />
                        Start Your Journey
                        <Sparkles className="w-8 h-8" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Features */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl animate-fade-in" style={{ animationDelay: '0.8s' }}>
                    <div className="text-center">
                        <div className="text-5xl mb-3">✨</div>
                        <h3 className="text-xl font-bold text-white mb-2">Personalized Stories</h3>
                        <p className="text-blue-200 text-sm">You are the main character in every adventure</p>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl mb-3">🎨</div>
                        <h3 className="text-xl font-bold text-white mb-2">Beautiful Art</h3>
                        <p className="text-blue-200 text-sm">Studio Ghibli-inspired AI-generated illustrations</p>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl mb-3">📚</div>
                        <h3 className="text-xl font-bold text-white mb-2">Learn Values</h3>
                        <p className="text-blue-200 text-sm">Stories teaching courage, kindness, and more</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
