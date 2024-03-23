import {  completedLessonsStore } from "@lib/bonusStore";
import { useStore } from "@nanostores/react";
import { CheckCheckIcon, CheckCircle, CheckCircle2, Circle, Lock, LockKeyholeIcon } from 'lucide-react'

export default function CircleCompletedLesson({ lessonId }: { lessonId: number }) {
  const $storeLessons = useStore(completedLessonsStore)

  const lessonprogress = $storeLessons[lessonId]
  return (
    <>
      {
        !$storeLessons[lessonId] ? (
          <LockKeyholeIcon className=" w-8" />
        ) : (
            <CheckCircle2 className=" w-8 stroke-yema " />
        )
      }
    </>
  )
}
