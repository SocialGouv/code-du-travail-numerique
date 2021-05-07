import { Section as SectionUi } from "@socialgouv/cdtn-ui";
import React from "react";
import Spinner from "react-svg-spinner";
import styled from "styled-components";

import { InlineError } from "../../common/ErrorField";
import { AgreementLink } from "../agreement/AgreementLink";
import { SearchAgreement } from "../agreement/SearchAgreement";
import { ListItem, ResultList } from "../common/ResultList";

const AgreementSearchStep = (): JSX.Element => {
  return (
    <form>
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
            return (
              <Section>
                <InlineError>{state.error}</InlineError>
              </Section>
            );
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
              <Section>Pas de résultat</Section>
            )
          ) : null;
        }}
      />
    </form>
  );
};

export { AgreementSearchStep };

const Section = styled(SectionUi)`
  padding-top: 0;
`;
