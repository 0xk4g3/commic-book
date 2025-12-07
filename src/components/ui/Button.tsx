import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                primary:
                    'bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-105 focus-visible:ring-yellow-400',
                secondary:
                    'bg-gradient-to-r from-desert-gold to-winter-blue text-white shadow-lg hover:shadow-xl hover:scale-105 focus-visible:ring-desert-gold',
                outline:
                    'border-2 border-current bg-transparent hover:bg-gray-100 focus-visible:ring-gray-400',
                ghost: 'hover:bg-gray-100 focus-visible:ring-gray-400',
                success:
                    'bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg hover:shadow-xl hover:scale-105 focus-visible:ring-green-400',
                danger:
                    'bg-red-600 text-white shadow-lg hover:bg-red-700 hover:scale-105 focus-visible:ring-red-400',
            },
            size: {
                sm: 'px-4 py-2 text-sm',
                md: 'px-6 py-3 text-base',
                lg: 'px-8 py-4 text-lg',
                xl: 'px-12 py-6 text-xl',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={disabled || loading}
                {...props}
            >
                {loading && (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                )}
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
