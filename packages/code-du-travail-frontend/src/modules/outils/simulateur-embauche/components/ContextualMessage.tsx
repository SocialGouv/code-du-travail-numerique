"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { CONTEXTUAL_MESSAGES } from "../domain/constants";
import type { ContextualMessageKey } from "../domain/types";
import { contextualMessageLink } from "../styles";

type Props = {
  messageKey: ContextualMessageKey;
  onClick: (key: ContextualMessageKey) => void;
};

/**
 * Passerelle vers un contenu CDTN, affichée sous le champ « Salaire net ».
 *
 * C'est le contenu du `stateRelatedMessage` de l'`Input` : DSFR le relie
 * automatiquement au champ par `aria-describedby`, et son état « succès » fournit
 * le label vert, le liseré vertical et la couleur du message.
 *
 * Le vert ne porte jamais seul le sens : l'icône et le libellé du lien disent
 * de quoi il s'agit.
 */
export const ContextualMessage = ({ messageKey, onClick }: Props) => {
  const { href, linkText } = CONTEXTUAL_MESSAGES[messageKey];

  return (
    <span>
      <span
        className={fr.cx("fr-icon-question-line", "fr-icon--sm", "fr-mr-1v")}
        aria-hidden="true"
      />
      <a
        className={contextualMessageLink}
        href={href}
        onClick={() => onClick(messageKey)}
        data-testid={`brut-net-message-${messageKey}`}
      >
        {linkText}
      </a>
    </span>
  );
};
