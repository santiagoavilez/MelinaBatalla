import { Skeleton } from '@components/ui/skeleton';
import { auth } from '@lib/authStore';
import { useStore } from '@nanostores/react';
import { navigate } from 'astro:transitions/client';
import { FileStack } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Resources({ children }: { children?: React.ReactNode }) {
    const [loaded, setLoaded] = useState(false);

    const clerk = useStore(auth);
    const user = clerk?.user;

    useEffect(() => {
        if (clerk && clerk.loaded) {
            setLoaded(true);
        }
    }, [clerk]);
    if (!loaded) {

        return (
            <Skeleton className="rounded-lg h-6  w-[100px] flex items-center justify-center" />
        )
    }
    const handleClick = () => {
        console.log("click recurso")
        if(!user) return clerk?.openSignIn({
            afterSignInUrl: "/cursos/root-program/recursos",
            afterSignUpUrl: "/cursos/root-program/recursos",
        })
        else navigate("/cursos/root-program/recursos")
    }
    return (
        <div
            onClick={handleClick}
            className="text-left inline-flex gap-2 text-lg leading-6 cursor-pointer"
        >
            <FileStack className=" w-4 " />
            Recursos
        </div>
    )


}