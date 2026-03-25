/**
 * Returns the base URL for API calls.
 * - In Replit deployment: empty string (same-origin, Express serves both frontend + API)
 * - In GitHub Pages / external static host: VITE_API_URL points to the Replit server
 */
export function apiBase(): string {
  return (import.meta.env.VITE_API_URL as string) ?? "";
}
