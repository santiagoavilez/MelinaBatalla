import { useEffect } from 'react';
import LessonsItem from './LessonsItem';
import { completedLessonsStore } from '@lib/bonusStore';
import type { ILesson, ILessonProgress } from 'db/types';
import type { JsxChild } from 'typescript';


interface Props {
    lessons: ILesson[];
    slug: string;
    CourseSlug: string;
    userId: string;
    children?: JsxChild;

}

export default function ListItems({ lessons, userId, slug, CourseSlug, children }:Props) {
    useEffect(() => {
        // Realiza una solicitud al servidor para obtener los datos cuando el componente se monta
        fetch('/api/lessons/lessonscompleted').then(response => {

                // console.log(response);
                return response.json();

                })
            .then((data: { lessonscompleted: ILessonProgress[] }) => {
                // console.log(data  );
                if (!data?.lessonscompleted) return;
                const completedLessonIds = data?.lessonscompleted.reduce(
                    (record, lesson) => {
                        record[lesson.lessonId] = "completado"; // or any other string property of the lesson
                        return record;
                    },
                    {} as Record<number, string>,
                );
                // console.log(completedLessonIds);
                completedLessonsStore.set(completedLessonIds);
                completedLessonsStore.get();

            });
    }, []);

    // Renderiza los componentes hijos y pasa los datos como props
    return (
        // <ul className="flex flex-col gap-8 divide-x divide-gray-900">
        //     {lessons.map(lesson => (
        //         <li className='' key={lesson.id}>
        //         <LessonsItem lesson={lesson}
        //             CourseSlug={CourseSlug}
        //             slug={slug} />
        //         </li>
        //     ))}
        // </ul>
        <ul className="flex flex-col gap-3">
            {lessons.map((lesson, index) => (
                <li className="relative z-10" key={lesson.id}>
                    {index !== lessons.length - 1 && (
                        <div className="absolute -z-10 w-full h-3/6 border-l border-negro/20  right-full left-4 -bottom-1/3"></div>
                    )}
                    <LessonsItem lesson={lesson}
                        CourseSlug={CourseSlug}
                        slug={slug} />
                </li>
            ))}
        </ul>
    );
}