import { PublicodesUnit } from "../../publicodes";
import { NoticeUsed } from "../steps/component/DecryptedResult";
import { formatSeniority, generateNoticeUsed } from "../steps/utils";

test("should format seniority to avoid failing in publicodes", () => {
  expect(formatSeniority("4")).toBe("4");
  expect(formatSeniority("03")).toBe("3");
  expect(formatSeniority("ab")).toBe("0");
});

test("should send to the client the best notic", () => {
  expect(
    generateNoticeUsed(
      { unit: PublicodesUnit.WEEK, value: 1 },
      { unit: PublicodesUnit.WEEK, value: 1 },
      { unit: PublicodesUnit.WEEK, value: 1 }
    )
  ).toBe(NoticeUsed.same);

  expect(
    generateNoticeUsed(
      { unit: PublicodesUnit.MONTH, value: 1 },
      { unit: PublicodesUnit.WEEK, value: 1 },
      { unit: PublicodesUnit.WEEK, value: 1 }
    )
  ).toBe(NoticeUsed.agreementLabor);

  expect(
    generateNoticeUsed(
      { unit: PublicodesUnit.MONTH, value: 1 },
      { unit: PublicodesUnit.MONTH, value: 2 },
      { unit: PublicodesUnit.MONTH, value: 1 }
    )
  ).toBe(NoticeUsed.legal);
});
