import { Skeleton } from "@components/ui/skeleton";
import { auth } from "@lib/authStore";
import { useStore } from "@nanostores/react";

export default function DisplayUserName() {

    const clerk = useStore(auth);
    const user = clerk?.user;
    if (!clerk ||( clerk && !clerk.loaded)) {
        console.log('loading', clerk);
        return (<>
            <span className=" animate-pulse rounded-md bg-blanco  pr-1" > &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
            <span className=" animate-pulse rounded-md bg-blanco  pr-1" > &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
        </>
        )
    }
    return (
        <span>{user?.publicMetadata?.userName as string ?? ''}</span>
    )
}
