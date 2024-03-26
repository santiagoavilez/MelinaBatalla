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
}





export default function MarkCompleted({ lessonSlug, userId, lessonId }: MarkCompletedProps) {
    const $storeLessons = useStore(completedLessonsStore)
    const isinStore = $storeLessons[lessonId] ? true : false;
    const isfirtsOrbonus = lessonId === 0 || lessonId === 5 ? true : false;
    console.log('isinStore', isinStore);

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

    // go to previus class using the history to go back sumulating the back button
    const handlePreviusClass = async () => {
        let lastAvailable = arraylessons[0]?.slug
        if(lessonId === 1) {
            navigate(`/cursos/root-program/${lastAvailable}`)
            return
        }
        if ($storeLessons[lessonId - 2]) {
            console.log('storeLessons', $storeLessons[lessonId - 2]);
            lastAvailable = arraylessons[lessonId - 1]?.slug
            navigate(`/cursos/root-program/${lastAvailable}`)
            return
        }
        const maxKey = Math.max(...Object.keys($storeLessons).map(Number));
        console.log('maxKey', maxKey);
        // Encuentra la última lección completada con un ID menor que el ID de la lección actual
        const nextLesson = arraylessons[maxKey+1]

        // Encuentra la primera lección que no esté completada

        if (nextLesson) {
            lastAvailable = nextLesson.slug;
        }
        navigate(`/cursos/root-program/${lastAvailable}`)


    }
    const handleNextClass = () => {
        navigate(`/cursos/root-program/${arraylessons[lessonId + 1].slug}`)
    }
    return (

            <div className="flex justify-between w-full px-6 md:px-10 md:max-w-screen-xl" >
                <div >{(lessonId !== 0 || $storeLessons[lessonId - 2]) && <div className="cursor-pointer hover:text-primary" onClick={handlePreviusClass}><MoveLeftIcon /></div>}</div>
                <div >{
                    !isinStore ? (
                        (isfirtsOrbonus || $storeLessons[lessonId - 1]) && <span
                            className="text-sm font-normal inline-flex gap-2 cursor-pointer hover:text-primary" onClick={handleCompleted}>
                            <Check />Marcar como completado
                        </span>
                    ) :
                        <span className="inline-flex gap-2 text-primary">
                            <Check className="" /> Completado
                        </span>}</div>
                <div > {lessonId !== 5 && (isinStore) && <div className="cursor-pointer hover:text-primary" onClick={handleNextClass}><MoveRightIcon /> </div>}</div>
            </div>

    )
}
