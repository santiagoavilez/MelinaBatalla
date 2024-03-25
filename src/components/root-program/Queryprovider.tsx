import { useEffect } from 'react';
import LessonsItem from './LessonsItem';
import { $courseSlug, $lesonSlug, $lessons, $lessonsatom, $lessonsmap, completedLessonsStore } from '@lib/bonusStore';
import type { ILesson, ILessonProgress } from 'db/types';
import type { JsxChild } from 'typescript';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import { useStore } from '@nanostores/react';
import ListItems from './ListItems';


interface Props {
    slug: string;
    CourseSlug: string;
    children?: JsxChild;

}

 const queryClient = new QueryClient()

export default function ListItemsProvider({  slug, CourseSlug }: Props) {

    useEffect(() => {
        // Realiza una solicitud al servidor para obtener los datos cuando el componente se monta
        fetch('/api/lessons/lessonscompleted').then(response => {

            // console.log(response);
            return response.json();

        })
            .then((data: {
                lessonscompleted: ILessonProgress[],
                lessons: {
                    isCompleted: boolean;
                    id: number;
                    name: string;
                    slug: string;
                }[],
                map: Map<number, {
                    isCompleted: boolean;
                    id: number;
                    name: string;
                    slug: string;
                }>
            }) => {
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
                console.log(data.lessons);
                $lessonsatom.set(data.lessons);
            });

        return () => {
            $lessonsatom.set([]);
        }
    }, []);



     return (
         <QueryClientProvider client={queryClient}>
             <ListItems
                 CourseSlug={CourseSlug}
                 slug={slug} />
         </QueryClientProvider>
     )
 }