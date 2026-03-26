import { useEffect } from "react";

const BASE = "https://www.webeautifyboats.com";
const DEFAULT_DESC = "Ontario's premier mobile yacht & boat detailing. Deck washes, hull polishing, interior detailing, antifouling & more. Serving Toronto, Oakville, Burlington & Hamilton marinas. Call Spike: 416-890-5899.";

interface PageMetaProps {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
}

export default function PageMeta({ title, description = DEFAULT_DESC, path, ogImage }: PageMetaProps) {
  useEffect(() => {
    const resolvedPath = path ?? window.location.pathname;
    const canonicalUrl = `${BASE}${resolvedPath}`;
    const imageUrl = ogImage ?? `${BASE}/opengraph.jpg`;
    const fullTitle = title.includes("Spike On The Water") ? title : `${title} | Spike On The Water`;

    document.title = fullTitle;

    setMeta("name", "description", description);
    setLink("canonical", canonicalUrl);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", imageUrl);
    setMeta("property", "og:site_name", "Spike On The Water");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", imageUrl);

    return () => {
      document.title = "Spike On The Water | Mobile Boat & Yacht Detailing — Ontario, Canada";
    };
  }, [title, description, path, ogImage]);

  return null;
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}
