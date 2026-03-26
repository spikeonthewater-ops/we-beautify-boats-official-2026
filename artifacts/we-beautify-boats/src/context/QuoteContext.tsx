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
  | "seasonalPlans"
  | "visitBundles"
  | "workshops";

export interface CartItem {
  level: string;
  name: string;
  category: QuoteCategory;
  categoryName: string;
  price: number;
  loaIndex: number;
  loaLabel: string;
}

interface QuoteContextValue {
  isOpen: boolean;
  activeCategory: QuoteCategory;
  cart: CartItem[];
  openQuote: (category?: QuoteCategory) => void;
  closeQuote: () => void;
  setCategory: (category: QuoteCategory) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (level: string) => void;
  clearCart: () => void;
  isInCart: (level: string) => boolean;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<QuoteCategory>("deckWashes");
  const [cart, setCart] = useState<CartItem[]>([]);

  const openQuote = (category?: QuoteCategory) => {
    if (category) setActiveCategory(category);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeQuote = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  const setCategory = (c: QuoteCategory) => setActiveCategory(c);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const exists = prev.find(i => i.level === item.level);
      if (exists) return prev.map(i => i.level === item.level ? item : i);
      return [...prev, item];
    });
  };

  const removeFromCart = (level: string) =>
    setCart(prev => prev.filter(i => i.level !== level));

  const clearCart = () => setCart([]);

  const isInCart = (level: string) => cart.some(i => i.level === level);

  return (
    <QuoteContext.Provider value={{
      isOpen, activeCategory, cart,
      openQuote, closeQuote, setCategory,
      addToCart, removeFromCart, clearCart, isInCart,
    }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within QuoteProvider");
  return ctx;
}
