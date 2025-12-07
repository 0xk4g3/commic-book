'use client';

export default function LoadingSpinner({ message = 'Loading...' }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="spinner h-16 w-16" />
            <p className="mt-4 text-lg text-gray-600">{message}</p>
        </div>
    );
}
