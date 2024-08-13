import { heuresRechercheEmploiData } from "../simulators/heure-recherche-emploi";
import { preavisDemissionData } from "../simulators/preavis-demission";
import { preavisLicenciementData } from "../simulators/preavis-licenciement";
import type { SituationHeuresRechercheEmploi } from "../simulators/types";
import { generateTestFiles, generateTree } from "./lib";
import { Situation } from "../simulators/types";

function generateHeureRechercheEmploiTree() {
  const situations = heuresRechercheEmploiData.situations;
  const questions = heuresRechercheEmploiData.questions;
  return generateTree({
    getResult: ({ answer, answer2, answer3, ref, refUrl }: Situation) => ({
      refs: [{ label: ref, url: refUrl }],
      texts: answer
        ? [
            answer.replace(/\n/g, " ").replace(/ {2}/g, " ").trim(),
            answer2?.replace(/\n/g, " ").replace(/ {2}/g, " ").trim(),
            answer3?.replace(/\n/g, " ").replace(/ {2}/g, " ").trim(),
          ]
        : [
            "D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi.",
          ],
    }),
    prependCriteria: (situation: Situation) => {
      const { idcc, typeRupture, type } =
        situation as SituationHeuresRechercheEmploi;
      return [
        {
          name: "agreementSearch",
          option: idcc.toString(),
          question: "Vous avez sélectionné la convention collective",
          type: "agreement",
        },
        {
          name: "typeRupture",
          option: typeRupture ?? type,
          question:
            "Pour quelle raison le contrat de travail a-t-il été rompu ?",
          type: "select",
        },
      ];
    },
    questions,
    situations,
  });
}

function generatePreavisDemissionTree() {
  const situations = preavisDemissionData.situations;
  const questions = preavisDemissionData.questions;
  return generateTree({
    getResult: ({ answer, ref, refUrl }: Situation) => ({
      refs: [{ label: ref, url: refUrl }],
      texts: [answer?.replace(/\n/g, " ").replace(/ {2}/g, " ").trim()],
    }),
    prependCriteria: (situation: Situation) => {
      const { idcc } = situation;
      return [
        {
          name: "agreementSearch",
          option: idcc.toString(),
          question: "Vous avez sélectionné la convention collective",
          type: "agreement",
        },
      ];
    },
    questions,
    situations,
  });
}

function generatePreavisLicenciementTree() {
  const situations = preavisLicenciementData.situations;
  const questions = preavisLicenciementData.questions;
  return generateTree({
    getResult: ({ answer, answer3, ref, refUrl }: Situation) => ({
      refs: [{ label: ref, url: refUrl }],
      texts: [
        answer3 !== "0"
          ? answer?.replace(/\n/g, " ").replace(/ {2}/g, " ").trim()
          : "Aucun préavis",
      ],
    }),
    prependCriteria: (situation: Situation) => {
      const { idcc } = situation;
      return [
        {
          name: "seriousMisconduct",
          option: "non",
          question: "Le licenciement est-il dû à une faute grave (ou lourde) ?",
          type: "radio",
        },
        {
          name: "disabledWorker",
          option: "non",
          question: "Le licenciement est-il dû à une faute grave (ou lourde) ?",
          type: "radio",
        },
        {
          name: "cdt.ancienneté",
          option: "15| Moins de 6 mois",
          question: "Quelle est l'ancienneté du salarié ?",
          type: "select",
        },
        {
          name: "agreementSearch",
          option: idcc.toString(),
          question: "Vous avez sélectionné la convention collective",
          type: "agreement",
        },
      ];
    },
    questions,
    situations,
  });
}

async function main() {
  if (process.argv.length < 3) {
    throw new Error("missing argument 'path'");
  }
  const path = process.argv[2];
  const hre = generateHeureRechercheEmploiTree();
  await generateTestFiles(
    hre,
    "HeuresRechercheEmploi",
    `${path}/src/outils/HeuresRechercheEmploi/__tests__/agreements`
  );

  const dpd = generatePreavisDemissionTree();
  await generateTestFiles(
    dpd,
    "DureePreavisDemission",
    `${path}/src/outils/DureePreavisDemission/__tests__/agreements`
  );

  const dpl = generatePreavisLicenciementTree();
  await generateTestFiles(
    dpl,
    "DureePreavisLicenciement",
    `${path}/src/outils/DureePreavisLicenciement/__tests__/agreements`
  );
}

main();
