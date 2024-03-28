import { createClerkClient } from '@clerk/clerk-sdk-node'

const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY
const secretKey = import.meta.env.CLERK_SECRET_KEY

const protectedPageUrls = ['/das/']

const privatePagesUrls = ['/', 'transforma-tu-realidad', '/links', '/cursos/descubri-tu-esencia']

const staticPagesUrls = ['/cursos']

import { defineMiddleware } from "astro:middleware";

const clerk = createClerkClient({ publishableKey: publishableKey, secretKey: secretKey })

// `context` y `next` son automáticamente tipados
export const onRequest = defineMiddleware(async ({ redirect, request, locals }, next) => {

    const url = new URL(request.url)
    if (privatePagesUrls.some(path => url.pathname === path)) {
        console.log('private page')
        return redirect('/root-program')
    }
    if(staticPagesUrls.some(path => url.pathname.startsWith(path))) {
        return next()
    }
    return next()

});