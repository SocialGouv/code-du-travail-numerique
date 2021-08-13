import { FormContent } from "../../common/type/WizardType";
import {
  createRootData,
  getDescription,
  NoticeUsed,
} from "../steps/component/DecryptedResult";

const labourAgreementSupported = { isSupported: true, notice: 2 };
const getLabourAgreementSupported = (notice) => ({ isSupported: true, notice });
const labourAgreementNotSupported = { isSupported: false, notice: 0 };
const labourAgreementSupportedWithoutNotice = { isSupported: true, notice: 0 };
test.each`
  isVoluntary | labourAgreement             | noticeUsed                   | expectedDescription
  ${true}     | ${null}                     | ${NoticeUsed.none}           | ${"Le salarié ayant une ancienneté inférieure à 6 mois, il n’y a pas de préavis à respecter."}
  ${true}     | ${labourAgreementSupported} | ${NoticeUsed.none}           | ${"Pour un salarié ayant une ancienneté inférieure à 6 mois, ni le code du travail ni la convention collective sélectionnée ne prévoit de préavis à respecter."}
  ${true}     | ${labourAgreementSupported} | ${NoticeUsed.agreementLabor} | ${"Le code du travail ne prévoit pas de durée de préavis pour une ancienneté inférieure à 6 mois mais il renvoie à la convention ou l'accord collectif de travail ou, à défaut, aux usages pratiqués dans la localité et la profession. La durée à appliquer pour le salarié est donc la durée prévue par la convention collective."}
  ${false}    | ${null}                     | ${NoticeUsed.none}           | ${"Le salarié ayant une ancienneté inférieure à 6 mois, il n’y a pas de préavis à respecter."}
  ${false}    | ${labourAgreementSupported} | ${NoticeUsed.none}           | ${"Pour un salarié ayant une ancienneté inférieure à 6 mois, ni le code du travail ni la convention collective sélectionnée ne prévoit de préavis à respecter."}
  ${false}    | ${labourAgreementSupported} | ${NoticeUsed.agreementLabor} | ${"Le code du travail ne prévoit pas de durée de préavis pour une ancienneté inférieure à 6 mois mais il renvoie à la convention ou l'accord collectif de travail ou, à défaut, aux usages pratiqués dans la localité et la profession. La durée à appliquer pour le salarié est donc la durée prévue par la convention collective."}
`(
  "Pour un employé ayant moins de 6 mois d'ancienneté, volontaire: $isVoluntary, CC: $labourAgreement, Préavis: $noticeUsed, il devrait avoir la description : $expectedDescription",
  ({ isVoluntary, labourAgreement, noticeUsed, expectedDescription }) => {
    const description = getDescription({
      isVoluntary,
      labourAgreement,
      noticeUsed,
      seniorityLessThan6Months: true,
    });

    expect(description).toEqual(expectedDescription);
  }
);

test.each`
  labourAgreement                          | noticeUsed                   | expectedDescription
  ${labourAgreementSupported}              | ${NoticeUsed.legal}          | ${"La durée à appliquer pour le salarié est donc la durée légale, celle-ci étant plus courte que la durée prévue par la convention collective."}
  ${labourAgreementSupportedWithoutNotice} | ${NoticeUsed.legal}          | ${"En l’absence de durée prévue par la convention collective, la durée de préavis à appliquer pour le salarié est donc la durée légale."}
  ${labourAgreementSupported}              | ${NoticeUsed.same}           | ${"Le résultat correspond à la fois à la durée prévue par le code du travail et à la fois à la durée prévue par la convention collective, celles-ci étant identiques dans cette situation."}
  ${labourAgreementSupported}              | ${NoticeUsed.agreementLabor} | ${"La durée à appliquer pour le salarié est donc la durée prévue par la convention collective, celle-ci étant plus courte que la durée légale."}
  ${null}                                  | ${NoticeUsed.legal}          | ${"La convention collective n’ayant pas été renseignée, la durée de préavis affichée correspond à la durée légale."}
  ${labourAgreementNotSupported}           | ${NoticeUsed.legal}          | ${"La convention collective n’ayant pas été traitée par nos services, la durée de préavis affichée correspond à la durée légale."}
`(
  "Pour un employé en départ à la retraite ayant plus de 6 mois d'ancienneté, CC: $labourAgreement, Préavis: $noticeUsed, il devrait avoir la description : $expectedDescription",
  ({ labourAgreement, noticeUsed, expectedDescription }) => {
    const description = getDescription({
      isVoluntary: true,
      labourAgreement,
      noticeUsed,
      seniorityLessThan6Months: false,
    });

    expect(description).toEqual(expectedDescription);
  }
);

