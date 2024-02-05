import { getContributionSitemapData } from "../service";

describe("Sitemap", () => {
  it("getAllContributionsMatchingSlug returns empty array if contrib does not exists", async () => {
    const result = await getContributionSitemapData("not-found");
    expect(result).toEqual([]);
  });

  it("getAllContributionsMatchingSlug returns the generic contrib and all the supported contribs", async () => {
    const result = await getContributionSitemapData(
      "la-periode-dessai-peut-elle-etre-renouvelee"
    );
    expect(result.length).toEqual(37);
    expect(result[0]).toEqual({
      slug: "la-periode-dessai-peut-elle-etre-renouvelee",
      title: "La période d’essai peut-elle être renouvelée ?",
    });
    expect(result[1]).toEqual({
      slug: "1043-la-periode-dessai-peut-elle-etre-renouvelee",
      title:
        "Gardiens, concierges et employés d'immeubles: La période d’essai peut-elle être renouvelée ?",
    });
  });
  it("getAllContributionsMatchingSlug returns empty array if no cc supported", async () => {
    const result = await getContributionSitemapData(
      "quelles-sont-les-conditions-de-la-clause-de-non-concurrence"
    );
    expect(result.length).toEqual(0);
  });
});
