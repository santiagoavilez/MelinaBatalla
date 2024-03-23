import Clerk from '@clerk/clerk-js'

import { auth } from './authStore'


const clerkPublishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY
let clerk: Clerk

export const initializeClerk = () => {
    const authNano = auth.get()
    console.log('authNano', authNano)
    if (authNano) return
    console.log('authNano', authNano)

    clerk = new Clerk(clerkPublishableKey)
    clerk
        .load()
        .then(() => {
            console.log('authNano', clerk)
            auth.set(clerk)
            document.cookie = `userId=${clerk?.user?.id}; path=/`;


        })
        .catch(error => console.error(error))
}