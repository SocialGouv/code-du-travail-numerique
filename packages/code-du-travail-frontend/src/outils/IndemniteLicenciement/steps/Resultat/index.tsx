import { getSupportedCcIndemniteLicenciement } from "@socialgouv/modeles-social";
import React from "react";
import PubliReferences from "../../../common/PubliReferences";
import ShowDetails from "../../../common/ShowDetails";

import { useIndemniteLicenciementStore } from "../../store";
import {
  AgreementInfo,
  DecryptResult,
  FilledElements,
  ForMoreInfo,
  Formula,
  Result,
} from "./components";

const StepResult = () => {
  const {
    publicodesLegalResult,
    publicodesAgreementResult,
    getPublicodesResult,
    typeContratTravail,
    licenciementInaptitude,
    licenciementFauteGrave,
    agreement,
    route,
    dateEntree,
    dateSortie,
    dateNotification,
    absencePeriods,
    salaryPeriods,
    legalFormula,
  } = useIndemniteLicenciementStore((state) => ({
    publicodesLegalResult: state.resultData.input.publicodesLegalResult,
    publicodesAgreementResult: state.resultData.input.publicodesAgreementResult,
    getPublicodesResult: state.resultFunction.getPublicodesResult,
    typeContratTravail: state.contratTravailData.input.typeContratTravail,
    licenciementInaptitude:
      state.contratTravailData.input.licenciementInaptitude,
    licenciementFauteGrave:
      state.contratTravailData.input.licenciementFauteGrave,
    agreement: state.agreementData.input.agreement,
    route: state.agreementData.input.route,
    dateEntree: state.ancienneteData.input.dateEntree,
    dateSortie: state.ancienneteData.input.dateSortie,
    dateNotification: state.ancienneteData.input.dateNotification,
    absencePeriods: state.ancienneteData.input.absencePeriods,
    salaryPeriods: state.salairesData.input.salaryPeriods,
    legalFormula: state.resultData.input.legalFormula,
  }));

  React.useEffect(() => {
    getPublicodesResult();
  }, []);

  return (
    <>
      <Result
        legalResult={publicodesLegalResult.value?.toString() ?? ""}
        agreementResult={publicodesAgreementResult?.value?.toString()}
      />
      <ShowDetails>
        <FilledElements
          absencesPeriods={absencePeriods}
          agreementName={agreement?.shortTitle}
          typeContrat={typeContratTravail!.toString()}
          isLicenciementFauteGrave={
            licenciementFauteGrave === "oui" ? true : false
          }
          isLicenciementInaptitude={
            licenciementInaptitude === "oui" ? true : false
          }
          dateEntree={dateEntree!}
          dateSortie={dateSortie!}
          dateNotification={dateNotification!}
          salaryPeriods={salaryPeriods}
        />
        <Formula formula={legalFormula} />
        <DecryptResult
          hasSelectedAgreement={route === "agreement"}
          isAgreementSupported={
            getSupportedCcIndemniteLicenciement().find(
              (v) => v.value === `IDCC${agreement?.num}`
            )
              ? true
              : false
          }
          legalResult={publicodesLegalResult.value?.toString() ?? ""}
          agreementResult={publicodesAgreementResult?.value?.toString()}
        />

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
        <AgreementInfo
          hasSelectedAgreement={route === "agreement"}
          isAgreementSupported={
            getSupportedCcIndemniteLicenciement().find(
              (v) => v.value === `IDCC${agreement?.num}`
            )
              ? true
              : false
          }
        />
        <ForMoreInfo />
      </ShowDetails>
    </>
  );
};

export default StepResult;
