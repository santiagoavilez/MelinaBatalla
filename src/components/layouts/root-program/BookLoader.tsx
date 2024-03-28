import { Button } from '@components/ui/button';
import { Skeleton } from '@components/ui/skeleton';
import { auth } from '@lib/authStore';
import { useStore } from '@nanostores/react';
import { PlusIcon } from 'lucide-react';
import React from 'react'

export default function BookLoader({ children }: { children?: React.ReactNode }) {

    const clerk = useStore(auth);
    if (!clerk || !clerk?.loaded) {
        return (
            <Skeleton className="aspect-square w-52 h-14 rounded-lg flex items-center justify-center" />
        )
    }

    if (clerk.loaded && !!clerk && (!clerk.user || clerk?.user.publicMetadata?.bonus !== 'true')) {
        return (
            <Button
                className=" px-2 h-14 bg-blanco group rounded-lg hover:scale-105 transition-transform  border-l-8  border-primary hover:bg-blanco flex justify-between w-full max-w-52 shadow-lg"
            >
                <span className="text-left leading-5 text-lg grow-0 w-max"
                >Postularme a reunión </span>
                <PlusIcon
                    className="bg-primary   rounded-full p-2 w-9 h-9  aspect-square	stroke-negro shadow-2xl shadow-green-700	"
                />
            </Button>
        )
    }
    return (
        <Button
            className=" px-2 h-14 bg-blanco group rounded-lg hover:scale-105 transition-transform  border-l-8  border-primary hover:bg-blanco flex justify-between w-full max-w-52 shadow-lg"
        >
            <span className="text-left leading-5 text-lg grow-0 w-max"
            >Agendar Sesión</span>
            <PlusIcon
                className="bg-primary   rounded-full p-2 w-9 h-9  aspect-square	stroke-negro shadow-2xl shadow-green-700	"
            />
        </Button>
    )


}
