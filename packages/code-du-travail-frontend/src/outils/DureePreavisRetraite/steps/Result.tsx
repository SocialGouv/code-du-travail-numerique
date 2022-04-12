import React, { useEffect } from "react";

import PubliReferences from "../../common/PubliReferences";
import ShowDetails from "../../common/ShowDetails";
import { PreavisRetraiteFormContent } from "../../common/type/WizardType";
import {
  mapToPublicodesSituationForPreavisDeRetraite,
  PublicodesPreavisRetraiteResult,
  usePublicodes,
} from "../../publicodes";
import DecryptedResult from "./component/DecryptedResult";
import ShowResult from "./component/ShowResult";
import { Situation } from "./component/Situation";
import WarningResult from "./component/WarningResult";

type Props = {
  values: PreavisRetraiteFormContent;
};

function ResultStep({ values }: Props): JSX.Element {
  const publicodesContext = usePublicodes<PublicodesPreavisRetraiteResult>();
  const type =
    publicodesContext.situation.find(
      (item) => item.name === "contrat salarié - mise à la retraite"
    )?.value === "oui"
      ? "mise"
      : "départ";

  const notifications = publicodesContext.getNotifications();
  const agreementMaximumResult = publicodesContext.execute(
    "contrat salarié . préavis de retraite collective maximum en jours"
  );

  useEffect(() => {
    publicodesContext.setSituation(
      mapToPublicodesSituationForPreavisDeRetraite(values)
    );
  }, []);

  return (
    <>
      <ShowResult
        notifications={notifications}
        agreementMaximumResult={agreementMaximumResult}
        type={type}
        publicodesResult={publicodesContext.result}
      />
      <ShowDetails>
        <Situation content={values} elements={publicodesContext.situation} />
        <DecryptedResult data={values} />
        <PubliReferences references={publicodesContext.getReferences()} />
      </ShowDetails>
      <WarningResult
        resultValueInDays={publicodesContext.result.valueInDays}
        type={type}
        ccNumber={values?.ccn?.selected?.num}
      />
    </>
  );
}

export { ResultStep };
