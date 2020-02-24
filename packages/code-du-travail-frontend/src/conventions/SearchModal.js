import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "@socialgouv/react-ui";

import ConventionSearch from "./Search";

export const ConventionModal = ({ children: renderProp }) => {
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
        <ConventionSearch />
      </Modal>
    </>
  );
};

ConventionModal.propTypes = {
  children: PropTypes.func.isRequired
};
