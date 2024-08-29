import { PrecariteSituation, primePrecariteData } from "../simulators";
import { generateTree } from "./lib";
import { TreeQuestionType } from "./lib/type";

export function generateIndemnitePrecariteTree() {
  const situations = primePrecariteData;
  const questions: TreeQuestionType[] = [
    {
      name: "agreementSearch",
      question: "Vous avez sélectionné la convention collective",
      type: "agreement",
    },
    {
      name: "contractType",
      question: "Quel est le type du contrat de travail ?",
      type: "radio",
    },
    {
      name: "criteria.cddType",
      question: "Quel est le type de CDD ?",
      type: "select",
    },
    {
      name: "finContratPeriodeDessai",
      question:
        "Le CDD a-t-il été rompu pendant la période d’essai du salarié ?",
      type: "radio",
    },
    {
      name: "propositionCDIFindeContrat",
      question:
        "À la fin du CDD, le salarié a-t-il été immédiatement embauché en CDI, sans interruption, sur un même poste ou sur un poste différent ?",
      type: "radio",
    },
    {
      name: "refusCDIFindeContrat",
      question:
        "À la fin du CDD, le salarié a-t-il refusé un CDI pour occuper le même emploi ou un emploi similaire dans l’entreprise avec une rémunération au moins équivalente ?",
      type: "radio",
    },
    {
      name: "interruptionFauteGrave",
      question:
        "Le CDD a-t-il été rompu avant la fin prévue pour une des raisons suivantes : la propre initiative du salarié, la faute grave ou faute lourde du salarié, cas de force majeure ?",
      type: "radio",
    },
    {
      name: "refusRenouvellementAuto",
      question:
        "Le salarié a-t-il refusé de renouveler le CDD alors que le renouvellement et ses modalités étaient prévus dès l’origine dans son contrat ?",
      type: "radio",
    },
    {
      name: "cttFormation",
      question:
        "Le contrat d'intérim a-t-il été rompu avant la fin prévue pour une des raisons suivantes : la propre initiative du salarié, la faute grave du salarié, cas de force majeure ?",
      type: "radio",
    },
    {
      name: "propositionCDIFinContrat",
      question:
        "À la fin du contrat d'intérim, le salarié a-t-il été immédiatement embauché en CDI au sein de l'entreprise dans laquelle il effectuait sa mission ?",
      type: "radio",
    },
    {
      name: "refusSouplesse",
      question:
        "Le salarié a-t-il refusé la mise en œuvre de la souplesse prévue dans le contrat d’intérim ?",
      type: "radio",
    },
    {
      name: "criteria.hasCdiRenewal",
      question:
        "À la fin du CDD, le salarié a-t-il été immédiatement embauché en CDI ?",
      type: "select",
    },
    {
      name: "criteria.hasEquivalentCdiRenewal",
      question:
        "À la fin du CDD, le salarié a-t-il été immédiatement embauché en CDI, sans interruption, sur un même poste ou sur un poste différent ?",
      type: "select",
    },
    {
      name: "criteria.hasCdiProposal",
      question:
        "À la fin du CDD, le salarié a-t-il reçu une proposition de CDI ?",
      type: "select",
    },
    {
      name: "typeRemuneration",
      question:
        "Comment souhaitez-vous indiquer la rémunération perçue pendant le contrat de travail ?",
      type: "radio",
    },
    {
      name: "currency",
      question:
        "Quelle est la rémunération totale brute perçue durant le contrat de travail ?",
      type: "select",
    },
  ];
  const baseSalary = 3000;
  return generateTree<PrecariteSituation>({
    situations,
    questions,
    getCriterias: (situation) => {
      if (!Object.keys(situation.criteria).length) {
        return;
      }
      let appendCriteria = {};
      if (
        situation.contractType === "CDD" &&
        situation.criteria["cddType"] === "Autres"
      ) {
        appendCriteria = {
          finContratPeriodeDessai: "Non",
          propositionCDIFindeContrat: "Non",
          refusCDIFindeContrat: "Non",
          interruptionFauteGrave: "Non",
          refusRenouvellementAuto: "Non",
        };
      } else if (situation.contractType === "CTT") {
        appendCriteria = {
          cttFormation: "Non",
          propositionCDIFinContrat: "Non",
          refusSouplesse: "Non",
        };
      } else if (
        situation.contractType === "CDD" &&
        (situation.criteria["cddType"] === "CDD d'usage" ||
          situation.criteria["cddType"] ===
            "CDD d'usage appelé contrat «d'intervention»")
      ) {
        appendCriteria = {
          "criteria.hasCdiRenewal": "non",
        };
      } else if (
        situation.contractType === "CDD" &&
        situation.criteria["cddType"] ===
          "CDD dit de « mission ponctuelle ou occasionnelle »"
      ) {
        appendCriteria = {
          "criteria.hasEquivalentCdiRenewal": "non",
        };
      } else if (
        situation.contractType === "CDD" &&
        situation.criteria["cddType"] ===
          "Contrat d'intervention dans le secteur d'activité d'organisation des foires, salons et congrès"
      ) {
        appendCriteria = {
          "criteria.hasCdiProposal": "non",
        };
      }
      const criterias = {
        ...situation.criteria,
        ...appendCriteria,
        "criteria.cddType": situation.criteria["cddType"],
        contractType: situation.contractType,
        agreementSearch: situation.idcc.toString(),
        typeRemuneration: "amount",
        currency: baseSalary.toString(),
      };
      return criterias;
    },
    getResult: (situation, arr, criterias) => {
      const legalSituation = arr.find((value) => {
        const isValid = value.criterias.some((criteria) => {
          if (criteria.name === "agreementSearch" && criteria.option === "0") {
            return true;
          }
          return !!criterias.find(
            (c) => c.name === criteria.name && c.option === criteria.option
          );
        });
        return isValid;
      });

      const { refLabel, refUrl, rate } = situation;
      if (!rate) {
        return legalSituation!.result;
      }
      const [rateNumber] = rate.split("%");
      const result = ((parseInt(rateNumber) * baseSalary) / 100).toString();
      return {
        refs: [
          {
            label: refLabel ?? "",
            url: refUrl ?? "",
          },
        ],
        texts: [result],
      };
    },
  });
}
