import React from "react";
import PropTypes from "prop-types";
import { Toast } from "@cdt/ui";

import { SectionTitle } from "../../common/stepStyles";
import { filterSituations, recapSituation } from "./situation";

function StepResult({ form }) {
  const { values } = form.getState();
  const possibleSituations = filterSituations(values);
  switch (possibleSituations.length) {
    case 1: {
      const [situation] = possibleSituations;
      const { idcc, label: ccLabel } = situation.criteria.branche;
      return (
        <>
          <SectionTitle>Durée du préavis</SectionTitle>
          <p>
            En cas de démission, la convention collective{" "}
            <strong>
              {ccLabel} ({idcc})
            </strong>{" "}
            prévoit le respect d’un préavis d’une durée de{" "}
            <strong>{situation.answerCc}</strong> pour un salarié{" "}
            {recapSituation(situation.criteria)}
          </p>
          {situation.refCc && situation.refCcUrl && (
            <p>
              <a
                href={situation.refCcUrl}
                title="Consultez l'article de votre convetion collective"
              >
                {situation.refCc}
              </a>
            </p>
          )}
          <Toast variant="info">
            Le contrat de travail, un accord collectif d’entreprise ou un usage
            peuvent prévoir une durée de préavis plus courte. Vous pouvez
            également convenir d’une dispense par accord avec l’employeur.
          </Toast>
        </>
      );
    }
    default:
      return (
        <>
          <p>
            Le code du travail ne prévoit pas une durée précise du préavis de
            démission. Il prévoit qu’une convention collective ou un accord
            d’entreprise, voire un usage, en prévoit les durées et modalités.
          </p>
        </>
      );
  }
}

StepResult.propTypes = {
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired
  })
};

export { StepResult };
