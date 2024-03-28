import { useStore } from '@nanostores/react';
import { auth } from '../../lib/authStore';
import { Skeleton } from '@components/ui/skeleton';

export default function BonusDescription() {
    const clerk = useStore(auth);
    if (clerk === null) {
        return (
            <>
                <Skeleton className='bg-marmol w-full h-6 my-2' />
                <Skeleton className='bg-marmol w-full h-6 my-2' />
                <Skeleton className='bg-marmol w-full h-6 my-2' />
            </>

        )
    }
    if (clerk.loaded && !!clerk && (!clerk.user || clerk?.user.publicMetadata?.bonus !== 'true')) {
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
