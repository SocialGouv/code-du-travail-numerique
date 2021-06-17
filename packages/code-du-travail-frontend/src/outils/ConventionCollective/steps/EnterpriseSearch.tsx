import { SOURCES } from "@socialgouv/cdtn-sources";
import {
  Button,
  FlatList,
  ScreenReaderOnly,
  Section as SectionUi,
  Text,
  theme,
  Title,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React, { useState } from "react";
import Spinner from "react-svg-spinner";
import styled from "styled-components";

import { Enterprise } from "../../../conventions/Search/api/enterprises.service";
import { InlineError } from "../../common/ErrorField";
import { SectionTitle } from "../../common/stepStyles";
import { AgreementTile } from "../agreement/AgreementTile";
import { HelpModal } from "../common/Modal";
import { ListItem, ResultList } from "../common/ResultList";
import { EnterpriseButton } from "../enterprise/EnterpriseButton";
import { SearchEnterprise, SearchParams } from "../enterprise/SearchEnterprise";

type EnterpriseSearchStepProps = {
  onBackClick: () => void;
};

const EnterpriseSearchStep = ({
  onBackClick,
}: EnterpriseSearchStepProps): JSX.Element => {
  const [result, setResult] = useState<{
    enterprise: Enterprise;
    params: SearchParams;
  }>(null);
  if (result) {
    return (
      <>
        <SectionTitle>Convention collective</SectionTitle>
        <Text as="p" variant="primary">
          {result.enterprise.conventions.length > 1
            ? `${result.enterprise.conventions.length} conventions collectives trouvées pour `
            : `${result.enterprise.conventions.length} convention collective trouvée pour `}
          <b>
            <u>
              « {result.enterprise.simpleLabel}
              {result.enterprise.address &&
                ` , ${result.enterprise.matchingEtablissement.address}`}{" "}
              »
            </u>
          </b>
        </Text>
        <FlatList>
          {result.enterprise.conventions.map((agreement) => (
            <Li key={agreement.id}>
              <AgreementTile agreement={agreement} />
            </Li>
          ))}
        </FlatList>
        <Button
          small
          type="button"
          onClick={() => setResult(null)}
          variant="flat"
        >
          Précédent
        </Button>
      </>
    );
  }
  return (
    <>
      <SearchEnterprise
        renderResults={(state, params) => {
          const isSiret = /^\d{14}$/.test(params.query.replace(/\s/g, ""));
          if (state.isLoading) {
            return (
              <Section>
                <Spinner aria-hidden />{" "}
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

          return state.data ? (
            state.data.length > 0 ? (
              <Section>
                <ScreenReaderOnly role="status">
                  {state.data.length} résultats
                </ScreenReaderOnly>
                <ResultList query={`${params.query}-${params.address}`}>
                  {state.data.map((item, index) => {
                    return (
                      <ListItem key={item.siren}>
                        <EnterpriseButton
                          showAddress={params.address.length > 0 || isSiret}
                          isFirst={index === 0}
                          enterprise={item}
                          onClick={() =>
                            setResult({ enterprise: item, params })
                          }
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
                        Votre entreprise a été enregistrée sous un autre nom ou
                        un autre code : si vous le pouvez, utilisez son numéro
                        Siret. Ce dernier doit être présent sur votre bulletin
                        de paie.
                      </li>
                      <li>
                        Votre entreprise a un statut particulier :
                        administration ou établissements publics, associations,
                        secteur agricole, La Poste, La Croix Rouge etc. ;
                      </li>
                      <li>
                        Votre entreprise n’a pas de convention collective.
                      </li>
                    </ul>
                  </HelpModal>
                </Wrapper>
              </Section>
            )
          ) : null;
        }}
      />
      <Link href={`/${SOURCES.TOOLS}/convention-collective`} passHref>
        <Button as="a" small type="button" onClick={onBackClick} variant="flat">
          Précédent
        </Button>
      </Link>
    </>
  );
};

export { EnterpriseSearchStep };

const Li = styled.li`
  & + & {
    margin-top: ${theme.spacings.base};
  }
  &:last-child {
    margin-bottom: ${theme.spacings.large};
  }
`;
const Section = styled(SectionUi)`
  padding-top: 1rem;
`;
