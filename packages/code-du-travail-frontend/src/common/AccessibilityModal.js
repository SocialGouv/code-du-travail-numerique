import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import {
  Heading,
  InputCheckbox,
  Modal,
  Title,
  theme
} from "@socialgouv/react-ui";

import { useTheme } from "../layout/ThemeProvider.js";

export const AccessibilityModal = ({ children: renderProp }) => {
  const [isModalVisible, setModalVisibility] = useState(false);

  const { currentTheme, toggleTheme } = useTheme();

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
        title="Accessibilité"
      >
        <Title topStripped>Accessibilité</Title>
        <Heading>Couleurs</Heading>
        <InputCheckbox
          label="Passer le site en noir et blanc"
          name="blackAndWhiteTheme"
          id="blackAndWhiteTheme"
          onChange={toggleTheme}
          checked={currentTheme === theme.blackAndWhiteColors}
        />
      </Modal>
    </>
  );
};

AccessibilityModal.propTypes = {
  children: PropTypes.func.isRequired
};
