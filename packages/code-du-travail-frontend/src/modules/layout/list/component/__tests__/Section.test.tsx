import { render, screen } from "@testing-library/react";
import { Section } from "../Section";

describe("<Section />", () => {
  it("uses external url + opens in new tab when source is external", () => {
    render(
      <Section
        sectionId="test"
        title="Test"
        items={[
          {
            title: "External content",
            description: "",
            slug: "external-slug",
            source: "external",
            url: "https://example.com/doc",
          },
        ]}
        isExpanded={true}
        onToggle={() => {}}
        firstHiddenItemRef={() => {}}
        buttonRef={() => {}}
      />
    );

    const link = screen.getByRole("link", { name: "External content" });
    expect(link).toHaveAttribute("href", "https://example.com/doc");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute(
      "title",
      "External content - nouvelle fenêtre"
    );
  });
});
