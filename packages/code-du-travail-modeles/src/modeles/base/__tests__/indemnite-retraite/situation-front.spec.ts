import Engine from "publicodes";

/**
 * Garde-fou : toutes les clés que le front envoie au moteur doivent exister
 * dans le bundle `indemnite-retraite`.
 *
 * `PublicodesBase.updateSituation` appelle `engine.getRule(clé)` pour chaque
 * entrée de la situation et lève si la règle est inconnue. Comme le bundle
 * retraite est autonome (il ne merge pas `indemnite-licenciement.yaml`), un
 * ajout dans `mapToPublicodesSituationForCalculation` côté front casserait le
 * simulateur au runtime sans qu'aucun test ne le voie.
 *
 * Miroir de :
 * - packages/code-du-travail-frontend/src/modules/outils/common/publicodes/indemnite-licenciement.ts
 * - packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/steps/Anciennete/store/store.ts
 * - packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/steps/Absences/store/store.ts
 */
const FRONT_SITUATION_KEYS = [
  "contrat salarié . indemnité de licenciement . date d'entrée",
  "contrat salarié . indemnité de licenciement . date de notification",
  "contrat salarié . indemnité de licenciement . date de sortie",
  "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle",
  "contrat salarié . indemnité de licenciement . arrêt de travail",
  "contrat salarié . indemnité de licenciement . salaire de référence",
  "contrat salarié . indemnité de licenciement . ancienneté en année",
  "contrat salarié . indemnité de licenciement . ancienneté requise en année",
  "contrat salarié . indemnité de retraite . mise à la retraite",
];

describe("Compatibilité du bundle retraite avec la situation construite par le front", () => {
  const engine = new Engine(modelsIndemniteRetraite.base);

  test.each(FRONT_SITUATION_KEYS)("la règle « %s » existe", (rule) => {
    expect(() => engine.getRule(rule)).not.toThrow();
  });
});
