import { Section as SectionUi } from "@socialgouv/cdtn-ui";
import React from "react";
import Spinner from "react-svg-spinner";
import styled from "styled-components";

import { InlineError } from "../../common/ErrorField";
import { AgreementLink } from "../agreement/AgreementLink";
import { SearchAgreement } from "../agreement/SearchAgreement";
import { InfoBulle } from "../common/InfoBulle";
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
        // if (/^(\d{4}\w)$/.test(query.replace(/\W/g, ""))) {
        //   return (
        //     <Section>
        //       <InlineError>
        //         Numéro d’indentification (IDCC) incorrect. Il semblerait que
        //         vous ayez saisi un code APE (Activité Principale Exercée) ou
        //         NAF (Nomenclature des Activités Françaises).
        //       </InlineError>
        //       <InfoBulle title="Qu'est ce qu'un code NAF ou APE">
        //         <p>
        //           Les codes APE (Activité Principale Exercée) ou NAF
        //           (Nomenclature des Activités Françaises) qui sont des numéros
        //           composés de 4 chiffres et d’une lettre dont l’objectif est
        //           d’identifier l’activité principale de l’entreprise.
        //         </p>
        //         <p>
        //           <em>exemple: </em>4752A.
        //         </p>
        //       </InfoBulle>
        //     </Section>
        //   );
        // }

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
  );
};

export { AgreementSearchStep };

const Section = styled(SectionUi)`
  padding-top: 0;
`;
