import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { sendEvent } from "@socialgouv/matomo-next";

import { RecommendedLinks } from "../RecommendedLinks";
import { RecommendedItem } from "../types";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

const preavis: RecommendedItem = {
  type: "theme",
  theme: {
    slug: "preavis",
    title: "Préavis",
    href: "/themes/fin-et-rupture-du-contrat#preavis",
    iconName: "Depart",
    documentCount: 12,
  },
};

const contribution: RecommendedItem = {
  type: "document",
  url: "/contribution/la-duree-du-preavis",
  title: "Quelle est la durée du préavis ?",
  desc: "Fiches pratiques",
};

describe("<RecommendedLinks />", () => {
  beforeEach(() => {
    (sendEvent as jest.MockedFunction<typeof sendEvent>).mockReset();
  });

  it("ne rend rien sans lien recommandé", () => {
    const { container } = render(
      <RecommendedLinks items={[]} ficheSlug="preavis-de-demission" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("rend les cartes sous le titre « Liens recommandés »", () => {
    const rendering = render(
      <RecommendedLinks
        items={[preavis, contribution]}
        ficheSlug="preavis-de-demission"
      />
    );

    expect(
      rendering.getByRole("heading", { level: 2, name: "Liens recommandés" })
    ).toBeInTheDocument();
    expect(
      rendering.getByRole("link", { name: "Quelle est la durée du préavis ?" })
    ).toHaveAttribute("href", "/contribution/la-duree-du-preavis");
  });

  it.each([
    ["Préavis", "themes/fin-et-rupture-du-contrat#preavis", 1],
    ["Quelle est la durée du préavis ?", "contribution/la-duree-du-preavis", 2],
  ])("émet l'event Matomo au clic sur « %s »", (linkName, cible, position) => {
    const rendering = render(
      <RecommendedLinks
        items={[preavis, contribution]}
        ficheSlug="preavis-de-demission"
      />
    );

    fireEvent.click(rendering.getByRole("link", { name: linkName }));

    expect(sendEvent).toHaveBeenCalledTimes(1);
    expect(sendEvent).toHaveBeenCalledWith({
      category: "fiche-service-public",
      action: "clic_lien_recommande",
      name: JSON.stringify({
        slug: "fiche-service-public/preavis-de-demission",
        cible,
        position,
      }),
    });
  });

  it("émet l'event « rubrique affichée » une seule fois dès son entrée dans l'écran", () => {
    let ioCallback:
      | ((
          entries: {
            isIntersecting: boolean;
            boundingClientRect: { top: number };
          }[]
        ) => void)
      | undefined;
    (
      global as unknown as { IntersectionObserver: unknown }
    ).IntersectionObserver = jest.fn((cb) => {
      ioCallback = cb;
      return {
        observe: jest.fn(),
        disconnect: jest.fn(),
        unobserve: jest.fn(),
        takeRecords: jest.fn(),
      };
    });
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => "visible",
    });
    const intersect = (isIntersecting: boolean) =>
      act(() => {
        ioCallback?.([{ isIntersecting, boundingClientRect: { top: 400 } }]);
      });

    render(
      <RecommendedLinks items={[preavis]} ficheSlug="preavis-de-demission" />
    );
    expect(sendEvent).not.toHaveBeenCalled();

    intersect(true);
    intersect(false);
    intersect(true);

    expect(sendEvent).toHaveBeenCalledTimes(1);
    expect(sendEvent).toHaveBeenCalledWith({
      category: "fiche-service-public",
      action: "liens_recommandes_affiches",
      name: "fiche-service-public/preavis-de-demission",
    });

    delete (global as unknown as { IntersectionObserver?: unknown })
      .IntersectionObserver;
  });
});
