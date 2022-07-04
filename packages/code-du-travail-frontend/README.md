# Code-du-travail - Frontend (@cdt/frontend)

## Lancer l'environnement de développement

**Important** : pour tourner en local, ce projet nécessite les services api et elasticsearch. Par défaut on va utiliser l'API publique de dev.

```sh
yarn dev:frontend:preprod-api
```

## Ajouter une convention collective pour l'indemnité de licenciement

### I. `code-du-travail-modeles`

#### 1. Ajouter le salaire de référence

Dans le folder `plugins/salaire-reference`, ajouter la convention collective pour l'indemnité de licenciement en créant un fichier.

Il faut ajouter le type d'entrée de l'input aussi tout en rajoutant les TUs.

Puis dans `types`, rajouter le type de votre convention collective

```ts
export enum SupportedCcIndemniteLicenciement {
  IDCC1516 = "IDCC1516",
  default = "default",
  IDCCXXX = "IDCCXXX",
}

export type ReferenceSalaryProps<T> =
  T extends SupportedCcIndemniteLicenciement.IDCC1516
    ? CC1516ReferenceSalaryProps
  T extends SupportedCcIndemniteLicenciement.IDCCXXX
    ? IDCCXXXReferenceSalaryProps
    : LegalReferenceSalaryProps;
```

#### 2. Ajouter au modèle publicodes

```yml
contrat salarié . convention collective . ma cc . indemnité de licenciement:
  valeur: oui

contrat salarié . convention collective . ma cc . indemnité de licenciement . salaire de référence:
  remplace: contrat salarié . salaire de référence conventionnel
```

:warning: N'oublions pas d'écrire les tests pour cette partie.

## II. `code-du-travail-frontend`

### 3. Rajouter la convention collective

Il faut ajouter dans le dossier `src/outils/IndemniteLicenciement/agreements`, un dossier avec le nom de la convention collective.

Celui-ci est composé d'un `Component.tsx` qui fonctionne comme une étape avec son propre `store`.

Ce `store` est retrouvable dans un dossier, dans le quel, on ajoute un `validator.ts` qui est activable à chaque suivant, et un `store.ts` pour sauvegarder les informations saisies par l'utilisateur.

On peut rajouter une méthode d'override du calcul du salaire de reference conventionnel dans un fichier `computeReferenceSalary.ts`. Celui-ci sera activé au niveau du suivant, et par conséquent lorsque les informations sont validées par le validator.

### 4. Rajouter le type de convention collective

Dans `src/outils/IndemniteLicenciement/types.ts` :

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
  set: SetState<MainStore>,
  get: GetState<MainStore>
) => ({
  ...createAgreement1516StoreSalaires(set, get),
  ...createMaCCStore(set, get),
});
```

### 5. Rajouter le validator

Dans `src/outils/IndemniteLicenciement/validator.ts` a la racine :

```ts
export const validateAgreement = (
  idcc: SupportedCcIndemniteLicenciement,
  step: IndemniteLicenciementStepName,
  get: GetState<any>,
  set: SetState<MainStore>
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

### 6. Rajouter le composant d'injection

Dans `src/outils/IndemniteLicenciement/AgreementsInjector.tsx` :

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
