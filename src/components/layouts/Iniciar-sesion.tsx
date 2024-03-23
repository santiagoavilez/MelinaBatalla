import React from "react";
import { dark } from '@clerk/themes';
import { ClerkProvider, SignIn, SignInButton, SignUp, SignedOut } from "@clerk/clerk-react";
import { esES } from "@lib/es-ES";

const clerkPubKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;
interface Props {
    children?: React.ReactNode | undefined | null;
    invitationkey?: string | null;
}

function App({ children, invitationkey }: Props) {
    console.log('clerkPubKey', clerkPubKey)
    const appearance = {
        elements: {
            footer: { 'display': 'none' },
            logoBox: { 'justify-content': 'center' }
        }
    }
    return (
        <ClerkProvider
            localization={esES}
            publishableKey={clerkPubKey}
        >
            <SignedOut>
                {invitationkey ? <SignUp afterSignUpUrl={"/cursos/root-program"}
                    afterSignInUrl={"/cursos/root-program"}
                    redirectUrl={"/cursos/root-program"}
                appearance={appearance}
                ></SignUp> :
                    <SignIn
                        redirectUrl={"/cursos/root-program"}
                        key={"sign-in-key-e"}
                        afterSignUpUrl={"/cursos/root-program"}
                        afterSignInUrl={"/cursos/root-program"}
                        appearance={appearance}

                    ></SignIn>}

            </SignedOut>

            {children}
        </ClerkProvider>
    );
}

export default App;