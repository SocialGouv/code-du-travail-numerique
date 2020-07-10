import { Modal } from "@socialgouv/cdtn-react-ui";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";

import ConventionSearch from "./Search";

export const ConventionModal = ({ children: renderProp = null }) => {
  const [isModalVisible, setModalVisibility] = useState(false);

  useEffect(function setupListener() {
    function handleOpenModal() {
      setModalVisibility(true);
    }
    window.addEventListener("tooltip-cc-event", handleOpenModal);

    return function cleanupListener() {
      window.removeEventListener("tooltip-cc-event", handleOpenModal);
    };
  });

  const openModal = useCallback((e) => {
    e.preventDefault();
    setModalVisibility(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisibility(false);
  }, []);

  return (
    <>
      {renderProp && renderProp(openModal)}
      <Modal
        isOpen={isModalVisible}
        onDismiss={closeModal}
        title="Rechercher votre convention collective"
      >
        <ConventionSearch />
      </Modal>
    </>
  );
};

ConventionModal.propTypes = {
  children: PropTypes.func,
};
