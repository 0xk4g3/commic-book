'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Library, Home, Train } from 'lucide-react';

interface HeaderProps {
    currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
    const pathname = usePathname();
    const active = currentPage || pathname;

    return (
        <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-md shadow-soft">
            <nav className="container mx-auto flex items-center justify-between px-4 py-4">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center space-x-2 text-2xl font-bold transition-all duration-300 hover:scale-105 group"
                >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 group-hover:shadow-glow transition-shadow">
                        <Train className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-desert-gold to-winter-blue">
                        Mirbad Express
                    </span>
                </Link>

                {/* Navigation */}
                <div className="flex items-center space-x-4">
                    <Link
                        href="/"
                        className={`flex items-center space-x-2 rounded-lg px-4 py-2 transition-all duration-200 ${active === '/' || active === 'home'
                                ? 'bg-desert-light text-desert-dark shadow-soft'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Home className="h-5 w-5" />
                        <span className="hidden sm:inline">Home</span>
                    </Link>

                    <Link
                        href="/library"
                        className={`flex items-center space-x-2 rounded-lg px-4 py-2 transition-all duration-200 ${active === '/library' || active === 'library'
                                ? 'bg-desert-light text-desert-dark shadow-soft'
                                : 'text-gray-600 hover:bg-gray-100'
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
