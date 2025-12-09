'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Library as LibraryIcon, Mail, Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import { Comic } from '@/types/comic';
import Header from '@/components/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import EmailModal from '@/components/EmailModal';

export default function ViewerPage() {
    const router = useRouter();
    const [comic, setComic] = useState<Comic | null>(null);
    const [saved, setSaved] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isSendingEmail, setIsSendingEmail] = useState(false);

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

    // Handle sending email
    const handleSendEmail = async (email: string) => {
        if (!comic) return;
        setIsSendingEmail(true);
        try {
            // Load custom font for Arabic support
            const fontResponse = await fetch('/fonts/Amiri-Regular.ttf');
            if (!fontResponse.ok) throw new Error('Failed to load font');
            const fontBuffer = await fontResponse.arrayBuffer();
            const fontBase64 = Buffer.from(fontBuffer).toString('base64');

            // Generate PDF
            const pdf = new jsPDF();

            // Add font
            pdf.addFileToVFS('Amiri-Regular.ttf', fontBase64);
            pdf.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
            pdf.setFont('Amiri');

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 20;

            // === COVER PAGE ===
            // Border
            pdf.setLineWidth(1);
            pdf.setDrawColor(30, 58, 138); // Winter blue
            pdf.rect(margin, margin, pageWidth - (margin * 2), pageHeight - (margin * 2));

            // Inner decorative border
            pdf.setLineWidth(0.5);
            pdf.setDrawColor(212, 175, 55); // Gold
            pdf.rect(margin + 2, margin + 2, pageWidth - (margin * 2) - 4, pageHeight - (margin * 2) - 4);

            // Title
            pdf.setFontSize(32);
            pdf.setTextColor(30, 58, 138);
            pdf.text(comic.title, pageWidth / 2, 80, { align: 'center' });

            // Arabic Title
            pdf.setFontSize(28);
            pdf.setTextColor(180, 83, 9); // Desert Gold/Orange
            // Check if titleAr exists and is string
            if (comic.titleAr) {
                pdf.text(comic.titleAr, pageWidth / 2, 100, { align: 'center' });
            }

            // Metadata
            pdf.setFontSize(14);
            pdf.setTextColor(80);
            pdf.text(`Created on: ${new Date(comic.createdAt).toLocaleDateString()}`, pageWidth / 2, 130, { align: 'center' });

            pdf.setFontSize(12);
            pdf.text('A Mirbad Express Original', pageWidth / 2, pageHeight - 40, { align: 'center' });

            // === COMIC PAGES ===

            for (let i = 0; i < comic.panels.length; i++) {
                const panel = comic.panels[i];

                // One Panel Per Page for Premium Layout
                pdf.addPage();

                // Page Border
                pdf.setLineWidth(0.5);
                pdf.setDrawColor(30, 58, 138);
                pdf.rect(margin, margin, pageWidth - (margin * 2), pageHeight - (margin * 2));

                // Prepare image data with Proxy
                let imageData = panel.imageUrl;
                let format = 'PNG';

                if (!panel.imageUrl.startsWith('data:')) {
                    try {
                        const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(panel.imageUrl)}`;
                        const response = await fetch(proxyUrl);
                        if (!response.ok) throw new Error('Proxy fetch failed');

                        const blob = await response.blob();
                        const reader = new FileReader();
                        imageData = await new Promise((resolve) => {
                            reader.onloadend = () => resolve(reader.result as string);
                            reader.readAsDataURL(blob);
                        });
                    } catch (err) {
                        console.error('Failed to fetch image for PDF:', err);
                    }
                }

                if (imageData.startsWith('data:image/')) {
                    format = imageData.substring(11, imageData.indexOf(';')).toUpperCase();
                    if (format === 'JPEG') format = 'JPG';
                }

                // Layout Calculation for Center Alignment
                const imgWidth = 150; // Larger image for single page
                const imgHeight = 150;
                const xPos = (pageWidth - imgWidth) / 2;

                // Approximate vertical center
                // Page Height ~297. Margins 20 top/bottom.
                // Available height 257.
                // Content ~180 (img + text).
                // Top Offset approx margin + 30.
                const contentStartY = margin + 30;

                // Draw Image Border
                pdf.setLineWidth(1.5);
                pdf.setDrawColor(0); // Black
                pdf.rect(xPos - 1, contentStartY - 1, imgWidth + 2, imgHeight + 2);

                try {
                    pdf.addImage(imageData, format, xPos, contentStartY, imgWidth, imgHeight);
                } catch (addImgErr) {
                    pdf.text('[Image Failed]', xPos, contentStartY + 75);
                }

                // Caption
                const textY = contentStartY + imgHeight + 15;
                pdf.setFontSize(14); // Slightly larger text
                pdf.setTextColor(20);
                pdf.setFont('Amiri', 'normal');

                const text = `Panel ${panel.number}: ${panel.scene}`;
                const splitText = pdf.splitTextToSize(text, 160); // Wider text block
                pdf.text(splitText, pageWidth / 2, textY, { align: 'center' });
            }

            // Add page numbers
            const pageCount = pdf.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                pdf.setPage(i);
                pdf.setFontSize(10);
                pdf.setTextColor(100);
                pdf.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 20, pageHeight - margin + 5);
            }

            const pdfBlob = pdf.output('blob');

            // Send to API
            const formData = new FormData();
            formData.append('email', email);
            formData.append('file', pdfBlob, 'comic_book.pdf');

            const response = await fetch('/api/email/send', {
                method: 'POST',
                body: formData,
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const result = await response.json();
                if (response.ok) {
                    alert('Comic sent successfully to your email!');
                    setIsEmailModalOpen(false);
                } else {
                    throw new Error(result.error || 'Failed to send email');
                }
            } else {
                const text = await response.text();
                console.error("Non-JSON Response:", text);
                throw new Error(`Server returned unexpected response (Status: ${response.status}). Check console for details.`);
            }

        } catch (error: any) {
            console.error('Email error:', error);
            alert(`Error sending email: ${error.message}`);
        } finally {
            setIsSendingEmail(false);
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
                        onClick={() => setIsEmailModalOpen(true)}
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
                <EmailModal
                    isOpen={isEmailModalOpen}
                    onClose={() => setIsEmailModalOpen(false)}
                    onSend={handleSendEmail}
                    isSending={isSendingEmail}
                />
            </main>
        </div>
    );
}
