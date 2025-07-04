import { extendVariants, Skeleton as NextSkeleton } from '@heroui/react';

const Skeleton = extendVariants(NextSkeleton, {
    variants: {
        color: {
            default: {
                base: 'bg-default-50 before:via-default-100 rounded-xl before:border-none',
            },
        },
    },
    defaultVariants: {
        color: 'default',
    },
});

export default Skeleton;
