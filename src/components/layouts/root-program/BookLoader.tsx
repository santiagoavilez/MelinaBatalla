import { Button } from '@components/ui/button';
import { Skeleton } from '@components/ui/skeleton';
import { auth } from '@lib/authStore';
import { useStore } from '@nanostores/react';
import { navigate } from 'astro:transitions/client';
import { PlusIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'

export default function BookLoader({ children }: { children?: React.ReactNode }) {

    const [loaded, setLoaded] = useState(false);
    const clerk = useStore(auth);

    useEffect(() => {
        if (clerk && clerk.loaded) {
            setLoaded(true);
        }
    }, [clerk]);

    if (!loaded) {
        return <Skeleton className="aspect-square w-52 h-14 rounded-lg flex items-center justify-center" />;
    }

    if (loaded && (!clerk?.user || clerk?.user.publicMetadata?.bonus !== 'true')) {
        return (
            <a href='https://docs.google.com/forms/d/e/1FAIpQLSdMmpcMRCmXZThiS6X1UBeApACR0Td9r9EQ3R7Ybd57XyLhBg/viewform' target='_blank' rel='noreferrer noopener' >
                <Button
                    className=" px-2 h-14 bg-blanco group rounded-lg hover:scale-105 transition-transform  border-l-8  border-primary hover:bg-blanco flex justify-between w-full max-w-52 shadow-lg"
                >
                    <span className="text-left leading-5 text-lg grow-0 w-max"
                    >Postularme a reunión </span>
                    <PlusIcon
                        className="bg-primary   rounded-full p-2 w-9 h-9  aspect-square	stroke-negro shadow-2xl shadow-green-700	"
                    />
                </Button>
            </a>

        )
    }
    return (
        <a href='https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3FamKxOLb4ZDHrWSCButl3nr4z9NlAAE-qA0uxX36HJYNrbRMTwQ_sL4sX3P-q7mBxibdk1Wiq?gv=true' target='_blank' rel='noreferrer noopener' >
            <Button
                className=" px-2 h-14 gap-2 bg-blanco group rounded-lg hover:scale-105 transition-transform  border-l-8  border-primary hover:bg-blanco flex justify-between w-full max-w-52 shadow-lg"
            >
                <span className="text-left leading-5 text-lg grow-0 w-max"
                >Agendar Sesión</span>
                <PlusIcon
                    className="bg-primary   rounded-full p-2 w-9 h-9  aspect-square	stroke-negro shadow-2xl shadow-green-700	"
                />
            </Button>
        </a>

    )


}
