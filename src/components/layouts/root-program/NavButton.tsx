import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@components/ui/sheet'
import { FileStack, InstagramIcon, Menu, PlusIcon } from 'lucide-react'
import { Separator } from '@components/ui/separator'
import { Button } from '@components/ui/button'
import ListItems from '@components/root-program/ListItems'
import type { ILesson } from 'db/types'
import ListItemsProvider from '@components/root-program/Queryprovider'
import nazaPortrait from "@assets/root-program/naza-root-program.png";
import { Image } from "astro:assets";

interface Props {
    children: any;
    slug: string;
}

export default function NavButton({ children, slug }: Props) {
    return (

        <Sheet>
            <SheetTrigger   ><Menu className='w-10' width={32} height={32} /> </SheetTrigger>
            <SheetContent side={'left'} className="w-3/4 max-w-72 p-4 justify-between flex flex-col">
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
                        <Separator className="bg-negro/20 my-2 px-6" />
                        <a href='/cursos/root-program/recursos' className="text-left inline-flex gap-2 text-lg leading-6">
                            <FileStack className=" w-4 " />
                            Recursos
                        </a>
                        <Separator className="bg-negro/20 my-2 " />

                    </div>

                    <div className='max-w-52' >
                        <ListItemsProvider
                            slug={slug}
                        />
                    </div>
                </SheetHeader>


                <SheetFooter>

                    <div className="inline-flex gap-2 my-2 underline">
                        <a href="https://www.instagram.com/nazarena.batalla/">
                            <InstagramIcon className="cursor-pointer" />
                        </a>

                    </div>

                    <Separator className="bg-negro/20 my-2" />
                    <span className="inline-flex gap-2 text-sm"> © 2024 Nazarena Batalla™ </span>
                    <span className="block text-sm"> All Rights Reserved. &nbsp; </span>

                </SheetFooter>
            </SheetContent>

        </Sheet>

    )
}
