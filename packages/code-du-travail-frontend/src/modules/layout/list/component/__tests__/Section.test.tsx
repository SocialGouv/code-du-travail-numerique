import { render, screen, within } from "@testing-library/react";
import { Section } from "../Section";

const noop = () => {};

const renderSection = (
  items: React.ComponentProps<typeof Section>["items"],
  badge?: React.ComponentProps<typeof Section>["badge"]
) =>
  render(
    <Section
      sectionId="test"
      title="Test"
      items={items}
      isExpanded={true}
      onToggle={noop}
      firstHiddenItemRef={noop}
      buttonRef={noop}
      badge={badge}
    />
  );

const contribution = {
  title: "Une contribution",
  description: "",
  slug: "une-contribution",
  source: "contributions",
};

const ficheInfos = {
  title: "Une fiche infos",
  description: "",
  slug: "une-fiche-infos",
  source: "information",
};

describe("<Section />", () => {
  it("uses external url + opens in new tab when source is external", () => {
    renderSection([
      {
        title: "External content",
        description: "",
        slug: "external-slug",
        source: "external",
        url: "https://example.com/doc",
      },
    ]);

    const link = screen.getByRole("link", { name: "External content" });
    expect(link).toHaveAttribute("href", "https://example.com/doc");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute(
      "title",
      "External content - nouvelle fenêtre"
    );
  });

  describe("tag de type (#7464)", () => {
    it("distingue les contributions des fiches infos, sur le lien attendu", () => {
      renderSection([contribution, ficheInfos], "type");

      const cards = screen.getAllByRole("listitem");
      expect(cards).toHaveLength(2);

      const contributionBadge = within(cards[0]).getByText(
        "Selon ma convention collective"
      );
      expect(contributionBadge).toHaveClass(
        "fr-badge",
        "fr-badge--sm",
        "fr-badge--success",
        "fr-badge--no-icon"
      );
      expect(
        within(cards[0]).getByRole("link", { name: "Une contribution" })
      ).toHaveAttribute("href", "/contribution/une-contribution");

      const ficheInfosBadge = within(cards[1]).getByText("Fiche infos");
      expect(ficheInfosBadge).toHaveClass(
        "fr-badge",
        "fr-badge--sm",
        "fr-badge--no-icon"
      );
      expect(ficheInfosBadge).not.toHaveClass("fr-badge--success");
      expect(
        within(cards[1]).getByRole("link", { name: "Une fiche infos" })
      ).toHaveAttribute("href", "/information/une-fiche-infos");
    });

    it("n'est ni un lien ni un bouton et reste hors du nom accessible du lien", () => {
      renderSection([contribution], "type");

      expect(screen.getAllByRole("link")).toHaveLength(1);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      const badge = screen.getByText("Selon ma convention collective");
      expect(badge.closest("a")).toBeNull();
      expect(badge.tagName).toBe("P");
    });

    it("n'apparaît pas sur les autres listings", () => {
      renderSection([
        contribution,
        ficheInfos,
        {
          title: "Un modèle",
          description: "",
          slug: "un-modele",
          source: "modeles_de_courriers",
        },
      ]);

      expect(
        screen.queryByText("Selon ma convention collective")
      ).not.toBeInTheDocument();
      expect(screen.queryByText("Fiche infos")).not.toBeInTheDocument();
      expect(screen.getAllByRole("link")).toHaveLength(3);
    });
  });

  describe("tag du moteur de recherche (#7559)", () => {
    it("reprend le libellé de la recherche selon la source", () => {
      renderSection(
        [
          contribution,
          ficheInfos,
          {
            title: "Un outil",
            description: "",
            slug: "un-outil",
            source: "outils",
          },
        ],
        "source"
      );

      const cards = screen.getAllByRole("listitem");
      expect(within(cards[0]).getByText("RÉPONSE SUR-MESURE")).toHaveClass(
        "fr-tag",
        "fr-tag--sm"
      );
      expect(within(cards[1]).getByText("FICHE GÉNÉRIQUE")).toBeInTheDocument();
      expect(within(cards[2]).getByText("SIMULATEURS")).toBeInTheDocument();
      expect(
        screen.queryByText("Selon ma convention collective")
      ).not.toBeInTheDocument();
      expect(screen.getAllByRole("link")).toHaveLength(3);
    });
  });
});
