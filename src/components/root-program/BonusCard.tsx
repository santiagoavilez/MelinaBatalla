import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { Checkbox } from "@components/ui/checkbox";
import { bonus } from "@lib/bonusStore";
import { useStore } from "@nanostores/react";

export function BonusCard() {

    const $bonus = useStore(bonus)
    const setBonus = (value: boolean) => {
        bonus.set(value)
    }

    return (
        <Card className="bg-marmol border-primary border-dashed text-negro">
            <CardHeader>
                <CardTitle className=" text-left">
                    POTENCIADOR DE RESULTADOS
                </CardTitle>
            </CardHeader>
            <CardContent>
                En este entrenamiento privado, te compartiré como evitar la
                principal razón de fracaso de porque las/os emprendedoras/es no
                venden sus servicios como desean. Y como multiplicar tus ganancias
                x2, x3 o hasta por x4. (Que no te va a llevar más de 30 minutos
                aplicar).
            </CardContent>
            <CardFooter className="font-semibold flex-col items-start gap-2">
                <div><span className="text-[#7ED957] pr-2">$27.00</span>
                    <span className="line-through"> $47.00</span>
                </div>
                <div className="items-top flex space-x-2 bg-blanco text-negro p-2  w-full">
                    <Checkbox
                        checked={$bonus}
                        onCheckedChange={setBonus}
                         id="terms1" />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Si! Quiero Agregar!
                        </label>

                    </div>
                </div>
            </CardFooter>
        </Card>

    )
}