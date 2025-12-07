import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { APP_CONFIG } from '../utils/constants';

const Header = ({ currentPage = 'home', onNavigate }) => {
    return (
        <header className="bg-gradient-to-r from-winter-blue via-desert-gold to-winter-sky text-white shadow-lg">
            <div className="container mx-auto px-4 py-6">
                {/* Main Header */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                    {/* Logo and Title */}
                    <div className="flex items-center gap-3">
                        <div className="text-5xl transform hover:rotate-12 transition-transform">
                            📚
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
                                {APP_CONFIG.appName}
                                <Sparkles className="w-6 h-6 animate-pulse" />
                            </h1>
                            <p className="text-sm md:text-base opacity-90 font-amiri arabic-text">
                                {APP_CONFIG.appNameAr}
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex gap-4">
                        <button
                            onClick={() => onNavigate('home')}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === 'home'
                                    ? 'bg-white text-winter-blue'
                                    : 'bg-transparent border-2 border-white hover:bg-white hover:text-winter-blue'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Create
                            </span>
                        </button>
                        <button
                            onClick={() => onNavigate('library')}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === 'library'
                                    ? 'bg-white text-winter-blue'
                                    : 'bg-transparent border-2 border-white hover:bg-white hover:text-winter-blue'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                Library
                            </span>
                        </button>
                    </nav>
                </div>

                {/* Tagline */}
                <p className="text-center mt-4 text-lg opacity-95">
                    {APP_CONFIG.tagline} • Learn UAE Values Through Stories
                </p>
            </div>

            {/* Decorative Border */}
            <div className="h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
        </header>
    );
};

export default Header;
