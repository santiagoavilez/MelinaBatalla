import type { ILesson } from 'db/types';
import { completedLessonsStore, getLessonStatus, isPreviousLessonCompleted } from '@lib/bonusStore';
import { useStore } from '@nanostores/react';
import { Check, CheckCircle2, Circle, LockKeyholeIcon, Play } from 'lucide-react';
import CircleCompletedLesson from './CircleCompletedLesson';
import { cn } from '@lib/utils';
import { cva } from 'class-variance-authority';
import { navigate } from 'astro:transitions/client';
import { useEffect } from 'react';

interface Props {
    lesson: ILesson;
    slug: string;
    CourseSlug: string;
}

function LessonsItem({ lesson, slug, CourseSlug }: Props) {
    const completedLessonIds = useStore(completedLessonsStore);

    // console.log(completedLessonIds); // Verifica que el store se inicialice correctamente
    const isAvailable = lesson.id === 1 || !!completedLessonIds[lesson.id - 1];
    const isFirts = lesson.id === 1 || lesson.id === 6;
    const canbeViewed = isAvailable || isFirts;

    const isDisabled = !isAvailable;
    const variant = cva(" w-full pl-2 py-2   pr-6 flex items-center justify-between gap-2",{
        variants: {
            status: {
                blanco: "bg-blanco rounded-xl z-20 shadow-xl",
                gris: "blanco/30 text-negro/40 rounded-xl z-20   cursor-not-allowed",
                marron: "blanco/80 text-negro/80  hover:blanco rounded-xl z-20  cursor-pointer",
                yema: "blanco/80 text-negro/80 hover:blanco  rounded-xl z-20  cursor-pointer",
            },
        },
        defaultVariants: {
            status: "gris",
        },
    });
    let statusVariant : "blanco" | "gris" | "marron" |"yema"= "gris";
    if (slug === lesson.slug) {
        statusVariant = "blanco";
    }
    else if (completedLessonIds[lesson.id] === 'completado') {
        statusVariant = "yema";
    }
    else if (canbeViewed) {
        statusVariant = "marron";
    }
     else  {
        statusVariant = "gris";
    }
    return (

        <div
            className={cn(variant({ status: statusVariant }))}
            onClick={(e) => {
                console.log("status", lesson.id, isDisabled);
                if (!canbeViewed || slug === lesson.slug) {
                    console.log("No puedes navegar a esta lección ", lesson.id, canbeViewed);
                    e.preventDefault();
                }
                else {
                    console.log("Navegando a la lección ", lesson.id);
                    navigate(`/cursos/${CourseSlug}/${lesson.slug}`)

                }
            }}
        >
            <div
                className={`font-medium text-lg flex items-center  justify-between gap-2 `}

            >
                {/* {slug === lesson.slug ? <Play className=" fill-negro w-[14px]" /> : !isAvailable ? (
                    <LockKeyholeIcon className=" w-8" />
                ) : (
                    <CheckCircle2 className=" w-8 stroke-yema " />
                )} */}
                {
                    !completedLessonIds[lesson.id] ? (
                        canbeViewed ? <Play className=" w-4 fill-negro"  /> : <LockKeyholeIcon className=" w-4" />
                    ) :  (
                        <Check className=" w-4 stroke-yema " />
                    )
                }
                {lesson.id < 5 ? ("Módulo " +lesson.id): lesson.name}


            </div>
        </div>


    );
}

export default LessonsItem;