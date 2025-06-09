import React, { useContext, useEffect } from "react";
import { PreavisDemissionContext, usePreavisDemissionStore } from "../store";
import { fr } from "@codegouvfr/react-dsfr";

const ResultStepComponent = (): JSX.Element => {
  const store = useContext(PreavisDemissionContext);
  const { result, isAgreementSupported, agreement, getPublicodesResult } =
    usePreavisDemissionStore(store, (state) => ({
      result: state.resultData.input.result,
      isAgreementSupported: state.resultData.input.isAgreementSupported,
      agreement: state.agreementData.input.agreement,
      getPublicodesResult: state.resultFunction.getPublicodesResult,
    }));

  useEffect(() => {
    getPublicodesResult();
  }, [getPublicodesResult]);

  if (!result) {
    return <div>Calcul en cours...</div>;
  }

  return (
    <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
      <h2 className={fr.cx("fr-mt-3w")}>Préavis de démission</h2>
      <p className={fr.cx("fr-mb-3w", "fr-pr-md-2v")}>
        À partir des éléments que vous avez saisis
        {result.value != null && result.value > 0
          ? ", la durée du préavis de démission est estimée à"
          : ""}
        &nbsp;:
      </p>
      <p data-testid="resultat">
        <strong className={fr.cx("fr-h2")}>
          {result.value != null && result.value > 0 ? (
            <>
              {result.value}
              &nbsp;
              {result.unit?.toString() || ""}
            </>
          ) : (
            <>il n&apos;y a pas de préavis à effectuer</>
          )}
        </strong>
      </p>

      {!isAgreementSupported && agreement && (
        <div className={fr.cx("fr-mt-4w")}>
          <h3 className={fr.cx("fr-h5")}>
            Attention il peut exister une autre durée de préavis
          </h3>
          <p>
            L&apos;existence ou la durée du préavis de démission peut être
            prévue par un accord d&apos;entreprise ou à défaut, par un usage
            dans l&apos;entreprise.
          </p>
        </div>
      )}

      <h2 className={fr.cx("fr-h4", "fr-mt-4w")}>Détail du calcul</h2>
      <h3 className={fr.cx("fr-h5", "fr-mb-0")}>Les éléments saisis</h3>
      <ul>
        <li data-testid="situation-convention-collective">
          Convention collective :{" "}
          <strong>
            {agreement
              ? `${agreement.shortTitle} (IDCC ${agreement.num})`
              : "Code du travail"}
          </strong>
        </li>
      </ul>

      <div className={fr.cx("fr-mt-4w")}>
        <h3 className={fr.cx("fr-h5")}>Informations importantes</h3>
        <p>
          Le préavis débute le jour où le salarié remet sa lettre de démission
          en main propre ou à la date de première présentation de la lettre
          recommandée, peu importe le jour de son retrait par l&apos;employeur.
        </p>
        <p>
          L&apos;employeur et le salarié peuvent fixer d&apos;un commun accord
          une date de départ anticipée, libérant ainsi le salarié de
          l&apos;exécution de la totalité ou d&apos;une partie du préavis.
        </p>
      </div>
    </div>
  );
};

export default ResultStepComponent;
