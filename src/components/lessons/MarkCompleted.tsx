import useFetchCompletedLessons from "@components/root-program/fetchCompletedLessons"
import { auth } from "@lib/authStore"
import { $lessonsatom,   persistentCompletedLessons } from "@lib/bonusStore"
import { useStore } from "@nanostores/react"
import { Check  } from "lucide-react"
import {  useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"
import NextLessonButton from "./NextLessonButton"
import PreviusLessonButon from "./PreviusLessonButon"
import { useToast } from "@components/ui/use-toast"
import { getFraseAleatoria, getTituloAleatorio } from "@lib/utils/motivationToast"

export interface MarkCompletedProps {
    lessonSlug: string
    lessonId: number
}





export default function MarkCompleted({ lessonSlug, lessonId }: MarkCompletedProps) {
    useFetchCompletedLessons()
    const { toast } = useToast()

    const arraylessons = useStore($lessonsatom)

    const persistCompleted = useStore(persistentCompletedLessons)
    const isinStore = persistCompleted && persistCompleted[lessonId] ? true : false;
    const isfirtsOrbonus = lessonId === 0 || lessonId === 5;

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
                <Skeleton className='bg-marmol w-full h-8 my-2  ' />
            </div>

        )
    }



    const handleCompleted = async () => {
        try {
            toast({
                title: getTituloAleatorio(),
                description: getFraseAleatoria(),
            })
            const newCompleted = { id: lessonId, isCompleted: 'completado', slug: lessonSlug }

            if (!persistCompleted || persistCompleted.length === 0) {
                persistentCompletedLessons.set([newCompleted])
            }
            else {
                persistentCompletedLessons.set([...persistCompleted, newCompleted])
            }
            if (!user?.id) return;
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


        }
        catch (error) {
            console.error('Error:', error);
        }

    }

    return (
        <>
        <div className="flex justify-between w-full px-6 md:px-10 md:max-w-screen-xl" >
            <div >{(lessonId !== 0 || (persistCompleted && persistCompleted[lessonId - 2])) && <PreviusLessonButon lessonId={lessonId} />}</div>
            <div >{
                !isinStore ? (
                    (isfirtsOrbonus || (persistCompleted && persistCompleted[lessonId - 1])) && <span
                            className="text-sm font-normal inline-flex gap-2 cursor-pointer hover:text-primary" onClick={handleCompleted}>
                        <Check />Marcar como completado
                    </span>
                ) :
                    <span className="inline-flex gap-2 text-primary">
                        <Check className="" /> Completado
                    </span>}</div>
            <div > {lessonId !== 5 && (isinStore) && <NextLessonButton slug={arraylessons[lessonId + 1].slug} />}</div>

        </div>

        </>

    )
}
