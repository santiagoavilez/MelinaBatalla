import { Skeleton } from '@components/ui/skeleton';
import { auth } from '@lib/authStore';
import { useStore } from '@nanostores/react';
import { navigate } from 'astro:transitions/client';
import { FileStack } from 'lucide-react';

export default function ImageHeader({ children }: { children?: React.ReactNode }) {

    const clerk = useStore(auth);
    const user = clerk?.user;
    if (!clerk || !clerk?.loaded) {

        return (
            <Skeleton className="rounded-lg h-6  w-[100px] flex items-center justify-center" />
        )
    }
    const handleclick = () => {
        if(!user) return clerk?.openSignIn({
            afterSignInUrl: "/cursos/root-program/recursos",
            afterSignUpUrl: "/cursos/root-program/recursos",
        })
        else navigate("/cursos/root-program/recursos")
    }
    return (
        <div
            onClick={handleclick}
            className="text-left inline-flex gap-2 text-lg leading-6 cursor-pointer"
        >
            <FileStack className=" w-4 " />
            Recursos
        </div>
    )


}