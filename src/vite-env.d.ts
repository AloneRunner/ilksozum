// FIX: Removed `/// <reference types="vite/client" />` as it was causing a "Cannot find type definition file" error.
// The manual definitions below serve as a fallback.

// Manually define Vite's environment variables to resolve TypeScript errors
// when the default `vite/client` types cannot be found by the compiler.
interface ImportMetaEnv {
  // FIX: Removed readonly modifier to resolve declaration conflict.
  DEV: boolean;
  PROD: boolean;
  // Add other environment variables used in the project here.
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
