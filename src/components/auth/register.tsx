import { ClerkProvider, SignUp, SignedOut } from "@clerk/clerk-react";
import { esES } from "@lib/es-ES";

const clerkPubKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;
interface Props {

    name: string;
    email: string;
    bonus?: string | null;
}

function Register({ name, email, bonus }: Props) {
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];
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
                <SignUp afterSignUpUrl={"/cursos/root-program"}
                    afterSignInUrl={"/cursos/root-program"}
                    redirectUrl={"/cursos/root-program"}
                    initialValues={{
                        emailAddress: email,
                        firstName: firstName,
                        lastName: lastName,
                    }}
                    unsafeMetadata={{bonus: bonus}}
                appearance={appearance}
                ></SignUp>


            </SignedOut>
        </ClerkProvider>
    );
}

export default Register;