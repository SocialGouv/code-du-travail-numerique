import {
  Button,
  Section as SectionUi,
  Title,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { HelpModal } from "../common/Modal";
import { useTrackingContext } from "../common/TrackingContext";

const NoResultSection = (): JSX.Element => {
  const { trackEvent, title, uuid } = useTrackingContext();

  function openModalHandler(openModal: () => void) {
    trackEvent("cc_search_help", "click_cc_search_help_p2", title, uuid);
    openModal();
  }

  return (
    <Section>
      <Wrapper variant="light">
        <p>
          <strong>Aucune entreprise n’a été trouvée</strong>.
        </p>
        Suggestions&nbsp;:
        <ul>
          <li>Vérifiez l’orthographe des termes de recherche</li>
          <li>
            Utilisez la rubrique ci-dessous “Vous ne trouvez pas votre
            entreprise&nbsp;? Consultez notre aide”
          </li>
        </ul>
      </Wrapper>
      <Wrapper>
        Vous ne trouvez pas votre entreprise&nbsp;?
        <br />
        <HelpModal
          title="Vous ne trouvez pas votre entreprise"
          renderButton={(openModal) => (
            <Button variant="link" onClick={() => openModalHandler(openModal)}>
              Consulter notre aide
            </Button>
          )}
        >
          <Title stripe="none" as="h3">
            Vous ne trouvez pas votre entreprise&nbsp;?
          </Title>
          <p>Il peut y avoir plusieurs explications à cela&nbsp;:</p>
          <ul>
            <li>
              Votre entreprise a été enregistrée sous un autre nom ou un autre
              code : si vous le pouvez, utilisez son numéro Siret. Ce dernier
              doit être présent sur votre bulletin de paie.
            </li>
            <li>
              Votre entreprise a un statut particulier : administration ou
              établissements publics, associations, secteur agricole, La Poste,
              La Croix Rouge etc. ;
            </li>
            <li>Votre entreprise n’a pas de convention collective.</li>
          </ul>
        </HelpModal>
      </Wrapper>
    </Section>
  );
};

export default NoResultSection;

const Section = styled(SectionUi)`
  padding-top: 1rem;
`;
