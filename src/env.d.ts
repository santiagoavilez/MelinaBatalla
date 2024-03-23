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
    }
}
