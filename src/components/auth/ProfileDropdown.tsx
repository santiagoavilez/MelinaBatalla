import { useUser } from "@clerk/clerk-react";
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
export default function ProfileDropdown() {
    const clerk = useStore(auth);
    console.log(clerk);
  return (
      <DropdownMenu modal={false}>
          <DropdownMenuTrigger><Avatar
              className="cursor-pointer"

          >

              <AvatarImage src={'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yZFlkT3VtZjR6ODdIdktYZTVOaG1tVkJSVFYiLCJyaWQiOiJ1c2VyXzJkeEc5S3NNYlNTU2NsUW52SXlweTV4SjBOdSJ9'} />
              <AvatarFallback>
                  <div className="animate-spin rounded-full  border-b-2 border-gray-900"></div>
              </AvatarFallback>
          </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>

  )
}
