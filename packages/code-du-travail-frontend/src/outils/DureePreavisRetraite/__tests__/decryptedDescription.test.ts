import { ConventionCollective } from "../../common/type/WizardType";
import {
  AgreementStatus,
  createRootData,
  getDescription,
  NoticeUsed,
} from "../steps/ResultStep/Components/DecryptedResult";
import { PreavisRetraiteFormState } from "../form";
import { AgreementInfo, SupportedTypes } from "@socialgouv/modeles-social";

const agreementSupported = { notice: 2, status: AgreementStatus.Supported };
const getAgreementSupported = (notice) => ({
  notice,
  status: AgreementStatus.Supported,
});
const agreementNotSupported = {
  notice: 0,
  status: AgreementStatus.NotSupported,
};
const agreementPlanned = {
  notice: 0,
  status: AgreementStatus.Planned,
};
const agreementSupportedWithoutNotice = {
  notice: 0,
  status: AgreementStatus.Supported,
};

describe("Validation de la phrase explicative pour un employé avec moins de 6 mois d'ancienneté", () => {
  test.each`
    isVoluntary | agreement             | noticeUsed                   | expectedDescription
    ${true}     | ${null}               | ${NoticeUsed.none}           | ${"Le salarié ayant une ancienneté inférieure à 6 mois, il n’y a pas de préavis à respecter."}
    ${true}     | ${agreementSupported} | ${NoticeUsed.none}           | ${"Pour un salarié ayant une ancienneté inférieure à 6 mois, ni le code du travail ni la convention collective sélectionnée ne prévoit de préavis à respecter."}
    ${true}     | ${agreementSupported} | ${NoticeUsed.agreementLabor} | ${"Le code du travail ne prévoit pas de durée de préavis pour une ancienneté inférieure à 6 mois. La durée à appliquer pour le salarié est donc la durée prévue par la convention collective."}
    ${false}    | ${null}               | ${NoticeUsed.none}           | ${"Le salarié ayant une ancienneté inférieure à 6 mois, il n’y a pas de préavis à respecter."}
    ${false}    | ${agreementSupported} | ${NoticeUsed.none}           | ${"Pour un salarié ayant une ancienneté inférieure à 6 mois, ni le code du travail ni la convention collective sélectionnée ne prévoit de préavis à respecter."}
    ${false}    | ${agreementSupported} | ${NoticeUsed.agreementLabor} | ${"Le code du travail ne prévoit pas de durée de préavis pour une ancienneté inférieure à 6 mois. La durée à appliquer pour le salarié est donc la durée prévue par la convention collective."}
  `(
    "Départ à la retraite: $isVoluntary, CC: $agreement, Préavis: $noticeUsed, il devrait avoir la description : $expectedDescription",
    ({ isVoluntary, agreement, noticeUsed, expectedDescription }) => {
      const description = getDescription({
        agreement,
        handicap: false,
        isVoluntary,
        noticeUsed,
        seniorityLessThan6Months: true,
      });

      expect(description).toEqual(expectedDescription);
    }
  );
});

describe("Validation de la phrase explicative pour un employé en départ à la retraite avec plus de 6 mois d'ancienneté", () => {
  test.each`
    agreement                          | noticeUsed                   | expectedDescription
    ${agreementSupported}              | ${NoticeUsed.legal}          | ${"La durée à appliquer pour le salarié est donc la durée légale, celle-ci étant plus courte que la durée prévue par la convention collective."}
    ${agreementSupportedWithoutNotice} | ${NoticeUsed.legal}          | ${"En l’absence de durée prévue par la convention collective, la durée de préavis à appliquer pour le salarié est donc la durée légale."}
    ${agreementSupported}              | ${NoticeUsed.same}           | ${null}
    ${agreementSupported}              | ${NoticeUsed.agreementLabor} | ${"La durée à appliquer pour le salarié est donc la durée prévue par la convention collective, celle-ci étant plus courte que la durée légale."}
    ${null}                            | ${NoticeUsed.legal}          | ${"La convention collective n’ayant pas été renseignée, la durée de préavis affichée correspond à la durée légale."}
    ${agreementNotSupported}           | ${NoticeUsed.legal}          | ${"La convention collective n’ayant pas été traitée par nos services, la durée de préavis affichée correspond à la durée légale."}
    ${agreementPlanned}                | ${NoticeUsed.legal}          | ${"La convention collective n’ayant pas été traitée pour le moment par nos services, la durée de préavis affichée correspond à la durée légale."}
  `(
    "CC: $agreement, Préavis: $noticeUsed, il devrait avoir la description : $expectedDescription",
    ({ agreement, noticeUsed, expectedDescription }) => {
      const description = getDescription({
        agreement,
        handicap: false,
        isVoluntary: true,
        noticeUsed,
        seniorityLessThan6Months: false,
      });

      expect(description).toEqual(expectedDescription);
    }
  );
});

