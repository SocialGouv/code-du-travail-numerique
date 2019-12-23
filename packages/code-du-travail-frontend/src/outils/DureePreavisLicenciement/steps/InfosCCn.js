import React from "react";
import { StepInfoCCnMandatory } from "../../common/InfosCCn";
import data from "@cdt/data...preavis-licenciement/data.json";

import {
  isNotYetProcessed,
  getSituationsFor,
  filterSituations
} from "../../common/situations.utils";
import { getResult } from "./Result";
import { Highlight } from "../../common/stepStyles";

const StepInfoCCn = props => <StepInfoCCnMandatory {...props} />;
StepInfoCCn.validate = values => {
  const errors = {};
  const { ccn, cdt, disabledWorker } = values;
  const initialCDTSituations = getSituationsFor(data.situations, {
    idcc: 0
  });
  const [situation] = filterSituations(initialCDTSituations, {
    ...cdt
  });

  if (ccn && isNotYetProcessed(data.situations, ccn.convention.num)) {
    errors.ccn = (
      <>
        <p>
          Nous n’avons pas encore traité cette convention collective.
          <br />
          Le code du travail prévoit une durée du préavis de licenciement de{" "}
          <Highlight>
            {getResult({
              durationCDT: situation.duration,
              durationCC: 0,
              disabledWorker
            })}
          </Highlight>
          <br />
          Une durée plus favorable au salarié peut être prévue dans la
          convention collective, un accord d’entreprise, le contrat de travail
          ou un usage dans l’entreprise.
        </p>
      </>
    );
  }
  return errors;
};

export { StepInfoCCn };
