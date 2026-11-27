import { toIsoDateTimeParis } from "../../utils/date";
import {
  getNewsModifiedTime,
  getNewsPublishedTime,
  getNewsUpdatedDisplayDate,
} from "../dates";

describe("getNewsUpdatedDisplayDate", () => {
  it("renvoie le jour (Paris) de la mise à jour s'il est postérieur à la publication", () => {
    expect(
      getNewsUpdatedDisplayDate("01/10/2026", "2026-10-10T13:07:55Z")
    ).toBe("10/10/2026");
    expect(
      getNewsUpdatedDisplayDate(
        "01/10/2026",
        "2026-10-02T08:00:00Z",
        "2026-10-01T07:45:00Z"
      )
    ).toBe("02/10/2026");
  });

  it("n'affiche rien pour une mise à jour le jour même de la publication", () => {
    expect(
      getNewsUpdatedDisplayDate(
        "01/10/2026",
        "2026-10-01T18:00:00Z",
        "2026-10-01T07:45:00Z"
      )
    ).toBeUndefined();
    expect(
      getNewsUpdatedDisplayDate("01/10/2026", "2026-10-01T13:00:00Z")
    ).toBeUndefined();
  });

  it("compare les jours à Paris, pas en UTC, autour de minuit", () => {
    // Publiée le 05/03 à 23h30 UTC = 06/03 00h30 à Paris ; modifiée le 06/03
    // à 10h UTC : même jour à Paris.
    expect(
      getNewsUpdatedDisplayDate(
        "05/03/2026",
        "2026-03-06T10:00:00Z",
        "2026-03-05T23:30:00Z"
      )
    ).toBeUndefined();
    // Modifiée le 05/03 à 23h30 UTC = 06/03 à Paris, publiée le 05/03 à
    // Paris : jour suivant.
    expect(
      getNewsUpdatedDisplayDate(
        "05/03/2026",
        "2026-03-05T23:30:00Z",
        "2026-03-05T09:00:00Z"
      )
    ).toBe("06/03/2026");
  });

  it("n'affiche rien pour une mise à jour antérieure à la publication", () => {
    expect(
      getNewsUpdatedDisplayDate("20/10/2026", "2026-10-10T13:07:55Z")
    ).toBeUndefined();
  });

  it.each([undefined, "", "invalide"])(
    "n'affiche rien sans date de modification valide (%p)",
    (updatedAt) => {
      expect(
        getNewsUpdatedDisplayDate("01/10/2026", updatedAt)
      ).toBeUndefined();
    }
  );

  it("n'affiche rien sans date de publication valide", () => {
    expect(
      getNewsUpdatedDisplayDate(undefined, "2026-10-10T13:07:55Z")
    ).toBeUndefined();
    expect(
      getNewsUpdatedDisplayDate("pas une date", "2026-10-10T13:07:55Z")
    ).toBeUndefined();
  });
});

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
