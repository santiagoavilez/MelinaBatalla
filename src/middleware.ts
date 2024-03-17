import clerkClient from '@clerk/clerk-sdk-node'

const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY
const secretKey = import.meta.env.CLERK_SECRET_KEY

const protectedPageUrls = ['/cursos/root-program']


import { defineMiddleware } from "astro:middleware";

// `context` y `next` son automáticamente tipados
export const onRequest = defineMiddleware(async ({request, redirect}, next) => {

    const url = new URL(request.url)

    const isSignedIn = await clerkClient.authenticateRequest({ request, publishableKey, secretKey })
    console.log('isSignedIn', isSignedIn, secretKey)
    if (!protectedPageUrls.some(path => url.pathname.startsWith(path))) {
        return next()
    }

    if (!isSignedIn.isSignedIn && isSignedIn.reason !== 'unexpected-error') {
        return redirect('/iniciar-sesion')
    }

    return next()
});