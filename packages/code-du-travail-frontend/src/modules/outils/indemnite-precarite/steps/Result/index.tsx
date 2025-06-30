import React, { useContext, useEffect } from "react";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../store";
import { fr } from "@codegouvfr/react-dsfr";
import Alert from "@codegouvfr/react-dsfr/Alert";

const ResultStepComponent = (): JSX.Element => {
  const store = useContext(IndemnitePrecariteContext);
  const {
    result,
    isCalculating,
    calculationError,
    isAgreementSupported,
    resultNotifications,
    resultReferences,
    contractType,
    agreement,
    remunerationInput,
    criteria,
    calculateResult,
    resetResult,
  } = useIndemnitePrecariteStore(store, (state) => ({
    result: state.resultData.result,
    isCalculating: state.resultData.isCalculating,
    calculationError: state.resultData.calculationError,
    isAgreementSupported: state.resultData.isAgreementSupported,
    resultNotifications: state.resultData.resultNotifications,
    resultReferences: state.resultData.resultReferences,
    contractType: state.informationsData.input.contractType,
    agreement: state.agreementData.input.agreement,
    remunerationInput: state.remunerationData.input,
    criteria: state.informationsData.input.criteria,
    calculateResult: state.resultFunction.calculateResult,
    resetResult: state.resultFunction.resetResult,
  }));

  // Calculer le résultat automatiquement au chargement du composant
  useEffect(() => {
    calculateResult();
  }, [calculateResult]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getTotalSalary = () => {
    if (
      remunerationInput.typeRemuneration === "total" &&
      remunerationInput.salaire
    ) {
      return remunerationInput.salaire;
    } else if (
      remunerationInput.typeRemuneration === "mensuel" &&
      remunerationInput.salaires
    ) {
      return remunerationInput.salaires.reduce((sum, entry) => {
        return sum + (entry.salaire || 0);
      }, 0);
    }
    return 0;
  };

  if (isCalculating) {
    return (
      <div className="fr-mb-3w">
        <h3>Résultat</h3>
        <p>Calcul en cours...</p>
      </div>
    );
  }

  if (calculationError) {
    return (
      <div className="fr-mb-3w">
        <h3>Résultat</h3>
        <div className="fr-alert fr-alert--error fr-mb-3w">
          <p>Une erreur est survenue lors du calcul : {calculationError}</p>
          <button
            className="fr-btn fr-btn--secondary"
            onClick={calculateResult}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="fr-mb-3w">
        <h3>Résultat</h3>
        <p>Aucun résultat disponible.</p>
      </div>
    );
  }

  return (
    <div className="fr-mb-3w">
      <h3>Résultat de votre simulation</h3>

      {result.isEligible ? (
        <div>
          {/* Résultat principal */}
          <div className="fr-alert fr-alert--success fr-mb-3w">
            <h4 className="fr-alert__title">
              ✅ Vous avez droit à une indemnité de précarité
            </h4>
            <div
              style={{ fontSize: "2rem", fontWeight: "bold", margin: "1rem 0" }}
            >
              {formatCurrency(result.amount || 0)}
            </div>
            <p>
              Montant estimé de votre{" "}
              {contractType === "CTT"
                ? "indemnité de fin de mission"
                : "indemnité de précarité"}
            </p>
          </div>

          {/* Détails du calcul */}
          {result.details && (
            <div className="fr-card fr-mb-3w">
              <div className="fr-card__body">
                <h4 className="fr-card__title">Détail du calcul</h4>
                <div className="fr-grid-row fr-grid-row--gutters">
                  <div className="fr-col-12">
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        gap: "0.5rem 1rem",
                      }}
                    >
                      <span>Rémunération brute de référence :</span>
                      <span>
                        <strong>{formatCurrency(getTotalSalary())}</strong>
                      </span>

                      <hr
                        style={{ gridColumn: "1 / -1", margin: "0.5rem 0" }}
                      />

                      <span>Base de calcul :</span>
                      <span>
                        <strong>
                          {formatCurrency(result.details.baseAmount || 0)}
                        </strong>
                      </span>

                      <span>Taux appliqué :</span>
                      <span>
                        <strong>
                          {((result.details.rate || 0.1) * 100).toFixed(1)}%
                        </strong>
                      </span>

                      <hr
                        style={{ gridColumn: "1 / -1", margin: "0.5rem 0" }}
                      />

                      <span style={{ fontSize: "1.1rem" }}>
                        <strong>Indemnité calculée :</strong>
                      </span>
                      <span
                        style={{
                          fontSize: "1.1rem",
                          color: "var(--blue-france-sun-113-625)",
                        }}
                      >
                        <strong>{formatCurrency(result.amount || 0)}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Informations sur la convention collective */}
          {agreement && (
            <div className="fr-card fr-mb-3w">
              <div className="fr-card__body">
                <h4 className="fr-card__title">
                  Convention collective appliquée
                </h4>
                <p>
                  <strong>{agreement.title}</strong> (IDCC {agreement.num})
                </p>
                {isAgreementSupported && (
                  <p className="fr-text--sm">
                    Cette convention collective prévoit des dispositions
                    particulières pour le calcul de l&apos;indemnité.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Notifications publicodes */}
          {resultNotifications && resultNotifications.length > 0 && (
            <div className="fr-card fr-mb-3w">
              <div className="fr-card__body">
                <h4 className="fr-card__title">Informations complémentaires</h4>
                {resultNotifications.map((notification, index) => (
                  <div key={index} className="fr-alert fr-alert--info fr-mb-2w">
                    <p>{notification.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Cas d&apos;inéligibilité */}
          <div className="fr-alert fr-alert--error fr-mb-3w">
            <h4 className="fr-alert__title">
              ❌ Vous n&apos;avez pas droit à une indemnité de précarité
            </h4>
            <p>
              {result.reason ||
                "Selon votre situation, vous n&apos;êtes pas éligible à cette indemnité."}
            </p>
          </div>
        </div>
      )}

      {/* Disclaimer - Attention il peut exister un montant plus favorable */}
      {result.isEligible && (
        <Alert
          severity="info"
          title="Attention il peut exister un montant plus favorable"
          className={fr.cx("fr-mb-3w")}
          description={
            <div>
              {agreement && agreement.num > 0 ? (
                <div>
                  <p>
                    Un accord d&apos;entreprise peut prévoir un montant
                    différent qu&apos;il soit plus élevé ou plus faible. Dans ce
                    cas, s&apos;applique le montant prévu par l&apos;accord
                    d&apos;entreprise, sauf si le contrat de travail prévoit un
                    montant plus favorable pour le salarié.
                  </p>
                  {!isAgreementSupported && (
                    <p>
                      Attention, dans le cas où l&apos;accord d&apos;entreprise
                      prévoit un taux inférieur à 10% dans la limite de 6%, il
                      doit y avoir des contreparties offertes au salarié,
                      notamment sous la forme d&apos;un accès privilégié à la
                      formation professionnelle (action de formation, bilan de
                      compétences).
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <p>
                    Une convention collective de branche étendue ou un accord
                    d&apos;entreprise peut prévoir un montant différent
                    qu&apos;il soit plus élevé ou plus faible que celui prévu
                    par le code du travail.
                  </p>
                  <p>
                    Attention, dans le cas où la convention ou l&apos;accord
                    collectif prévoit un taux inférieur à 10% dans la limite de
                    6%, il doit y avoir des contreparties offertes au salarié,
                    notamment sous la forme d&apos;un accès privilégié à la
                    formation professionnelle (action de formation, bilan de
                    compétences). Dans tous les cas, le contrat de travail peut
                    prévoir un montant plus favorable pour le salarié. Il faut
                    alors appliquer ce montant.
                  </p>
                </div>
              )}
            </div>
          }
        />
      )}

      {/* Informations légales */}
      <div className="fr-alert fr-alert--warning fr-mb-3w">
        <h4 className="fr-alert__title">⚖️ Informations légales</h4>
        <ul>
          <li>
            Cette simulation est donnée à titre indicatif et ne constitue pas un
            conseil juridique
          </li>
          <li>
            Le montant réel peut varier selon les spécificités de votre contrat
            et votre convention collective
          </li>
          <li>
            L&apos;indemnité de précarité est soumise aux cotisations sociales
            mais exonérée d&apos;impôt sur le revenu dans certaines limites
          </li>
          <li>
            En cas de litige, consultez un professionnel du droit du travail
          </li>
        </ul>
      </div>

      {/* Récapitulatif de la situation */}
      <div className="fr-card fr-mb-3w">
        <div className="fr-card__body">
          <h4 className="fr-card__title">
            📋 Récapitulatif de votre situation
          </h4>
          <div>
            <p>
              <strong>Type de contrat :</strong>{" "}
              {contractType === "CDD"
                ? "Contrat à durée déterminée"
                : "Contrat de travail temporaire (intérim)"}
            </p>

            {criteria?.cddType && (
              <p>
                <strong>Type de CDD :</strong> {criteria.cddType}
              </p>
            )}

            {agreement ? (
              <p>
                <strong>Convention collective :</strong> {agreement.title} (IDCC{" "}
                {agreement.num})
              </p>
            ) : (
              <p>
                <strong>Convention collective :</strong> Aucune sélectionnée
                (dispositions légales appliquées)
              </p>
            )}

            <p>
              <strong>Type de rémunération :</strong>{" "}
              {remunerationInput.typeRemuneration === "total"
                ? "Montant total"
                : "Salaires mensuels"}
            </p>

            <p>
              <strong>Rémunération brute de référence :</strong>{" "}
              {formatCurrency(getTotalSalary())}
            </p>
          </div>
        </div>
      </div>

      {/* Références légales */}
      {resultReferences && resultReferences.length > 0 && (
        <div className="fr-card fr-mb-3w">
          <div className="fr-card__body">
            <h4 className="fr-card__title">📚 Références légales</h4>
            <ul>
              {resultReferences.map((ref, index) => (
                <li key={index}>
                  {ref.url ? (
                    <a href={ref.url} target="_blank" rel="noopener noreferrer">
                      {ref.article}
                    </a>
                  ) : (
                    ref.article
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="fr-btns-group fr-btns-group--center fr-mb-3w">
        <button
          className="fr-btn fr-btn--secondary"
          onClick={() => window.print()}
        >
          🖨️ Imprimer le résultat
        </button>

        <button
          className="fr-btn"
          onClick={() => {
            resetResult();
            // Ici on pourrait ajouter une logique pour revenir au début
            console.log("Reset functionality - navigate to first step");
          }}
        >
          🔄 Nouvelle simulation
        </button>
      </div>
    </div>
  );
};

export default ResultStepComponent;
