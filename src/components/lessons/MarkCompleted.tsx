import { Button } from "@components/ui/button"
import { $lessonsatom, addLessonCompleted, addLessonCompletedTomap, completedLessonsStore } from "@lib/bonusStore"
import { useStore } from "@nanostores/react"
import { navigate } from "astro:transitions/client"
import { Check, MoveLeftIcon, MoveRightIcon } from "lucide-react"
import { Suspense } from "react"

export interface MarkCompletedProps {
    lessonSlug: string
    userId: string
    lessonId: number
    nextLessonSlug?: string | null
    previusLessonSlug?: string | null
    isCompleted: boolean
}





export default function MarkCompleted({ lessonSlug, userId, lessonId, isCompleted }: MarkCompletedProps) {
    const $storeLessons = useStore(completedLessonsStore)
    const isinStore = $storeLessons[lessonId] ? true : false;
    const handleCompleted = async () => {
        addLessonCompleted({ id: lessonId, status: 'completado' });

        addLessonCompletedTomap({ id: lessonId });

        try {

            const res = await fetch('/api/lessons/mark-completed', {
                method: 'POST',
                body: JSON.stringify({
                    lessonId: lessonId,
                    lessonSlug: lessonSlug,
                    userId: userId
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
    const arraylessons = useStore($lessonsatom)
    console.log('isCompleted', isCompleted);
    // go to previus class using the history to go back sumulating the back button
    const handlePreviusClass = async () => {
        let lastAvailable = arraylessons[0].slug
        const lastLessonAvailable = arraylessons.findLast((lesson) => lesson.isCompleted === true);
        if (lastLessonAvailable) {
            lastAvailable = arraylessons[lastLessonAvailable.id + 1]?.slug || lastAvailable;
        }

        console.log('going to back', arraylessons, lastLessonAvailable);

        history.pushState({}, '', `/cursos/root-program/${lastAvailable}`);
        history.pushState({}, '', `/cursos/root-program/${lastAvailable}`);
        history.back();

    }
    const handleNextClass = () => {
        console.log('going to next',arraylessons, arraylessons[lessonId + 1].slug);
        navigate(`/cursos/root-program/${arraylessons[lessonId + 1].slug}`)
    }
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex justify-between w-full px-6 md:px-10 md:max-w-screen-xl" >
                <div >{(lessonId !== 0 || $storeLessons[lessonId - 2]) && <div className="cursor-pointer hover:text-primary" onClick={handlePreviusClass}><MoveLeftIcon /></div>}</div>
                <div >{arraylessons[lessonId - 1]?.isCompleted && (
                    !isCompleted || arraylessons[lessonId-1]?.isCompleted === false ? (
                        <span
                            className="text-sm font-normal inline-flex gap-2 cursor-pointer hover:text-primary" onClick={handleCompleted}>
                            <Check />Marcar como completado
                        </span>
                    ) :
                        <span className="inline-flex gap-2 text-primary">
                            <Check className="" /> Completado
                        </span>)}</div>
                <div > {lessonId !== 5 && (isinStore || $storeLessons[lessonId + 1]) && <div className="cursor-pointer hover:text-primary" onClick={handleNextClass}><MoveRightIcon /> </div>}</div>
            </div>
        </Suspense>
    )
}
