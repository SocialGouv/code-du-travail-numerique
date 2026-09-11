// Mapping éditorial de la rubrique « Explorez nos thématiques » (#7455).
//
// La liste elle-même vit dans `mapping.csv`, tenu par le métier en attendant
// une gestion en back-office, et `mapping.generated.ts` en est la traduction
// TypeScript — régénérée par `pnpm explore-themes:mapping`.
//
// Toute contribution absente du mapping masque la rubrique et conserve alors
// ses « Articles liés », ce qui en fait le témoin du test.
//
// Contraintes vérifiées à la génération et par `__tests__/mapping.test.ts` :
// - clé sans préfixe IDCC (`1486-`), en kebab-case ;
// - exactement deux sous-thèmes distincts, en kebab-case ;
// - sous-thèmes de NIVEAU 2 uniquement : le lien pointe vers la section du
//   thème racine, un niveau 3 n'y aurait pas d'ancre.
import { CONTRIBUTION_SUB_THEMES } from "./mapping.generated";

export { CONTRIBUTION_SUB_THEMES };

export const getContributionSubThemeSlugs = (
  genericSlug: string
): readonly [string, string] | undefined =>
  // `hasOwnProperty` : le slug vient de l'URL, un `toString` ou un
  // `constructor` renverrait sinon une fonction héritée d'`Object.prototype`.
  Object.prototype.hasOwnProperty.call(CONTRIBUTION_SUB_THEMES, genericSlug)
    ? CONTRIBUTION_SUB_THEMES[genericSlug]
    : undefined;
