import fs from "fs";
import {heuresRechercheEmploiData} from "../simulators/heure-recherche-emploi";
import {preavisDemissionData} from "../simulators/preavis-demission";
import {preavisLicenciementData} from "../simulators/preavis-licenciement";
import {SituationHeuresRechercheEmploi } from "../simulators/types";
import {generateTree, generateTestFiles} from "./lib";

function generateHeureRechercheEmploiTree() {
  const situations = heuresRechercheEmploiData.situations;
  const questions = heuresRechercheEmploiData.questions;
  return generateTree({
    situations,
    questions,
    prependCriteria: (situation) =>  {
      const { idcc, typeRupture, type } = situation as SituationHeuresRechercheEmploi;
      return [{
        question: "Vous avez sélectionné la convention collective",
        option: idcc.toString(),
        name: "agreementSearch",
        type: "agreement"
      }, {
        question: "Pour quelle raison le contrat de travail a-t-il été rompu ?",
        option: typeRupture ?? type,
        name: "typeRupture",
        type: "select"
      }]
    },
    getResult: ({answer, answer2, answer3, ref, refUrl, ref2, ref2Url}) => ({
      texts: answer ? [
        answer?.replace(/\n/g, " ").replace(/  /g, " ").trim(),
        answer2?.replace(/\n/g, " ").replace(/  /g, " ").trim(),
        answer3?.replace(/\n/g, " ").replace(/  /g, " ").trim(),
      ] : ["D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi."],
      refs: [
        {label: ref, url: refUrl},
        ...(ref2 ? [{label: ref2, url: ref2Url}] : [])
      ] 
    })
  })
}

function generatePreavisDemissionTree() {
  const situations = preavisDemissionData.situations;
  const questions = preavisDemissionData.questions;
  return generateTree({
    situations,
    questions,
    prependCriteria: (situation) =>  {
      const { idcc } = situation;
      return [{
        question: "Vous avez sélectionné la convention collective",
        option: idcc.toString(),
        name: "agreementSearch",
        type: "agreement"
      }]
    },
    getResult: ({answer, ref, refUrl, ref2, ref2Url}) => ({
      texts: [
        answer?.replace(/\n/g, " ").replace(/  /g, " ").trim(),
      ],
      refs: [
        {label: ref, url: refUrl},
        ...(ref2 ? [{label: ref2, url: ref2Url}] : [])
      ] 
    })
  })
}

function generatePreavisLicenciementTree() {
  const situations = preavisLicenciementData.situations;
  const questions = preavisLicenciementData.questions;
  return generateTree({
    situations,
    questions,
    prependCriteria: (situation) =>  {
      const { idcc } = situation;
      return [{
        question: "Le licenciement est-il dû à une faute grave (ou lourde) ?",
        name: "seriousMisconduct",
        option: "non",
        type: "radio"
      }, {
        question: "Le licenciement est-il dû à une faute grave (ou lourde) ?",
        name: "disabledWorker",
        option: "non",
        type: "radio"
      }, {
        question: "Quelle est l'ancienneté du salarié ?",
        name: "cdt.ancienneté",
        option: "15| Moins de 6 mois",
        type: "select"
      }, {
        question: "Vous avez sélectionné la convention collective",
        option: idcc.toString(),
        name: "agreementSearch",
        type: "agreement"
      }]
    },
    getResult: ({answer, answer3, ref, refUrl, ref2, ref2Url}) => ({
      texts: [
        answer3 !== "0" ? answer?.replace(/\n/g, " ").replace(/  /g, " ").trim() : "Aucun préavis",
      ],
      refs: [
        {label: ref, url: refUrl},
        ...(ref2 ? [{label: ref2, url: ref2Url}] : [])
      ] 
    })
  })
}

async function main() {
  if (process.argv.length < 3) {
    throw new Error("missing argument 'path'")
  }
  const path = process.argv[2];
  const hre = generateHeureRechercheEmploiTree();
  await generateTestFiles(hre, "HeuresRechercheEmploi", `${path}/src/outils/HeuresRechercheEmploi/__tests__/agreements`);

  const dpd = generatePreavisDemissionTree();
  await generateTestFiles(dpd, "DureePreavisDemission", `${path}/src/outils/DureePreavisDemission/__tests__/agreements`);

  const dpl = generatePreavisLicenciementTree();
  await generateTestFiles(dpl, "DureePreavisLicenciement", `${path}/src/outils/DureePreavisLicenciement/__tests__/agreements`);
}

main();
