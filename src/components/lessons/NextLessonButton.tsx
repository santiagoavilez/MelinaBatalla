import { navigate } from 'astro:transitions/client'
import { MoveRightIcon } from 'lucide-react'

export default function NextLessonButton({slug}: {slug: string}) {
    const handleNextClass = () => {
        navigate(`/cursos/root-program/${slug}`)
    }
  return (
        <div className="cursor-pointer hover:text-primary" onClick={handleNextClass}><MoveRightIcon /> </div>
  )
}
