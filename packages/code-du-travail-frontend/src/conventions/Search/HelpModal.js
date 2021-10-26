import {
  Button,
  Heading,
  Modal,
  theme,
  Title,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

import { ServiceRenseignementModal } from "../../common/ServiceRenseignementModal";

const { spacings } = theme;

export const HelpModal = ({ children: renderProp }) => {
  const [isHelpModalVisible, setModalVisibility] = useState(false);
  const openHelpModal = useCallback(() => {
    setModalVisibility(true);
  }, []);

  const closeHelpModal = useCallback(() => {
    setModalVisibility(false);
  }, []);
  return (
    <>
      {renderProp(openHelpModal)}
      <Modal
        isOpen={isHelpModalVisible}
        onDismiss={closeHelpModal}
        title="Aide à la recherche d’une convention collective"
      >
        <Title stripe="none" as="h3">
          Qu’est-ce qu’une convention collective&nbsp;?
        </Title>
        <p>
          Une convention collective est un texte conclu au niveau d’une{" "}
          <strong>branche d’activité</strong> (Ex : la banque, les hôtels,
          cafés, restaurants…) entre les organisations syndicales de salariés et
          d’employeurs.
        </p>
        <p>
          Connaître sa convention collective est <strong>important</strong>.
          Elle adapte les règles du code du travail aux situations particulières
          de la branche s’agissant des conditions d’emploi et de travail des
          salariés et de leurs garanties sociales (
          <strong>
            primes, congés, salaires minima, préavis, prévoyance santé…
          </strong>
          ).
        </p>
        <Title stripe="none" as="h3">
          Où trouver le nom de sa convention collective&nbsp;?
        </Title>

        <Heading as="h4">Vérifiez dans la fiche de paie</Heading>
        <p>
          La convention collective doit être mentionnée sur la fiche de paie du
          salarié. Elle est généralement écrite dans les informations présentes
          en en-tête ou en bas de la fiche.
        </p>
        <Heading as="h4">
          Vérifiez dans le contrat de travail ou la notice remise par
          l’employeur
        </Heading>
        <p>
          L’employeur doit avoir remis au salarié lors de l’embauche une notice
          d’information indiquant la convention collective applicable. Vérifiez
          également dans le contrat de travail, le nom de la convention
          collective y est souvent mentionné.
        </p>
        <Heading as="h4">Vérifiez sur le lieu de travail</Heading>
        <p>
          Sur le lieu de travail (notamment panneaux d’affichage pour le
          personnel), il est souvent affiché sur une note la convention
          collective applicable. Par ailleurs, l’employeur a l’obligation de
          tenir à la disposition des salariés un exemplaire à jour du texte de
          la convention collective sur le lieu de travail (ou sur l’intranet
          s’il existe).
        </p>
        <Wrapper variant="light">
          <Heading stripe="left" shift={spacings.xmedium} as="h4">
            Vous n’avez pas trouvé votre convention collective&nbsp;?
          </Heading>
          <p>
            <strong>
              Il est possible qu’aucune convention collective ne s’applique à
              l’entreprise.
            </strong>
            Contactez l’inspection du travail dont dépend l’entreprise pour plus
            de renseignements.
          </p>
          <ServiceRenseignementModal>
            {(openSRModal) => (
              <HelpButton
                type="button"
                variant="navLink"
                onClick={(e) => {
                  openSRModal(e);
                }}
              >
                Contactez l’inspection du travail
              </HelpButton>
            )}
          </ServiceRenseignementModal>
        </Wrapper>
      </Modal>
    </>
  );
};

const HelpButton = styled(Button)`
  color: ${({ theme }) => theme.secondary};
  text-decoration: underline;
`;
