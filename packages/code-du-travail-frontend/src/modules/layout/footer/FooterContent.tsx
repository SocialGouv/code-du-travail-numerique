import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import Link from "../../common/Link";

const DOMAINS = [
  "travail-emploi.gouv.fr",
  "info.gouv.fr",
  "service-public.fr",
  "legifrance.gouv.fr",
  "data.gouv.fr",
];

export const FooterContent = () => (
  <div className={fr.cx("fr-footer__content")}>
    <ul className={fr.cx("fr-footer__content-list")}>
      {DOMAINS.map((domain) => (
        <li key={domain} className={fr.cx("fr-footer__content-item" as any)}>
          <Link
            className={fr.cx("fr-footer__content-link")}
            href={`https://${domain}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {domain}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
