import React from "react";
import { PublicodesPreavisRetraiteResult } from "../../../publicodes";
import { ShowResult } from "./Components";
import { Notification } from "@socialgouv/modeles-social";

export type ResultStepProps = {
  notice: {
    publicodesResult: PublicodesPreavisRetraiteResult;
    agreementMaximumResult: PublicodesPreavisRetraiteResult;
    type: "mise" | "départ";
    notifications: Notification[];
  };
};

function ResultStep({ notice }: ResultStepProps): JSX.Element {
  /*
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
*/
  return (
    <>
      <ShowResult {...notice} />
      {/*
        <ShowDetails>
          <Situation content={values} elements={publicodesContext.situation}/>
          <DecryptedResult data={values}/>
          <PubliReferences references={publicodesContext.getReferences()}/>
        </ShowDetails>
        <WarningResult
        resultValueInDays={publicodesContext.result.valueInDays}
        type={type}
        ccNumber={values?.ccn?.selected?.num}
        />
      */}
    </>
  );
}

export default ResultStep;
