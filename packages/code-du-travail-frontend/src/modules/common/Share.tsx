"use client";

import React, { useState } from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import { usePathname } from "next/navigation";
import { SITE_URL } from "../../config";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "../../../styled-system/css";
import { useCommonTracking } from "./tracking";

type Props = {
  title: string;
  metaDescription: string;
  className?: string;
};

export const Share = ({
  title,
  metaDescription,
  className = "",
}: Props): JSX.Element => {
  const [isUrlCopied, setUrlCopied] = useState(false);
  const { emitClickShare } = useCommonTracking();

  const currentPageUrl = (SITE_URL + usePathname()) as string;
  const copylink = () => {
    navigator?.clipboard?.writeText(currentPageUrl);
  };

  return (
    <div className={`${className} ${fr.cx("fr-follow__social")}`}>
      <p>Partager la page</p>
      <ul className={fr.cx("fr-btns-group")}>
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
              emitClickShare("facebook");
            }}
          >
            Facebook
          </a>
        </li>
        <li>
          <a
            className={fr.cx("fr-btn", "fr-btn--tertiary", "fr-btn--twitter-x")}
            title="Partager sur X (anciennement Twitter)"
            href={`https://x.com/intent/post?text=${encodeURIComponent(`${title} : ${currentPageUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              emitClickShare("twitter");
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
              emitClickShare("linkedin");
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
            )}&body=${`${encodeURIComponent(`${metaDescription}\n\n${currentPageUrl}`)}`}`}
            onClick={() => {
              emitClickShare("email");
            }}
          >
            Courriel
          </a>
        </li>
        <li>
          <a
            className={fr.cx("fr-btn", "fr-btn--tertiary", "ri-whatsapp-line")}
            title="Envoyer par Whatsapp"
            href={`https://wa.me/?text=${encodeURIComponent(`${title} : ${currentPageUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              emitClickShare("whatsapp");
            }}
          >
            Whatsapp
          </a>
        </li>
        <li>
          {isUrlCopied ? (
            <p className={fr.cx("fr-mt-1w")}>
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
                emitClickShare("copier");
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