describe("Validation de la phrase explicative pour un employé en mise à la retraite avec plus de 6 mois d'ancienneté", () => {
  test.each`
    agreement                          | noticeUsed                   | expectedDescription
    ${agreementSupported}              | ${NoticeUsed.legal}          | ${"La durée à appliquer pour le salarié est donc la durée légale, celle-ci étant plus longue que la durée prévue par la convention collective."}
    ${agreementSupportedWithoutNotice} | ${NoticeUsed.legal}          | ${"En l’absence de durée prévue par la convention collective, la durée de préavis à appliquer pour le salarié est donc la durée légale."}
    ${agreementSupported}              | ${NoticeUsed.same}           | ${null}
    ${agreementSupported}              | ${NoticeUsed.agreementLabor} | ${"La durée à appliquer pour le salarié est donc la durée prévue par la convention collective, celle-ci étant plus longue que la durée légale."}
    ${null}                            | ${NoticeUsed.legal}          | ${"La convention collective n’ayant pas été renseignée, la durée de préavis affichée correspond à la durée légale."}
    ${agreementNotSupported}           | ${NoticeUsed.legal}          | ${"La convention collective n’ayant pas été traitée par nos services, la durée de préavis affichée correspond à la durée légale."}
    ${agreementPlanned}                | ${NoticeUsed.legal}          | ${"La convention collective n’ayant pas été traitée pour le moment par nos services, la durée de préavis affichée correspond à la durée légale."}
  `(
    "CC: $agreement, Préavis: $noticeUsed, il devrait avoir la description : $expectedDescription",
    ({ agreement, noticeUsed, expectedDescription }) => {
      const description = getDescription({
        agreement,
        handicap: false,
        isVoluntary: false,
        noticeUsed,
        seniorityLessThan6Months: false,
      });

      expect(description).toEqual(expectedDescription);
    }
  );
});

describe("Validation de l'aggregation des données", () => {
  const supportedCcn: AgreementInfo[] = [
    {
      idcc: 292,
      preavisRetraite: SupportedTypes.FULLY_SUPPORTED,
      indemniteLicenciement: SupportedTypes.FULLY_SUPPORTED,
    },
    {
      idcc: 321,
      preavisRetraite: SupportedTypes.NEVER_SUPPORTED,
      indemniteLicenciement: SupportedTypes.FULLY_SUPPORTED,
    },
  ];

  test.each`
    ccnNum  | type        | handicap | seniority | result                | legalResult           | agreementResult       | expectedNoticeUsed           | expectedAgreement
    ${null} | ${"départ"} | ${"oui"} | ${"5"}    | ${{ valueInDays: 0 }} | ${{ valueInDays: 0 }} | ${null}               | ${NoticeUsed.none}           | ${null}
    ${null} | ${"mise"}   | ${"non"} | ${"5"}    | ${{ valueInDays: 0 }} | ${{ valueInDays: 0 }} | ${null}               | ${NoticeUsed.none}           | ${null}
    ${null} | ${"départ"} | ${"oui"} | ${"24"}   | ${{ valueInDays: 2 }} | ${{ valueInDays: 2 }} | ${null}               | ${NoticeUsed.legal}          | ${null}
    ${123}  | ${"départ"} | ${"non"} | ${"5"}    | ${{ valueInDays: 0 }} | ${{ valueInDays: 0 }} | ${null}               | ${NoticeUsed.none}           | ${agreementNotSupported}
    ${321}  | ${"départ"} | ${"oui"} | ${"5"}    | ${{ valueInDays: 0 }} | ${{ valueInDays: 0 }} | ${null}               | ${NoticeUsed.none}           | ${agreementPlanned}
    ${292}  | ${"départ"} | ${"non"} | ${"5"}    | ${{ valueInDays: 0 }} | ${{ valueInDays: 0 }} | ${{ valueInDays: 0 }} | ${NoticeUsed.none}           | ${getAgreementSupported(0)}
    ${292}  | ${"départ"} | ${"oui"} | ${"5"}    | ${{ valueInDays: 2 }} | ${{ valueInDays: 0 }} | ${{ valueInDays: 2 }} | ${NoticeUsed.agreementLabor} | ${getAgreementSupported(2)}
    ${292}  | ${"mise"}   | ${"non"} | ${"23"}   | ${{ valueInDays: 4 }} | ${{ valueInDays: 3 }} | ${{ valueInDays: 4 }} | ${NoticeUsed.agreementLabor} | ${getAgreementSupported(4)}
    ${292}  | ${"mise"}   | ${"oui"} | ${"23"}   | ${{ valueInDays: 4 }} | ${{ valueInDays: 4 }} | ${{ valueInDays: 3 }} | ${NoticeUsed.legal}          | ${getAgreementSupported(3)}
    ${292}  | ${"mise"}   | ${"non"} | ${"23"}   | ${{ valueInDays: 4 }} | ${{ valueInDays: 4 }} | ${{ valueInDays: 4 }} | ${NoticeUsed.same}           | ${getAgreementSupported(4)}
  `(
    "Pour un employé en $type à la retraite, cc: $ccnNum, ancienneté: $seniority, résultat: $result, on doit obtenir l'ancienneté provenant de $expectedNoticeUsed",
    ({
      ccnNum,
      type,
      handicap,
      seniority,
      result,
      legalResult,
      agreementResult,
      expectedNoticeUsed,
      expectedAgreement,
    }) => {
      let ccn: ConventionCollective | undefined = undefined;
      if (ccnNum) {
        ccn = {
          route: "not-selected",
          selected: {
            id: "ID",
            num: ccnNum,
            shortTitle: "ShortTitle",
            slug: "slug",
            title: "Title",
            contributions: false,
          },
        };
      }
      const data: PreavisRetraiteFormState = {
        ccn,
        seniority: {
          value: seniority,
        },
        origin: {
          isRetirementMandatory: type === "mise" ? "oui" : "non",
        },
        infos: { "contrat salarié - travailleur handicapé": handicap },
      };
      const rootData = createRootData(
        data,
        result,
        legalResult,
        supportedCcn,
        agreementResult
      );

      expect(rootData.isVoluntary).toEqual(type === "départ");
      expect(rootData.seniorityLessThan6Months).toEqual(seniority < 6);
      expect(rootData.noticeUsed).toEqual(expectedNoticeUsed);
      expect(rootData.agreement).toEqual(expectedAgreement);
      expect(rootData.handicap).toEqual(handicap === "oui");
    }
  );
});
