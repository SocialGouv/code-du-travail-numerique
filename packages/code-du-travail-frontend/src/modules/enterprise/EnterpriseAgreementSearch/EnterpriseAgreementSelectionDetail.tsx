"use client";
import { fr } from "@codegouvfr/react-dsfr";
import { Enterprise } from "../types";

type Props = {
  enterprise: Omit<Enterprise, "complements">;
};

export const EnterpriseAgreementSelectionDetail = ({ enterprise }: Props) => {
  return (
    <>
      <div className={fr.cx("fr-h4", "fr-mt-2w", "fr-mb-0")}>
        {enterprise.conventions.length === 0 ? (
          `Aucune convention collective n'a été déclarée pour l'entreprise`
        ) : enterprise.conventions.length === 1 ? (
          <>1 convention collective trouvée pour&nbsp;:</>
        ) : (
          <>
            {enterprise.conventions.length} conventions collectives trouvées
            pour&nbsp;:
          </>
        )}
      </div>
      <h2 className={fr.cx("fr-h6", "fr-m-0", "fr-mt-2w")}>
        {enterprise.label}
      </h2>
      {enterprise.activitePrincipale && (
        <p className={fr.cx("fr-m-0")}>
          Activité&nbsp;: {enterprise.activitePrincipale}
        </p>
      )}
      <p className={fr.cx("fr-mb-2w")}>{enterprise.address}</p>
    </>
  );
};
