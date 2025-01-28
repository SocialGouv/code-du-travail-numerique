import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { PACKAGE_VERSION } from "../../../config";
import Link from "../../common/Link";

export const FooterBottom = () => (
  <div className={fr.cx("fr-footer__bottom")}>
    <ul className={fr.cx("fr-footer__bottom-list")}>
      <li className={fr.cx("fr-footer__bottom-item")}>
        <Link href="/accessibilite" className={fr.cx("fr-footer__bottom-link")}>
          Accessibilité : partiellement conforme
        </Link>
      </li>
      <li className={fr.cx("fr-footer__bottom-item")}>
        <a href="/mentions-legales" className={fr.cx("fr-footer__bottom-link")}>
          Mentions légales
        </a>
      </li>
      <li className={fr.cx("fr-footer__bottom-item")}>
        <a
          href="/politique-confidentialite"
          className={fr.cx("fr-footer__bottom-link")}
        >
          Politique de confidentialité
        </a>
      </li>
      <li className={fr.cx("fr-footer__bottom-item")}>
        <Link
          href={`https://github.com/SocialGouv/code-du-travail-numerique/tree/v${PACKAGE_VERSION}`}
          className={fr.cx("fr-footer__bottom-link")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Contribuer sur Github
        </Link>
      </li>
      <li className={fr.cx("fr-footer__bottom-item")}>
        <a href="/plan-du-site" className={fr.cx("fr-footer__bottom-link")}>
          Plan du site
        </a>
      </li>
    </ul>
    <div className={fr.cx("fr-footer__bottom-copy")}>
      <p>
        Sauf mention explicite de propriété intellectuelle détenue par des
        tiers, les contenus de ce site sont proposés sous{" "}
        <Link
          href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          licence etalab-2.0
        </Link>
      </p>
    </div>
  </div>
);
