import { useStore } from '@nanostores/react';
import { auth } from '../../lib/authStore';
import { Skeleton } from '@components/ui/skeleton';
import { useEffect, useState } from 'react';
import { S } from 'dist/_astro/ErrorDialog.ee203e5b';

export default function BonusDescription() {
    const [loaded, setLoaded] = useState(false);
    const clerk = useStore(auth);

    const user = clerk?.user;

    useEffect(() => {
        if (clerk && clerk.loaded) {
            setLoaded(true);
        }
    }, [clerk]);

    if (!loaded) {
        console.log('no loaded');
        return (
            // <div className="w-full ">
            //     <Skeleton className='bg-marmol bg-clip-content h-1/2  text-transparent' >
            //         Al adquirir el "Potenciador de Resultados", tras completar todos los módulos, obtendrás una reunión exclusiva 1:1, de 15 minutos, con Nazarena Batalla.
            //         </Skeleton>
            //     <Skeleton className="bg-marmol bg-clip-content   h-1/2  text-transparent" >
            //         En esta sesión, recibirás feedback personalizado para aclarar dudas y mejorar tus resultados.
            //     </Skeleton>
            // </div>

            <div role="status" className="space-y-2.5 animate-pulse w-full">
                <div className="flex items-center w-full">
                    <div className="h-4 bg-marmol rounded-full  w-32"></div>
                    <div className="h-4 ms-2 bg-marmol/80 rounded-full dark:bg-gray-600 w-24"></div>
                    <div className="h-4 ms-2 bg-marmol/80 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-1/3">
                    <div className="h-4 bg-marmol rounded-full  w-full"></div>
                    <div className="h-4 ms-2 bg-marmol/80 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-4 ms-2 bg-marmol/80 rounded-full dark:bg-gray-600 w-24"></div>
                </div>

                <span className="sr-only">Loading...</span>
            </div>
        )
    }
    if (!user || user.publicMetadata?.bonus !== 'true') {
        return (
            <div>
                Al adquirir el "Potenciador de Resultados", tras completar todos los módulos, obtendrás una reunión exclusiva 1:1, de 15 minutos, con Nazarena Batalla. En esta sesión, recibirás feedback personalizado para aclarar dudas y mejorar tus resultados.
            </div>
        )
    }


    return (
        <div>
            Como adquiriste el "Potenciador de Resultados", tras completar todos los módulos, obtendrás una reunión exclusiva 1:1, de 15 minutos, con Nazarena Batalla. En esta sesión, recibirás feedback personalizado para aclarar dudas y mejorar tus resultados.
        </div>
    )



}
