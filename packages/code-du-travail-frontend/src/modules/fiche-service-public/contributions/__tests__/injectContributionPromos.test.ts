import {
  FicheSPData,
  FicheSPDataContributionPromo,
  FicheSPDataParagraphe,
  FicheSPDataText,
} from "../../builder/type";
import {
  CONTRIBUTION_PROMO_NODE_NAME,
  injectContributionPromos,
} from "../injectContributionPromos";

jest.mock("../config", () => {
  const actual = jest.requireActual("../config");
  return {
    ...actual,
    getContributionPromos: (spSlug: string) =>
      ({
        "fiche-page": [
          {
            spSlug,
            contributionSlug: "contrib-page",
            placement: { type: "page" },
          },
        ],
        "fiche-deux-pages": [
          {
            spSlug,
            contributionSlug: "contrib-a",
            placement: { type: "page" },
          },
          {
            spSlug,
            contributionSlug: "contrib-b",
            placement: { type: "page" },
          },
        ],
        "fiche-accordeon": [
          {
            spSlug,
            contributionSlug: "contrib-acc-2",
            placement: { type: "accordion", index: 2 },
          },
        ],
        "fiche-accordeons-multiples": [
          {
            spSlug,
            contributionSlug: "contrib-acc-1",
            placement: { type: "accordion", index: 1 },
          },
          {
            spSlug,
            contributionSlug: "contrib-acc-3",
            placement: { type: "accordion", index: 3 },
          },
        ],
        "fiche-accordeon-inexistant": [
          {
            spSlug,
            contributionSlug: "contrib-acc-42",
            placement: { type: "accordion", index: 42 },
          },
        ],
        "fiche-section": [
          {
            spSlug,
            contributionSlug: "contrib-section-2",
            placement: { type: "section", index: 2 },
          },
        ],
      })[spSlug] ?? [],
  };
});

const text = (value: string): FicheSPDataText => ({
  type: "text",
  text: value,
});
const paragraphe = (value: string): FicheSPDataParagraphe => ({
  type: "element",
  name: "Paragraphe",
  children: [text(value)],
});
const titre = (value: string): FicheSPData =>
  ({
    type: "element",
    name: "Titre",
    children: [paragraphe(value)],
  }) as FicheSPData;
const chapitre = (title: string, ...body: string[]): FicheSPData =>
  ({
    type: "element",
    name: "Chapitre",
    children: [titre(title), ...body.map(paragraphe)],
  }) as FicheSPData;

const childrenOf = (node: FicheSPData): FicheSPData[] =>
  (node as { children: FicheSPData[] }).children;

const names = (nodes: FicheSPData[]) =>
  nodes.map((node) => (node.type === "element" ? node.name : "text"));

const promoSlugs = (nodes: FicheSPData[]) =>
  nodes
    .filter(
      (node) =>
        node.type === "element" && node.name === CONTRIBUTION_PROMO_NODE_NAME
    )
    .map(
      (node) =>
        (node as FicheSPDataContributionPromo).attributes.contributionSlug
    );

const buildFiche = (): FicheSPData[] => [
  { type: "element", name: "Introduction", children: [paragraphe("intro")] },
  {
    type: "element",
    name: "Texte",
    children: [
      chapitre("Accordéon 1", "corps 1"),
      chapitre("Accordéon 2", "corps 2a", "corps 2b", "corps 2c"),
    ],
  } as FicheSPData,
  {
    type: "element",
    name: "Texte",
    children: [chapitre("Accordéon 3", "corps 3")],
  } as FicheSPData,
];