test.each`
  labourAgreement                          | noticeUsed                   | expectedDescription
  ${labourAgreementSupported}              | ${NoticeUsed.legal}          | ${"La durée à appliquer pour le salarié est donc la durée légale, celle-ci étant plus longue que la durée prévue par la convention collective."}
  ${labourAgreementSupportedWithoutNotice} | ${NoticeUsed.legal}          | ${"En l’absence de durée prévue par la convention collective, la durée de préavis à appliquer pour le salarié est donc la durée légale."}
  ${labourAgreementSupported}              | ${NoticeUsed.same}           | ${"Le résultat correspond à la fois à la durée prévue par le code du travail et à la fois à la durée prévue par la convention collective, celles-ci étant identiques dans cette situation."}
  ${labourAgreementSupported}              | ${NoticeUsed.agreementLabor} | ${"La durée à appliquer pour le salarié est donc la durée prévue par la convention collective, celle-ci étant plus longue que la durée légale."}
  ${null}                                  | ${NoticeUsed.legal}          | ${"La convention collective n’ayant pas été renseignée, la durée de préavis affichée correspond à la durée légale."}
  ${labourAgreementNotSupported}           | ${NoticeUsed.legal}          | ${"La convention collective n’ayant pas été traitée par nos services, la durée de préavis affichée correspond à la durée légale."}
`(
  "Pour un employé en mise à la retraite ayant plus de 6 mois d'ancienneté, CC: $labourAgreement, Préavis: $noticeUsed, il devrait avoir la description : $expectedDescription",
  ({ labourAgreement, noticeUsed, expectedDescription }) => {
    const description = getDescription({
      isVoluntary: false,
      labourAgreement,
      noticeUsed,
      seniorityLessThan6Months: false,
    });

    expect(description).toEqual(expectedDescription);
  }
);

test.each`
  ccnNum  | type        | seniority | result          | legalResult     | labourAgreementResult | expectedNoticeUsed           | expectedLabourAgreement
  ${null} | ${"depart"} | ${"5"}    | ${{ value: 0 }} | ${{ value: 0 }} | ${null}               | ${NoticeUsed.none}           | ${null}
  ${null} | ${"mise"}   | ${"5"}    | ${{ value: 0 }} | ${{ value: 0 }} | ${null}               | ${NoticeUsed.none}           | ${null}
  ${123}  | ${"depart"} | ${"5"}    | ${{ value: 0 }} | ${{ value: 0 }} | ${null}               | ${NoticeUsed.none}           | ${labourAgreementNotSupported}
  ${292}  | ${"depart"} | ${"5"}    | ${{ value: 0 }} | ${{ value: 0 }} | ${{ value: 0 }}       | ${NoticeUsed.none}           | ${getLabourAgreementSupported(0)}
  ${292}  | ${"depart"} | ${"5"}    | ${{ value: 2 }} | ${{ value: 0 }} | ${{ value: 2 }}       | ${NoticeUsed.agreementLabor} | ${getLabourAgreementSupported(2)}
  ${292}  | ${"mise"}   | ${"23"}   | ${{ value: 4 }} | ${{ value: 3 }} | ${{ value: 4 }}       | ${NoticeUsed.agreementLabor} | ${getLabourAgreementSupported(4)}
  ${292}  | ${"mise"}   | ${"23"}   | ${{ value: 4 }} | ${{ value: 4 }} | ${{ value: 3 }}       | ${NoticeUsed.legal}          | ${getLabourAgreementSupported(3)}
  ${292}  | ${"mise"}   | ${"23"}   | ${{ value: 4 }} | ${{ value: 4 }} | ${{ value: 4 }}       | ${NoticeUsed.same}           | ${getLabourAgreementSupported(4)}
`(
  "Pour un employé en $type à la retraite, cc: $ccnNum, ancienneté: $seniority, résultat: $result, on doit obtenir l'ancienneté provenant de $expectedNoticeUsed",
  ({
    ccnNum,
    type,
    seniority,
    result,
    legalResult,
    labourAgreementResult,
    expectedNoticeUsed,
    expectedLabourAgreement,
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
      infos: {
        "contrat salarié - mise à la retraite": type === "mise" ? "oui" : "non",
        "contrat salarié - ancienneté": seniority,
      },
      seniorityGreaterThanTwoYears: true,
    };
    const rootData = createRootData(
      data as FormContent,
      result,
      legalResult,
      labourAgreementResult
    );

    expect(rootData.isVoluntary).toEqual(type === "depart");
    expect(rootData.seniorityLessThan6Months).toEqual(seniority < 6);
    expect(rootData.noticeUsed).toEqual(expectedNoticeUsed);
    expect(rootData.labourAgreement).toEqual(expectedLabourAgreement);
  }
);
