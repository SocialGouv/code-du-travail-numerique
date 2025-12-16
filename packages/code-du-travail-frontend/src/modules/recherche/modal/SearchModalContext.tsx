"use client";

import { createContext, useContext, useState, ReactNode } from "react";

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
