// Mapping éditorial de la rubrique « Explorez nos thématiques » (#7455).
//
// Clé = slug GÉNÉRIQUE de la contribution : la page CC `1486-mon-slug` et la
// fiche générique `mon-slug` partagent la même entrée. Valeur = les deux
// sous-thèmes à mettre en avant, dans l'ordre d'affichage.
//
// Liste tenue à la main par le métier en attendant une gestion en back-office :
// toute contribution absente de ce mapping masque la rubrique — et conserve
// alors ses « Articles liés », ce qui en fait le témoin du test.
//
// Contraintes vérifiées par `__tests__/mapping.test.ts` :
// - clé sans préfixe IDCC (`1486-`), en kebab-case ;
// - exactement deux sous-thèmes distincts, en kebab-case ;
// - sous-thèmes de NIVEAU 2 uniquement : le lien pointe vers la section du
//   thème racine, un niveau 3 n'y aurait pas d'ancre.
export const CONTRIBUTION_SUB_THEMES: Record<
  string,
  readonly [string, string]
> = {};

export const getContributionSubThemeSlugs = (
  genericSlug: string
): readonly [string, string] | undefined =>
  // `hasOwnProperty` : le slug vient de l'URL, un `toString` ou un
  // `constructor` renverrait sinon une fonction héritée d'`Object.prototype`.
  Object.prototype.hasOwnProperty.call(CONTRIBUTION_SUB_THEMES, genericSlug)
    ? CONTRIBUTION_SUB_THEMES[genericSlug]
    : undefined;
