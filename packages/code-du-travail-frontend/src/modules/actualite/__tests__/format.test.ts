import { SOURCES } from "@socialgouv/cdtn-utils";
import { LinkedContent } from "@socialgouv/cdtn-types/build/elastic/related-items";
import { BUCKET_FOLDER, BUCKET_URL } from "../../../config";
import { format, formatSummary } from "../queries";

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
  it("regroupe les contenus liés de l'admin dans la colonne de droite, dans l'ordre saisi", () => {
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
        {
          type: "cdtn",
          source: SOURCES.SHEET_SP,
          slug: "fiche",
          title: "Fiche",
        },
        {
          type: "cdtn",
          source: SOURCES.LETTERS,
          slug: "modele",
          title: "Modèle",
        },
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
            title: "Externe",
            source: SOURCES.EXTERNALS,
            url: "https://example.com",
            intro: "Le site officiel",
            external: true,
          },
          {
            title: "Fiche",
            source: SOURCES.SHEET_SP,
            url: "/fiche-service-public/fiche",
          },
        ],
      },
    ]);
  });

  it("prend linkedContent quand l'export n'a pas encore de liens", () => {
    const result = format({
      ...base,
      linkedContent: [
        { source: SOURCES.TOOLS, slug: "simulateur", title: "Simu" },
        { source: SOURCES.SHEET_SP, slug: "fiche", title: "Fiche" },
      ] as unknown as LinkedContent[],
    });
    expect(result.relatedItems).toEqual([
      {
        title: "Simulateurs",
        items: [
          { title: "Simu", source: SOURCES.TOOLS, url: "/outils/simulateur" },
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

  it("ignore linkedContent dès que l'export fournit les liens", () => {
    const result = format({
      ...base,
      linkedContent: [
        { source: SOURCES.SHEET_SP, slug: "fiche", title: "Fiche" },
      ] as unknown as LinkedContent[],
      links: [],
    });
    expect(result.relatedItems).toEqual([]);
  });

  it("calcule l'url de l'image", () => {
    const result = format({
      ...base,
      image: {
        filename: "actu.webp",
        alt: "alt",
        license: "free",
        sizeOctet: 10318,
      },
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

  it("date la publication à l'instant de publication quand il est connu", () => {
    const published = format({
      ...base,
      publishedAt: "2026-01-01T09:15:00Z",
    });
    expect(published.publishedTime).toBe("2026-01-01T09:15:00.000Z");
    expect(published.modifiedTime).toBe("2026-01-01T09:15:00.000Z");
    expect(format(base).publishedTime).toBe("2026-01-01T00:00:00+01:00");
  });

  it("renvoie [] quand references est absent", () => {
    expect(format(base).references).toEqual([]);
    expect(format(base).image).toBeUndefined();
  });
});

describe("formatSummary (liste des actualités)", () => {
  const summary = {
    title: "Titre",
    content: "<p>contenu</p>",
    date: "01/01/2026",
    slug: "titre",
  };

  it("calcule l'url de l'image", () => {
    expect(
      formatSummary({
        ...summary,
        image: {
          filename: "actu.webp",
          alt: "alt",
          license: "free",
          sizeOctet: 10318,
        },
      }).image?.url
    ).toBe(`${BUCKET_URL}/${BUCKET_FOLDER}/default/actu.webp`);
  });

  it("laisse l'image vide quand l'actualité n'en a pas", () => {
    expect(formatSummary(summary)).toEqual({ ...summary, image: undefined });
  });
});
