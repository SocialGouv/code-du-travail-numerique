import React from "react";
import { act, fireEvent, render, within } from "@testing-library/react";
import { sendEvent } from "@socialgouv/matomo-next";

import { ExploreThemes } from "../ExploreThemes";
import { ExploreTheme } from "../type";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

const demission: ExploreTheme = {
  slug: "demission",
  title: "Démission",
  href: "/themes/depart-de-lentreprise#demission",
  iconName: "Depart",
  documentCount: 17,
};

const retraite: ExploreTheme = {
  slug: "retraite",
  title: "Retraite",
  href: "/themes/depart-de-lentreprise#retraite",
  iconName: "Depart",
  documentCount: 4,
};

describe("<ExploreThemes />", () => {
  beforeEach(() => {
    (sendEvent as jest.MockedFunction<typeof sendEvent>).mockReset();
  });

  it("ne rend rien quand aucun sous-thème n'est mis en avant", () => {
    const { container } = render(
      <ExploreThemes themes={[]} contributionSlug="mon-slug" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("rend les deux tuiles dans l'ordre du mapping, sous un titre h3", () => {
    const rendering = render(
      <ExploreThemes
        themes={[demission, retraite]}
        contributionSlug="mon-slug"
      />
    );

    expect(
      rendering.getByRole("heading", {
        level: 3,
        name: "Explorez nos thématiques",
      })
    ).toBeInTheDocument();

    const titles = rendering.getAllByRole("heading", { level: 4 });
    expect(titles.map((title) => title.textContent)).toEqual([
      "Démission",
      "Retraite",
    ]);
  });

  it("pointe vers l'ancre du sous-thème sur la page du thème racine", () => {
    const rendering = render(
      <ExploreThemes themes={[demission]} contributionSlug="mon-slug" />
    );
    expect(rendering.getByRole("link", { name: "Démission" })).toHaveAttribute(
      "href",
      "/themes/depart-de-lentreprise#demission"
    );
  });

  it("accorde le libellé au nombre de contenus rattachés", () => {
    const rendering = render(
      <ExploreThemes
        themes={[demission, { ...retraite, documentCount: 1 }]}
        contributionSlug="mon-slug"
      />
    );
    expect(rendering.getByText("17 fiches à consulter")).toBeInTheDocument();
    expect(rendering.getByText("1 fiche à consulter")).toBeInTheDocument();
  });

  it("préfère la description éditoriale au décompte quand elle existe", () => {
    const rendering = render(
      <ExploreThemes
        themes={[{ ...demission, description: "Tout sur la démission" }]}
        contributionSlug="mon-slug"
      />
    );
    expect(rendering.getByText("Tout sur la démission")).toBeInTheDocument();
    expect(
      rendering.queryByText("17 fiches à consulter")
    ).not.toBeInTheDocument();
  });

  it("n'affiche pas de pictogramme quand le thème racine n'a pas d'icône", () => {
    const rendering = render(
      <ExploreThemes
        themes={[{ ...demission, iconName: undefined }]}
        contributionSlug="mon-slug"
      />
    );
    expect(
      rendering.container.querySelector(".fr-tile__header")
    ).not.toBeInTheDocument();
  });

  it("émet l'event Matomo avec la position de la carte cliquée", () => {
    const rendering = render(
      <ExploreThemes
        themes={[demission, retraite]}
        contributionSlug="1486-mon-slug"
      />
    );

    fireEvent.click(rendering.getByRole("link", { name: "Retraite" }));

    expect(sendEvent).toHaveBeenCalledTimes(1);
    expect(sendEvent).toHaveBeenCalledWith({
      category: "contribution",
      action: "clic_explorez_thematique",
      name: JSON.stringify({
        slug: "contribution/1486-mon-slug",
        theme: "retraite",
        position: 2,
      }),
    });
  });

  describe("event « rubrique affichée »", () => {
    // jsdom n'implémente pas IntersectionObserver : on le remplace par un mock
    // qui capture le callback pour piloter l'intersection à la main.
    type IOEntry = {
      isIntersecting: boolean;
      boundingClientRect: { top: number };
    };
    let ioCallback: ((entries: IOEntry[]) => void) | undefined;
    let ioOptions: IntersectionObserverInit | undefined;
    let observe: jest.Mock;

    const intersect = (isIntersecting: boolean) => {
      act(() => {
        ioCallback?.([{ isIntersecting, boundingClientRect: { top: 400 } }]);
      });
    };

    beforeEach(() => {
      ioCallback = undefined;
      observe = jest.fn();
      (
        global as unknown as { IntersectionObserver: unknown }
      ).IntersectionObserver = jest.fn(
        (cb: (entries: IOEntry[]) => void, opts?: IntersectionObserverInit) => {
          ioCallback = cb;
          ioOptions = opts;
          return {
            observe,
            disconnect: jest.fn(),
            unobserve: jest.fn(),
            takeRecords: jest.fn(),
          };
        }
      );
      Object.defineProperty(document, "visibilityState", {
        configurable: true,
        get: () => "visible",
      });
    });

    afterEach(() => {
      delete (global as unknown as { IntersectionObserver?: unknown })
        .IntersectionObserver;
    });

    it("émet l'event une seule fois dès que la rubrique entre dans l'écran", () => {
      render(
        <ExploreThemes
          themes={[demission, retraite]}
          contributionSlug="1486-mon-slug"
        />
      );
      expect(observe).toHaveBeenCalledTimes(1);
      expect(sendEvent).not.toHaveBeenCalled();

      intersect(true);
      intersect(false);
      intersect(true);

      expect(sendEvent).toHaveBeenCalledTimes(1);
      expect(sendEvent).toHaveBeenCalledWith({
        category: "contribution",
        action: "explorez_thematique_affichee",
        name: "contribution/1486-mon-slug",
      });
    });

    it("observe tout le viewport, sans bande haute", () => {
      render(
        <ExploreThemes themes={[demission]} contributionSlug="mon-slug" />
      );
      expect(ioOptions?.rootMargin).toBe("0px 0px -0% 0px");
    });

    it("n'émet rien tant que la rubrique n'est pas entrée dans l'écran", () => {
      render(
        <ExploreThemes themes={[demission]} contributionSlug="mon-slug" />
      );
      intersect(false);
      expect(sendEvent).not.toHaveBeenCalled();
    });

    it("n'observe pas quand le bloc qui la contient est masqué", () => {
      render(
        <ExploreThemes
          themes={[demission]}
          contributionSlug="mon-slug"
          trackViewEnabled={false}
        />
      );
      expect(observe).not.toHaveBeenCalled();
    });

    it("n'observe rien quand la rubrique n'est pas rendue", () => {
      render(<ExploreThemes themes={[]} contributionSlug="mon-slug" />);
      expect(observe).not.toHaveBeenCalled();
    });
  });

  it("rattache chaque carte à son propre lien", () => {
    const rendering = render(
      <ExploreThemes
        themes={[demission, retraite]}
        contributionSlug="mon-slug"
      />
    );
    const tiles = rendering.container.querySelectorAll(".fr-tile");
    expect(tiles).toHaveLength(2);
    expect(within(tiles[0] as HTMLElement).getByRole("link")).toHaveTextContent(
      "Démission"
    );
  });
});
