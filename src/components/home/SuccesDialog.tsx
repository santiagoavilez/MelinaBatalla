import { Button } from "@components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@components/ui/dialog"

interface Props {
    open: boolean
    onClose: () => void
}

export default function SuccessDialog({ open, onClose }: Props) {
    return (
        <Dialog open={open} onOpenChange={onClose} >

            <DialogContent className=" w-[calc(90vw)] rounded-lg sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className='text-2xl text-left leading-8'>Ya casi! Revisá tu correo.</DialogTitle>
                </DialogHeader>
                <div >
                    <div className=''> Te acabo de enviar tu E- book gratuito. Buscalo en tu bandeja de entrada.</div>
                    <hr className="opacity-50 border-gray-950 my-3" />
                    <div className=''>
                        <strong className=''> Si no te llega... </strong>
                        <br></br>
                        Revisá tu bandeja de spam o de promociones, lo más seguro es que este ahí.
                        <br></br>
                        <br></br>
                        Si pasados 5min no te llega escribime a <a className='font-semibold' href='mailto:equipo@melinabatalla.com?subject=E-book gratuito'>equipo@melinabatalla.com</a>
                        <br></br>
                        <br></br>
                        <strong>Consejo: </strong>guardá mi dirección en tu lista de contactos para que nunca más se pierdan los correos.
                    </div>
                </div>

                <DialogFooter>
                    <Button className=" font-semibold" onClick={onClose}>Gracias, Meli!</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
