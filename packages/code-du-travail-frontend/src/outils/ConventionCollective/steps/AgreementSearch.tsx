import { Text } from "@socialgouv/cdtn-ui";
import React from "react";
import Spinner from "react-svg-spinner";
import styled from "styled-components";

import { SectionTitle } from "../../common/stepStyles";
import { AgreementLink } from "../agreement/AgreementLink";
import { SearchAgreement } from "../agreement/SearchAgreement";
import { ListItem, ResultList } from "../common/ResultList";

const AgreementSearchStep = (): JSX.Element => {
  return (
    <form>
      <SectionTitle>
        Précisez et selectionner votre convention collective
      </SectionTitle>

      <SearchAgreement
        renderResults={(state, query) => {
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
              <ResultList query={query}>
                {state.data.map((item, index) => {
                  return (
                    <ListItem key={item.id}>
                      <AgreementLink isFirst={index === 0} agreement={item} />
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
    </form>
  );
};

export { AgreementSearchStep };

const Notice = styled.strong`
  font-weight: 700;
  color: ${({ theme }) => theme.secondary};
`;
