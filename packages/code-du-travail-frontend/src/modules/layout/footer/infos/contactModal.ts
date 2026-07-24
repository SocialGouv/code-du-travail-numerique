import { createModal } from "@codegouvfr/react-dsfr/Modal";

// Instance de modale DSFR partagée (portail + focus-trap + bouton « Fermer » en
// haut à droite + Échap gérés nativement). Déclarée au niveau module (id unique)
// et importée à la fois par le déclencheur (footer `NeedMoreInfo`) et par la vue
// `ContactModalView`, pour éviter une dépendance circulaire entre les deux.
export const needMoreInfoModal = createModal({
  id: "more-info-modal",
  isOpenedByDefault: false,
});
