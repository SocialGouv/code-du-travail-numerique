import { SOURCES } from "@socialgouv/cdtn-sources";
import {
  AlertWithIcon,
  Button,
  Heading,
  Section as SectionUi,
  Title,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import Spinner from "react-svg-spinner";
import styled from "styled-components";

import { AgreementLink } from "../agreement/AgreementLink";
import { SearchAgreement } from "../agreement/SearchAgreement";
import { HelpModal } from "../common/Modal";
import { ListItem, ResultList } from "../common/ResultList";

const AgreementSearchStep = (): JSX.Element => {
  return (
    <SearchAgreement
      renderResults={(state, query) => {
        if (state.isLoading) {
          return (
            <Section>
              <Spinner /> recherche en cours
            </Section>
          );
        }
        if (state.isError) {
          return <Section> {state.error}</Section>;
        }

        return state.data ? (
          state.data.length > 0 ? (
            <Section>
              <ResultList query={query}>
                {state.data.map((item, index) => {
                  return (
                    <ListItem key={item.id}>
                      <AgreementLink isFirst={index === 0} agreement={item} />
                    </ListItem>
                  );
                })}
              </ResultList>
            </Section>
          ) : (
            <Section>
              <Wrapper variant="light">
                <p>
                  <strong>Aucune convention collective n’a été trouvée</strong>.
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
                    <Button variant="link" onClick={openModal}>
                      Consulter notre aide
                    </Button>
                  )}
                >
                  <Title stripe="none" as="h3">
                    Vous ne trouvez pas convention collective&nbsp;?
                  </Title>
                  <p>Il peut y avoir plusieurs explications à cela&nbsp;:</p>
                  <ul>
                    <li>
                      Votre convention collective a un autre code : si vous le
                      pouvez, utilisez le numéro Siret de votre entreprise. Ce
                      dernier doit être présent sur votre bulletin de paie.
                    </li>
                    <li>
                      Votre convention collective a un statut particulier :
                      administration ou établissement publics, associations,
                      secteur agricole, La Poste, La Croix Rouge etc.
                    </li>
                    <li>
                      Votre entreprise n’est rattachée à aucune convention
                      collective.
                    </li>
                  </ul>
                  <Heading>
                    Essayez avec la recherche par entreprise&nbsp;
                  </Heading>
                  <AlertWithIcon variant="secondary">
                    Avec le nom de l’entreprise, il est possible de retrouver la
                    convention collective associée
                    <br />
                    <Link
                      passHref
                      href={`/${SOURCES.TOOLS}/convention-collective#entreprise`}
                    >
                      <Button as="a" variant="link" narrow small>
                        Je recherche avec le nom de l’entreprise
                      </Button>
                    </Link>{" "}
                  </AlertWithIcon>
                </HelpModal>
              </Wrapper>
            </Section>
          )
        ) : null;
      }}
    />
  );
};

export { AgreementSearchStep };

const Section = styled(SectionUi)`
  padding-top: 0;
`;
