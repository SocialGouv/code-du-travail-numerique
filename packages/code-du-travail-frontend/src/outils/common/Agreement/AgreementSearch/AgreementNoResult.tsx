import { SOURCES } from "@socialgouv/cdtn-utils";
import { Agreement } from "../../../../outils/types";
import {
  AlertWithIcon,
  Button,
  Heading,
  ScreenReaderOnly,
  Section as SectionUi,
  Title,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import Spinner from "react-svg-spinner";
import styled from "styled-components";

import { TrackingProps, UserAction } from "../../../ConventionCollective/types";
import { Error } from "../../ErrorField";
import { HelpModal } from "../components/Modal";

type Props = {
  isLoading: boolean;
  error?: any;
  data?: Agreement[];
  onUserAction: (action: UserAction) => void;
} & TrackingProps;

const AgreementNoResult = ({
  isLoading,
  error,
  data,
  onUserAction,
}: Props): JSX.Element => {
  function openModalHandler(openModal: () => void) {
    onUserAction(UserAction.OpenAgreementHelp);
    openModal();
  }

  if (isLoading) {
    return (
      <Section>
        <Spinner aria-hidden="true" />{" "}
        <span role="status">recherche en cours</span>
      </Section>
    );
  }
  if (error) {
    if (typeof error === "string") {
      return <Error>{error}</Error>;
    }
    return <Section> {error}</Section>;
  }

  if (data && !data.length) {
    return (
      <Section>
        <ScreenReaderOnly role="status">0 résultat</ScreenReaderOnly>
        <Wrapper variant="light">
          <p>
            <strong role="status">
              Aucune convention collective n’a été trouvée
            </strong>
            .
          </p>
          Suggestions&nbsp;:
          <ul>
            <li>Vérifiez l’orthographe des termes de recherche</li>
            <li>
              Utilisez la rubrique ci-dessous “Vous ne trouvez pas votre
              convention collective&nbsp;?”
            </li>
          </ul>
        </Wrapper>
        <Wrapper>
          Vous ne trouvez pas votre convention collective&nbsp;?
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
                Votre convention collective a un autre code : si vous le pouvez,
                utilisez le numéro Siret de votre entreprise. Ce dernier doit
                être présent sur votre bulletin de paie.
              </li>
              <li>
                Votre convention collective a un statut particulier :
                administration ou établissements publics, associations, secteur
                agricole, La Poste, La Croix Rouge etc.
              </li>
              <li>
                Votre entreprise n’est rattachée à aucune convention collective.
              </li>
            </ul>
            <Heading>Essayez avec la recherche par entreprise&nbsp;</Heading>
            <AlertWithIcon variant="secondary">
              Avec le nom de l’entreprise, il est possible de retrouver la
              convention collective associée
              <br />
              <Link
                passHref
                href={`/${SOURCES.TOOLS}/convention-collective/entreprise`}
                legacyBehavior
              >
                <Button as="a" variant="link" narrow small>
                  Je recherche avec le nom de l’entreprise
                </Button>
              </Link>{" "}
            </AlertWithIcon>
          </HelpModal>
        </Wrapper>
      </Section>
    );
  }

  return <></>;
};

export { AgreementNoResult };

const Section = styled(SectionUi)`
  padding-top: 1rem;
`;
