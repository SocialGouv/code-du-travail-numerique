"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { peekSearchSnapshot } from "../hooks/searchSnapshot";

interface SearchModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const SearchModalContext = createContext<SearchModalContextType | undefined>(
  undefined
);

export const useSearchModal = () => {
  const context = useContext(SearchModalContext);
  if (!context) {
    throw new Error("useSearchModal must be used within SearchModalProvider");
  }
  return context;
};

interface SearchModalProviderProps {
  children: ReactNode;
}

export const SearchModalProvider = ({ children }: SearchModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Back-navigation restore: when the browser back/forward button lands on the
  // path where the user was last inside a modal-originated search, reopen the
  // modal so SearchModal can hydrate from the snapshot. Also runs once on mount
  // to cover a refresh-while-snapshot-is-pending case. We listen to popstate
  // (not pathname) so query-only URL changes inside the same path are handled.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const tryOpenFromSnapshot = () => {
      const snapshot = peekSearchSnapshot();
      if (
        snapshot &&
        snapshot.origin === "modal" &&
        snapshot.originPath === window.location.pathname &&
        snapshot.results.length > 0
      ) {
        setIsOpen(true);
      }
    };

    tryOpenFromSnapshot();
    window.addEventListener("popstate", tryOpenFromSnapshot);
    return () => window.removeEventListener("popstate", tryOpenFromSnapshot);
  }, []);

  const openModal = () => {
    setIsOpen(true);
    setTimeout(() => {
      try {
        const el = document.getElementById("search-modal-autocomplete");
        if (el && typeof (el as HTMLElement).focus === "function") {
          (el as HTMLElement).focus();
        }
      } catch (_) {
        console.warn("Failed to focus search modal input");
      }
    }, 100);
  };
  const closeModal = () => setIsOpen(false);

  return (
    <SearchModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </SearchModalContext.Provider>
  );
};
