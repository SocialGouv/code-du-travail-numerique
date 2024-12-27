import { Modal } from "@socialgouv/cdtn-ui";
import React, { useState } from "react";

type Props = {
  title: string;
  renderButton: (openModel: () => void) => JSX.Element;
  children: React.ReactNode;
};

export function HelpModal({
  title,
  renderButton,
  children,
}: Props): JSX.Element {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {renderButton(openModal)}
      <Modal title={title} isOpen={isModalOpen} onDismiss={closeModal}>
        {children}
      </Modal>
    </>
  );
}
