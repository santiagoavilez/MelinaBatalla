/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro-clerk-auth/env" />
interface ImportMetaEnv {
    readonly BUILDER_API_PUBLIC_KEY: string;
    readonly PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    readonly PUBLIC_LEMON_API_KEY: string;
    readonly ASTRO_STUDIO_REMOTE_DB_URL : string;
    readonly ASTRO_STUDIO_APP_TOKEN : string;
    readonly VITE_ASTRO_STUDIO_REMOTE_DB_URL : string;
    readonly VITE_ASTRO_STUDIO_APP_TOKEN : string;
    readonly LEMON_API_KEY : string
    readonly LEMON_SQUEEZY_DISCOUNT_CODE : string
    readonly PUBLIC_VERCEL_URL : string
    readonly LEMON_ROOT_VARIANT_ID: string
    readonly LEMON_POTENCIADOR_VARIANT_ID: string
    readonly MP_ACCESS_TOKEN: string
    readonly PUBLIC_MP_PUBLIC_KEY: string
    readonly MP_SECRET_KEY: string
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}


declare namespace App {
    interface Locals {
        // add props here
        userId?: string;
        userEmail?: string;
        bonus?: string;
        userName: string;
    }

}

interface Window {
    onSpotifyIframeApiReady: (e:any) => void;
    createLemonSqueezy: () => void
    LemonSqueezy: {
        /**
         * Initialises Lemon.js on your page.
         * @param options - An object with a single property, eventHandler, which is a function that will be called when Lemon.js emits an event.
         */
        Setup: (options: {
            eventHandler: (event: { event: string }) => void
        }) => void
        /**
         * Refreshes `lemonsqueezy-button` listeners on the page.
         */
        Refresh: () => void

        Url: {
            /**
             * Opens a given Lemon Squeezy URL, typically these are Checkout or Payment Details Update overlays.
             * @param url - The URL to open.
             */
            Open: (url: string) => void

            /**
             * Closes the current opened Lemon Squeezy overlay checkout window.
             */
            Close: () => void
        }
        Affiliate: {
            /**
             * Retrieve the affiliate tracking ID
             */
            GetID: () => string

            /**
             * Append the affiliate tracking parameter to the given URL
             * @param url - The URL to append the affiliate tracking parameter to.
             */
            Build: (url: string) => string
        }
    }
}