import { fr } from "@codegouvfr/react-dsfr";

// Le parcours cible comporte plus d'étapes (choix du canal, formulaire de
// contact) ; cette itération ne livre que le canal téléphone, soit 2 écrans
// (thème → résultat). Cf. issue #7370.
export const TOTAL_STEPS = 2;

// Fil d'étapes DSFR (« fr-stepper »), même pattern que SimulatorLayout. Le titre
// d'étape est un h2 : le titre de la page sert de h1.
export const ContactStepper = ({
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
