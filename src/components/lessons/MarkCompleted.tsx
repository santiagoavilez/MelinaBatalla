import { Button } from "@components/ui/button"
import { addLessonCompleted, completedLessonsStore } from "@lib/bonusStore"
import { useStore } from "@nanostores/react"
import { navigate } from "astro:transitions/client"
import { Check, MoveLeftIcon, MoveRightIcon } from "lucide-react"

export interface MarkCompletedProps {
    lessonSlug: string
    userId: string
    lessonId: number
    nextLessonSlug: string | null
    previusLessonSlug: string | null
}


export default function MarkCompleted({ lessonSlug, userId, nextLessonSlug, lessonId, previusLessonSlug }: MarkCompletedProps) {
    const $storeLessons = useStore(completedLessonsStore)
    const isinStore = $storeLessons[lessonId] ? true : false;
    const handleCompleted = async () => {
        addLessonCompleted({ id: lessonId, status: 'completado' });

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

    // go to previus class using the history to go back sumulating the back button
    const handlePreviusClass = async () => {
        history.pushState({}, '', `/cursos/root-program/${previusLessonSlug}`);
        history.pushState({}, '', `/cursos/root-program/${previusLessonSlug}`);
        history.back();

    }
    const handleNextClass = () => {
        console.log('going to next', nextLessonSlug);
        navigate(`/cursos/root-program/${nextLessonSlug}`)
    }
    return (
        <div className="flex justify-between w-full px-6 md:px-10 md:max-w-screen-xl" >
            <div >{(lessonId !== 1 || $storeLessons[lessonId - 2]) && <div className="cursor-pointer hover:text-primary" onClick={handlePreviusClass}><MoveLeftIcon /></div>}</div>
            <div >{
                isinStore === false ? (
                    <span
                        className="text-sm font-normal inline-flex gap-2 cursor-pointer hover:text-primary" onClick={handleCompleted}>
                        <Check />Marcar como completado
                    </span>
                ) :
                    <span className="inline-flex gap-2 text-primary">
                        <Check className="" /> Completado
                    </span>}</div>
            <div > {lessonId !== 6 && (isinStore || $storeLessons[lessonId + 1]) && <div className="cursor-pointer hover:text-primary" onClick={handleNextClass}><MoveRightIcon /> </div>}</div>
        </div>
    )
}
