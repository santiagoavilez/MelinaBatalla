import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { Checkbox } from "@components/ui/checkbox";
import { bonus } from "@lib/bonusStore";
import { useStore } from "@nanostores/react";
import { Loader2 } from "lucide-react";
import { lazy, Suspense } from "react";

const Checkboxx = lazy(() => import('@components/ui/checkbox'))
export function BonusCard() {

    const $bonus = useStore(bonus)
    const setBonus = (value: boolean) => {
        bonus.set(value)
    }

    return (

        <Card className="bg-marmol border-primary border-dashed text-negro ">
            <CardHeader>
                <CardTitle className=" text-left">
                    POTENCIADOR DE RESULTADOS
                </CardTitle>
            </CardHeader>
            <CardContent>
                En este entrenamiento privado, te compartiré como multiplicar las ganancias de tus servicios x2, x3 (Que no te va a llevar más de 30 minutos aplicar).
            </CardContent>
            <CardFooter className="font-semibold text-xl flex-col items-start gap-2">
                <div><span className="text-[#7ED957] pr-2">$27.00</span>
                    <span className="line-through"> $47.00</span>
                </div>
                <div className="items-top flex space-x-2  bg-blanco text-negro p-3  w-full">
                    <Suspense fallback={
                        <Loader2 className="animate-spin" ></Loader2>
                    }>
                        <Checkboxx
                            checked={$bonus}
                            className="w-5 h-5 "
                            value={'check'}
                            aria-label="Bonus"

                            onCheckedChange={setBonus}
                            id="check-bonus" ></Checkboxx>
                    </Suspense>

                    <div className="grid gap-1.5 leading-none">
                        <label
                            id=""
                            htmlFor="check-bonus"
                            className="text-xl  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Si! Quiero Agregar!
                        </label>

                    </div>
                </div>
            </CardFooter>
        </Card>



    )
}

