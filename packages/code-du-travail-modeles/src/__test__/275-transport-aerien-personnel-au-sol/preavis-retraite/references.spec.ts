import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";
import { getReferences } from "../../../utils";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../common/legal-references";

const engine = new Engine(mergeModels());

const OuvriersReferences = [
  {
    article: "Annexe III article 15",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005872211/?idConteneur=KALICONT000005635872",
  },
];

const EmployeesReferences = OuvriersReferences;

const TechniciensReferences = [
  {
    article: "Annexe II article 11",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005872146/?idConteneur=KALICONT000005635872",
  },
];

const AgentDeMaitriseReferences = TechniciensReferences;

const CadresReferences = [
  {
    article: "Annexe I article 10",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005872089/?idConteneur=KALICONT000005635872",
  },
];

test.each`
  retirement  | category                | expectedReferences
  ${"depart"} | ${"Ouvriers"}           | ${DepartRetraiteReferences.concat(OuvriersReferences)}
  ${"depart"} | ${"Employés"}           | ${DepartRetraiteReferences.concat(EmployeesReferences)}
  ${"depart"} | ${"Agents de maîtrise"} | ${DepartRetraiteReferences.concat(AgentDeMaitriseReferences)}
  ${"depart"} | ${"Techniciens"}        | ${DepartRetraiteReferences.concat(TechniciensReferences)}
  ${"depart"} | ${"Cadres"}             | ${DepartRetraiteReferences.concat(CadresReferences)}
  ${"mise"}   | ${"Ouvriers"}           | ${MiseRetraiteReferences.concat(OuvriersReferences)}
  ${"mise"}   | ${"Employés"}           | ${MiseRetraiteReferences.concat(EmployeesReferences)}
  ${"mise"}   | ${"Agents de maîtrise"} | ${MiseRetraiteReferences.concat(AgentDeMaitriseReferences)}
  ${"mise"}   | ${"Techniciens"}        | ${MiseRetraiteReferences.concat(TechniciensReferences)}
  ${"mise"}   | ${"Cadres"}             | ${MiseRetraiteReferences.concat(CadresReferences)}
`(
  "Vérification des références juridiques pour un employé en $retirement à la retraite",
  ({ retirement, category, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . ancienneté": 5,
        "contrat salarié . convention collective": "'IDCC0275'",
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . travailleur handicapé": "non",
        "préavis de retraite": "oui",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
