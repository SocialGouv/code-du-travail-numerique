import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import Link from "next/link";

type Props = {
  navigationUrl?: string;
};

export const AgreementSearchByCompany = ({
  navigationUrl = "/outils/convention-collective",
}: Props) => {
  return (
    <>
      <p className={fr.cx("fr-h4", "fr-mt-2w", "fr-mb-0")}>
        Précisez votre entreprise
      </p>
      <div className={fr.cx("fr-grid-row", "fr-mt-2w", "fr-mb-0")}>
        <Input
          className={fr.cx("fr-col-12", "fr-col-md-5", "fr-mb-0")}
          hintText="Ex : Café de la mairie ou 40123778000127"
          label="Nom de votre entreprise ou numéro Siren/Siret"
          state="default"
          stateRelatedMessage="Text de validation / d'explication de l'erreur"
        />
        <Input
          className={fr.cx(
            "fr-col-12",
            "fr-col-md-3",
            "fr-ml-md-3w",
            "fr-mb-0"
          )}
          hintText="Ex : 75007"
          label="Code postal ou Ville (optionnel)"
          state="default"
          stateRelatedMessage="Text de validation / d'explication de l'erreur"
        />
        <div
          className={`${fr.cx("fr-col-md-2", "fr-ml-md-3w", "fr-mt-2w", "fr-mt-md-7w")}`}
        >
          <Button
            className={`${fr.cx("fr-btn--icon-right", "fr-icon-search-line")}`}
          >
            Rechercher
          </Button>
        </div>
      </div>
      <Link
        href={navigationUrl}
        className={`${fr.cx("fr-btn", "fr-btn--secondary", "fr-mt-2w")}`}
      >
        Précédent
      </Link>
    </>
  );
};
