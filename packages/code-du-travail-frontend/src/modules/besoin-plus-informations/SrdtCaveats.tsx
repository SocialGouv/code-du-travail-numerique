import { fr } from "@codegouvfr/react-dsfr";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import { SRDT_PHONE_CAVEATS } from "./contactThemes";

// Limites de compétence des SRDT, rappelées sur les deux écrans résultat
// (téléphone et rendez-vous). Un seul composant pour ne pas dupliquer le
// contenu.
export const SrdtCaveats = () => (
  <AccessibleAlert
    severity="info"
    small
    description={
      <>
        <p className={fr.cx("fr-mb-1w")}>
          {
            "Attention, ces services délivrent une information juridique, ils ne sont pas compétents pour :"
          }
        </p>
        <ul className={fr.cx("fr-mb-0")}>
          {SRDT_PHONE_CAVEATS.map((caveat) => (
            <li key={caveat}>{caveat}</li>
          ))}
        </ul>
      </>
    }
  />
);
