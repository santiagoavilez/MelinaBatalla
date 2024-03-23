import { ClerkProvider, RedirectToSignIn, SignOutButton } from "@clerk/clerk-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

import { auth } from "../../lib/authStore";
import { useStore } from "@nanostores/react";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";

export default function ProfileDropdown() {
    const clerk = useStore(auth)
    console.log('clerk', clerk)
    const handleSignOut = async () => {
        clerk?.signOut(
        ).then(() => {
            console.log('signOut')
            window.location.reload()
             Astro.redirect('/iniciar-sesion')
        }).catch((error) => {
            console.log('error', error)
        })
        auth.set(null)
    }


    return (

        <DropdownMenu modal={false}>
            <DropdownMenuTrigger><Avatar
                className="cursor-pointer"
            >
                <AvatarImage src={clerk?.user?.imageUrl} />
                <AvatarFallback>
                    <div className="animate-spin rounded-full  border-b-2 border-gray-900"></div>
                </AvatarFallback>
            </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem >
                    <span className="cursor-pointer" onClick={handleSignOut}>Cerrar sesión</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>


    )
}
