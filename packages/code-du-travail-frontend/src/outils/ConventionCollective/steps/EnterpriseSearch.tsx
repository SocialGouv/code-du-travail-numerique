import {
  AlertWithIcon,
  FlatList,
  icons,
  Text,
  theme,
  Toast,
} from "@socialgouv/cdtn-ui";
import React, { useState } from "react";
import Spinner from "react-svg-spinner";
import styled from "styled-components";

import { Entreprise } from "../../../conventions/Search/api/entreprises.service";
import { SectionTitle } from "../../common/stepStyles";
import { AgreementTile } from "../agreement/AgreementTile";
import { ListItem, ResultList } from "../common/ResultList";
import { EnterpriseButton } from "../enterprise/EnterpriseButton";
import { SearchEnterprise } from "../enterprise/SearchEnterprise";

const EnterpriseSearchStep = (): JSX.Element => {
  const [entreprise, setEntreprise] = useState<Entreprise>(null);
  return (
    <>
      <SectionTitle>
        Précisez et selectionner votre convention collective.
      </SectionTitle>

      <AlertWithMargin variant="secondary">
        Avec le nom de l’entreprise, il est possible de retrouver la convention
        collective associée.
      </AlertWithMargin>

      {entreprise ? (
        <>
          <p>Vous avez sélectionné: </p>
          <CenteredToast
            variant="secondary"
            onRemove={(event) => {
              event.preventDefault();
              setEntreprise(null);
            }}
          >
            <VerticalCenter>
              <SearchIcon />
              {entreprise.simpleLabel},{" "}
              {entreprise.matchingEtablissement.address}
            </VerticalCenter>
          </CenteredToast>
          <Text as="p" variant="primary">
            {entreprise.conventions.length} conventions collectives trouvées
            pour{" "}
            <b>
              <u>
                "{entreprise.simpleLabel},{" "}
                {entreprise.matchingEtablissement.address}"
              </u>
            </b>
          </Text>
          <FlatList>
            {entreprise.conventions.map((agreement) => (
              <Li key={agreement.id}>
                <AgreementTile agreement={agreement} />
              </Li>
            ))}
          </FlatList>
        </>
      ) : (
        <SearchEnterprise
          renderResults={(state, params) => {
            if (state.isLoading) {
              return (
                <>
                  <Spinner /> recherche en cours
                </>
              );
            }
            if (state.isError) {
              return <>{state.error}</>;
            }
            return state.data ? (
              state.data.length > 0 ? (
                <ResultList query={`${params.query}-${params.address}`}>
                  {state.data.map((item, index) => {
                    return (
                      <ListItem key={item.siren}>
                        <EnterpriseButton
                          showAddress={params.address.length > 0}
                          isFirst={index === 0}
                          entreprise={item}
                          onClick={setEntreprise}
                        />
                      </ListItem>
                    );
                  })}
                </ResultList>
              ) : (
                <>Pas de résultat</>
              )
            ) : null;
          }}
        />
      )}
    </>
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
const AlertWithMargin = styled(AlertWithIcon)`
  margin: ${theme.spacings.large} 0;
`;

const Li = styled.li`
  & + & {
    margin-top: ${theme.spacings.base};
  }
`;
