import { $lessonsatom, persistentCompletedLessons } from '@lib/bonusStore'
import { useStore } from '@nanostores/react'
import { navigate } from 'astro:transitions/client'
import { MoveLeftIcon } from 'lucide-react'

export default function PreviusLessonButon({lessonId}: {lessonId: number}) {
    const arraylessons = useStore($lessonsatom)
    const persistCompleted = useStore(persistentCompletedLessons)
    const handlePreviusClass = () => {
        let lastAvailable = arraylessons[0]?.slug
        if (lessonId === 1) {
            navigate(`/cursos/root-program/${lastAvailable}`)
            return
        }
        if (persistCompleted && persistCompleted[lessonId - 2]) {
            console.log('persistCompleted', persistCompleted[lessonId - 2]);
            lastAvailable = arraylessons[lessonId - 1]?.slug
            navigate(`/cursos/root-program/${lastAvailable}`)
            return
        }

        const lastCompletedIndex = persistCompleted ? persistCompleted.length - 1 : -1;
        // Encuentra la primera lección que no esté completada
        let nextLessonSlug;
        if (lastCompletedIndex !== -1 && lastCompletedIndex < arraylessons.length - 1) {
            // Si existe una lección después de la última completada, obtén su slug
            nextLessonSlug = arraylessons[lastCompletedIndex + 1].slug;
        }
        if (nextLessonSlug) {
            lastAvailable = nextLessonSlug;
            // Navega a la siguiente lección usando nextLessonSlug
        }
        navigate(`/cursos/root-program/${lastAvailable}`)


    }
  return (
      <div className="cursor-pointer hover:text-primary" onClick={handlePreviusClass}><MoveLeftIcon /></div>
  )
}
