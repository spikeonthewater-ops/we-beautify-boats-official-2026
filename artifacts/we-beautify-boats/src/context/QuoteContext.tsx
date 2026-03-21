import { createContext, useContext, useState, ReactNode } from "react";

export type QuoteCategory =
  | "deckWashes"
  | "interiorDetails"
  | "hullWashes"
  | "bottomPrep"
  | "deckPolishing"
  | "hullPolishing"
  | "protections"
  | "extraServices"
  | "seasonalPlans";

interface QuoteContextValue {
  isOpen: boolean;
  activeCategory: QuoteCategory;
  openQuote: (category?: QuoteCategory) => void;
  closeQuote: () => void;
  setCategory: (category: QuoteCategory) => void;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<QuoteCategory>("deckWashes");

  const openQuote = (category?: QuoteCategory) => {
    if (category) setActiveCategory(category);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeQuote = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  const setCategory = (category: QuoteCategory) => setActiveCategory(category);

  return (
    <QuoteContext.Provider value={{ isOpen, activeCategory, openQuote, closeQuote, setCategory }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within QuoteProvider");
  return ctx;
}
