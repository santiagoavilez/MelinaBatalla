import useFetchCompletedLessons from "@components/root-program/fetchCompletedLessons"
import { auth } from "@lib/authStore"
import { $lessonsatom, addLessonCompleted, addLessonCompletedTomap, completedLessonsStore, persistentCompletedLessons } from "@lib/bonusStore"
import { useStore } from "@nanostores/react"
import { navigate } from "astro:transitions/client"
import { Check, MoveLeftIcon, MoveRightIcon } from "lucide-react"
import { Suspense } from "react"
import { Skeleton } from "../ui/skeleton"

export interface MarkCompletedProps {
    lessonSlug: string
    lessonId: number
}





export default function MarkCompleted({ lessonSlug,  lessonId }: MarkCompletedProps) {
    useFetchCompletedLessons()
    const persistCompleted = useStore(persistentCompletedLessons)
    const clerk = useStore(auth);
    const arraylessons = useStore($lessonsatom)
    const user = clerk?.user;
    if (clerk === null) {
        console.log('clerk', clerk)
        return (
            <div className="px-6 md:px-10 md:max-w-screen-xl">
                <Skeleton className='bg-marmol w-full h-6  ' />
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


        }
        catch (error) {
            console.error('Error:', error);
        }

    }

    // go to previus class using the history to go back sumulating the back button
    const handlePreviusClass = async () => {
        let lastAvailable = arraylessons[0]?.slug
        if(lessonId === 1) {
            navigate(`/cursos/root-program/${lastAvailable}`)
            return
        }
        if ( persistCompleted && persistCompleted[lessonId - 2]) {
            console.log('persistCompleted', persistCompleted[lessonId - 2]);
            lastAvailable = arraylessons[lessonId - 1]?.slug
            navigate(`/cursos/root-program/${lastAvailable}`)
            return
        }
        const sortedLessons = [...persistCompleted!]?.sort((a, b) => a.id - b.id);
        console.log('sortedLessons', sortedLessons);
        const nextLesson = sortedLessons.find(lesson => !lesson.isCompleted);


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
                <div >{(lessonId !== 0 || (persistCompleted && persistCompleted[lessonId - 2])) && <div className="cursor-pointer hover:text-primary" onClick={handlePreviusClass}><MoveLeftIcon /></div>}</div>
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
                <div > {lessonId !== 5 && (isinStore) && <div className="cursor-pointer hover:text-primary" onClick={handleNextClass}><MoveRightIcon /> </div>}</div>
            </div>

    )
}
