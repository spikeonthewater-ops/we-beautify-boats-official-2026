/**
 * Returns the base URL for API calls.
 * - In Replit deployment: empty string (same-origin, Express serves both frontend + API)
 * - In development: VITE_API_URL env var points to the API server
 */
export function apiBase(): string {
  return (import.meta.env.VITE_API_URL as string) ?? "";
}
