import {
  ConventionCollective,
  FormContent,
} from "../../common/type/WizardType";
import {
  AgreementStatus,
  createRootData,
  getDescription,
  NoticeUsed,
} from "../steps/component/DecryptedResult";

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
  const supportedCcn = [
    {
      idcc: 292,
      preavisRetraite: true,
    },
    {
      idcc: 321,
      preavisRetraite: false,
    },
  ];

  test.each`
    ccnNum  | type        | handicap | seniority | result                | legalResult           | agreementResult       | expectedNoticeUsed           | expectedAgreement
    ${null} | ${"depart"} | ${"oui"} | ${"5"}    | ${{ valueInDays: 0 }} | ${{ valueInDays: 0 }} | ${null}               | ${NoticeUsed.none}           | ${null}
    ${null} | ${"mise"}   | ${"non"} | ${"5"}    | ${{ valueInDays: 0 }} | ${{ valueInDays: 0 }} | ${null}               | ${NoticeUsed.none}           | ${null}
    ${null} | ${"depart"} | ${"oui"} | ${"24"}   | ${{ valueInDays: 2 }} | ${{ valueInDays: 2 }} | ${null}               | ${NoticeUsed.legal}          | ${null}
    ${123}  | ${"depart"} | ${"non"} | ${"5"}    | ${{ valueInDays: 0 }} | ${{ valueInDays: 0 }} | ${null}               | ${NoticeUsed.none}           | ${agreementNotSupported}
    ${321}  | ${"depart"} | ${"oui"} | ${"5"}    | ${{ valueInDays: 0 }} | ${{ valueInDays: 0 }} | ${null}               | ${NoticeUsed.none}           | ${agreementPlanned}
    ${292}  | ${"depart"} | ${"non"} | ${"5"}    | ${{ valueInDays: 0 }} | ${{ valueInDays: 0 }} | ${{ valueInDays: 0 }} | ${NoticeUsed.none}           | ${getAgreementSupported(0)}
    ${292}  | ${"depart"} | ${"oui"} | ${"5"}    | ${{ valueInDays: 2 }} | ${{ valueInDays: 0 }} | ${{ valueInDays: 2 }} | ${NoticeUsed.agreementLabor} | ${getAgreementSupported(2)}
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
          },
        };
      }
      const data: FormContent = {
        ccn,
        "contrat salarié - ancienneté": seniority,
        "contrat salarié - mise à la retraite": type === "mise" ? "oui" : "non",
        infos: { "contrat salarié - travailleur handicapé": handicap },
        seniorityMaximum: true,
        seniorityValue: "25",
      };
      const rootData = createRootData(
        data as FormContent,
        result,
        legalResult,
        agreementResult,
        supportedCcn
      );

      expect(rootData.isVoluntary).toEqual(type === "depart");
      expect(rootData.seniorityLessThan6Months).toEqual(seniority < 6);
      expect(rootData.noticeUsed).toEqual(expectedNoticeUsed);
      expect(rootData.agreement).toEqual(expectedAgreement);
      expect(rootData.handicap).toEqual(handicap === "oui");
    }
  );
});
