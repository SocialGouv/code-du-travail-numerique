import Badge from "@codegouvfr/react-dsfr/Badge";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { css, cx } from "@styled-system/css";
import React from "react";

type Props = {
  source: string;
};

/**
 * Tag de type d'une carte de la rubrique « Fiches pratiques » (#7464) : dit à
 * l'usager, avant de cliquer, si le contenu est personnalisé selon sa
 * convention collective (contribution) ou générique (fiche infos, source
 * `information`).
 *
 * Purement informatif : ni lien, ni bouton, ni filtre. Le libellé reste en
 * casse normale dans le DOM, la mise en capitales est celle du badge DSFR.
 */
export const TypeBadge = ({ source }: Props) => {
  if (source === SOURCES.CONTRIBUTIONS) {
    return (
      <Badge
        severity="success"
        small
        noIcon
        as="p"
        className={cx(nonInteractive, badge)}
      >
        Selon ma convention collective
      </Badge>
    );
  }
  if (source === SOURCES.EDITORIAL_CONTENT) {
    return (
      <Badge
        small
        noIcon
        as="p"
        className={cx(nonInteractive, badge, ficheInfos)}
      >
        Fiche infos
      </Badge>
    );
  }
  return null;
};

// Le lien de la carte est étendu à toute sa surface par un pseudo-élément
// (`fr-enlarge-link`, z-index 1). Le badge passe au-dessus pour rester hors de
// la zone cliquable : cliquer dessus ne navigue pas.
const nonInteractive = css({
  position: "relative",
  zIndex: 2,
});

// Sur écran étroit le libellé passe à la ligne plutôt que de déborder.
const badge = css({
  whiteSpace: "normal",
  overflowWrap: "anywhere",
});

// Couleurs de la maquette : tokens d'option DSFR (fond vert émeraude 975,
// texte vert menthe 373), sans variante d'accentuation prête à l'emploi. Les
// variables portent aussi les valeurs du thème sombre. Le `!` prime sur les
// couleurs de `.fr-badge`, la feuille DSFR pouvant être chargée après celle-ci.
const ficheInfos = css({
  backgroundColor: "var(--green-emeraude-975-75)!",
  color: "var(--green-menthe-sun-373-moon-652)!",
});
