import React, { useState } from 'react';
import { Download, Save, ArrowLeft, ZoomIn, FileDown } from 'lucide-react';
import jsPDF from 'jspdf';
import JSZip from 'jszip';

const PanelViewer = ({ comic, onBack, onSave }) => {
    const [selectedPanel, setSelectedPanel] = useState(null);

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

    // Download as PDF
    const downloadAsPDF = async () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;
        const imageWidth = pageWidth - (margin * 2);
        const imageHeight = imageWidth; // Square panels

        // Add title page
        pdf.setFontSize(24);
        pdf.setTextColor(44, 95, 111); // winter-blue
        pdf.text(comic.title, pageWidth / 2, 30, { align: 'center' });

        pdf.setFontSize(14);
        pdf.setTextColor(100, 100, 100);
        pdf.text(`Value: ${comic.valueId}`, pageWidth / 2, 45, { align: 'center' });
        pdf.text(`Created: ${new Date(comic.createdAt).toLocaleDateString()}`, pageWidth / 2, 55, { align: 'center' });

        // Add each panel
        for (let i = 0; i < comic.panels.length; i++) {
            if (i > 0) {
                pdf.addPage();
            } else {
                pdf.addPage();
            }

            const panel = comic.panels[i];

            // Add panel image
            try {
                pdf.addImage(
                    panel.imageUrl,
                    'PNG',
                    margin,
                    margin,
                    imageWidth,
                    imageHeight
                );

                // Add panel number
                pdf.setFontSize(16);
                pdf.setTextColor(201, 169, 97); // desert-gold
                pdf.text(`Panel ${panel.number}`, margin, imageHeight + margin + 10);

                // Add scene description
                pdf.setFontSize(10);
                pdf.setTextColor(60, 60, 60);
                const lines = pdf.splitTextToSize(panel.scene, imageWidth);
                pdf.text(lines, margin, imageHeight + margin + 18);
            } catch (error) {
                console.error(`Error adding panel ${i + 1} to PDF:`, error);
            }
        }

        // Save PDF
        pdf.save(`${comic.title.replace(/\s+/g, '_')}.pdf`);
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
                    onClick={downloadAsPDF}
                    className="btn-secondary inline-flex items-center gap-2"
                >
                    <FileDown className="w-5 h-5" />
                    Download PDF
                </button>
                <button
                    onClick={downloadAllAsZip}
                    className="btn-secondary inline-flex items-center gap-2"
                >
                    <Download className="w-5 h-5" />
                    Download ZIP
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
                        {/* Panel Number */}
                        <div className="comic-panel-number">{panel.number}</div>

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
        </div>
    );
};

export default PanelViewer;
