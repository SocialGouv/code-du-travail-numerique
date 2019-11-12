import React, { useCallback, useState } from "react";
import { Modal } from "@socialgouv/react-ui";

import ConventionForm from "./Form";

function ConventionModal({ children: renderProp }) {
  const [isModalVisible, setModalVisibility] = useState(false);

  const openModal = useCallback(e => {
    e.preventDefault();
    setModalVisibility(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisibility(false);
  }, []);

  return (
    <>
      {renderProp(openModal)}
      <Modal
        isOpen={isModalVisible}
        onDismiss={closeModal}
        title="Rechercher votre convention collective"
      >
        <ConventionForm />
      </Modal>
    </>
  );
}

export default ConventionModal;
