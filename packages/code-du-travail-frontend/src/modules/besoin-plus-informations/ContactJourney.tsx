"use client";

import { useEffect, useRef, useState } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { scrollToTop } from "src/modules/outils/common/utils";
import { ThemeStep, ThemeStepError } from "./steps/ThemeStep";
import { ResultStep } from "./steps/ResultStep";
import { FrequentQuestions } from "./FrequentQuestions";
import { isOffScopeTheme, ThemeKey } from "./contactThemes";
import { useNeedMoreInfoEvents } from "./tracking";

type Step = "question" | "result";

// Parcours « Contacter nos services en région » en 2 écrans (thème → résultat).
// Le choix du canal et le formulaire de contact du parcours cible sont
// volontairement retirés de cette itération : le canal téléphone est le seul
// livré (cf. issue #7370).
export const ContactJourney = () => {
  const [step, setStep] = useState<Step>("question");
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey | undefined>(
    undefined
  );
  // Échec de validation de l'écran 1 : le parcours reste sur place et l'erreur
  // s'affiche sous le champ (et en alerte pour un thème hors périmètre).
  const [error, setError] = useState<ThemeStepError | undefined>(undefined);
  const stepContentRef = useRef<HTMLDivElement>(null);
  // Distingue le premier rendu d'un changement d'étape : à l'arrivée sur la
  // page, on ne vole pas le focus à l'usager.
  const hasNavigatedRef = useRef(false);
  const { emitSelectTheme } = useNeedMoreInfoEvents();

  useEffect(() => {
    if (!hasNavigatedRef.current) return;
    stepContentRef.current?.focus();
    scrollToTop();
  }, [step]);

  // Tout nouveau choix efface l'erreur : on ne reproche pas à l'usager un thème
  // qu'il vient de corriger.
  const onSelectTheme = (theme: ThemeKey) => {
    setSelectedTheme(theme);
    setError(undefined);
  };

  const onNext = () => {
    if (!selectedTheme) {
      setError({ kind: "missing-theme" });
      return;
    }

    emitSelectTheme(selectedTheme);

    if (isOffScopeTheme(selectedTheme)) {
      setError({ kind: "off-scope", theme: selectedTheme });
      return;
    }

    hasNavigatedRef.current = true;
    setStep("result");
  };

  // Retour à l'écran de sélection en conservant le thème choisi.
  const onPrevious = () => {
    hasNavigatedRef.current = true;
    setStep("question");
  };

  return (
    <div>
      <div ref={stepContentRef} tabIndex={-1} className={stepContent}>
        {step === "question" ? (
          <ThemeStep
            selectedTheme={selectedTheme}
            onSelectTheme={onSelectTheme}
            error={error}
          />
        ) : (
          <ResultStep />
        )}
      </div>
      {/* L'action passe avant les questions fréquentes : reléguée sous la
          liste, elle n'était plus lue comme la suite du parcours. « Suivant »
          est aligné à droite, en fin de formulaire ; « Précédent » reste à
          gauche, du côté d'où l'on revient. */}
      <div
        className={fr.cx("fr-mt-4w", "fr-grid-row", {
          "fr-grid-row--right": step === "question",
        })}
      >
        {step === "question" ? (
          <Button
            onClick={onNext}
            priority="primary"
            iconId="fr-icon-arrow-right-line"
            iconPosition="right"
            nativeButtonProps={{ type: "button" }}
            data-testid="next-button"
          >
            Suivant
          </Button>
        ) : (
          <Button
            onClick={onPrevious}
            priority="secondary"
            iconId="fr-icon-arrow-left-line"
            iconPosition="left"
            nativeButtonProps={{ type: "button" }}
            data-testid="previous-button"
          >
            Précédent
          </Button>
        )}
      </div>
      {step === "question" && <FrequentQuestions />}
    </div>
  );
};

// Conteneur d'étape ciblé par le focus programmatique au changement d'écran.
// Il n'est pas atteignable au clavier (tabIndex={-1}) : l'anneau de focus par
// défaut, qui entourerait tout l'écran, n'a donc pas lieu d'être affiché.
const stepContent = css({
  outline: "none",
});
