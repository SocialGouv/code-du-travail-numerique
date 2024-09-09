import { generateDefaultMetadata } from "../metas";

describe("generateDefaultMetadata", () => {
  it("returns metadata", async () => {
    const metadatas = await generateDefaultMetadata({
      title: "title",
      description: "description",
      path: "/hello",
    });

    expect(metadatas).toMatchInlineSnapshot(`
      {
        "alternates": {
          "canonical": "/hello",
        },
        "description": "description",
        "locale": "fr_FR",
        "metadataBase": "http://api.url/",
        "openGraph": {
          "description": "description",
          "images": "http://api.url/static/assets/img/social-preview.png",
          "title": "title",
          "type": "article",
        },
        "siteName": "Code du travail numérique",
        "title": "title - Code du travail numérique",
        "twitter": {
          "card": "summary",
        },
      }
    `);
  });
  it("override canonical if provided", async () => {
    const metadatas = await generateDefaultMetadata({
      title: "title",
      description: "description",
      path: "/hello",
      overrideCanonical: "/my-canonical"
    });

    expect(metadatas.alternates.canonical).toBe("/my-canonical");
  });
});
