"use client";

import React, { useState } from "react";
import { push as matopush } from "@socialgouv/matomo-next";
import Button from "@codegouvfr/react-dsfr/Button";
import { usePathname } from "next/navigation";
import { SITE_URL } from "../../config";
import { fr } from "@codegouvfr/react-dsfr";

const POPUP_OPTIONS =
  "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600";

type Props = {
  title: string;
  metaDescription: string;
};

export const Share = ({ title, metaDescription }: Props): JSX.Element => {
  const [isUrlCopied, setUrlCopied] = useState(false);

  const currentPageUrl = (SITE_URL + usePathname()) as string;
  const copylink = () => {
    navigator.clipboard.writeText(currentPageUrl);
  };
  return (
    <div className="fr-follow__social">
      <p>Partager la page</p>
      <ul className="fr-btns-group">
        <li>
          <Button
            className="fr-btn--facebook"
            priority="tertiary"
            title="Partager sur Facebook"
            onClick={() => {
              matopush([
                "trackEvent",
                "clic_share",
                currentPageUrl,
                "facebook",
              ]);
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  currentPageUrl
                )}&quote=${encodeURIComponent(title)}`,
                "facebook_popup",
                POPUP_OPTIONS
              );
            }}
          >
            Facebook
          </Button>
        </li>
        <li>
          <Button
            className="fr-btn--twitter-x"
            priority="tertiary"
            title="Partager sur X (anciennement Twitter)"
            onClick={() => {
              matopush(["trackEvent", "clic_share", currentPageUrl, "twitter"]);
              window.open(
                `https://x.com/intent/post?text=${encodeURIComponent(
                  `${title} : ${currentPageUrl}`
                )}`,
                "twitter_popup",
                POPUP_OPTIONS
              );
            }}
          >
            X (anciennement Twitter)
          </Button>
        </li>
        <li>
          <Button
            className="fr-btn--linkedin"
            priority="tertiary"
            title="Partager sur LinkedIn"
            onClick={() => {
              matopush([
                "trackEvent",
                "clic_share",
                currentPageUrl,
                "linkedin",
              ]);
              window.open(
                `https://www.linkedin.com/shareArticle?mini=true&title=${encodeURIComponent(
                  title
                )}&url=${encodeURIComponent(currentPageUrl)}`,
                "linkedin_popup",
                POPUP_OPTIONS
              );
            }}
          >
            Linkedin
          </Button>
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
          <Button
            priority="tertiary"
            iconId="ri-whatsapp-line"
            title="Envoyer par Whatsapp"
            onClick={() => {
              matopush([
                "trackEvent",
                "clic_share",
                currentPageUrl,
                "whatsapp",
              ]);
              window.open(
                `https://wa.me/?text=${encodeURIComponent(
                  `${title} : ${currentPageUrl}`
                )}`,
                "whatsapp_popup",
                POPUP_OPTIONS
              );
            }}
          >
            Whatsapp
          </Button>
        </li>
        <li>
          {isUrlCopied ? (
            "Lien copié !"
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
              Lien
            </Button>
          )}
        </li>
      </ul>
    </div>
  );
};
