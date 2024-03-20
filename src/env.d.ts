/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro-clerk-auth/env" />
interface ImportMetaEnv {
    readonly BUILDER_API_PUBLIC_KEY: string;
}