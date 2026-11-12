import { toIsoDateTimeParis } from "../../utils/date";
import { getNewsModifiedTime, getNewsPublishedTime } from "../dates";

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

describe("getNewsPublishedTime", () => {
  it("renvoie l'instant de publication quand il est connu", () => {
    expect(getNewsPublishedTime("01/10/2026", "2026-10-01T07:45:00Z")).toBe(
      "2026-10-01T07:45:00.000Z"
    );
  });

  it("renvoie la date affichée à minuit Paris sans instant valide", () => {
    expect(getNewsPublishedTime("01/10/2026", undefined)).toBe(
      "2026-10-01T00:00:00+02:00"
    );
    expect(getNewsPublishedTime("01/10/2026", "invalide")).toBe(
      "2026-10-01T00:00:00+02:00"
    );
  });

  it("compare la date de modification à l'instant de publication", () => {
    expect(
      getNewsModifiedTime(
        "01/10/2026",
        "2026-10-01T06:00:00Z",
        "2026-10-01T07:45:00Z"
      )
    ).toBe("2026-10-01T07:45:00.000Z");
  });
});
