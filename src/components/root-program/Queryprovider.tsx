import { useEffect } from 'react';
import LessonsItem from './LessonsItem';
import { $courseSlug, $lesonSlug, $lessonsatom,  completedLessonsStore } from '@lib/bonusStore';
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
    children?: JsxChild;

}

const queryClient = new QueryClient()

export default function ListItemsProvider({ slug }: Props) {

    return (
        <QueryClientProvider client={queryClient}>
            <ListItems
                slug={slug} />
        </QueryClientProvider>
    )
}