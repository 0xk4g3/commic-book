'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Library as LibraryIcon, Mail, Printer } from 'lucide-react';
import { Comic } from '@/types/comic';
import Header from '@/components/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function ViewerPage() {
    const router = useRouter();
    const [comic, setComic] = useState<Comic | null>(null);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const comicData = localStorage.getItem('current-comic');
        if (comicData) {
            setComic(JSON.parse(comicData));
        } else {
            router.push('/');
        }
    }, [router]);

    const handleSave = () => {
        if (!comic) return;

        const savedComics = JSON.parse(localStorage.getItem('saved-comics') || '[]');

        // Check if already saved
        const exists = savedComics.find((c: Comic) => c.id === comic.id);
        if (!exists) {
            savedComics.push(comic);
            localStorage.setItem('saved-comics', JSON.stringify(savedComics));
            setSaved(true);
        }
    };

    const handlePrint = () => {
        window.print();
    };


    if (!comic) {
        return (
            <div className="min-h-screen">
                <Header />
                <main className="container mx-auto px-4 py-8">
                    <p>Loading...</p>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Header currentPage="viewer" />

            <main className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8 no-print">
                    <button
                        onClick={() => router.push('/generator?value=' + comic.valueId)}
                        className="mb-4 flex items-center space-x-2 text-gray-600 transition-smooth hover:text-gray-800"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span>Back to Generator</span>
                    </button>

                    <div className="text-center">
                        <h1 className="mb-2 text-4xl font-bold text-gray-800">
                            {comic.title}
                        </h1>
                        <p className="mb-4 font-amiri text-2xl text-gray-600">
                            {comic.titleAr}
                        </p>
                        <p className="mx-auto max-w-2xl text-gray-600">{comic.setting}</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mb-8 flex flex-wrap justify-center gap-4 no-print">
                    <Button
                        onClick={handleSave}
                        disabled={saved}
                        variant={saved ? 'success' : 'secondary'}
                        size="md"
                    >
                        <Save className="h-5 w-5" />
                        {saved ? 'Saved!' : 'Save to Library'}
                    </Button>


                    <Button
                        onClick={handlePrint}
                        variant="primary"
                        size="md"
                        className="bg-green-600 hover:bg-green-700"
                    >
                        <Printer className="h-5 w-5" />
                        Print
                    </Button>

                    <Button
                        onClick={() => alert('Email functionality coming soon!')}
                        variant="primary"
                        size="md"
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        <Mail className="h-5 w-5" />
                        Send to Email
                    </Button>

                    <Button
                        onClick={() => router.push('/library')}
                        variant="primary"
                        size="md"
                        className="bg-purple-600 hover:bg-purple-700"
                    >
                        <LibraryIcon className="h-5 w-5" />
                        View Library
                    </Button>
                </div>

                {/* Comic Panels */}
                <div className="mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 print-panels">
                        {comic.panels.map((panel, index) => (
                            <div
                                key={panel.number}
                                className="card-hover group overflow-hidden rounded-2xl bg-white p-4 shadow-lg"
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                }}
                            >
                                <div className="relative">
                                    <img
                                        src={panel.imageUrl}
                                        alt={`Panel ${panel.number}`}
                                        className="h-auto w-full rounded-lg"
                                    />

                                    {/* Scene Description Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 rounded-b-lg">
                                        <p className="text-white text-sm font-medium leading-relaxed">
                                            {panel.scene}
                                        </p>
                                    </div>

                                </div>


                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
