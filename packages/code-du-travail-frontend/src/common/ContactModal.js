import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Heading, Modal, Text } from "@socialgouv/react-ui";

import { ServiceRenseignement } from "./ServiceRenseignement";

export const ContactModal = ({ children: renderProp }) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [isServiceRenseignement, setServiceRenseignement] = useState(false);

  const openModal = useCallback(() => {
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
                <strong>Attention :</strong> aucune réponse en droit du travail
                ne pourra vous être apportée via l&apos;adresse ci-dessous.
                <br />
                <br />
                Si vous souhaitez nous interroger sur vos droits ou sur des
                dispositions en droit du travail, nous vous invitons à contacter
                <Button variant="link" onClick={showServiceRenseignement}>
                  les services du ministre du travail.
                </Button>
              </Text>
            </p>
            <p>
              <Text>
                Si vous avez une suggestion sur l&apos;utilisation de ce site ou
                si vous avez rencontré un problème technique, vous pouvez nous
                contacter à cette adresse&nbsp;:&nbsp;
                <StyledLink href="mailto:codedutravailnumerique@travail.gouv.fr">
                  codedutravailnumerique@travail.gouv.fr
                </StyledLink>
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
  children: PropTypes.func.isRequired,
};

const StyledLink = styled.a`
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
`;
