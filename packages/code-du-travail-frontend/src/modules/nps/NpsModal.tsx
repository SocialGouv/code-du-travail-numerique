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

// Largeur de l'icône (2.5rem) + gouttière (1rem) : sert à la fois à l'espacement
// icône↔titre et à l'indentation du contenu en desktop (pour aligner question +
// échelle sous le texte du titre, à droite de l'icône).
const CONTENT_INDENT = "3.5rem";

type Props = {
  value: number | null;
  onSelect: (value: number) => void;
  onSubmit: () => void;
  // Id de la question, réutilisé pour labelliser le groupe de boutons.
  questionId: string;
};

export const NpsModalView = ({
  value,
  onSelect,
  onSubmit,
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
      // Bouton « Valider » aligné à droite en bas (footer DSFR). Le footer est un
      // nœud DOM séparé du contenu : on l'associe au <form> via l'attribut HTML
      // `form` (soumission hors-DOM standard) plutôt qu'un onClick. Désactivé
      // tant qu'aucune note n'est choisie. DSFR ferme la modale via aria-controls ;
      // la validation (cookie + tracking, cf. NpsWidget) passe par onSubmit du form.
      buttons={[
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
  lg: { paddingLeft: CONTENT_INDENT },
});
