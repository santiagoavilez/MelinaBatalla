

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import { bonus } from "@lib/bonusStore";
import { useStore } from '@nanostores/react'

export function CartItems() {
    const $bonus = useStore(bonus)

    return (

        <Card >
            <CardHeader>
                <CardContent className="font-medium text-lg  p-2 relative ">
                    <div className="flex justify-between" >
                        <span className="grow w-full min-[430px]:w-auto" >Root Program</span>

                            <span className="grow-0 inline-block space ">$55.00 USD</span>

                    </div>
                    <Accordion className='my-3.5' type="single" value={$bonus ? "item-1" : ""} >
                        <AccordionItem value="item-1" className=''>
                            <AccordionContent className="pb-1.5 font-medium text-lg -mt-1 ">
                                <div className="flex justify-between">
                                    <span>Potenciador de resultados</span>

                                        <span>$13.00 USD</span>

                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <div className="flex justify-between text-xl font-semibold relative">

                        <span >TOTAL:</span>
                        <span className={`${!$bonus ? 'opacity-100 absolute right-0 ' : 'opacity-0  '} transition-opacity ease-in-out delay-150 duration-300`}>{'$55.00 USD'}</span>
                        <span className={`${$bonus === true ? 'opacity-100 absolute right-0' : 'opacity-0 invisible '} transition-opacity ease-in-out delay-150 duration-300`}>{'$30.00 USD'}</span>

                    </div>
                </CardContent>

            </CardHeader>
        </Card>

    )
}