"use client";

import React, { useState } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { css } from "@styled-system/css";
import Link from "src/modules/common/Link";
import { RadioQuestion } from "src/modules/outils/common/components/RadioQuestion";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import { needMoreInfoModal } from "./contactModal";
import { useNeedMoreInfoEvents } from "./tracking";
import {
  CONTACT_THEMES,
  FREQUENT_QUESTIONS,
  isOffScopeTheme,
  OFF_SCOPE_THEME_MESSAGES,
  SRDT_PHONE,
  SRDT_THEME,
  ThemeKey,
} from "./contactThemes";

const ContactModalComponent =
  needMoreInfoModal.Component as unknown as React.ComponentType<any>;

type Step = "question" | "result";

// Vue + machine à états de la modale « Contacter nos services en région ».
// Parcours en 2 écrans (thème → résultat). Le choix du canal et le formulaire de
// contact du parcours cible sont volontairement retirés de cette itération : le
// canal téléphone est le seul livré (cf. issue #7370).
export const ContactModalView = () => {
  const [step, setStep] = useState<Step>("question");
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey | undefined>(
    undefined
  );
  const { emitSelectTheme, emitTrackNumber } = useNeedMoreInfoEvents();

  // Réinitialise le parcours à chaque fermeture (X, Échap, overlay, « Fermer »),
  // pour repartir de l'écran de sélection à la réouverture.
  useIsModalOpen(needMoreInfoModal, {
    onConceal: () => {
      setStep("question");
      setSelectedTheme(undefined);
    },
  });

  const onNext = () => {
    if (!selectedTheme) return;
    emitSelectTheme(selectedTheme);
    setStep("result");
  };

  const buttons =
    step === "question"
      ? [
          {
            children: "Suivant",
            priority: "primary" as const,
            disabled: !selectedTheme,
            // Ne pas fermer la modale : on avance vers l'écran résultat.
            doClosesModal: false,
            onClick: onNext,
            nativeButtonProps: {
              type: "button" as const,
              "aria-disabled": !selectedTheme,
            },
          },
        ]
      : [
          {
            children: "Fermer",
            priority: "primary" as const,
            nativeButtonProps: { type: "button" as const },
          },
        ];

  return (
    <ContactModalComponent
      title="Contacter nos services en région"
      size="large"
      buttons={buttons}
    >
      {step === "question" ? (
        <>
          <RadioQuestion
            name="contact-theme"
            label="Précisez votre question"
            selectedOption={selectedTheme}
            onChangeSelectedOption={(value) =>
              setSelectedTheme(value as ThemeKey)
            }
            questions={CONTACT_THEMES.map((theme) => ({
              label: theme.label,
              value: theme.key,
              id: `contact-theme-${theme.key}`,
            }))}
          />
          <div className={fr.cx("fr-mt-4w")}>
            <p className={fr.cx("fr-text--bold", "fr-mb-1w")}>
              Questions les plus fréquentes
            </p>
            <ul className={questionsList}>
              {FREQUENT_QUESTIONS.map((question) => (
                <li key={question.href} className={fr.cx("fr-mb-1w")}>
                  <Link className={fr.cx("fr-link")} href={question.href}>
                    {question.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : selectedTheme === SRDT_THEME ? (
        <div data-testid="contact-phone-result">
          <p className={fr.cx("fr-mb-2w")}>
            Contactez les services de renseignement en droit du travail :
          </p>
          <Link
            className={phoneLink}
            href={SRDT_PHONE.href}
            onClick={emitTrackNumber}
          >
            {SRDT_PHONE.display}
          </Link>
        </div>
      ) : selectedTheme && isOffScopeTheme(selectedTheme) ? (
        <AccessibleAlert
          severity="error"
          data-testid="contact-error-result"
          description={OFF_SCOPE_THEME_MESSAGES[selectedTheme]}
        />
      ) : null}
    </ContactModalComponent>
  );
};

const questionsList = css({
  listStyle: "none",
  paddingLeft: 0,
  margin: 0,
});

const phoneLink = css({
  display: "inline-block",
  fontSize: "2rem",
  fontWeight: 700,
});
