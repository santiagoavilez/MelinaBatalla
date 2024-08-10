import { SheetContent, SheetTrigger } from "@components/ui/sheet";
import { Menu, Sheet } from "lucide-react";

const navigationTextLinks: { label: string; href: string }[] = [
    { label: "Inicio", href: "/" },
    { label: "Sobre mi", href: "/sobre-mi/" },

    { label: "Servicios", href: "/servicios/" },
    { label: "Contacto", href: "/contacto/" },
];

const learningTextLinks: { label: string; href: string }[] = [
    { label: "Entrenamientos gratuitos", href: "/entrenamientos-gratuitos" },
    { label: "E-books", href: "/e-books/" },
    { label: "Formaciones online", href: "/formaciones-online/" },
    { label: "Podcast", href: "/podcast/" },
    // { label: 'Eventos y conferencias', href: '/speaker' }
];

export default function BurgerMenu() {

    return (
        <Sheet>
            <SheetTrigger   >
                <Menu className='w-10' width={32} height={32} />
            </SheetTrigger>
            <SheetContent>

            </SheetContent>
        </Sheet>
    )
}