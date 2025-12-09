import React, { useState } from 'react';
import { Download, Save, ArrowLeft, ZoomIn, Mail } from 'lucide-react';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import EmailModal from './EmailModal';

const PanelViewer = ({ comic, onBack, onSave }) => {
    const [selectedPanel, setSelectedPanel] = useState(null);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isSendingEmail, setIsSendingEmail] = useState(false);

    // Download individual panel
    const downloadPanel = (panel) => {
        const link = document.createElement('a');
        link.href = panel.imageUrl;
        link.download = `${comic.title.replace(/\s+/g, '_')}_Panel_${panel.number}.png`;
        link.click();
    };

    // Download all panels as ZIP
    const downloadAllAsZip = async () => {
        const zip = new JSZip();

        // Add each panel to the zip
        for (const panel of comic.panels) {
            const response = await fetch(panel.imageUrl);
            const blob = await response.blob();
            zip.file(`Panel_${panel.number}.png`, blob);
        }

        // Generate and download zip
        const content = await zip.generateAsync({ type: 'blob' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = `${comic.title.replace(/\s+/g, '_')}_AllPanels.zip`;
        link.click();
    };

    // Handle sending email
    const handleSendEmail = async (email) => {
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

            // Arabic Title (now supported!)
            pdf.setFontSize(28);
            pdf.setTextColor(180, 83, 9); // Desert Gold
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
                            reader.onloadend = () => resolve(reader.result);
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

        } catch (error) {
            console.error('Email error:', error);
            alert(`Error sending email: ${error.message}`);
        } finally {
            setIsSendingEmail(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={onBack}
                    className="btn-secondary mb-4 inline-flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Create Another Story
                </button>

                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                        {comic.title}
                    </h2>
                    <p className="text-2xl font-amiri text-gray-700 arabic-text mb-4">
                        {comic.titleAr}
                    </p>
                    <p className="text-gray-600">
                        Created: {new Date(comic.createdAt).toLocaleDateString()} • Value: {comic.valueId}
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                <button
                    onClick={onSave}
                    className="btn-primary inline-flex items-center gap-2"
                >
                    <Save className="w-5 h-5" />
                    Save to Library
                </button>

                <button
                    onClick={() => setIsEmailModalOpen(true)}
                    className="btn-secondary inline-flex items-center gap-2"
                >
                    <Mail className="w-5 h-5" />
                    Send to Email
                </button>
            </div>

            {/* Comic Panels Grid */}
            <div className="comic-grid max-w-6xl mx-auto">
                {comic.panels.map((panel, index) => (
                    <div
                        key={index}
                        className="comic-panel animate-panel-reveal cursor-pointer"
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={() => setSelectedPanel(panel)}
                    >


                        {/* Panel Image */}
                        <img
                            src={panel.imageUrl}
                            alt={`Panel ${panel.number}: ${panel.scene}`}
                            className="w-full h-full object-cover"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                            <ZoomIn className="w-12 h-12 text-white" />
                        </div>

                        {/* Download Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                downloadPanel(panel);
                            }}
                            className="absolute bottom-4 right-4 bg-white text-winter-blue p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                            aria-label={`Download panel ${panel.number}`}
                        >
                            <Download className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Character Info */}
            <div className="mt-12 max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-winter-blue mb-4">Story Characters</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {comic.characters.map((char, index) => (
                        <div key={index} className="p-4 bg-uae-ivory rounded-lg">
                            <h4 className="font-bold text-lg text-desert-gold mb-2">{char.name}</h4>
                            <p className="text-gray-700 text-sm">{char.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Panel Details */}
            <div className="mt-8 max-w-4xl mx-auto bg-gradient-to-br from-winter-blue to-desert-gold text-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold mb-4">Panel Scenes</h3>
                <div className="space-y-3">
                    {comic.panels.map((panel, index) => (
                        <div key={index} className="bg-white bg-opacity-20 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-8 h-8 bg-white text-winter-blue rounded-full flex items-center justify-center font-bold">
                                    {panel.number}
                                </span>
                                <div>
                                    <p className="font-semibold mb-1">{panel.scene}</p>
                                    <p className="text-sm opacity-90">UAE Tradition: {panel.tradition}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedPanel && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedPanel(null)}
                >
                    <div className="max-w-4xl w-full">
                        <div className="relative">
                            <img
                                src={selectedPanel.imageUrl}
                                alt={`Panel ${selectedPanel.number}`}
                                className="w-full rounded-lg shadow-2xl"
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedPanel(null);
                                }}
                                className="absolute top-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-lg font-bold hover:bg-gray-200"
                            >
                                ✕ Close
                            </button>
                            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg">
                                <p className="font-bold">Panel {selectedPanel.number}</p>
                                <p className="text-sm">{selectedPanel.scene}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Email Modal */}
            <EmailModal
                isOpen={isEmailModalOpen}
                onClose={() => setIsEmailModalOpen(false)}
                onSend={handleSendEmail}
                isSending={isSendingEmail}
            />
        </div>
    );
};

export default PanelViewer;
