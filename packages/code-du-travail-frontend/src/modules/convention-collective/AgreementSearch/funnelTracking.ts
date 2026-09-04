// Contrat de délégation du tracking « funnel de choix de convention collective ».
//
// Les composants-feuilles de recherche (AgreementSearchInput côté parcours 1,
// EnterpriseAgreementSearchInput côté parcours 2) sont partagés entre les
// contributions, les simulateurs, la page « Trouver sa convention collective »
// et les widgets. Ils n'émettent donc AUCUN event de funnel eux-mêmes : ils
// appellent les callbacks de cet objet, fourni uniquement par les façades
// contribution (via AgreementSearchFormBlock).
//
// Prop absente → comportement strictement identique à avant : les parcours hors
// contribution ne reçoivent aucun event supplémentaire.
//
// Volontairement sans dépendance à Matomo : c'est un contrat d'appel, la
// traduction en events vit dans `src/modules/contributions/tracking.ts`.
//
// ⚠️ Hypothèse à tenir si le parcours contribution évolue : `AgreementSearchForm`
// ne passe aujourd'hui à `EnterpriseAgreementSearchInput` ni `defaultSearch` ni
// `enterprise`. Deux callbacks en dépendent silencieusement —
// `onEnterpriseSearchSubmit`, qui exclut les recherches automatiques déclenchées
// par `defaultSearch`, et `onEnterpriseSelect` / `onEnterpriseWithoutAgreement`,
// branchés sur le clic d'une carte de résultat, seul point d'entrée tant
// qu'aucune entreprise n'est pré-alimentée. Pré-remplir l'un ou l'autre (lien
// direct SIRET, retour « Précédent ») rendrait ces events muets ou faux sans
// qu'aucun test n'échoue : il faudrait alors les rebrancher sur les effets
// miroir, comme l'est déjà `show_agreements`.
export type AgreementSearchFunnelTracking = {
  // --- Parcours 1 : « je sais quelle est ma convention collective » ---------
  /** Première frappe donnant lieu à une requête dans l'autocomplete CC. */
  onAgreementSearchStart?: () => void;
  /** Recherche de plus de 2 caractères ne remontant aucune CC. */
  onAgreementSearchNoResult?: () => void;

  // --- Parcours 2 : « je cherche mon entreprise » ---------------------------
  /** Première frappe dans le champ « nom de l'entreprise ». */
  onEnterpriseSearchStart?: () => void;
  /** Soumission du formulaire de recherche d'entreprise par l'usager. */
  onEnterpriseSearchSubmit?: () => void;
  /** Recherche d'entreprise ne remontant aucun résultat. */
  onEnterpriseSearchNoResult?: () => void;
  /** Incident de l'API entreprises. */
  onEnterpriseSearchError?: () => void;
  /** Une localisation est renseignée pour affiner la recherche. */
  onLocationSelect?: () => void;
  /** Clic sur une carte entreprise dans la liste de résultats. */
  onEnterpriseSelect?: () => void;
  /** L'entreprise retenue ne déclare aucune convention collective. */
  onEnterpriseWithoutAgreement?: () => void;
  /** Choix d'une CC parmi celles déclarées par l'entreprise. */
  onEnterpriseAgreementSelect?: () => void;
  /** Carte « assistants maternels, employés de maison ». */
  onHouseholdEmployerSelect?: () => void;
  /** Bouton « Modifier » de l'entreprise sélectionnée. */
  onModifyEnterprise?: () => void;
  /** Bouton « Modifier » de l'écran « Vous avez sélectionné la CC ». */
  onModifyAgreement?: () => void;
};
