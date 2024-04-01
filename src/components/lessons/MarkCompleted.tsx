import useFetchCompletedLessons from "@components/root-program/fetchCompletedLessons"
import { auth } from "@lib/authStore"
import { $lessonsatom, addLessonCompleted, addLessonCompletedTomap, completedLessonsStore, persistentCompletedLessons } from "@lib/bonusStore"
import { useStore } from "@nanostores/react"
import { navigate } from "astro:transitions/client"
import { Check, MoveLeftIcon, MoveRightIcon } from "lucide-react"
import { Suspense, useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"
import NextLessonButton from "./NextLessonButton"
import PreviusLessonButon from "./PreviusLessonButon"
import { confettiAni } from "@lib/utils/confetti"
import { toast } from "sonner"

export interface MarkCompletedProps {
    lessonSlug: string
    lessonId: number
}





export default function MarkCompleted({ lessonSlug,  lessonId }: MarkCompletedProps) {
    useFetchCompletedLessons()
    const arraylessons = useStore($lessonsatom)
    const persistCompleted = useStore(persistentCompletedLessons)


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
            <div className="px-6 md:px-10 md:max-w-screen-xl">
                <Skeleton className='bg-marmol w-full h-4 my-2  ' />
            </div>

        )
    }

    console.log('persistCompleted', persistCompleted);
    const isinStore = persistCompleted && persistCompleted[lessonId] ? true : false;
    const isfirtsOrbonus = lessonId === 0 || lessonId === 5;
    console.log('isinStore', isinStore, isfirtsOrbonus, lessonId === 0 || lessonId === 5 );

    const handleCompleted = async () => {
        const newCompleted = { id: lessonId, isCompleted: 'completado' , slug: lessonSlug}
        addLessonCompleted({ id: lessonId, status: 'completado' });
        confettiAni()
        if(!persistCompleted || persistCompleted.length === 0){
            persistentCompletedLessons.set([newCompleted])
        }
        else{
            persistentCompletedLessons.set([...persistCompleted, newCompleted])
        }
        addLessonCompletedTomap({ id: lessonId });

        try {
            if(!user?.id) return;
            const res = await fetch('/api/lessons/mark-completed', {
                method: 'POST',
                body: JSON.stringify({
                    lessonId: lessonId,
                    lessonSlug: lessonSlug,
                    userId: user?.id
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();

            console.log(data);
            confettiAni()
            confettiAni()
            toast("Event has been created.")
            // setTimeout(() => {
            //     confettiAni().then(() => {
            //         // Do something after the confetti animation
            //     }).catch((err) => {
            //         console.log(err);
            //     });
            // }, 200);

        }
        catch (error) {
            console.error('Error:', error);
        }

    }

    return (

            <div className="flex justify-between w-full px-6 md:px-10 md:max-w-screen-xl" >
                <div >{(lessonId !== 0 || (persistCompleted && persistCompleted[lessonId - 2])) && <PreviusLessonButon lessonId={lessonId} />}</div>
                <div >{
                    !isinStore ? (
                        (isfirtsOrbonus || ( persistCompleted && persistCompleted[lessonId - 1])) && <span
                            className="text-sm font-normal inline-flex gap-2 cursor-pointer hover:text-primary" onClick={handleCompleted}>
                            <Check />Marcar como completado
                        </span>
                    ) :
                        <span className="inline-flex gap-2 text-primary">
                            <Check className="" /> Completado
                        </span>}</div>
            <div > {lessonId !== 5 && (isinStore) && <NextLessonButton slug={arraylessons[lessonId + 1].slug} />}</div>
            </div>

    )
}
