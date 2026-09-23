import { fr } from "@codegouvfr/react-dsfr";

// Le parcours compte 3 étapes dans ses deux branches : thème → moyen de
// contact → téléphone ou rendez-vous. Le canal « Formulaire et courriel » de la
// maquette (4 étapes) n'est pas livré. Cf. issues #7370 et #7480.
export const TOTAL_STEPS = 3;

// Fil d'étapes DSFR (« fr-stepper »), même pattern que SimulatorLayout. Le titre
// d'étape est un h2 : le titre de la page sert de h1.
export const ContactStepper = ({
  current,
  title,
  nextStepTitle,
}: {
  current: number;
  title: string;
  nextStepTitle?: string;
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
    {nextStepTitle !== undefined && (
      <p className={fr.cx("fr-stepper__details")}>
        <span className={fr.cx("fr-text--bold")}>Étape suivante&nbsp;:</span>{" "}
        {nextStepTitle}
      </p>
    )}
  </div>
);
