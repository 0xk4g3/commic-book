'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, Save, Library as LibraryIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { Comic } from '@/types/comic';
import Header from '@/components/Header';

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

    const handleDownloadPDF = async () => {
        if (!comic) return;

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Title Page
        pdf.setFontSize(24);
        pdf.text(comic.title, pageWidth / 2, 40, { align: 'center' });
        pdf.setFontSize(18);
        pdf.text(comic.titleAr, pageWidth / 2, 60, { align: 'center' });

        pdf.setFontSize(12);
        pdf.text(`Setting: ${comic.setting.substring(0, 150)}...`, 20, 80);
        pdf.text(
            `Characters: ${comic.characters.map((c) => c.name).join(', ')}`,
            20,
            90
        );

        // Add panels
        for (let i = 0; i < comic.panels.length; i++) {
            pdf.addPage();
            const panel = comic.panels[i];

            // Add panel image
            try {
                // Fetch the image from the external URL and convert to base64
                const response = await fetch(panel.imageUrl);
                const blob = await response.blob();

                // Convert blob to base64
                const base64 = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(blob);
                });

                const imgWidth = pageWidth - 40;
                const imgHeight = (imgWidth * 3) / 4; // Maintain aspect ratio

                pdf.addImage(base64, 'PNG', 20, 20, imgWidth, imgHeight);

                // Add caption
                pdf.setFontSize(10);
                pdf.text(`Panel ${panel.number}: ${panel.scene}`, 20, imgHeight + 30);
                pdf.text(`Tradition: ${panel.tradition}`, 20, imgHeight + 40);
            } catch (error) {
                console.error(`Error adding panel ${i + 1}:`, error);
                // Add error message to PDF
                pdf.setFontSize(12);
                pdf.text(`Error loading panel ${i + 1}`, 20, 100);
            }
        }

        pdf.save(`${comic.title.replace(/\s+/g, '_')}.pdf`);
    };

    const handleDownloadZIP = async () => {
        if (!comic) return;

        const zip = new JSZip();

        for (const panel of comic.panels) {
            try {
                // Convert base64 to blob
                const base64Data = panel.imageUrl.split(',')[1];
                const binaryData = atob(base64Data);
                const arrayBuffer = new ArrayBuffer(binaryData.length);
                const uint8Array = new Uint8Array(arrayBuffer);

                for (let i = 0; i < binaryData.length; i++) {
                    uint8Array[i] = binaryData.charCodeAt(i);
                }

                zip.file(`panel_${panel.number}.png`, uint8Array);
            } catch (error) {
                console.error(`Error adding panel ${panel.number} to ZIP:`, error);
            }
        }

        const blob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${comic.title.replace(/\s+/g, '_')}.zip`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleDownloadPanel = (panel: any) => {
        const a = document.createElement('a');
        a.href = panel.imageUrl;
        a.download = `panel_${panel.number}.png`;
        a.click();
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
                <div className="mb-8">
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
                <div className="mb-8 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={handleSave}
                        disabled={saved}
                        className={`flex items-center space-x-2 rounded-lg px-6 py-3 font-bold text-white shadow-lg transition-smooth hover:scale-105 ${saved
                            ? 'bg-green-600'
                            : 'bg-gradient-to-r from-desert-gold to-winter-blue'
                            }`}
                    >
                        <Save className="h-5 w-5" />
                        <span>{saved ? 'Saved!' : 'Save to Library'}</span>
                    </button>

                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center space-x-2 rounded-lg bg-red-600 px-6 py-3 font-bold text-white shadow-lg transition-smooth hover:scale-105 hover:bg-red-700"
                    >
                        <Download className="h-5 w-5" />
                        <span>Download PDF</span>
                    </button>

                    <button
                        onClick={handleDownloadZIP}
                        className="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-lg transition-smooth hover:scale-105 hover:bg-blue-700"
                    >
                        <Download className="h-5 w-5" />
                        <span>Download ZIP</span>
                    </button>

                    <button
                        onClick={() => router.push('/library')}
                        className="flex items-center space-x-2 rounded-lg bg-purple-600 px-6 py-3 font-bold text-white shadow-lg transition-smooth hover:scale-105 hover:bg-purple-700"
                    >
                        <LibraryIcon className="h-5 w-5" />
                        <span>View Library</span>
                    </button>
                </div>

                {/* Comic Panels */}
                <div className="mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

                                    {/* Download Button Overlay */}
                                    <button
                                        onClick={() => handleDownloadPanel(panel)}
                                        className="absolute right-2 top-2 rounded-lg bg-black/50 p-2 text-white opacity-0 transition-smooth group-hover:opacity-100"
                                    >
                                        <Download className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="mt-4">
                                    <p className="mb-1 font-bold text-gray-800">
                                        Panel {panel.number}
                                    </p>
                                    <p className="mb-2 text-sm text-gray-600">{panel.scene}</p>
                                    <p className="text-xs text-gray-500">
                                        Tradition: {panel.tradition}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Characters Info */}
                <div className="mx-auto mt-12 max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
                    <h2 className="mb-4 text-2xl font-bold text-gray-800">Characters</h2>
                    <div className="space-y-4">
                        {comic.characters.map((char, index) => (
                            <div key={index} className="border-l-4 border-desert-gold pl-4">
                                <h3 className="font-bold text-gray-800">{char.name}</h3>
                                <p className="text-sm text-gray-600">{char.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
