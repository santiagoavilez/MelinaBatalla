import { Skeleton } from '@components/ui/skeleton';
import { auth } from '@lib/authStore';
import { useStore } from '@nanostores/react';
import React from 'react'

export default function BookLoader({ children }: { children?: React.ReactNode }) {

    const clerk = useStore(auth);
    if (!clerk || !clerk?.loaded) {
        return (
            <Skeleton className="aspect-square w-52 h-14 rounded-lg flex items-center justify-center" />
        )
    }
    return (
        children
    )


}
