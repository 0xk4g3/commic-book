import React from 'react';
import { Shuffle } from 'lucide-react';
import { VALUES } from '../utils/constants';

const ValueSelector = ({ onSelectValue }) => {
    const handleSurpriseMe = () => {
        const randomValue = VALUES[Math.floor(Math.random() * VALUES.length)];
        onSelectValue(randomValue.id);
    };

    return (
        <div className="container mx-auto px-4 py-12 pattern-background">
            {/* Introduction */}
            <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                    Choose Your Value
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-2">
                    Select a value to create an inspiring comic book story featuring UAE winter traditions
                </p>
                <p className="text-lg font-amiri text-gray-600 arabic-text">
                    اختر قيمة لإنشاء قصة مصورة ملهمة
                </p>
            </div>

            {/* Value Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
                {VALUES.map((value, index) => (
                    <div
                        key={value.id}
                        className={`value-card bg-gradient-to-br ${value.color} animate-slide-up`}
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={() => onSelectValue(value.id)}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') onSelectValue(value.id);
                        }}
                        aria-label={`Select ${value.nameEn} value`}
                    >
                        {/* Icon */}
                        <div className="text-6xl mb-4 transform transition-transform group-hover:scale-110">
                            {value.icon}
                        </div>

                        {/* Value Name - English */}
                        <h3 className="text-2xl font-bold text-white mb-2">
                            {value.nameEn}
                        </h3>

                        {/* Value Name - Arabic */}
                        <p className="text-lg font-amiri text-white opacity-90 mb-3 arabic-text">
                            {value.nameAr}
                        </p>

                        {/* Description */}
                        <p className="text-white text-sm leading-relaxed opacity-80">
                            {value.description}
                        </p>

                        {/* Hover Effect Indicator */}
                        <div className="mt-4 flex items-center justify-center gap-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>Click to create story</span>
                            <span className="text-xl">→</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Surprise Me Button */}
            <div className="text-center">
                <button
                    onClick={handleSurpriseMe}
                    className="btn-primary text-xl px-10 py-4 inline-flex items-center gap-3"
                    aria-label="Generate random value story"
                >
                    <Shuffle className="w-6 h-6" />
                    Surprise Me! 🎲
                </button>
                <p className="text-sm text-gray-600 mt-3">
                    Let fate choose your adventure
                </p>
            </div>

            {/* Winter Decorations */}
            <div className="fixed bottom-4 left-4 text-6xl opacity-10 pointer-events-none">
                🌙
            </div>
            <div className="fixed top-20 right-4 text-6xl opacity-10 pointer-events-none">
                ⭐
            </div>
        </div>
    );
};

export default ValueSelector;
