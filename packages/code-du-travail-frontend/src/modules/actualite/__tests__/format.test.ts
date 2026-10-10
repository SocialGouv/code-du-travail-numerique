import { SOURCES } from "@socialgouv/cdtn-utils";
import { LinkedContent } from "@socialgouv/cdtn-types/build/elastic/related-items";
import { BUCKET_FOLDER, BUCKET_URL } from "../../../config";
import { format } from "../queries";

jest.mock("../../../api/utils", () => ({
  elasticDocumentsIndex: "index",
  elasticsearchClient: {},
}));

const base = {
  title: "Titre",
  meta_title: "Meta titre",
  meta_description: "Meta description",
  date: "01/01/2026",
  content: "<p>contenu</p>",
  linkedContent: [],
};

describe("format (actualité)", () => {
  it("construit un seul groupe 'Pour aller plus loin' avec des liens mixtes", () => {
    const result = format({
      ...base,
      linkedContent: [
        {
          source: SOURCES.TOOLS,
          slug: "ignored",
          title: "Ignoré",
          description: "",
        },
      ] as unknown as LinkedContent[],
      links: [
        { type: "external", title: "Externe", url: "https://example.com" },
        {
          type: "cdtn",
          source: SOURCES.TOOLS,
          slug: "simulateur",
          title: "Simu",
        },
      ],
    });
    expect(result.relatedItems).toHaveLength(1);
    expect(result.relatedItems[0].title).toBe("Pour aller plus loin");
    expect(result.relatedItems[0].items).toEqual([
      {
        title: "Externe",
        url: "https://example.com",
        source: SOURCES.EXTERNALS,
      },
      {
        title: "Simu",
        source: SOURCES.TOOLS,
        url: "/outils/simulateur",
      },
    ]);
  });

  it("garde le regroupement linkedContent sans links", () => {
    const result = format({
      ...base,
      linkedContent: [
        { source: SOURCES.TOOLS, slug: "simulateur", title: "Simu" },
        { source: SOURCES.LETTERS, slug: "modele", title: "Modèle" },
      ] as unknown as LinkedContent[],
    });
    expect(result.relatedItems.map((r) => r.title)).toEqual([
      "Simulateurs",
      "Modèles de courriers",
    ]);
  });

  it("calcule l'url de l'image", () => {
    const result = format({
      ...base,
      image: { filename: "actu.webp", alt: "alt", license: "free" },
    });
    expect(result.image?.url).toBe(
      `${BUCKET_URL}/${BUCKET_FOLDER}/default/actu.webp`
    );
  });

  it("renvoie [] quand references est absent", () => {
    expect(format(base).references).toEqual([]);
    expect(format(base).image).toBeUndefined();
  });
});
