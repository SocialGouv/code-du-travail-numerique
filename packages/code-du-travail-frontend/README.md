# Code-du-travail - Frontend (@cdt/frontend)

## Lancer l'environnement de développement

**Important** : pour tourner en local, ce projet nécessite les services api et elasticsearch. Par défaut on va utiliser l'API publique de dev.

```sh
yarn dev:frontend:preprod-api
```

## Ajouter une convention collective pour l'indemnité de licenciement

### 1. Ajouter le salaire de référence (`code-du-travail-modeles`)

Dans le folder `plugins/salaire-reference`, ajouter la convention collective pour l'indemnité de licenciement en créant un fichier.

Il faut ajouter le type d'entrée de l'input aussi tout en rajoutant les TUs.

Puis dans `types`, rajouter le type de votre convention collective

```ts
export type ReferenceSalaryProps<T> =
  T extends SupportedCcIndemniteLicenciement.IDCC1516
    ? CC1516ReferenceSalaryProps
  T extends SupportedCcIndemniteLicenciement.IDCCXXX
    ? IDCCXXXReferenceSalaryProps
    : LegalReferenceSalaryProps;
```

### 2. Ajouter l'ancienneté (`code-du-travail-modeles`)

Dans le folder `plugins/anciennete`, ajouter la convention collective pour l'indemnité de licenciement en créant un fichier.

Techniquement, on peut implémenter l'interface `ISeniority` pour ajouter une fonction qui override la fonction de `compute` ou alors juste modifier les motifs en mettant les bon paramètres qu'on souhaite.

Ensuite, dans `index.ts`, on peut ajouter la classe qui va process l'ancienneté avec comme paramètre les bons motifs.

```ts
switch (idcc) {
  case SupportedCcIndemniteLicenciement.IDCC2511:
    return new SeniorityLegal(
      getMotifs(SupportedCcIndemniteLicenciement.IDCC2511)
    ) as ISeniority<T>;
  case SupportedCcIndemniteLicenciement.default:
  default:
    return new SeniorityLegal(
      getMotifs(SupportedCcIndemniteLicenciement.default)
    ) as ISeniority<T>;
}
```

Enfin si on souhaite pimper les types, on peut le faire dans `types`.

```ts
export type SeniorityProps<
  T
> = T extends SupportedCcIndemniteLicenciement.IDCC2511
  ? LegalSeniorityProps
  : LegalSeniorityProps;
```

### 3. Ajouter la formule de calcul (`code-du-travail-modeles`)

Dans le folder `plugins/formule`, ajouter la convention collective pour l'indemnité de licenciement en créant un fichier.

Le principe est le même que l'`ancienneté` et le `salaire de référence`.

On peut créer une classe qui va implémenter l'interface `IFormula`

```ts
export class Formula1516
  implements IFormula<SupportedCcIndemniteLicenciement.IDCC1516>
```

Ensuite, on peut modifier la fonction `computeFormula`, on ajoutant les bonnes `explanations`, comme on le voit ci-dessous :

```ts
...
formula = `(1 / 5 * Sref * A1) + (1 / 10 * Sref * A2)`;
const anWithout = round(seniority - 15) < 2 ? "an" : "ans";
explanations.push(`A1 : Ancienneté totale (${round(seniority)} ans)`);
explanations.push(
  `A2 : Années de présence au delà de 15 ans (${round(
    seniority - 15
  )} ${anWithout})`
);
...
```

Après dans l'`index.ts`, on peut ajouter la classe :

```ts
switch (idcc) {
  case SupportedCcIndemniteLicenciement.IDCC1516:
    return new Formula1516() as IFormula<T>;
  case SupportedCcIndemniteLicenciement.default:
  default:
    return new FormulaLegal() as IFormula<T>;
}
```

Enfin si on souhaite pimper les types, on peut le faire dans `types`.

```ts
export type FormulaProps<T> = T extends SupportedCcIndemniteLicenciement.default
  ? LegalFormulaProps
  : DefaultFormulaProps;
```

### 4. Ajouter le calcul de l'indemnité avec publicodes (`code-du-travail-modeles`)

Il faut créer un folder pour la convention collective et créer un fichier `indemnite-licenciement.yaml`.

Afin que la Convention collective soit considéré comme traité, il faut ajouter à `common.yaml`, le `indemnite-licenciement: true` :

```yaml
contrat salarié . convention collective . hospitalisation privées:
  description: Convention collective nationale de l'hospitalisation privée du 18 avril 2002.
  applicable si: convention collective = 'IDCC2264'
  valeur: oui
  cdtn:
    idcc: 2264
    préavis-retraite: true
    indemnité-licenciement: true
```

Publicodes, en plus du calcul de l'indemnité s'occupe également des références juridiques.

Le but de la règle est de remplacer la règle : `contrat salarié . indemnité de licenciement . résultat conventionnel`, comme dans l'example ci-dessous :

