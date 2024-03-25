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
    children?: JsxChild;

}

export default function ListItems({ slug, children }: Props) {


    const lesonarrays = useStore($lessonsatom);
    const lessonsquery = useQuery({
        queryKey: ['lessons'], queryFn: () => {
            return fetch('/api/lessons/lessonscompleted').then(response => {

                // console.log(response);
                return response.json();

            })
                .then((data: {
                    lessons: {
                        isCompleted: boolean;
                        id: number;
                        name: string;
                        slug: string;
                    }[]
                }) => {
                    // console.log(data  );
                    const completedLessonIds = data?.lessons.reduce(
                        (record, lesson) => {
                            if (lesson.isCompleted) {
                                record[lesson.id] = "completado"; // or any other string property of the lesson
                            }
                            return record;
                        },
                        {} as Record<number, string>,
                    );
                    completedLessonsStore.set(completedLessonIds);
                    $lessonsatom.set(data.lessons);
                    return data.lessons;
                });
        },

    })


    // Renderiza los componentes hijos y pasa los datos como props
    return (

        <ul className="flex flex-col gap-3">

            {
                lessonsquery.isLoading ? <Loader2 className={`animate-spin `} /> :


                    lesonarrays?.map((lesson, index) => (
                        <li className="relative z-10" key={lesson.id}>
                            {index !== lesonarrays.length - 1 && (
                                <div className="absolute -z-10 w-full h-3/6 border-l border-negro/20  right-full left-4 -bottom-1/3"></div>
                            )}
                            <LessonsItem lesson={lesson}
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