describe("injectContributionPromos", () => {
  it("retourne l'arbre tel quel pour une fiche sans mise en avant", () => {
    const fiche = buildFiche();
    expect(injectContributionPromos(fiche, "fiche-inconnue")).toBe(fiche);
  });

  it("ne modifie pas l'arbre d'origine", () => {
    const fiche = buildFiche();
    const before = JSON.stringify(fiche);
    injectContributionPromos(fiche, "fiche-page");
    expect(JSON.stringify(fiche)).toEqual(before);
  });

  it("insère le bloc juste après l'introduction pour un emplacement « page »", () => {
    const result = injectContributionPromos(buildFiche(), "fiche-page");
    expect(names(result)).toEqual([
      "Introduction",
      CONTRIBUTION_PROMO_NODE_NAME,
      "Texte",
      "Texte",
    ]);
    expect(promoSlugs(result)).toEqual(["contrib-page"]);
  });

  it("insère le bloc en tête de fiche s'il n'y a pas d'introduction", () => {
    const [, ...sansIntro] = buildFiche();
    const result = injectContributionPromos(sansIntro, "fiche-page");
    expect(names(result)[0]).toEqual(CONTRIBUTION_PROMO_NODE_NAME);
  });

  it("conserve l'ordre de configuration pour deux blocs au même emplacement", () => {
    const result = injectContributionPromos(buildFiche(), "fiche-deux-pages");
    expect(names(result)).toEqual([
      "Introduction",
      CONTRIBUTION_PROMO_NODE_NAME,
      CONTRIBUTION_PROMO_NODE_NAME,
      "Texte",
      "Texte",
    ]);
    expect(promoSlugs(result)).toEqual(["contrib-a", "contrib-b"]);
  });

  it("insère le bloc en deuxième position du contenu du N-ième accordéon", () => {
    const result = injectContributionPromos(buildFiche(), "fiche-accordeon");
    const accordion2 = childrenOf(result[1])[1];
    expect(names(childrenOf(accordion2))).toEqual([
      "Titre",
      "Paragraphe",
      CONTRIBUTION_PROMO_NODE_NAME,
      "Paragraphe",
      "Paragraphe",
    ]);
    expect(promoSlugs(childrenOf(accordion2))).toEqual(["contrib-acc-2"]);
    // Les autres accordéons sont intacts
    expect(names(childrenOf(childrenOf(result[1])[0]))).toEqual([
      "Titre",
      "Paragraphe",
    ]);
  });

  it("insère le bloc en fin de contenu si l'accordéon n'a qu'un seul élément", () => {
    const result = injectContributionPromos(
      buildFiche(),
      "fiche-accordeons-multiples"
    );
    const accordion1 = childrenOf(result[1])[0];
    expect(names(childrenOf(accordion1))).toEqual([
      "Titre",
      "Paragraphe",
      CONTRIBUTION_PROMO_NODE_NAME,
    ]);
  });

  it("numérote les accordéons à travers plusieurs groupes « Texte »", () => {
    const result = injectContributionPromos(
      buildFiche(),
      "fiche-accordeons-multiples"
    );
    const accordion1 = childrenOf(result[1])[0];
    const accordion3 = childrenOf(result[2])[0];
    expect(promoSlugs(childrenOf(accordion1))).toEqual(["contrib-acc-1"]);
    expect(promoSlugs(childrenOf(accordion3))).toEqual(["contrib-acc-3"]);
  });

  it("ignore un accordéon inexistant", () => {
    const fiche = buildFiche();
    const result = injectContributionPromos(
      fiche,
      "fiche-accordeon-inexistant"
    );
    expect(result).toEqual(fiche);
  });

  it("insère le bloc après le titre de la N-ième section de premier niveau", () => {
    const fiche: FicheSPData[] = [
      {
        type: "element",
        name: "Introduction",
        children: [paragraphe("intro")],
      },
      {
        type: "element",
        name: "Texte",
        children: [
          titre("Section 1"),
          paragraphe("corps 1"),
          titre("Section 2"),
          paragraphe("corps 2"),
        ],
      } as FicheSPData,
    ];
    const result = injectContributionPromos(fiche, "fiche-section");
    expect(names(childrenOf(result[1]))).toEqual([
      "Titre",
      "Paragraphe",
      "Titre",
      CONTRIBUTION_PROMO_NODE_NAME,
      "Paragraphe",
    ]);
  });
});
