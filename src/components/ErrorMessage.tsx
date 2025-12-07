'use client';

import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <div className="mx-auto max-w-md rounded-xl bg-red-50 p-6 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
            <h3 className="mb-2 mt-4 text-lg font-bold text-red-800">Error</h3>
            <p className="mb-4 text-sm text-red-600">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="rounded-lg bg-red-600 px-6 py-2 text-white transition-smooth hover:bg-red-700"
                >
                    Try Again
                </button>
            )}
        </div>
    );
}
