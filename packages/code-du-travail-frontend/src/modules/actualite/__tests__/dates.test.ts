import { toIsoDateTimeParis } from "../../utils/date";
import { getNewsModifiedTime } from "../dates";

describe("getNewsModifiedTime", () => {
  it("renvoie la date de modification quand elle est plus récente", () => {
    expect(getNewsModifiedTime("01/10/2026", "2026-10-10T13:07:55Z")).toBe(
      "2026-10-10T13:07:55.000Z"
    );
  });

  it("renvoie la date affichée quand elle est plus récente", () => {
    expect(getNewsModifiedTime("20/10/2026", "2026-10-10T13:07:55Z")).toBe(
      toIsoDateTimeParis("20/10/2026")
    );
  });

  it("renvoie la date affichée sans date de modification", () => {
    expect(getNewsModifiedTime("01/10/2026", undefined)).toBe(
      toIsoDateTimeParis("01/10/2026")
    );
  });

  it("renvoie undefined sans date valide", () => {
    expect(getNewsModifiedTime(undefined, "invalide")).toBeUndefined();
  });
});
