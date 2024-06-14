import { getCodeCommune } from "../fetchCp";

describe("getCodeCommune", () => {
  it("should return commune code for valid postal code", async () => {
    const postalCode = "12345";
    const expectedCode = "ABCDE";

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([{ code: expectedCode }]),
    });

    const result = await getCodeCommune(postalCode);

    expect(result).toBe(expectedCode);
    expect(fetch).toHaveBeenCalledWith(
      `https://api-geo/communes?codePostal=${postalCode}&fields=code`
    );
  });

  it("should return commune code for valid commune name", async () => {
    const communeName = "Paris";
    const expectedCode = "FGHIJ";

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([{ code: expectedCode }]),
    });

    const result = await getCodeCommune(communeName);

    expect(result).toBe(expectedCode);
    expect(fetch).toHaveBeenCalledWith(
      `https://api-geo/communes?nom=${communeName}&fields=code`
    );
  });

  it("should return undefined for invalid postal code or commune name", async () => {
    const invalidInput = "invalid";

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([]),
    });

    const result = await getCodeCommune(invalidInput);

    expect(result).toBeUndefined();
  });

  it("should return undefined if fetch fails", async () => {
    const postalCode = "12345";

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    const result = await getCodeCommune(postalCode);

    expect(result).toBeUndefined();
  });
});
