

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import { bonus } from "@lib/bonusStore";
import { useStore } from '@nanostores/react'

export function CartItems() {
    const $bonus = useStore(bonus)

    return (
        <Card>
            <CardHeader>
                <CardContent className="font-medium text-lg   relative ">
                    <div className="flex justify-between">
                        <span>Root Program</span>
                        <span>$17.00</span>
                    </div>
                    <Accordion className='my-4' type="single" value={$bonus ? "item-1" : "" } collapsible>
                        <AccordionItem value="item-1">
                            <AccordionContent className="font-medium text-lg ">
                                <Separator className="my-4" />
                                <div className="flex justify-between">
                                    <span>Potenciador de Resultados</span>
                                    <span>$27.00</span>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="flex justify-between text-xl font-semibold relative">

                        <span >TOTAL:</span>
                        <span className={`${!$bonus ? 'opacity-100 absolute right-0 ' : 'opacity-0  '} transition-opacity ease-in-out delay-150 duration-300`}>{'$17.00'}</span>
                        <span className={`${$bonus === true ? 'opacity-100 absolute right-0' : 'opacity-0 invisible '} transition-opacity ease-in-out delay-150 duration-300`}>{'$44.00'}</span>

                    </div>
                </CardContent>

            </CardHeader>
        </Card>

    )
}