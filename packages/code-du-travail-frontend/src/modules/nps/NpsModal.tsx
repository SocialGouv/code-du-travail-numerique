"use client";

import React, { useId } from "react";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { css } from "@styled-system/css";
import { NpsScale } from "./NpsScale";
import { NpsIcon } from "./NpsIcon";
import { fr } from "@codegouvfr/react-dsfr";

// Instance de modale DSFR (portail + focus-trap + bouton « Fermer » en haut à
// droite + Échap gérés nativement). Déclarée au niveau module (id unique).
export const npsModal = createModal({
  id: "nps-modal",
  isOpenedByDefault: false,
});

const NpsModalComponent =
  npsModal.Component as unknown as React.ComponentType<any>;

type Props = {
  value: number | null;
  onSelect: (value: number) => void;
  onSubmit: () => void;
  // Refus explicite : fait disparaître la main et coupe les sollicitations de
  // la session (cf. NpsWidget).
  onOptOut: () => void;
  // Id de la question, réutilisé pour labelliser le groupe de boutons.
  questionId: string;
};

export const NpsModalView = ({
  value,
  onSelect,
  onSubmit,
  onOptOut,
  questionId,
}: Props) => {
  const formId = useId();
  return (
    <NpsModalComponent
      // Titre = icône (colonne gauche) + intitulé. Le `title` DSFR accepte un
      // ReactNode et reste l'élément labellisant la modale (aria-labelledby).
      title={
        <span className={titleRow}>
          <NpsIcon className={icon} />
          <span>Donnez votre avis&nbsp;!</span>
        </span>
      }
      size="large"
      // Footer DSFR (nœud DOM séparé du contenu). Deux actions :
      //  - « Ne pas répondre » (secondaire, à gauche) : refus explicite, géré par
      //    onClick ; DSFR ferme la modale via aria-controls.
      //  - « Valider » (primaire, à droite) : associé au <form> via l'attribut
      //    HTML `form` (soumission hors-DOM standard) plutôt qu'un onClick, et
      //    désactivé tant qu'aucune note n'est choisie. La validation (cookie +
      //    tracking, cf. NpsWidget) passe par onSubmit du form.
      buttons={[
        {
          children: "Ne pas répondre",
          priority: "secondary",
          onClick: onOptOut,
          nativeButtonProps: { type: "button" },
        },
        {
          children: "Valider",
          priority: "primary",
          disabled: value === null,
          nativeButtonProps: { type: "submit", form: formId },
        },
      ]}
    >
      {/* Radios + bouton de validation = un formulaire (sémantique correcte,
          soumission au clavier). */}
      <form
        id={formId}
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        {/* Desktop : indentation pour aligner question + échelle sous le texte du
            titre (à droite de l'icône). Mobile : pleine largeur. */}
        <div className={content}>
          <p id={questionId} className={fr.cx("fr-text--xl", "fr-text--bold")}>
            Recommanderiez-vous le code du travail numérique à un proche&nbsp;?
          </p>
          <NpsScale
            value={value}
            onSelect={onSelect}
            groupLabelId={questionId}
          />
        </div>
      </form>
    </NpsModalComponent>
  );
};

const titleRow = css({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

// L'icône ne rétrécit pas si le titre passe sur deux lignes (petits écrans).
const icon = css({
  flexShrink: 0,
});

const content = css({
  lg: { paddingLeft: "3.5rem" },
});
