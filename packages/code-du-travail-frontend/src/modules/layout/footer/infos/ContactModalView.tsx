"use client";

import React, { useState } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { css } from "@styled-system/css";
import Link from "src/modules/common/Link";
import { SelectQuestion } from "src/modules/outils/common/components/SelectQuestion";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import { needMoreInfoModal } from "./contactModal";
import { useNeedMoreInfoEvents } from "./tracking";
import {
  CONTACT_THEMES,
  FREQUENT_QUESTIONS,
  isOffScopeTheme,
  OFF_SCOPE_THEME_MESSAGES,
  SRDT_PHONE,
  SRDT_PHONE_CAVEATS,
  SRDT_THEME,
  ThemeKey,
} from "./contactThemes";

const ContactModalComponent =
  needMoreInfoModal.Component as unknown as React.ComponentType<any>;

type Step = "question" | "result";

// Le parcours cible comporte plus d'étapes (choix du canal, formulaire de
// contact) ; cette itération ne livre que le canal téléphone, soit 2 écrans
// (thème → résultat). Cf. issue #7370.
const TOTAL_STEPS = 2;

// Fil d'étapes DSFR (« fr-stepper »), même pattern que SimulatorLayout. Le titre
// d'étape est un h2 (le titre de la modale sert de h1).
const ContactStepper = ({
  current,
  title,
}: {
  current: number;
  title: string;
}) => (
  <div className={fr.cx("fr-stepper", "fr-mb-2w")}>
    <h2 className={fr.cx("fr-stepper__title")}>
      {title}
      <span className={fr.cx("fr-stepper__state")}>
        Étape {current} sur {TOTAL_STEPS}
      </span>
    </h2>
    <div
      className={fr.cx("fr-stepper__steps")}
      data-fr-current-step={current}
      data-fr-steps={TOTAL_STEPS}
    />
  </div>
);

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
            children: "Fermer",
            priority: "secondary" as const,
            nativeButtonProps: { type: "button" as const },
          },
          {
            children: "Suivant",
            priority: "primary" as const,
            disabled: !selectedTheme,
            iconId: "fr-icon-arrow-right-line",
            iconPosition: "right" as const,
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

  const isPhoneResult = step === "result" && selectedTheme === SRDT_THEME;

  return (
    <ContactModalComponent
      title="Contacter nos services en région"
      size="large"
      buttons={buttons}
    >
      {step === "question" ? (
        <>
          <ContactStepper current={1} title="Précisez votre question" />
          <AccessibleAlert
            severity="info"
            small
            description="Nous répondons uniquement aux questions portant sur le droit du travail."
          />
          <div className={fr.cx("fr-mt-3w")}>
            <SelectQuestion
              name="contact-theme"
              label="Quel thème concerne votre question ?"
              placeholder="Sélectionner un thème"
              subLabel="Si vous souhaitez aborder plusieurs sujets, sélectionnez le plus important pour vous."
              options={CONTACT_THEMES.map(
                (theme) => [theme.key, theme.label] as [string, string]
              )}
              selectedOption={selectedTheme}
              onChangeSelectedOption={(value) =>
                setSelectedTheme(value as ThemeKey)
              }
            />
          </div>
          <div className={fr.cx("fr-mt-4w")}>
            <p className={fr.cx("fr-text--lead", "fr-text--bold", "fr-mb-2w")}>
              Questions les plus fréquentes
            </p>
            <ul className={questionsList}>
              {FREQUENT_QUESTIONS.map((question) => (
                <li key={question.href} className={questionItem}>
                  <span
                    className={`${fr.cx("fr-icon-arrow-right-line")} ${questionArrow}`}
                    aria-hidden="true"
                  />
                  <Link className={fr.cx("fr-link")} href={question.href}>
                    {question.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : isPhoneResult ? (
        <div data-testid="contact-phone-result">
          <ContactStepper current={2} title="Par téléphone" />
          <p className={fr.cx("fr-mb-2w")}>
            Contactez les services de renseignement en droit du travail :
          </p>
          <div className={phoneBlock}>
            <Link
              className={phoneNumber}
              href={SRDT_PHONE.href}
              onClick={emitTrackNumber}
            >
              {SRDT_PHONE.display}
            </Link>
            <span className={phoneBadge}>
              {SRDT_PHONE.tarification[0]}
              <br />
              {SRDT_PHONE.tarification[1]}
            </span>
          </div>
          <AccessibleAlert
            severity="info"
            small
            description={
              <>
                <p className={fr.cx("fr-mb-1w")}>
                  Attention, ces services délivrent une information juridique,
                  ils ne sont pas compétents pour&nbsp;:
                </p>
                <ul className={fr.cx("fr-mb-0")}>
                  {SRDT_PHONE_CAVEATS.map((caveat) => (
                    <li key={caveat}>{caveat}</li>
                  ))}
                </ul>
              </>
            }
          />
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

const questionItem = css({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  paddingTop: "0.75rem",
  paddingBottom: "0.75rem",
  borderBottom: "1px solid var(--border-default-grey)",
  "&:first-child": {
    borderTop: "1px solid var(--border-default-grey)",
  },
});

// Flèche DSFR colorée en bleu France devant chaque question.
const questionArrow = css({
  flexShrink: 0,
  color: "var(--text-action-high-blue-france)",
});

// Bloc numéro + badge tarification, façon composant « numéro » des sites gouv.
const phoneBlock = css({
  display: "inline-flex",
  alignItems: "stretch",
  marginBottom: "1.5rem",
});

const phoneNumber = css({
  display: "flex",
  alignItems: "center",
  paddingX: "1rem",
  paddingY: "0.5rem",
  border: "1px solid var(--border-default-grey)",
  fontSize: "1.75rem",
  fontWeight: 700,
  lineHeight: 1.1,
  color: "var(--text-title-grey)",
  backgroundImage: "none",
  whiteSpace: "nowrap",
  "&:hover": {
    backgroundColor: "var(--background-default-grey-hover)",
  },
});

const phoneBadge = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  paddingLeft: "1.25rem",
  paddingRight: "0.75rem",
  backgroundColor: "#929292",
  color: "#fff",
  fontSize: "0.75rem",
  fontWeight: 700,
  lineHeight: 1.15,
  whiteSpace: "nowrap",
  clipPath: "polygon(0.75rem 0, 100% 0, 100% 100%, 0.75rem 100%, 0 50%)",
});
