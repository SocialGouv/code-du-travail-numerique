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
});
