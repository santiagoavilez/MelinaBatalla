import  { createClerkClient } from '@clerk/clerk-sdk-node'

const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY
const secretKey = import.meta.env.CLERK_SECRET_KEY

const protectedPageUrls = ['/cursos/']

const privatePagesUrls = ['/', 'transforma-tu-realidad', '/links', '/cursos/descubri-tu-esencia']


import { defineMiddleware } from "astro:middleware";

const clerk = createClerkClient({ publishableKey: publishableKey,secretKey: secretKey   })

// `context` y `next` son automáticamente tipados
export const onRequest = defineMiddleware(async ({redirect, request, locals}, next) => {

    const url = new URL(request.url)

    const requestState = await clerk.authenticateRequest({ request, publishableKey, secretKey })
    const auth = requestState.toAuth()
    if (auth?.userId) {
        locals.userId = auth?.userId
        const email = auth?.sessionClaims.userEmail as string
        const {bonus} = auth?.sessionClaims.public_metadata as { bonus: string }
        locals.bonus = bonus
        locals.userEmail = email
    }
    if (privatePagesUrls.some(path => url.pathname === (path))) {
        console.log('private page')
        return redirect('/root-program')
    }
    if (requestState.isSignedIn && url.pathname === '/iniciar-sesion') {
        console.log('logueado')
        return redirect('/cursos/root-program')
    }
    if (!protectedPageUrls.some(path => url.pathname.startsWith(path))) {
        return next()
    }
    if (!requestState.isSignedIn && url.pathname !== '/iniciar-sesion') {
        console.log('no logueado')
        return redirect('/iniciar-sesion')
    }



    return next()
});