import {
  FlatList,
  icons,
  Section as SectionUi,
  Text,
  theme,
  Toast,
} from "@socialgouv/cdtn-ui";
import React, { useState } from "react";
import Spinner from "react-svg-spinner";
import styled from "styled-components";

import { Enterprise } from "../../../conventions/Search/api/enterprises.service";
import { InlineError } from "../../common/ErrorField";
import { SectionTitle } from "../../common/stepStyles";
import { AgreementTile } from "../agreement/AgreementTile";
import { ListItem, ResultList } from "../common/ResultList";
import { EnterpriseButton } from "../enterprise/EnterpriseButton";
import { SearchEnterprise, SearchParams } from "../enterprise/SearchEnterprise";

const EnterpriseSearchStep = (): JSX.Element => {
  const [result, setResult] = useState<{
    enterprise: Enterprise;
    params: SearchParams;
  }>(null);

  if (result) {
    return (
      <>
        <SectionTitle>Convention collective</SectionTitle>
        <p>Vous avez sélectionné l’entreprise&nbsp;:</p>
        <CenteredToast
          variant="secondary"
          onRemove={(event) => {
            event.preventDefault();
            setResult(null);
          }}
        >
          <VerticalCenter>
            <SearchIcon />
            {result.enterprise.simpleLabel}
            {result.params.address &&
              ` , ${result.enterprise.matchingEtablissement.address}`}
          </VerticalCenter>
        </CenteredToast>
        <Text as="p" variant="primary">
          {result.enterprise.conventions.length > 1
            ? `${result.enterprise.conventions.length} conventions collectives trouvées pour `
            : `${result.enterprise.conventions.length} convention collective trouvée pour `}
          <b>
            <u>
              « {result.enterprise.simpleLabel}
              {result.params.address &&
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
      </>
    );
  }
  return (
    <SearchEnterprise
      renderResults={(state, params) => {
        if (state.isLoading) {
          return (
            <Section>
              <Spinner /> recherche en cours
            </Section>
          );
        }
        if (state.isError) {
          return (
            <Section>
              *errorZ
              <InlineError>{state.error}</InlineError>
            </Section>
          );
        }
        if (
          state?.data?.length === 0 &&
          /^\d{2,8}$/.test(params.query.replace(/\W/g, ""))
        ) {
          return (
            <Section>
              <InlineError>
                Veuillez indiquer un numéro Siret (14 chiffres) ou Siren (9
                chiffres) valide
              </InlineError>
            </Section>
          );
        }
        if (
          state?.data?.length === 0 &&
          /\d{14}/.test(params.query.replace(/\s/g, ""))
        ) {
          return (
            <Section>
              <InlineError>
                Veuillez indiquer un numéro Siret (14 chiffres) ou Siren (9
                chiffres) valide
              </InlineError>
            </Section>
          );
        }
        return state.data ? (
          state.data.length > 0 ? (
            <Section>
              <ResultList query={`${params.query}-${params.address}`}>
                {state.data.map((item, index) => {
                  return (
                    <ListItem key={item.siren}>
                      <EnterpriseButton
                        showAddress={params.address.length > 0}
                        isFirst={index === 0}
                        enterprise={item}
                        onClick={() => setResult({ enterprise: item, params })}
                      />
                    </ListItem>
                  );
                })}
              </ResultList>
            </Section>
          ) : (
            <Section>Pas de résultat</Section>
          )
        ) : null;
      }}
    />
  );
};

export { EnterpriseSearchStep };

const SearchIcon = styled(icons.Search)`
  width: 1.6em;
  color: ${({ theme }) => theme.border};
  margin-right: ${theme.spacings.small};
`;
const CenteredToast = styled(Toast)`
  align-items: center;
`;
const VerticalCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacings.xsmall} 0;
`;

const Li = styled.li`
  & + & {
    margin-top: ${theme.spacings.base};
  }
  &:last-child {
    margin-bottom: ${theme.spacings.large};
  }
`;
const Section = styled(SectionUi)`
  padding-top: 0;
`;
