'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Trash2, Eye } from 'lucide-react';
import { Comic } from '@/types/comic';
import { VALUES } from '@/constants/values';
import { StoryValue } from '@/types/story';
import Header from '@/components/Header';

export default function LibraryPage() {
    const router = useRouter();
    const [comics, setComics] = useState<Comic[]>([]);
    const [filter, setFilter] = useState<StoryValue | 'all'>('all');

    useEffect(() => {
        loadComics();
    }, []);

    const loadComics = () => {
        const savedComics = JSON.parse(localStorage.getItem('saved-comics') || '[]');
        setComics(savedComics);
    };

    const handleDelete = (comicId: string) => {
        if (confirm('Are you sure you want to delete this comic?')) {
            const savedComics = comics.filter((c) => c.id !== comicId);
            localStorage.setItem('saved-comics', JSON.stringify(savedComics));
            setComics(savedComics);
        }
    };

    const handleView = (comic: Comic) => {
        localStorage.setItem('current-comic', JSON.stringify(comic));
        router.push('/viewer');
    };

    const filteredComics =
        filter === 'all'
            ? comics
            : comics.filter((c) => c.valueId === filter);

    return (
        <div className="min-h-screen">
            <Header currentPage="library" />

            <main className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => router.push('/')}
                        className="mb-4 flex items-center space-x-2 text-gray-600 transition-smooth hover:text-gray-800"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span>Back to Home</span>
                    </button>

                    <h1 className="mb-4 text-center text-4xl font-bold gradient-text">
                        📚 My Comic Library
                    </h1>
                    <p className="mb-6 text-center text-lg text-gray-600">
                        {comics.length} saved comic{comics.length !== 1 ? 's' : ''}
                    </p>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-smooth ${filter === 'all'
                                    ? 'bg-gradient-to-r from-desert-gold to-winter-blue text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            All
                        </button>
                        {VALUES.map((value) => (
                            <button
                                key={value.id}
                                onClick={() => setFilter(value.id)}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition-smooth ${filter === value.id
                                        ? 'bg-gradient-to-r from-desert-gold to-winter-blue text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {value.icon} {value.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comics Grid */}
                {filteredComics.length === 0 ? (
                    <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
                        <div className="mb-4 text-6xl">📚</div>
                        <h2 className="mb-2 text-2xl font-bold text-gray-800">
                            No Comics Yet
                        </h2>
                        <p className="mb-6 text-gray-600">
                            Start creating your first comic book!
                        </p>
                        <button
                            onClick={() => router.push('/')}
                            className="rounded-lg bg-gradient-to-r from-desert-gold to-winter-blue px-6 py-3 font-bold text-white transition-smooth hover:scale-105 hover:shadow-lg"
                        >
                            Create Comic
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredComics.map((comic, index) => {
                            const value = VALUES.find((v) => v.id === comic.valueId);

                            return (
                                <div
                                    key={comic.id}
                                    className="card-hover group overflow-hidden rounded-2xl bg-white shadow-lg"
                                    style={{
                                        animationDelay: `${index * 0.05}s`,
                                    }}
                                >
                                    {/* Thumbnail */}
                                    <div className="relative aspect-square overflow-hidden">
                                        <img
                                            src={comic.panels[0]?.imageUrl || ''}
                                            alt={comic.title}
                                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                        />

                                        {/* Value Badge */}
                                        {value && (
                                            <div className="absolute left-2 top-2 rounded-lg bg-white/90 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                                                {value.icon} {value.name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="p-4">
                                        <h3 className="mb-1 text-xl font-bold text-gray-800">
                                            {comic.title}
                                        </h3>
                                        <p className="mb-3 font-amiri text-sm text-gray-600">
                                            {comic.titleAr}
                                        </p>
                                        <p className="mb-4 text-xs text-gray-500">
                                            Created: {new Date(comic.createdAt).toLocaleDateString()}
                                        </p>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleView(comic)}
                                                className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-desert-gold to-winter-blue px-4 py-2 text-white transition-smooth hover:scale-105"
                                            >
                                                <Eye className="h-4 w-4" />
                                                <span>View</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(comic.id)}
                                                className="flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-white transition-smooth hover:scale-105 hover:bg-red-700"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}
