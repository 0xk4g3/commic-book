import React from 'react';

const LoadingSpinner = ({ message = 'Loading...', progress = null }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            {/* Spinning Falcon Icon */}
            <div className="relative w-24 h-24 mb-6">
                <div className="spinner"></div>
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                    🦅
                </div>
            </div>

            {/* Loading Message */}
            <p className="text-lg font-semibold text-winter-blue mb-2">
                {message}
            </p>

            {/* Progress Bar (if provided) */}
            {progress !== null && (
                <div className="w-64 mt-4">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-2">
                        {Math.round(progress)}% Complete
                    </p>
                </div>
            )}

            {/* Decorative Winter Elements */}
            <div className="flex gap-2 mt-4 text-2xl opacity-30">
                <span className="animate-pulse">❄️</span>
                <span className="animate-pulse delay-100">🌟</span>
                <span className="animate-pulse delay-200">❄️</span>
            </div>
        </div>
    );
};

export default LoadingSpinner;
