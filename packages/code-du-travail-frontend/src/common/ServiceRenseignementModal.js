import { Modal } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";

import { ServiceRenseignement } from "./ServiceRenseignement";

export const ServiceRenseignementModal = ({ children: renderProp }) => {
  const [isModalVisible, setModalVisibility] = useState(false);

  const openModal = useCallback((e) => {
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
        title="Service de renseignement"
      >
        <ServiceRenseignement />
      </Modal>
    </>
  );
};

export default ServiceRenseignementModal;

ServiceRenseignementModal.propTypes = {
  children: PropTypes.func.isRequired,
};
