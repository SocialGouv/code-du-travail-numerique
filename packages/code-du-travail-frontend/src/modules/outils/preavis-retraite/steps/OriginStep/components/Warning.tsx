import React from "react";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { fr } from "@codegouvfr/react-dsfr";
import Link from "src/modules/common/Link";

export const WarningOriginDepart = () => {
  return (
    <Alert
      severity="info"
      title="À noter"
      className={fr.cx("fr-mt-2w")}
      data-testid="warning-origin-depart"
      description={
        <>
          L&apos;employeur qui décide une mise à la retraite doit en avoir
          informé son salarié.
          <br />
          Plus d&apos;info&nbsp;:{" "}
          <Link
            href="/fiche-service-public/un-employeur-peut-il-mettre-doffice-un-salarie-a-la-retraite"
            target="_blank"
            rel="noopener noreferrer"
          >
            L&apos;employeur peut-il mettre d&apos;office un salarié à la
            retraite ?
          </Link>
        </>
      }
    />
  );
};
