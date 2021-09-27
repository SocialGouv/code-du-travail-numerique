import { Accordion } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";

import { ErrorBoundary } from "../../../common/ErrorBoundary";
import { MathFormula } from "../../common/MathFormula";
import PubliReferences from "../../common/PubliReferences";
import { SectionTitle } from "../../common/stepStyles";

function FormulaDetails({ infoCalcul: { labels, formula }, withSource }) {
  return (
    <>
      <Accordion
        items={[
          {
            body: (
              <>
                <SectionTitle>Éléments saisis</SectionTitle>
                <ul>
                  {Object.entries(labels).map(([label, value], index) => (
                    <li key={index}>
                      {label}&nbsp;: <strong>{value}</strong>
                    </li>
                  ))}
                </ul>
                <ErrorBoundary>
                  <SectionTitle>Formule</SectionTitle>
                  <MathFormula formula={formula} />
                </ErrorBoundary>
                {withSource && (
                  <>
                    <PubliReferences
                      references={[
                        {
                          article: "Article L.1234-9",
                          url: "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000035644154&cidTexte=LEGITEXT000006072050&dateTexte=20170924",
                        },
                        {
                          article: "Article R1234-1 à R1234-4",
                          url: "https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=LEGISCTA000018537572&cidTexte=LEGITEXT000006072050&dateTexte=20170927",
                        },
                      ]}
                    />
                  </>
                )}
              </>
            ),
            title: <p>Voir le détail du calcul</p>,
          },
        ]}
      />
    </>
  );
}

export { FormulaDetails };

FormulaDetails.propTypes = {
  infoCalcul: PropTypes.shape({
    formula: PropTypes.string.isRequired,
    labels: PropTypes.object.isRequired,
  }),
};
