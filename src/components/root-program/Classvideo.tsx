
import { Button } from "@components/ui/button";
import { Skeleton } from "@components/ui/skeleton";
import { auth } from "@lib/authStore";
import { persistentCompletedLessons } from "@lib/bonusStore";
import { useStore } from "@nanostores/react";
import { AlertCircleIcon, } from "lucide-react";
import melinaLogo from "@assets/mblogo-blanco.png";
import { useEffect, useState } from "react";
import { set } from "zod";




export default function Classvideo({ videoId, lessonId }: {
    videoId: string;
    lessonId: number;
}) {

    const lessonsArray = useStore(persistentCompletedLessons);
    const isAvailable = lessonsArray?.[lessonId - 1] || lessonId === 0;
    const clerk = useStore(auth);
    const [isLoading, setIsLoading] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isBlocked, setIsBlocked] = useState(true);
    useEffect(() => {
        if (!!clerk && clerk?.loaded) {
            setIsLoading(false);
            if (clerk.user) {
                setIsSignedIn(true)
            }
        }
        setIsBlocked(isAvailable ? true : false)
    }, [isAvailable, clerk]);




    if (!isBlocked) {
        return <div id="alert-video" className="w-full aspect-video  animate-pulse  bg-marmol rounded-lg">
            <div
                className="w-full md:text-2xl flex md:flex-col gap-2 justify-center text-center items-center h-full p-4 md:px-20"
            >
                <AlertCircleIcon className="text-red-500  w-1/4 h-1/4" />
                Debes completar la leccion anterior para poder ver este video
            </div>
        </div>
    }

    if (isLoading) {
        return (
            <Skeleton className="aspect-video bg-marmol w-full flex items-center justify-center" />
        )
    }

    if (!isSignedIn) {
        return (
            <div className="aspect-video w-full flex items-center justify-center">
                <Button
                    className=""
                    onClick={() => clerk?.openSignIn({
                        afterSignInUrl: "/cursos/root-program",
                        afterSignUpUrl: "/cursos/root-program",
                    })}
                >
                    Iniciar sesión
                </Button>

            </div>
        )
    }



    return (
        <>
            <div
                data-name={"video-iframe"}
                data-lesson-id={lessonId}
                data-video-id={videoId}
                className="w-full relative"
            >
                <iframe className="w-full aspect-video rounded-lg" src={`https://geo.dailymotion.com/player/xt0s0.html?video=${videoId}`} width="100%" height="100%" allowFullScreen title="Dailymotion Video Player" allow="autoplay"> </iframe>

            </div>
        </>
    )
}



