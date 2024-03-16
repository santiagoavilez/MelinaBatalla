import React from "react";
import { dark } from '@clerk/themes';
import { ClerkProvider, SignIn, SignInButton , SignedOut} from "@clerk/clerk-react";
import { esES } from "@lib/es-ES";

const clerkPubKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

interface Props  {
    children?: React.ReactNode | undefined | null;
}

function App({children} : Props) {
    return (
        <ClerkProvider
            localization={esES}
            publishableKey={clerkPubKey}
        >
            <SignedOut>
            <SignIn
                redirectUrl={"/cursos/root-program"}
                key={"sign-in-key"}

                afterSignUpUrl={"/cursos/root-program"}
                afterSignInUrl={"/cursos/root-program"}
            ></SignIn>
            </SignedOut>

            {children}
        </ClerkProvider>
    );
}

export default App;