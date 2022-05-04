import {
  Button,
  ScreenReaderOnly,
  Section as SectionUi,
  Title,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React from "react";
import Spinner from "react-svg-spinner";
import styled from "styled-components";
import { FetchReducerState } from "../components/Suggester";
import { TrackingProps, UserAction } from "../../../ConventionCollective/types";
import { InlineError } from "../../ErrorField";
import { ListItem, ResultList } from "../components/ResultList";
import { HelpModal } from "../components/Modal";
import { Enterprise } from "../../../../conventions/Search/api/enterprises.service";
import { SearchParams } from "./EntrepriseSearchInput/SearchEnterpriseInput";
import { EnterpriseButton } from "./EntrepriseSearchInput/EnterpriseButton";

type Props = {
  handleEnterpriseSelection: (
    enterprise: Enterprise,
    params: SearchParams
  ) => void;
} & TrackingProps;

const renderResults = ({
  handleEnterpriseSelection,
  onUserAction,
}: Props): ((
  state: FetchReducerState<Enterprise[]>,
  params: SearchParams
) => JSX.Element) => {
  function openModalHandler(openModal: () => void) {
    onUserAction(UserAction.OpenEnterpriseHelp);
    openModal();
  }

  return function renderResults(
    state: FetchReducerState<Enterprise[]>,
    params: SearchParams
  ): JSX.Element {
    const isSiret = /^\d{14}$/.test(params.query.replace(/\s/g, ""));
    if (state.isLoading) {
      return (
        <Section>
          <Spinner aria-hidden="true" />{" "}
          <span role="status">recherche en cours</span>
        </Section>
      );
    }

    if (state.isError) {
      if (typeof state.error === "string") {
        return (
          <Section role="status">
            <InlineError>{state.error}</InlineError>
          </Section>
        );
      }
      return <Section role="status">{state.error}</Section>;
    }
    if (!state.data) {
      return <></>;
    }
    return state.data.length > 0 ? (
      <Section>
        <ScreenReaderOnly role="status">
          {state.data.length} résultats
        </ScreenReaderOnly>
        <ResultList query={`${params.query}-${params.address}`}>
          {state.data.map((item, index) => {
            return (
              <ListItem key={item.siren}>
                <EnterpriseButton
                  showAddress={isSiret || item.matching == 1}
                  isFirst={index === 0}
                  enterprise={item}
                  onClick={() => handleEnterpriseSelection(item, params)}
                  onUserAction={onUserAction}
                />
              </ListItem>
            );
          })}
        </ResultList>
      </Section>
    ) : (
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
            title="Vous ne trouvez pas votre convention collective"
            renderButton={(openModal) => (
              <Button
                variant="link"
                onClick={() => openModalHandler(openModal)}
              >
                Consulter notre aide
              </Button>
            )}
          >
            <Title stripe="none" as="h3">
              Vous ne trouvez pas votre convention collective&nbsp;?
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
                établissements publics, associations, secteur agricole, La
                Poste, La Croix Rouge etc. ;
              </li>
              <li>Votre entreprise n’a pas de convention collective.</li>
            </ul>
          </HelpModal>
        </Wrapper>
      </Section>
    );
  };
};

export { renderResults };

const Section = styled(SectionUi)`
  padding-top: 1rem;
`;
