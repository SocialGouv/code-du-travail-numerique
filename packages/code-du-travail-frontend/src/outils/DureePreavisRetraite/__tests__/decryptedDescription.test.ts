import { FormContent } from "../../common/type/WizardType";
import {
  createRootData,
  getDescription,
  NoticeUsed,
} from "../steps/component/DecryptedResult";

const agreementSupported = { isSupported: true, notice: 2 };
const getAgreementSupported = (notice) => ({ isSupported: true, notice });
const agreementNotSupported = { isSupported: false, notice: 0 };
const agreementSupportedWithoutNotice = { isSupported: true, notice: 0 };

test.each`
  isVoluntary | agreement             | noticeUsed                   | expectedDescription
  ${true}     | ${null}               | ${NoticeUsed.none}           | ${"Le salarié ayant une ancienneté inférieure à 6 mois, il n’y a pas de préavis à respecter."}
  ${true}     | ${agreementSupported} | ${NoticeUsed.none}           | ${"Pour un salarié ayant une ancienneté inférieure à 6 mois, ni le code du travail ni la convention collective sélectionnée ne prévoit de préavis à respecter."}
  ${true}     | ${agreementSupported} | ${NoticeUsed.agreementLabor} | ${"Le code du travail ne prévoit pas de durée de préavis pour une ancienneté inférieure à 6 mois mais il renvoie à la convention ou l'accord collectif de travail ou, à défaut, aux usages pratiqués dans la localité et la profession. La durée à appliquer pour le salarié est donc la durée prévue par la convention collective."}
  ${false}    | ${null}               | ${NoticeUsed.none}           | ${"Le salarié ayant une ancienneté inférieure à 6 mois, il n’y a pas de préavis à respecter."}
  ${false}    | ${agreementSupported} | ${NoticeUsed.none}           | ${"Pour un salarié ayant une ancienneté inférieure à 6 mois, ni le code du travail ni la convention collective sélectionnée ne prévoit de préavis à respecter."}
  ${false}    | ${agreementSupported} | ${NoticeUsed.agreementLabor} | ${"Le code du travail ne prévoit pas de durée de préavis pour une ancienneté inférieure à 6 mois mais il renvoie à la convention ou l'accord collectif de travail ou, à défaut, aux usages pratiqués dans la localité et la profession. La durée à appliquer pour le salarié est donc la durée prévue par la convention collective."}
`(
  "Pour un employé ayant moins de 6 mois d'ancienneté, volontaire: $isVoluntary, CC: $agreement, Préavis: $noticeUsed, il devrait avoir la description : $expectedDescription",
  ({ isVoluntary, agreement, noticeUsed, expectedDescription }) => {
    const description = getDescription({
      agreement,
      isVoluntary,
      noticeUsed,
      seniorityLessThan6Months: true,
    });

    expect(description).toEqual(expectedDescription);
  }
);

test.each`
  agreement                          | noticeUsed                   | expectedDescription
  ${agreementSupported}              | ${NoticeUsed.legal}          | ${"La durée à appliquer pour le salarié est donc la durée légale, celle-ci étant plus courte que la durée prévue par la convention collective."}
  ${agreementSupportedWithoutNotice} | ${NoticeUsed.legal}          | ${"En l’absence de durée prévue par la convention collective, la durée de préavis à appliquer pour le salarié est donc la durée légale."}
  ${agreementSupported}              | ${NoticeUsed.same}           | ${"Le résultat correspond à la fois à la durée prévue par le code du travail et à la fois à la durée prévue par la convention collective, celles-ci étant identiques dans cette situation."}
  ${agreementSupported}              | ${NoticeUsed.agreementLabor} | ${"La durée à appliquer pour le salarié est donc la durée prévue par la convention collective, celle-ci étant plus courte que la durée légale."}
  ${null}                            | ${NoticeUsed.legal}          | ${"La convention collective n’ayant pas été renseignée, la durée de préavis affichée correspond à la durée légale."}
  ${agreementNotSupported}           | ${NoticeUsed.legal}          | ${"La convention collective n’ayant pas été traitée par nos services, la durée de préavis affichée correspond à la durée légale."}
`(
  "Pour un employé en départ à la retraite ayant plus de 6 mois d'ancienneté, CC: $agreement, Préavis: $noticeUsed, il devrait avoir la description : $expectedDescription",
  ({ agreement, noticeUsed, expectedDescription }) => {
    const description = getDescription({
      agreement,
      isVoluntary: true,
      noticeUsed,
      seniorityLessThan6Months: false,
    });

    expect(description).toEqual(expectedDescription);
  }
);

