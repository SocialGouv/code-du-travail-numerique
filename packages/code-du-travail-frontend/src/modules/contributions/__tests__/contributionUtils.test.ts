import {
  buildContributionAgreementPath,
  CONTRIBUTIONS_WITH_AGREEMENT_SUBPATH,
  hasAgreementSubpath,
} from "../contributionUtils";

describe("Format d'URL /contribution/<slug>/<cc>", () => {
  // Verrou volontaire (#7518) : étendre ce format à une autre contribution
  // impose d'abord la checklist SEO de changement d'URL (#7519,
  // BEST_PRACTICE.md). Mettre ce test à jour fait partie de cette démarche.
  it("reste limité aux congés pour événements familiaux", () => {
    expect(CONTRIBUTIONS_WITH_AGREEMENT_SUBPATH).toEqual([
      "les-conges-pour-evenements-familiaux",
    ]);
  });

  it("n'est reconnu que pour les contributions de la liste", () => {
    expect(hasAgreementSubpath("les-conges-pour-evenements-familiaux")).toBe(
      true
    );
    expect(
      hasAgreementSubpath("quelle-est-la-duree-du-preavis-en-cas-de-demission")
    ).toBe(false);
    expect(hasAgreementSubpath(undefined)).toBe(false);
  });

  it("construit l'URL CC au nouveau format pour les contributions de la liste", () => {
    expect(
      buildContributionAgreementPath("les-conges-pour-evenements-familiaux", {
        num: 2941,
        slug: "2941-aide-accompagnement-soins-et-services-a-domicile-bad",
      })
    ).toBe(
      "/contribution/les-conges-pour-evenements-familiaux/2941-aide-accompagnement-soins-et-services-a-domicile-bad"
    );
  });

  it("garde l'URL historique pour les autres contributions", () => {
    expect(
      buildContributionAgreementPath(
        "quelle-est-la-duree-du-preavis-en-cas-de-demission",
        {
          num: 2941,
          slug: "2941-aide-accompagnement-soins-et-services-a-domicile-bad",
        }
      )
    ).toBe(
      "/contribution/2941-quelle-est-la-duree-du-preavis-en-cas-de-demission"
    );
  });
});