```yml
contrat salarié . convention collective . sport . indemnité de licenciement:
  applicable si: indemnité de licenciement
  valeur: oui

contrat salarié . convention collective . sport . indemnité de licenciement . jusqu'à dix ans ou moins:
  valeur:
    le minimum de:
      - contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année
      - 10 an

contrat salarié . convention collective . sport . indemnité de licenciement . au dela de dix ans:
  somme:
    - contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année
    - (- 10 an)
  plancher: 0 an

contrat salarié . convention collective . sport . indemnité de licenciement . dix ans ou moins:
  valeur:
    produit:
      assiette: jusqu'à dix ans ou moins * contrat salarié . indemnité de licenciement . salaire de référence conventionnel
      facteur: 1 / 4
  unité: €

contrat salarié . convention collective . sport . indemnité de licenciement . plus de dix ans:
  valeur:
    produit:
      assiette: au dela de dix ans * contrat salarié . indemnité de licenciement . salaire de référence conventionnel
      facteur: 1 / 3
  unité: €

#  (1/4*Sref*A1) + (1/3*Sref*A2)
#  A1 : Ancienneté de 10 ans ou moins
#  A2 : Ancienneté au delà de 10 ans
contrat salarié . convention collective . sport . indemnité de licenciement . résultat conventionnel:
  remplace: contrat salarié . indemnité de licenciement . résultat conventionnel
  variations:
    - si: contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année > (7 mois / 12)
      alors:
        somme:
          - dix ans ou moins
          - plus de dix ans
    - sinon: 0
  unité: €
  arrondi: 2 décimales
  références:
    Article 4.4.3.3: https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000042110557?idConteneur=KALICONT000017577652
    Article 7.1.2: https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000042110596/?idConteneur=KALICONT000017577652&origin=list
```

NOTE: La convention collective `2264` montre une implémentation complexe qui s'occupe de plusieurs cas complexes.

:warning: N'oublions pas d'écrire les tests pour cette partie.

### 5. Si la convention dispose d'un salaire de référence conventionnel (`code-du-travail-frontend`)

Il faut ajouter dans le dossier `src/outils/IndemniteLicenciement/agreements`, un dossier avec le nom de la convention collective.

Celui-ci est composé d'un `Component.tsx` qui fonctionne comme une étape avec son propre `store`.

Ce `store` est retrouvable dans un dossier, dans le quel, on ajoute un `validator.ts` qui est activable à chaque suivant, et un `store.ts` pour sauvegarder les informations saisies par l'utilisateur.

On peut rajouter une méthode d'override du calcul du salaire de reference conventionnel dans un fichier `computeReferenceSalary.ts`. Celui-ci sera activé au niveau du suivant, et par conséquent lorsque les informations sont validées par le validator.

Après, dans `src/outils/IndemniteLicenciement/types.ts` :

```ts
export type AgreementStoreInput =
  | Agreement1516StoreInput
  | MaConventionCollectiveInput;

export type AgreementStoreError =
  | Agreement1516StoreError
  | MaConventionCollectiveError;

export type AgreementStoreSlice =
  | Agreement1516StoreSlice
  | MaConventionCollectiveSlice;

export const createRootAgreementsStore = (
  set: StoreApi<MainStore>["setState"],
  get: StoreApi<MainStore>["getState"]
) => ({
  ...createAgreement1516StoreSalaires(set, get),
  ...createMaCCStore(set, get),
});
```

Puis, il faut ajouter le validator dans `src/outils/IndemniteLicenciement/validator.ts` a la racine :

```ts
export const validateAgreement = (
  idcc: SupportedCcIndemniteLicenciement,
  step: IndemniteLicenciementStepName,
  get: StoreApi<any>["getState"],
  set: StoreApi<MainStore>["setState"]
): boolean => {
  switch (true) {
    case SupportedCcIndemniteLicenciement.IDCC1516 === idcc &&
      step === IndemniteLicenciementStepName.Salaires:
      return validateAgreement1516(get, set);
    case SupportedCcIndemniteLicenciement.MA_CC === idcc &&
      step === IndemniteLicenciementStepName.Salaires:
      return validateMaCc(get, set);
    default:
      return true;
  }
};
```

Enfin, il suffit de rajouter le composant d'injection dans `src/outils/IndemniteLicenciement/AgreementsInjector.tsx` :

```ts
export default function AgreementsInjector(props: Props) {
  switch (true) {
    case SupportedCcIndemniteLicenciement.IDCC1516 === props.idcc &&
      props.step === IndemniteLicenciementStepName.Salaires:
      return <Agreement1516 />;
    case SupportedCcIndemniteLicenciement.MA_CC === props.idcc &&
      props.step === IndemniteLicenciementStepName.Salaires:
      return <MaCC />;
    default:
      return <></>;
  }
}
```

That's all folks !
