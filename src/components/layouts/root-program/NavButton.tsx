import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@components/ui/sheet'
import { Menu, PlusIcon } from 'lucide-react'
import { Separator } from '@components/ui/separator'
import { Button } from '@components/ui/button'
import ListItems from '@components/root-program/ListItems'
import type { ILesson } from 'db/types'

interface Props {
    children: any;
    "client:load": true;
    slug: string;
    CourseSlug: string
    userId: string
    lessons: ILesson[]
}

export default function NavButton({ children, slug, CourseSlug, userId, lessons }: Props) {
    return (

        <Sheet>
            <SheetTrigger   ><Menu className='w-10' width={32} height={32} /> </SheetTrigger>
            <SheetContent side={'left'} className="w-3/4 max-w-72 p-4">
                <SheetHeader className='pb-4'>
                    <div className="flex flex-col items-start w-full gap-2 ">

                        {children}
                        <SheetTitle className="text-left text-xl leading-6 pb-3">
                            Nazarena Batalla Mentora de Emprendedoras
                        </SheetTitle>
                        <Button
                            className=" px-2 h-14 bg-blanco group rounded-lg hover:scale-105 transition-transform  border-l-8  border-primary hover:bg-blanco flex justify-between w-full max-w-52 shadow-lg"
                        >
                            <span className="text-left leading-5 text-lg grow-0 w-max">Agendar Sesion</span>
                            <PlusIcon
                                className="bg-primary   rounded-full p-2 w-10 h-10  aspect-square	stroke-negro shadow-2xl shadow-green-700	"
                            />
                        </Button>

                    </div>
                </SheetHeader>
                <Separator className="bg-negro/20 my-4 " />
                <div className='max-w-52' >
                    <ListItems
                        userId={userId as string}
                        lessons={lessons}
                        CourseSlug={CourseSlug}
                        slug={slug}
                    />
                </div>

            </SheetContent>
        </Sheet>

    )
}
