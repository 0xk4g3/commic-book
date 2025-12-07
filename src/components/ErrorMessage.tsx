'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './ui/Button';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl bg-red-50 border-2 border-red-200 p-6 shadow-lg"
        >
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <div className="rounded-full bg-red-100 p-3">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-red-900 mb-2">Something went wrong</h3>
                    <p className="text-sm text-red-700 mb-4">{message}</p>
                    {onRetry && (
                        <Button onClick={onRetry} variant="danger" size="sm">
                            <RefreshCw className="h-4 w-4" />
                            Try Again
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
