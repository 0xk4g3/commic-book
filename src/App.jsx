import React, { useState } from 'react';
import Header from './components/Header';
import ValueSelector from './components/ValueSelector';
import ComicGenerator from './components/ComicGenerator';
import PanelViewer from './components/PanelViewer';
import StoryLibrary, { saveComicToLibrary } from './components/StoryLibrary';
import './styles/main.css';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedValue, setSelectedValue] = useState(null);
    const [currentComic, setCurrentComic] = useState(null);

    const handleValueSelect = (valueId) => {
        setSelectedValue(valueId);
        setCurrentPage('generator');
    };

    const handleComicGenerated = (comic) => {
        setCurrentComic(comic);
        setCurrentPage('viewer');
    };

    const handleSaveComic = () => {
        if (currentComic) {
            const saved = saveComicToLibrary(currentComic);
            if (saved) {
                alert('Comic saved to library!');
            }
        }
    };

    const handleBackToHome = () => {
        setCurrentPage('home');
        setSelectedValue(null);
    };

    const handleBackToGenerator = () => {
        setCurrentPage('generator');
    };

    const handleViewLibrary = () => {
        setCurrentPage('library');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-desert-light via-winter-light to-ivory">
            <Header
                currentPage={currentPage}
                onNavigate={(page) => setCurrentPage(page)}
            />

            <main className="container mx-auto px-4 py-8">
                {currentPage === 'home' && (
                    <ValueSelector onValueSelect={handleValueSelect} />
                )}

                {currentPage === 'generator' && (
                    <ComicGenerator
                        selectedValue={selectedValue}
                        onComicGenerated={handleComicGenerated}
                        onBack={handleBackToHome}
                    />
                )}

                {currentPage === 'viewer' && currentComic && (
                    <PanelViewer
                        comic={currentComic}
                        onSave={handleSaveComic}
                        onBack={handleBackToGenerator}
                        onViewLibrary={handleViewLibrary}
                    />
                )}

                {currentPage === 'library' && (
                    <StoryLibrary onBack={handleBackToHome} />
                )}
            </main>

            <footer className="mt-16 py-8 text-center text-gray-600 border-t border-gray-200">
                <p className="text-sm">
                    UAE Winter Tales © 2024 | Educational Comic Book Generator
                </p>
                <p className="text-xs mt-2">
                    Celebrating UAE traditions and values through storytelling
                </p>
            </footer>
        </div>
    );
}

export default App;
