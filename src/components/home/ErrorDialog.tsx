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
                    <DialogTitle className='text-2xl text-left leading-8'>Ups, ha ocurrido un error!</DialogTitle>
                </DialogHeader>
                <div className=''>Ha ocurrido un error desconocido con el servidor, por favor intentá más tarde.
                    <br></br>
                    <br></br>
                    Si persiste el error comunicate a <a className='font-semibold' href='mailto:equipo@melinabatalla.com?subject=E-book gratuito'>equipo@melinabatalla.com</a>
                </div>
                <DialogFooter>
                    <Button className=" font-semibold" onClick={onClose}>Entendido</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
