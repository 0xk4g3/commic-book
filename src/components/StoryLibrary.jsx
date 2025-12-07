import React, { useState, useEffect } from 'react';
import { Trash2, Eye, BookOpen, Filter } from 'lucide-react';
import { VALUES } from '../utils/constants';

const StoryLibrary = ({ onViewComic }) => {
    const [savedComics, setSavedComics] = useState([]);
    const [filterValue, setFilterValue] = useState('all');

    // Load comics from localStorage
    useEffect(() => {
        loadComics();
    }, []);

    const loadComics = () => {
        try {
            const stored = localStorage.getItem('uae_winter_tales_comics');
            if (stored) {
                const comics = JSON.parse(stored);
                setSavedComics(comics);
            }
        } catch (error) {
            console.error('Error loading comics:', error);
        }
    };

    // Save comics to localStorage
    const saveComics = (comics) => {
        try {
            localStorage.setItem('uae_winter_tales_comics', JSON.stringify(comics));
            setSavedComics(comics);
        } catch (error) {
            console.error('Error saving comics:', error);
        }
    };

    // Delete comic
    const deleteComic = (comicId) => {
        if (window.confirm('Are you sure you want to delete this comic?')) {
            const updated = savedComics.filter(comic => comic.id !== comicId);
            saveComics(updated);
        }
    };

    // Filter comics by value
    const filteredComics = filterValue === 'all'
        ? savedComics
        : savedComics.filter(comic => comic.valueId === filterValue);

    // Empty state
    if (savedComics.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="text-8xl mb-6">📚</div>
                    <h2 className="text-4xl font-bold text-gradient mb-4">
                        Your Library is Empty
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Create your first comic book to see it here!
                    </p>
                    <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                        <p className="text-blue-900">
                            💡 <span className="font-semibold">Tip:</span> Generated comics will automatically appear in your library. You can download them as PDF, save individual panels, or view them anytime.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 pattern-background">
            {/* Header */}
            <div className="text-center mb-8 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                    <BookOpen className="inline w-10 h-10 mb-2" /> Your Comic Library
                </h2>
                <p className="text-xl text-gray-700">
                    {savedComics.length} Saved Comic{savedComics.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Filter Section */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="flex items-center gap-3 flex-wrap justify-center">
                    <Filter className="w-5 h-5 text-gray-600" />
                    <span className="font-semibold text-gray-700">Filter by Value:</span>

                    <button
                        onClick={() => setFilterValue('all')}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${filterValue === 'all'
                                ? 'bg-gradient-to-r from-desert-gold to-winter-blue text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        All ({savedComics.length})
                    </button>

                    {VALUES.map(value => {
                        const count = savedComics.filter(c => c.valueId === value.id).length;
                        if (count === 0) return null;

                        return (
                            <button
                                key={value.id}
                                onClick={() => setFilterValue(value.id)}
                                className={`px-4 py-2 rounded-lg font-semibold transition-all ${filterValue === value.id
                                        ? 'bg-gradient-to-r from-desert-gold to-winter-blue text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {value.icon} {value.nameEn} ({count})
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Comics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {filteredComics.map((comic, index) => {
                    const valueInfo = VALUES.find(v => v.id === comic.valueId);

                    return (
                        <div
                            key={comic.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 animate-slide-up"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* Thumbnail - First Panel */}
                            <div className="relative h-48 bg-gray-100 overflow-hidden">
                                {comic.panels && comic.panels[0] && (
                                    <img
                                        src={comic.panels[0].imageUrl}
                                        alt={comic.title}
                                        className="w-full h-full object-cover"
                                    />
                                )}

                                {/* Value Badge */}
                                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white font-semibold text-sm shadow-lg bg-gradient-to-r ${valueInfo.color}`}>
                                    {valueInfo.icon} {valueInfo.nameEn}
                                </div>
                            </div>

                            {/* Comic Info */}
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-winter-blue mb-1">
                                    {comic.title}
                                </h3>
                                <p className="text-sm font-amiri text-gray-600 arabic-text mb-3">
                                    {comic.titleAr}
                                </p>

                                <div className="text-sm text-gray-600 mb-4 space-y-1">
                                    <p>📖 {comic.panels.length} Panels</p>
                                    <p>👥 {comic.characters.length} Characters</p>
                                    <p>📅 {new Date(comic.createdAt).toLocaleDateString()}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onViewComic(comic)}
                                        className="flex-1 btn-primary py-2 px-4 text-sm inline-flex items-center justify-center gap-2"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View
                                    </button>
                                    <button
                                        onClick={() => deleteComic(comic.id)}
                                        className="btn-secondary py-2 px-4 text-sm hover:bg-red-500 hover:text-white hover:border-red-500"
                                        aria-label="Delete comic"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* No Results Message */}
            {filteredComics.length === 0 && savedComics.length > 0 && (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600">
                        No comics found for this value.
                    </p>
                </div>
            )}

            {/* Storage Info */}
            <div className="mt-12 max-w-2xl mx-auto p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                <p className="text-center text-yellow-900 text-sm">
                    <span className="font-semibold">💾 Storage:</span> Comics are saved in your browser's local storage. Clearing browser data will remove your saved comics.
                </p>
            </div>
        </div>
    );
};

// Export function to save comic to library
export const saveComicToLibrary = (comic) => {
    try {
        const stored = localStorage.getItem('uae_winter_tales_comics');
        const comics = stored ? JSON.parse(stored) : [];

        // Check if comic already exists
        const exists = comics.find(c => c.id === comic.id);
        if (!exists) {
            comics.unshift(comic); // Add to beginning

            // Limit to 50 comics
            if (comics.length > 50) {
                comics.pop();
            }

            localStorage.setItem('uae_winter_tales_comics', JSON.stringify(comics));
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error saving comic:', error);
        return false;
    }
};

export default StoryLibrary;
