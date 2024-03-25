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
import { Loader2 } from 'lucide-react';


interface Props {
    slug: string;
    CourseSlug: string;
    children?: JsxChild;

}

export default function ListItems({ slug, CourseSlug, children }: Props) {

    // $lesonSlug.set({ slug: slug,  courseSlug: CourseSlug});
    // const slugs = useStore($lesonSlug);

    // useEffect(() => {
    //     // Realiza una solicitud al servidor para obtener los datos cuando el componente se monta
    //     fetch('/api/lessons/lessonscompleted').then(response => {

    //         // console.log(response);
    //         return response.json();

    //     })
    //         .then((data: {
    //             lessonscompleted: ILessonProgress[],
    //             lessons: {
    //                 isCompleted: boolean;
    //                 id: number;
    //                 name: string;
    //                 slug: string;
    //             }[],
    //             map: Map<number, {
    //                 isCompleted: boolean;
    //                 id: number;
    //                 name: string;
    //                 slug: string;
    //             }>
    //         }) => {
    //             // console.log(data  );
    //             if (!data?.lessonscompleted) return;
    //             const completedLessonIds = data?.lessonscompleted.reduce(
    //                 (record, lesson) => {
    //                     record[lesson.lessonId] = "completado"; // or any other string property of the lesson
    //                     return record;
    //                 },
    //                 {} as Record<number, string>,
    //             );
    //             // console.log(completedLessonIds);
    //             completedLessonsStore.set(completedLessonIds);
    //             ;

    //             $lessonsatom.set( data.lessons );
    //         });

    //         return () => {
    //             $lessonsatom.set([]);
    //         }
    // }, []);

    // const getLessons = async () => {
    //     const response = await fetch('/api/lessons/lessons-progress');
    //     const data = await response.json();
    //     return data.lessons;
    // }
    const lesonarrays = useStore($lessonsatom);
    console.log(lesonarrays);
    const lessonsquery = useQuery({
        queryKey: ['lessons'], queryFn: () => {
            return fetch('/api/lessons/lessonscompleted').then(response => {

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
                    return data.lessons;
                });
        }
    })
    console.log(lessonsquery);

    // Renderiza los componentes hijos y pasa los datos como props
    return (

        <ul className="flex flex-col gap-3">
            {/* {lessons.map((lesson, index) => (
                <li className="relative z-10" key={lesson.id}>
                    {index !== lessons.length - 1 && (
                        <div className="absolute -z-10 w-full h-3/6 border-l border-negro/20  right-full left-4 -bottom-1/3"></div>
                    )}
                    <LessonsItem lesson={lesson}
                        CourseSlug={CourseSlug}
                        slug={slug} />
                </li>
            ))} */}
            {
                lessonsquery.isLoading ? <Loader2 className={`animate-spin `} /> :


                    lesonarrays?.map((lesson, index) => (
                        <li className="relative z-10" key={lesson.id}>
                            {index !== lesonarrays.length - 1 && (
                                <div className="absolute -z-10 w-full h-3/6 border-l border-negro/20  right-full left-4 -bottom-1/3"></div>
                            )}
                            <LessonsItem lesson={lesson}
                                CourseSlug={CourseSlug}
                                slug={slug} />
                        </li>
                    ))
            }
        </ul>
    );
}

// const queryClient = new QueryClient()

// export default function ListItemsProvider() {
//     return (
//         // Provide the client to your App
//         <QueryClientProvider client={queryClient}>
//             <ListItems />
//         </QueryClientProvider>
//     )
// }