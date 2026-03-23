/**
 * GA4 Analytics — inject Google Analytics only when VITE_GA4_MEASUREMENT_ID is set.
 *
 * Setup:
 *   1. Add VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX to your .env or environment secrets.
 *   2. This component is already rendered inside <App />.
 *   3. For production, set the secret in your hosting environment.
 */
import { useEffect } from "react";

const MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;

export default function Analytics() {
  useEffect(() => {
    if (!MEASUREMENT_ID) return;

    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${MEASUREMENT_ID}', { anonymize_ip: true });
    `;
    document.head.appendChild(script2);
  }, []);

  return null;
}
