import { fr } from "@codegouvfr/react-dsfr";
import Link from "src/modules/common/Link";
import { ListWithArrow } from "src/modules/common/ListWithArrow";
import { FREQUENT_QUESTIONS } from "./contactThemes";

// Questions les plus fréquentes, affichées sous le bouton de l'écran 1 pour
// permettre à l'usager de trouver sa réponse avant de contacter les services.
// Le bloc vit hors de l'étape : il vient après l'action, et n'a donc pas à être
// atteint par le focus programmatique du changement d'écran.
export const FrequentQuestions = () => (
  <div className={fr.cx("fr-mt-4w")}>
    <p className={fr.cx("fr-text--lead", "fr-text--bold", "fr-mb-2w")}>
      {"Questions les plus fréquentes"}
    </p>
    <ListWithArrow
      withSeparators
      items={FREQUENT_QUESTIONS.map((question) => (
        // Nouvel onglet : l'usager qui va lire une question fréquente ne perd
        // pas le thème qu'il vient de choisir. Le wrapper `Link` suffixe le
        // `title` par « - nouvelle fenêtre ».
        // « fr-raw-link » retire le soulignement que le DSFR applique à tout
        // [href] : dans cette liste, la flèche porte déjà l'affordance.
        <Link
          key={question.href}
          className={fr.cx("fr-raw-link")}
          href={question.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {question.label}
        </Link>
      ))}
    />
  </div>
);
