import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({
    title = 'Oops! Something went wrong',
    message,
    onRetry = null,
    details = null
}) => {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="error-message">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{title}</h3>
                        <p className="mb-3">{message}</p>

                        {details && (
                            <details className="mb-3">
                                <summary className="cursor-pointer font-semibold text-sm hover:underline">
                                    View technical details
                                </summary>
                                <pre className="mt-2 p-3 bg-red-100 rounded text-xs overflow-x-auto whitespace-pre-wrap">
                                    {details}
                                </pre>
                            </details>
                        )}

                        {onRetry && (
                            <button
                                onClick={onRetry}
                                className="btn-secondary flex items-center gap-2 mt-4"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Try Again
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Helpful Tips */}
            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Troubleshooting Tips:</h4>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li>Check your internet connection</li>
                    <li>Ensure Google Cloud authentication is set up correctly</li>
                    <li>Verify that Vertex AI API is enabled in your project</li>
                    <li>Check the README.md for authentication setup instructions</li>
                </ul>
            </div>
        </div>
    );
};

export default ErrorMessage;
