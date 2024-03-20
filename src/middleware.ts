import  { createClerkClient } from '@clerk/clerk-sdk-node'

const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY
const secretKey = import.meta.env.CLERK_SECRET_KEY

const protectedPageUrls = ['/dash']

const privatePagesUrls = ['/', 'transforma-tu-realidad', '/links', '/cursos/descubri-tu-esencia']


import { defineMiddleware } from "astro:middleware";

const clerk = createClerkClient({ apiKey: publishableKey,secretKey: secretKey   })

// `context` y `next` son automáticamente tipados
export const onRequest = defineMiddleware(async ({request, redirect}, next) => {

    const url = new URL(request.url)

    const isSignedIn = await clerk.authenticateRequest({ request, publishableKey, secretKey })
    if (privatePagesUrls.some(path => url.pathname === path )) {
        return redirect('/root-program')
    }

    if (!protectedPageUrls.some(path => url.pathname === path)) {
        return next()
    }



    if (!isSignedIn.isSignedIn && isSignedIn.reason !== 'unexpected-error') {
        return redirect('/iniciar-sesion')
    }

    return next()
});