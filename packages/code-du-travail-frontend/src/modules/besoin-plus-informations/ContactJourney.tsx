"use client";

import { useEffect, useRef, useState } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { scrollToTop } from "src/modules/outils/common/utils";
import { ThemeStep, ThemeStepError } from "./steps/ThemeStep";
import { ChannelStep } from "./steps/ChannelStep";
import { ResultStep } from "./steps/ResultStep";
import { AppointmentLink, AppointmentStep } from "./steps/AppointmentStep";
import { FrequentQuestions } from "./FrequentQuestions";
import { isOffScopeTheme, ThemeKey } from "./contactThemes";
import { ChannelKey } from "./contactChannels";
import { useNeedMoreInfoEvents } from "./tracking";

// Les écrans du parcours. « phone » et « rdv » sont les deux variantes de
// l'étape 3, selon le moyen de contact choisi.
type Step = "theme" | "channel" | "phone" | "rdv";

// Parcours « Contacter nos services en région » en 3 étapes : thème → moyen de
// contact → téléphone ou rendez-vous sur place. Le canal « Formulaire et
// courriel » du parcours cible n'est pas livré (cf. issues #7370 et #7480).
export const ContactJourney = () => {
  const [step, setStep] = useState<Step>("theme");
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey | undefined>(
    undefined
  );
  const [selectedChannel, setSelectedChannel] = useState<
    ChannelKey | undefined
  >(undefined);
  const [selectedDepartement, setSelectedDepartement] = useState<
    string | undefined
  >(undefined);
  // Échec de validation de l'écran 1 : le parcours reste sur place et l'erreur
  // s'affiche sous le champ (et en alerte pour un thème hors périmètre).
  const [themeError, setThemeError] = useState<ThemeStepError | undefined>(
    undefined
  );
  // Échec de validation de l'écran 2 : aucun moyen de contact choisi.
  const [channelError, setChannelError] = useState(false);
  const stepContentRef = useRef<HTMLDivElement>(null);
  // Distingue le premier rendu d'un changement d'étape : à l'arrivée sur la
  // page, on ne vole pas le focus à l'usager.
  const hasNavigatedRef = useRef(false);
  const { emitSelectTheme, emitSelectChannel, emitSelectDepartement } =
    useNeedMoreInfoEvents();

  useEffect(() => {
    if (!hasNavigatedRef.current) return;
    stepContentRef.current?.focus();
    scrollToTop();
  }, [step]);

  const goTo = (next: Step) => {
    hasNavigatedRef.current = true;
    setStep(next);
  };

  // Tout nouveau choix efface l'erreur : on ne reproche pas à l'usager un
  // choix qu'il vient de corriger.
  const onSelectTheme = (theme: ThemeKey) => {
    setSelectedTheme(theme);
    setThemeError(undefined);
  };

  const onSelectChannel = (channel: ChannelKey) => {
    setSelectedChannel(channel);
    setChannelError(false);
  };

  const onSelectDepartement = (code: string) => {
    setSelectedDepartement(code);
    emitSelectDepartement(code);
  };

  const onNextFromTheme = () => {
    if (!selectedTheme) {
      setThemeError({ kind: "missing-theme" });
      return;
    }

    emitSelectTheme(selectedTheme);

    if (isOffScopeTheme(selectedTheme)) {
      setThemeError({ kind: "off-scope", theme: selectedTheme });
      return;
    }

    goTo("channel");
  };

  const onNextFromChannel = () => {
    if (!selectedChannel) {
      setChannelError(true);
      return;
    }

    emitSelectChannel(selectedChannel);
    goTo(selectedChannel === "rdv" ? "rdv" : "phone");
  };

  // Retour à l'écran précédent en conservant les saisies.
  const onPrevious = () => {
    goTo(step === "channel" ? "theme" : "channel");
  };

  const onNext = step === "theme" ? onNextFromTheme : onNextFromChannel;
  const hasNext = step === "theme" || step === "channel";
  const hasPrevious = step !== "theme";

  return (
    <div>
      <div ref={stepContentRef} tabIndex={-1} className={stepContent}>
        {step === "theme" && (
          <ThemeStep
            selectedTheme={selectedTheme}
            onSelectTheme={onSelectTheme}
            error={themeError}
          />
        )}
        {step === "channel" && (
          <ChannelStep
            selectedChannel={selectedChannel}
            onSelectChannel={onSelectChannel}
            error={channelError}
          />
        )}
        {step === "phone" && <ResultStep />}
        {step === "rdv" && (
          <AppointmentStep
            selectedDepartement={selectedDepartement}
            onSelectDepartement={onSelectDepartement}
          />
        )}
      </div>
      {/* L'action passe avant les questions fréquentes : reléguée sous la
          liste, elle n'était plus lue comme la suite du parcours. Les boutons
          sont alignés à droite, en fin de formulaire, « Précédent » d'abord
          puis l'action principale (« Suivant », ou le lien de prise de
          rendez-vous qui en tient lieu à la dernière étape). */}
      <div
        className={`${fr.cx("fr-mt-4w", "fr-grid-row", "fr-grid-row--right")} ${actions}`}
      >
        {hasPrevious && (
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
        {hasNext && (
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
        )}
        {step === "rdv" && (
          <AppointmentLink selectedDepartement={selectedDepartement} />
        )}
      </div>
      {step === "theme" && <FrequentQuestions />}
    </div>
  );
};

// Conteneur d'étape ciblé par le focus programmatique au changement d'écran.
// Il n'est pas atteignable au clavier (tabIndex={-1}) : l'anneau de focus par
// défaut, qui entourerait tout l'écran, n'a donc pas lieu d'être affiché.
const stepContent = css({
  outline: "none",
});

// 16px entre « Précédent » et l'action principale quand ils cohabitent.
const actions = css({
  gap: "1rem",
});
