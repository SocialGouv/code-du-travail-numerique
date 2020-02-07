import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Heading, Modal, Text } from "@socialgouv/react-ui";

import { ServiceRenseignement } from "./ServiceRenseignement";

export const ContactModal = ({ children: renderProp }) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [isServiceRenseignement, setServiceRenseignement] = useState(false);

  const openModal = useCallback(e => {
    e.preventDefault();
    setModalVisibility(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisibility(false);
    setServiceRenseignement(false);
  }, []);

  const showServiceRenseignement = useCallback(() => {
    setServiceRenseignement(true);
  }, []);

  return (
    <>
      {renderProp(openModal)}
      <Modal isOpen={isModalVisible} onDismiss={closeModal} title="Contact">
        {(isServiceRenseignement && <ServiceRenseignement />) || (
          <>
            <Heading as="h4">Contact </Heading>
            <p>
              <Text>
                Vous pouvez joindre l&apos;équipe en charge de la conception et
                du développement du site à l&apos;adresse suivante&nbsp;:&nbsp;
                <StyledLink href="mailto:codedutravailnumerique@travail.gouv.fr">
                  codedutravailnumerique@travail.gouv.fr
                </StyledLink>
              </Text>
            </p>
            <p>
              <Text>
                Attention : l&apos;équipe n&apos;est pas habilitée à répondre
                aux questions concernant le droit du travail. Si vous avez
                besoin de renseignements sur votre situation ou celle d&apos;un
                proche, nous vous invitons à contacter&nbsp;
                <StyledLink onClick={showServiceRenseignement}>
                  les services dédiés
                </StyledLink>
                .
              </Text>
            </p>
          </>
        )}
      </Modal>
    </>
  );
};

export default ContactModal;

ContactModal.propTypes = {
  children: PropTypes.func.isRequired
};

const StyledLink = styled.a`
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
`;
