import React, { useState, useEffect } from 'react';
import { Skeleton } from '@components/ui/skeleton';
import { auth } from '@lib/authStore';
import { useStore } from '@nanostores/react';

export default function ImageHeader({ children }: { children?: React.ReactNode }) {
    const [loaded, setLoaded] = useState(false);
    const clerk = useStore(auth);

    useEffect(() => {
        if (clerk && clerk.loaded) {
            setLoaded(true);
        }
    }, [clerk]);

    if (!loaded) {
        return <Skeleton className="aspect-square w-20 rounded-full flex items-center justify-center" />;
    }

    if (!clerk?.user) {
        return <>{children}</>;
    }

    return (
        <a href="/cursos/root-program" className="w-full">
            {children}
        </a>
    );
}