test.each`
  agreement                          | noticeUsed                   | expectedDescription
  ${agreementSupported}              | ${NoticeUsed.legal}          | ${"La durée à appliquer pour le salarié est donc la durée légale, celle-ci étant plus longue que la durée prévue par la convention collective."}
  ${agreementSupportedWithoutNotice} | ${NoticeUsed.legal}          | ${"En l’absence de durée prévue par la convention collective, la durée de préavis à appliquer pour le salarié est donc la durée légale."}
  ${agreementSupported}              | ${NoticeUsed.same}           | ${"Le résultat correspond à la fois à la durée prévue par le code du travail et à la fois à la durée prévue par la convention collective, celles-ci étant identiques dans cette situation."}
  ${agreementSupported}              | ${NoticeUsed.agreementLabor} | ${"La durée à appliquer pour le salarié est donc la durée prévue par la convention collective, celle-ci étant plus longue que la durée légale."}
  ${null}                            | ${NoticeUsed.legal}          | ${"La convention collective n’ayant pas été renseignée, la durée de préavis affichée correspond à la durée légale."}
  ${agreementNotSupported}           | ${NoticeUsed.legal}          | ${"La convention collective n’ayant pas été traitée par nos services, la durée de préavis affichée correspond à la durée légale."}
`(
  "Pour un employé en mise à la retraite ayant plus de 6 mois d'ancienneté, CC: $agreement, Préavis: $noticeUsed, il devrait avoir la description : $expectedDescription",
  ({ agreement, noticeUsed, expectedDescription }) => {
    const description = getDescription({
      agreement,
      isVoluntary: false,
      noticeUsed,
      seniorityLessThan6Months: false,
    });

    expect(description).toEqual(expectedDescription);
  }
);

test.each`
  ccnNum  | type        | seniority | result                | legalResult           | agreementResult       | expectedNoticeUsed           | expectedAgreement
  ${null} | ${"depart"} | ${"5"}    | ${{ valueInDays: 0 }} | ${{ valueInDays: 0 }} | ${null}               | ${NoticeUsed.none}           | ${null}
  ${null} | ${"mise"}   | ${"5"}    | ${{ valueInDays: 0 }} | ${{ valueInDays: 0 }} | ${null}               | ${NoticeUsed.none}           | ${null}
  ${null} | ${"depart"} | ${"24"}   | ${{ valueInDays: 2 }} | ${{ valueInDays: 2 }} | ${null}               | ${NoticeUsed.legal}          | ${null}
  ${123}  | ${"depart"} | ${"5"}    | ${{ valueInDays: 0 }} | ${{ valueInDays: 0 }} | ${null}               | ${NoticeUsed.none}           | ${agreementNotSupported}
  ${292}  | ${"depart"} | ${"5"}    | ${{ valueInDays: 0 }} | ${{ valueInDays: 0 }} | ${{ valueInDays: 0 }} | ${NoticeUsed.none}           | ${getAgreementSupported(0)}
  ${292}  | ${"depart"} | ${"5"}    | ${{ valueInDays: 2 }} | ${{ valueInDays: 0 }} | ${{ valueInDays: 2 }} | ${NoticeUsed.agreementLabor} | ${getAgreementSupported(2)}
  ${292}  | ${"mise"}   | ${"23"}   | ${{ valueInDays: 4 }} | ${{ valueInDays: 3 }} | ${{ valueInDays: 4 }} | ${NoticeUsed.agreementLabor} | ${getAgreementSupported(4)}
  ${292}  | ${"mise"}   | ${"23"}   | ${{ valueInDays: 4 }} | ${{ valueInDays: 4 }} | ${{ valueInDays: 3 }} | ${NoticeUsed.legal}          | ${getAgreementSupported(3)}
  ${292}  | ${"mise"}   | ${"23"}   | ${{ valueInDays: 4 }} | ${{ valueInDays: 4 }} | ${{ valueInDays: 4 }} | ${NoticeUsed.same}           | ${getAgreementSupported(4)}
`(
  "Pour un employé en $type à la retraite, cc: $ccnNum, ancienneté: $seniority, résultat: $result, on doit obtenir l'ancienneté provenant de $expectedNoticeUsed",
  ({
    ccnNum,
    type,
    seniority,
    result,
    legalResult,
    agreementResult,
    expectedNoticeUsed,
    expectedAgreement,
  }) => {
    let ccn = null;
    if (ccnNum) {
      ccn = {
        id: "ID",
        num: ccnNum,
        shortTitle: "ShortTitle",
        slug: "slug",
        title: "Title",
      };
    }
    const data: unknown = {
      ccn,
      "contrat salarié - ancienneté": seniority,
      "contrat salarié - mise à la retraite": type === "mise" ? "oui" : "non",
      seniorityGreaterThanTwoYears: true,
    };
    const rootData = createRootData(
      data as FormContent,
      result,
      legalResult,
      agreementResult
    );

    expect(rootData.isVoluntary).toEqual(type === "depart");
    expect(rootData.seniorityLessThan6Months).toEqual(seniority < 6);
    expect(rootData.noticeUsed).toEqual(expectedNoticeUsed);
    expect(rootData.agreement).toEqual(expectedAgreement);
  }
);
