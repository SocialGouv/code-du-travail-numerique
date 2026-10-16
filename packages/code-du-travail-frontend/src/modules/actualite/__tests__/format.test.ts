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
  it("regroupe linkedContent dans la colonne de droite comme sur dev", () => {
    const result = format({
      ...base,
      linkedContent: [
        { source: SOURCES.TOOLS, slug: "simulateur", title: "Simu" },
        { source: SOURCES.LETTERS, slug: "modele", title: "Modèle" },
        { source: SOURCES.SHEET_SP, slug: "fiche", title: "Fiche" },
      ] as unknown as LinkedContent[],
      links: [
        { type: "external", title: "Externe", url: "https://example.com" },
      ],
    });
    expect(result.relatedItems).toEqual([
      {
        title: "Simulateurs",
        items: [
          { title: "Simu", source: SOURCES.TOOLS, url: "/outils/simulateur" },
        ],
      },
      {
        title: "Modèles de courriers",
        items: [
          {
            title: "Modèle",
            source: SOURCES.LETTERS,
            url: "/modeles-de-courriers/modele",
          },
        ],
      },
      {
        title: "Contenus liés",
        items: [
          {
            title: "Fiche",
            source: SOURCES.SHEET_SP,
            url: "/fiche-service-public/fiche",
          },
        ],
      },
    ]);
  });

  it("expose les liens « Pour aller plus loin » à part, avec leur url", () => {
    const result = format({
      ...base,
      links: [
        {
          type: "external",
          title: "Externe",
          url: "https://example.com",
          intro: "Le site officiel",
        },
        {
          type: "cdtn",
          source: SOURCES.TOOLS,
          slug: "simulateur",
          title: "Simu",
        },
      ],
    });
    expect(result.relatedItems).toEqual([]);
    expect(result.links).toEqual([
      {
        title: "Externe",
        url: "https://example.com",
        intro: "Le site officiel",
        external: true,
      },
      { title: "Simu", url: "/outils/simulateur", external: false },
    ]);
  });

  it("renvoie [] quand links est absent", () => {
    expect(format(base).links).toEqual([]);
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

  it("calcule la date de modification à partir de updatedAt", () => {
    expect(
      format({ ...base, updatedAt: "2026-10-10T13:07:55Z" }).modifiedTime
    ).toBe("2026-10-10T13:07:55.000Z");
    expect(format(base).modifiedTime).toBe("2026-01-01T00:00:00+01:00");
  });

  it("renvoie [] quand references est absent", () => {
    expect(format(base).references).toEqual([]);
    expect(format(base).image).toBeUndefined();
  });
});
