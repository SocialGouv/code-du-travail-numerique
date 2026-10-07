import {
  formatRegionList,
  getOpenDepartements,
  getOpenRdvRegionByDepartement,
  getOpenRdvRegions,
  RDV_REGIONS,
  RdvRegion,
} from "../contactChannels";

// Une région sans URL est fermée : le mécanisme qui permettra d'ouvrir les
// régions au fil de l'eau, sans autre développement.
const regions: RdvRegion[] = [
  {
    key: "ouverte",
    label: "Ouverte",
    url: "https://example.org/ouverte",
    departements: [
      { code: "2A", name: "Corse-du-Sud" },
      { code: "27", name: "Eure" },
    ],
  },
  {
    key: "fermee",
    label: "Fermée",
    departements: [{ code: "75", name: "Paris" }],
  },
  {
    key: "autre",
    label: "Autre",
    url: "https://example.org/autre",
    departements: [{ code: "01", name: "Ain" }],
  },
];

describe("contactChannels", () => {
  it("ne retient que les régions dotées d'une URL", () => {
    expect(getOpenRdvRegions(regions).map((r) => r.key)).toEqual([
      "ouverte",
      "autre",
    ]);
  });

  it("liste les départements des régions ouvertes, triés par code", () => {
    expect(getOpenDepartements(regions).map((d) => d.code)).toEqual([
      "01",
      "27",
      "2A",
    ]);
  });

  it("retrouve la région ouverte d'un département, et rien pour un département fermé", () => {
    expect(getOpenRdvRegionByDepartement("2A", regions)?.url).toBe(
      "https://example.org/ouverte"
    );
    expect(getOpenRdvRegionByDepartement("75", regions)).toBeUndefined();
    expect(getOpenRdvRegionByDepartement("99", regions)).toBeUndefined();
  });

  it("formate la liste des régions en français", () => {
    expect(formatRegionList([])).toBe("");
    expect(formatRegionList([regions[0]])).toBe("Ouverte");
    expect(formatRegionList([regions[0], regions[2]])).toBe("Ouverte et Autre");
    expect(formatRegionList(regions)).toBe("Ouverte, Fermée et Autre");
  });

  it("couvre les 4 régions pilotes avec des URL et des codes uniques", () => {
    expect(RDV_REGIONS.map((r) => r.label)).toEqual([
      "Auvergne-Rhône-Alpes",
      "Bourgogne-Franche-Comté",
      "Corse",
      "Normandie",
    ]);
    expect(getOpenRdvRegions().length).toBe(4);

    const codes = RDV_REGIONS.flatMap((r) => r.departements.map((d) => d.code));
    expect(new Set(codes).size).toBe(codes.length);
    expect(codes).toHaveLength(27);
  });
});
