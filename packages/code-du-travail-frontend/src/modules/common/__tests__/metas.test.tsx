import { generateDefaultMetadata } from "../metas";

describe("generateDefaultMetadata", () => {
  it("returns metadata", () => {
    const metadata = generateDefaultMetadata({
      title: "title",
      description: "description",
      path: "/hello",
    });

    expect(metadata).toEqual({
      alternates: {
        canonical: "/hello",
      },
      description: "description",
      openGraph: {
        description: "description",
        images: "/static/assets/img/social-preview.png",
        locale: "fr_FR",
        siteName: "Code du travail numérique",
        title: "title",
        type: "website",
      },
      title: "title",
    });
  });

  it("override canonical if provided", () => {
    const metadata = generateDefaultMetadata({
      title: "title",
      description: "description",
      path: "/hello",
      overrideCanonical: "/my-canonical",
    });

    expect(metadata.alternates?.canonical).toBe("/my-canonical");
  });

  it("déclare un flux RSS dans les alternates", () => {
    const metadata = generateDefaultMetadata({
      title: "title",
      description: "description",
      path: "/actualite",
      feed: { href: "/actualite/rss.xml", title: "Actualités" },
    });

    expect(metadata.alternates).toEqual({
      canonical: "/actualite",
      types: {
        "application/rss+xml": [
          { url: "/actualite/rss.xml", title: "Actualités" },
        ],
      },
    });
  });

  it("décrit une page article en Open Graph avec ses dates", () => {
    const metadata = generateDefaultMetadata({
      title: "title",
      description: "description",
      path: "/actualite/slug",
      article: { publishedTime: "2026-09-18T00:00:00+02:00" },
    });

    expect(metadata.openGraph).toEqual({
      description: "description",
      images: "/static/assets/img/social-preview.png",
      locale: "fr_FR",
      siteName: "Code du travail numérique",
      title: "title",
      type: "article",
      publishedTime: "2026-09-18T00:00:00+02:00",
      modifiedTime: "2026-09-18T00:00:00+02:00",
    });
  });

  it("omet les dates Open Graph d'un article sans date valide", () => {
    const metadata = generateDefaultMetadata({
      title: "title",
      description: "description",
      path: "/actualite/slug",
      article: { publishedTime: undefined },
    });

    expect(metadata.openGraph).toMatchObject({ type: "article" });
    expect(metadata.openGraph).not.toHaveProperty("publishedTime");
    expect(metadata.openGraph).not.toHaveProperty("modifiedTime");
  });
});
