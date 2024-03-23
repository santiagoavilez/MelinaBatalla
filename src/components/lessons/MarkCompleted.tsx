import { Button } from "@components/ui/button"
import { addLessonCompleted, completedLessonsStore } from "@lib/bonusStore"
import { useStore } from "@nanostores/react"
import { navigate } from "astro:transitions/client"

export interface MarkCompletedProps {
    lessonSlug: string
    userId: string
    lessonId: number
    nextLessonSlug: string | null
}


export default function MarkCompleted({ lessonSlug, userId, nextLessonSlug, lessonId }: MarkCompletedProps) {
    const $storeLessons = useStore(completedLessonsStore)
    const isinStore = $storeLessons[lessonId] ? true : false;
    const handleCompleted = async () => {
        addLessonCompleted({ id: lessonId, status: 'completado' });
        if (nextLessonSlug) {
            navigate(`/cursos/root-program/${nextLessonSlug}`)
        }
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
    return (
        isinStore === false ? <Button onClick={handleCompleted}>Marcar como completo y continuar </Button> : null
    )
}
