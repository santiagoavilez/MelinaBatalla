import LessonsItem from './LessonsItem';
import { $lessonsatom } from '@lib/bonusStore';

import { useStore } from '@nanostores/react';
import { auth } from '@lib/authStore';
import React, { useEffect, useState } from 'react';
import { Button } from '@components/ui/button';
import { Loader2 } from 'lucide-react';


interface Props {
    slug: string;
    children?: React.ReactNode

}

export default function ListItems({ slug }: Props) {


    const lesonarrays = useStore($lessonsatom);
    const clerk = useStore(auth);
    const user = clerk?.user;
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        if (clerk && clerk.loaded) {
            setLoaded(true);
        }
    }, [clerk]);

    let skeletons = []
    for (let i = 0; i < 6; i++) {
        skeletons.push(i)
    }

    if (!loaded) {
        return (
            <ul className="flex flex-col gap-3">
            {skeletons.map((_, i) => (
                <li className="relative z-10 max-w-52" key={i}>
                    {i !== skeletons.length - 1 && (
                        <div className="absolute -z-10 w-full h-3/6 border-l border-negro/20 right-full left-4 -bottom-1/3"></div>
                    )}
                    <div className=" animate-pulse rounded-md  bg-marmol md:bg-blanco/70 w-full pl-2 my-2   pr-6 flex items-center justify-between gap-2" >
                        <div
                            className={`font-medium text-lg flex items-center  justify-between gap-2 `}

                        >
                            <Loader2 className='animate-spin w-4' />{i < 4 ? `Módulo ${i + 1}` :
                                i === 4 && 'Salvavidas' || i === 5 && 'Potenciador'
                            }

                        </div>
                    </div>
                </li>
            ))}
            </ul>
        )

    }
    const handleSingIn = () => {

        const status = "__clerk_status";
        const statusParam = new URL(
            window.location.href,
        ).searchParams.get(status);

        const param = "__clerk_ticket";
        const ticket = new URL(
            window.location.href,
        ).searchParams.get(param);


        const signInCard = document.getElementById(
            "auth-sign-in-card",
        ) as HTMLDivElement;

        if (ticket || statusParam === "sign_up") {
            console.log(ticket);

            clerk?.openSignUp({
                afterSignInUrl: "/cursos/root-program",
                afterSignUpUrl: "/cursos/root-program",
                routing: "virtual",
            });
        } else {
                clerk?.openSignIn({
                    afterSignInUrl: "/cursos/root-program",
                    afterSignUpUrl: "/cursos/root-program",
                    routing: "virtual",
                });

        }
}

    return (

        <ul className="flex flex-col gap-3">
            {
                clerk?.loaded && user ? lesonarrays?.map((lesson, index) => (
                    <li className="relative z-10 max-w-52" key={lesson.id}>
                        {index !== lesonarrays.length - 1 && (
                            <div className="absolute -z-10 w-full h-3/6 border-l border-negro/20 right-full left-4 -bottom-1/3"></div>
                        )}
                        <LessonsItem lesson={lesson}
                            slug={slug} />
                    </li>
                ))
                    : <Button id='sign-in' onClick={handleSingIn}>
                        Iniciar sesión
                    </Button>
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