import {
  Heading,
  InputCheckbox,
  Modal,
  theme,
  Title,
  useTheme,
} from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";

export const AccessibilityModal = ({ children: renderProp }) => {
  const [isModalVisible, setModalVisibility] = useState(false);

  const { currentTheme, toggleTheme } = useTheme();

  const openModal = useCallback(() => {
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
        <Title stripe="top" as="h1">
          Accessibilité
        </Title>
        <Heading as="h2">Couleurs</Heading>
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
  children: PropTypes.func.isRequired,
};
