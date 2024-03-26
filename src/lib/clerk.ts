import Clerk from '@clerk/clerk-js'

import { auth } from './authStore'
import { esES } from './es-ES'


const clerkPublishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY
let clerk: Clerk

export const initializeClerk = () => {
    const authNano = auth.get()
    console.log('authNano', authNano)
    if (authNano) return
    console.log('authNano', authNano)

    clerk = new Clerk(clerkPublishableKey)
    clerk
        .load({localization: esES})
        .then(() => {
            console.log('authNano', clerk)
            auth.set(clerk)
        })
        .catch(error => console.error(error))
}