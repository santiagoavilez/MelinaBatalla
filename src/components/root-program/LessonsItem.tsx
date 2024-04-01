import type { ILesson } from 'db/types';
import {  persistentCompletedLessons } from '@lib/bonusStore';
import { useStore } from '@nanostores/react';
import { Check, Circle, LockKeyholeIcon, Play } from 'lucide-react';
import { cn } from '@lib/utils';
import { cva } from 'class-variance-authority';
import { navigate } from 'astro:transitions/client';

interface Props {
    lesson: Pick<ILesson, 'id' | 'name' | 'slug'>;
    slug: string;
}



function LessonsItem({ lesson, slug }: Props) {
    const completedLessonIds = useStore(persistentCompletedLessons);
    // console.log(completedLessonIds); // Verifica que el store se inicialice correctamente
    const isAvailable = lesson.id === 0 ||  !!completedLessonIds?.[lesson.id - 1];
    const isFirts = lesson.id === 0 || lesson.id === 5;
    const canbeViewed = isAvailable || isFirts;

    const variant = cva(" w-full pl-2 py-2   pr-6 flex items-center justify-between gap-2",{
        variants: {
            status: {
                blanco: "bg-blanco rounded-xl z-20 shadow-xl",
                gris: " text-negro/40 rounded-xl z-20   cursor-not-allowed",
                marron: " text-negro/80  hover:bg-blanco hover:shadow-xl transition-all rounded-xl z-20  cursor-pointer",
                yema: " text-negro/80 hover:bg-blanco hover:shadow-xl transition-all  rounded-xl z-20  cursor-pointer",
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
    else if (completedLessonIds?.[lesson.id]?.isCompleted === 'completado') {
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
                if (!canbeViewed || slug === lesson.slug) {
                    e.preventDefault();
                }
                else {
                    navigate(`/cursos/root-program/${lesson.slug}`)

                }
            }}
        >
            <div
                className={`font-medium text-lg flex items-center  justify-between gap-2 `}

            >

                {
                    (!completedLessonIds?.[lesson.id]) ? (
                        canbeViewed ? <Play className=" w-4 fill-negro"  /> : <LockKeyholeIcon className=" w-4" />
                    ) :  (
                        <Check className=" w-4 stroke-yema " />
                    )
                }
                {lesson.id < 4 ? ("Módulo " +(lesson.id+ 1)): lesson.name}


            </div>
        </div>


    );
}

export default LessonsItem;