import {
  addPrefixAgreementTitle,
  addPrefixLowerCaseAgreementTitle,
} from "../utils";

describe("addPrefixAgreementTitle", () => {
  it('should add "Convention collective" prefix if not present', () => {
    const text = "Metal";
    const expected = "Convention collective Metal";
    expect(addPrefixAgreementTitle(text)).toBe(expected);
  });

  it('should not modify text if "Convention collective" prefix already present', () => {
    const text = "Convention collective Metal";
    expect(addPrefixAgreementTitle(text)).toBe(text);
  });

  it('should not modify text if "Convention" prefix already present', () => {
    const text = "Convention d'entreprise Metal";
    expect(addPrefixAgreementTitle(text)).toBe(text);
  });
});
describe("addPrefixLowerCaseAgreementTitle", () => {
  it('should add "Convention collective" prefix if not present', () => {
    expect(addPrefixLowerCaseAgreementTitle("Metal")).toBe(
      "convention collective Metal"
    );
  });

  it('should not modify text if "Convention collective" prefix already present', () => {
    expect(
      addPrefixLowerCaseAgreementTitle("Convention collective Metal")
    ).toBe("Convention collective Metal");
  });

  it('should not modify text if "Convention" prefix already present', () => {
    expect(
      addPrefixLowerCaseAgreementTitle("Convention d'entreprise Metal")
    ).toBe("Convention d'entreprise Metal");
  });
});
