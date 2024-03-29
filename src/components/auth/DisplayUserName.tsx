import { Skeleton } from "@components/ui/skeleton";
import { auth } from "@lib/authStore";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";

export default function DisplayUserName() {
    const [loaded, setLoaded] = useState(false);

    const clerk = useStore(auth);
    const user = clerk?.user;

    useEffect(() => {
        if (clerk && clerk.loaded) {
            setLoaded(true);
        }
    }, [clerk]);
    if (!loaded) {
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
