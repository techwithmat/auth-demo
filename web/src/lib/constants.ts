export const DEVELOPMENT_URL: string = import.meta.env.DEV
  ? import.meta.env.VITE_DEVELOPMENT_URL
  : import.meta.env.VITE_PRODUCTION_URL
