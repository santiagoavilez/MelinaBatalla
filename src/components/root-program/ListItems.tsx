import LessonsItem from './LessonsItem';
import {  $lessonsatom } from '@lib/bonusStore';
import type { JsxChild } from 'typescript';

import { useStore } from '@nanostores/react';
import { auth } from '@lib/authStore';


interface Props {
    slug: string;
    children?: JsxChild;

}

export default function ListItems({ slug, children }: Props) {


    const lesonarrays = useStore($lessonsatom);
    const clerk = useStore(auth);

    const user = clerk?.user;
    return (

        <ul className="flex flex-col gap-3">

            {
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