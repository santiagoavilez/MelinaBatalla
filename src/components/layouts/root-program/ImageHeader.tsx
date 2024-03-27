import { Skeleton } from '@components/ui/skeleton';
import { auth } from '@lib/authStore';
import { useStore } from '@nanostores/react';
import React from 'react'

export default function ImageHeader({ children }: { children?: React.ReactNode }) {

    const clerk = useStore(auth);
    if (!clerk || !clerk?.loaded) {
        console.log('loading', clerk);
        return (
            <Skeleton className="aspect-square w-20 rounded-full flex items-center justify-center" />
        )
    }

    console.log('clerk', clerk)
    return (
        children
    )


}
