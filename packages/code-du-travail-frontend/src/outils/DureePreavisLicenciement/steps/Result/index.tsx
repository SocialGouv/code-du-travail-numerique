import { WizardStepProps } from "../../../common/type/WizardType";
import { recapSituation } from "../../../common/situations.utils";
import { SectionTitle } from "../../../common/stepStyles";
import ShowDetails from "../../../common/ShowDetails";
import PubliReferences from "../../../common/PubliReferences";
import { formatRefs } from "../../../publicodes";
import Disclaimer from "../../../common/Disclaimer";
import React from "react";
import { preavisLicenciementData as data } from "@cdt/data";
import { DisplayResult, DurationResult, DisclaimerText } from "./Components";
import { buildRecap, getRefs, getResult, getSituations } from "./utils";

const { situations: allSituations } = data;

const StepResult = ({ form }: WizardStepProps): JSX.Element => {
  const { values } = form.getState();
  const {
    ccn,
    cdt = {},
    seriousMisconduct,
    disabledWorker,
    criteria = {},
  } = values;
  const idcc = ccn?.selected ? ccn.selected.num : 0;

  const situations = getSituations(allSituations, cdt, criteria, idcc);

  const refs = getRefs(situations);

  const duration = getResult({
    disabledWorker,
    legalSituation: situations.legal,
    agreementSituation: situations.agreement,
  });

  return (
    <>
      <SectionTitle>Durée du préavis</SectionTitle>
      <DurationResult
        duration={duration}
        agreementSituation={situations.agreement}
        legalSituation={situations.legal}
      />

      <ShowDetails>
        <DisplayResult
          idcc={idcc}
          legalSituation={situations.legal}
          agreementSituation={situations.agreement}
        />
        <SectionTitle>Éléments saisis</SectionTitle>
        {recapSituation(
          buildRecap(
            disabledWorker,
            seriousMisconduct,
            situations.legal,
            situations.agreement,
            ccn
          )
        )}
        {situations.agreement && (
          <PubliReferences references={formatRefs(refs)} />
        )}
      </ShowDetails>
      <Disclaimer title={"Attention il peut exister une durée plus favorable"}>
        <DisclaimerText
          agreementSituation={situations.agreement}
          legalSituation={situations.legal}
          ccn={ccn?.selected}
        />
      </Disclaimer>
    </>
  );
};

export { StepResult };
