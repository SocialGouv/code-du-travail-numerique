import { sortByThemeOrder } from "../sortByThemeOrder";
import { ThemeRefs } from "../queries";

const TEMPS_DE_TRAVAIL = {
  label: "Temps de travail",
  position: 13,
  slug: "/themes/temps-de-travail",
};
const HEURES_SUP = {
  label: "Heures supplémentaires",
  position: 2,
  slug: "/themes/temps-de-travail#heures-supplementaires",
};
const DUREE = {
  label: "Durée du travail",
  position: 1,
  slug: "/themes/temps-de-travail#duree-du-travail",
};
const EMBAUCHE = {
  label: "Embauche",
  position: 1,
  slug: "/themes/embauche",
};

const doc = (
  slug: string,
  breadcrumbs: { label: string; position: number; slug: string }[],
  source = "contributions"
) => ({ slug, source, title: slug, breadcrumbs });

const themes: ThemeRefs[] = [
  {
    slug: "heures-supplementaires",
    refs: [
      { slug: "hs-second", source: "information" },
      { slug: "hs-first", source: "contributions" },
      { slug: "hs-second", source: "contributions" },
    ],
  },
  {
    slug: "duree-du-travail",
    refs: [{ slug: "duree-first", source: "contributions" }],
  },
  {
    slug: "temps-de-travail",
    refs: [{ slug: "racine", source: "contributions" }],
  },
];

describe("sortByThemeOrder", () => {
  it("trie par position du thème, du sous-thème puis rang dans les refs du sous-thème", () => {
    const documents = [
      doc("hs-second", [TEMPS_DE_TRAVAIL, HEURES_SUP]),
      doc("duree-first", [TEMPS_DE_TRAVAIL, DUREE]),
      doc("hs-first", [TEMPS_DE_TRAVAIL, HEURES_SUP]),
      doc("embauche", [EMBAUCHE]),
    ];

    expect(sortByThemeOrder(documents, themes).map(({ slug }) => slug)).toEqual(
      ["embauche", "duree-first", "hs-first", "hs-second"]
    );
  });

  it("apparie une ref sur le couple (source, slug)", () => {
    const documents = [
      doc("hs-second", [TEMPS_DE_TRAVAIL, HEURES_SUP]),
      doc("hs-first", [TEMPS_DE_TRAVAIL, HEURES_SUP]),
      doc("hs-second", [TEMPS_DE_TRAVAIL, HEURES_SUP], "information"),
    ];

    expect(
      sortByThemeOrder(documents, themes).map(({ source, slug }) =>
        [source, slug].join(":")
      )
    ).toEqual([
      "information:hs-second",
      "contributions:hs-first",
      "contributions:hs-second",
    ]);
  });

  it("place un document rattaché au thème racine avant ceux des sous-thèmes", () => {
    const documents = [
      doc("duree-first", [TEMPS_DE_TRAVAIL, DUREE]),
      doc("racine", [TEMPS_DE_TRAVAIL]),
    ];

    expect(sortByThemeOrder(documents, themes).map(({ slug }) => slug)).toEqual(
      ["racine", "duree-first"]
    );
  });

  it("place les documents absents des refs après ceux classés, triés par titre", () => {
    const documents = [
      { ...doc("zz-inconnu", [TEMPS_DE_TRAVAIL, HEURES_SUP]), title: "Zêta" },
      doc("hs-second", [TEMPS_DE_TRAVAIL, HEURES_SUP]),
      { ...doc("aa-inconnu", [TEMPS_DE_TRAVAIL, HEURES_SUP]), title: "Alpha" },
      doc("hs-first", [TEMPS_DE_TRAVAIL, HEURES_SUP]),
    ];

    expect(sortByThemeOrder(documents, themes).map(({ slug }) => slug)).toEqual(
      ["hs-first", "hs-second", "aa-inconnu", "zz-inconnu"]
    );
  });

  it("rejette en fin de liste les documents sans breadcrumb", () => {
    const documents = [
      { slug: "sans-theme", source: "contributions", title: "Sans thème" },
      doc("embauche", [EMBAUCHE]),
    ];

    expect(sortByThemeOrder(documents, themes).map(({ slug }) => slug)).toEqual(
      ["embauche", "sans-theme"]
    );
  });

  it("tolère un thème sans refs", () => {
    const documents = [
      doc("hs-second", [TEMPS_DE_TRAVAIL, HEURES_SUP]),
      doc("hs-first", [TEMPS_DE_TRAVAIL, HEURES_SUP]),
    ];

    expect(
      sortByThemeOrder(documents, [
        { slug: "temps-de-travail" },
        { slug: "heures-supplementaires", refs: [] },
      ]).map(({ slug }) => slug)
    ).toEqual(["hs-first", "hs-second"]);
  });

  it("ne modifie pas la liste d'origine", () => {
    const documents = [
      doc("hs-second", [TEMPS_DE_TRAVAIL, HEURES_SUP]),
      doc("hs-first", [TEMPS_DE_TRAVAIL, HEURES_SUP]),
    ];

    sortByThemeOrder(documents, themes);

    expect(documents.map(({ slug }) => slug)).toEqual([
      "hs-second",
      "hs-first",
    ]);
  });
});
