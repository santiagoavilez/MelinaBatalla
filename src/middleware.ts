import clerkClient from '@clerk/clerk-sdk-node'


const publishableKey = process.env.PUBLIC_CLERK_PUBLISHABLE_KEY
const secretKey = process.env.CLERK_SECRET_KEY

const protectedPageUrls = ['/cursos/root-program']

export async function onRequest({ request, redirect }: { request: any, redirect: any }, next: any) {
    const url = new URL(request.url)
    if (!protectedPageUrls.some(path => url.pathname.startsWith(path))) {
        return next()
    }

    const { isSignedIn } = await clerkClient.authenticateRequest({ request, publishableKey, secretKey })
    if (!isSignedIn) {
        return redirect('/')
    }

    return next()
};