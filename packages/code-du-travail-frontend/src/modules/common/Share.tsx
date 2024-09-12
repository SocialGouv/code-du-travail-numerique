"use client";

import React, { useState } from "react";
import { push as matopush } from "@socialgouv/matomo-next";
import Button from "@codegouvfr/react-dsfr/Button";
import { usePathname } from "next/navigation";
import { SITE_URL } from "../../config";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "../../../styled-system/css";

type Props = {
  title: string;
  metaDescription: string;
};

export const Share = ({ title, metaDescription }: Props): JSX.Element => {
  const [isUrlCopied, setUrlCopied] = useState(false);

  const currentPageUrl = (SITE_URL + usePathname()) as string;
  const copylink = () => {
    navigator?.clipboard?.writeText(currentPageUrl);
  };
  return (
    <div className="fr-follow__social">
      <p>Partager la page</p>
      <ul className="fr-btns-group">
        <li>
          <a
            className={fr.cx("fr-btn", "fr-btn--tertiary", "fr-btn--facebook")}
            title="Partager sur Facebook"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              currentPageUrl
            )}&quote=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              matopush([
                "trackEvent",
                "clic_share",
                currentPageUrl,
                "facebook",
              ]);
            }}
          >
            Facebook
          </a>
        </li>
        <li>
          <a
            className={fr.cx("fr-btn", "fr-btn--tertiary", "fr-btn--twitter-x")}
            title="Partager sur X (anciennement Twitter)"
            href={`https://x.com/intent/post?text=${encodeURIComponent(
              `${title} : ${currentPageUrl}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              matopush(["trackEvent", "clic_share", currentPageUrl, "twitter"]);
            }}
          >
            X (anciennement Twitter)
          </a>
        </li>
        <li>
          <a
            className={fr.cx("fr-btn", "fr-btn--tertiary", "fr-btn--linkedin")}
            title="Partager sur LinkedIn"
            href={`https://www.linkedin.com/shareArticle?mini=true&title=${encodeURIComponent(
              title
            )}&url=${encodeURIComponent(currentPageUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              matopush([
                "trackEvent",
                "clic_share",
                currentPageUrl,
                "linkedin",
              ]);
            }}
          >
            Linkedin
          </a>
        </li>
        <li>
          <a
            className={fr.cx("fr-btn", "fr-btn--tertiary", "ri-mail-line")}
            title="Envoyer par email"
            rel="noopener external"
            href={`mailto:?subject=${encodeURIComponent(
              `A lire sur le Code du travail numérique : ${title}`
            )}&body=${`${encodeURIComponent(
              `${metaDescription}\n\n${currentPageUrl}`
            )}`}`}
            onClick={() => {
              matopush(["trackEvent", "clic_share", currentPageUrl, "email"]);
            }}
          >
            Courriel
          </a>
        </li>
        <li>
          <a
            className={fr.cx("fr-btn", "fr-btn--tertiary", "ri-whatsapp-line")}
            title="Envoyer par Whatsapp"
            href={`https://wa.me/?text=${encodeURIComponent(
              `${title} : ${currentPageUrl}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              matopush([
                "trackEvent",
                "clic_share",
                currentPageUrl,
                "whatsapp",
              ]);
            }}
          >
            Whatsapp
          </a>
        </li>
        <li>
          {isUrlCopied ? (
            <p className="fr-mt-1w">
              <span
                className={`${fr.cx("ri-check-line")} ${css({
                  color: "var(--text-default-success)",
                })}`}
                aria-hidden="true"
              />
              Lien copié
            </p>
          ) : (
            <Button
              priority="tertiary"
              iconId="ri-links-line"
              title="Copier le lien"
              onClick={() => {
                matopush([
                  "trackEvent",
                  "clic_share",
                  currentPageUrl,
                  "copier",
                ]);
                copylink();
                setUrlCopied(true);
              }}
            >
              Lien de copie
            </Button>
          )}
        </li>
      </ul>
    </div>
  );
};
