import { render } from "@testing-library/react";
import { SearchResultCard } from "../SearchResultCard";

describe("SearchResultCard", () => {
  it("renders badge after heading in DOM (heading first, badge second)", () => {
    const result = {
      title: "Mon titre",
      slug: "mon-slug",
      source: "code_du_travail",
      cdtnId: "1",
    } as any;

    const { container } = render(<SearchResultCard result={result} />);

    const nodes = Array.from(container.querySelectorAll("h2, h3, span"));
    const tagNames = nodes.map((n) => n.tagName);

    expect(tagNames[0]).toMatch(/^H[23]$/);
    expect(tagNames[1]).toBe("SPAN");
  });
});
