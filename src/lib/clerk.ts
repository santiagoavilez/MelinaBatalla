import Clerk from '@clerk/clerk-js'

import { auth } from './authStore'
import { esES } from './es-ES'


const clerkPublishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY
let clerk: Clerk

const appearance = {
    elements: {
        footer: { 'display': 'none' },
        logoBox: { 'justify-content': 'center' }
    }
}
export const initializeClerk = () => {
    const authNano = auth.get()
    if (authNano) return

    clerk = new Clerk(clerkPublishableKey)
    clerk
        .load({localization: esES, appearance })
        .then(() => {
            auth.set(clerk)
        })
        .catch(error => console.error(error))
}