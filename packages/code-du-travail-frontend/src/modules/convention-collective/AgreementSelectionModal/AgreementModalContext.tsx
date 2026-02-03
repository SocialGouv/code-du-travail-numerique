"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AgreementModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const AgreementModalContext = createContext<
  AgreementModalContextType | undefined
>(undefined);

export const useAgreementModal = () => {
  const context = useContext(AgreementModalContext);
  if (!context) {
    throw new Error(
      "useAgreementModal must be used within AgreementModalProvider"
    );
  }
  return context;
};

interface AgreementModalProviderProps {
  children: ReactNode;
}

export const AgreementModalProvider = ({
  children,
}: AgreementModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <AgreementModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </AgreementModalContext.Provider>
  );
};
