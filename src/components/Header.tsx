'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Library, Home } from 'lucide-react';

interface HeaderProps {
    currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
    const pathname = usePathname();
    const active = currentPage || pathname;

    return (
        <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-md">
            <nav className="container mx-auto flex items-center justify-between px-4 py-4">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center space-x-2 text-2xl font-bold gradient-text transition-smooth hover:scale-105"
                >
                    <span>🦅</span>
                    <span>UAE Winter Tales</span>
                </Link>

                {/* Navigation */}
                <div className="flex items-center space-x-4">
                    <Link
                        href="/"
                        className={`flex items-center space-x-2 rounded-lg px-4 py-2 transition-smooth hover:bg-desert-light ${active === '/' || active === 'home'
                                ? 'bg-desert-light text-desert-dark'
                                : 'text-gray-600'
                            }`}
                    >
                        <Home className="h-5 w-5" />
                        <span className="hidden sm:inline">Home</span>
                    </Link>

                    <Link
                        href="/library"
                        className={`flex items-center space-x-2 rounded-lg px-4 py-2 transition-smooth hover:bg-desert-light ${active === '/library' || active === 'library'
                                ? 'bg-desert-light text-desert-dark'
                                : 'text-gray-600'
                            }`}
                    >
                        <Library className="h-5 w-5" />
                        <span className="hidden sm:inline">Library</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
