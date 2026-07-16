import { render, waitFor } from "@testing-library/react";
import React from "react";

import {
  AGREEMENT_FOCUS_HASH,
  ContributionAgreement,
} from "../ContributionAgreement";
import { Contribution } from "../type";
import { focusableTitle } from "../../common/focusableTitle";
import { hasVisitedCcPage } from "../contributionUtils";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("../ContributionAgreementContent", () => ({
  ContributionAgreementContent: () => <div>contenu convention</div>,
}));

const contribution = {
  slug: "0016-slug",
  idcc: "0016",
  ccnShortTitle: "Transports routiers",
  ccnSlug: "0016-transports-routiers",
  relatedItems: [],
  references: [],
  title: "Titre",
  metas: { title: "Titre", description: "desc" },
} as Partial<Contribution> as any;

describe("<ContributionAgreement /> retour vers la fiche générique", () => {
  afterEach(() => {
    window.location.hash = "";
    sessionStorage.clear();
  });

  it("marque la page CC comme consultée (pour désactiver l'auto-redirection au retour)", () => {
    // slug "0016-slug" -> fiche générique "slug"
    expect(hasVisitedCcPage("slug")).toBe(false);

    render(<ContributionAgreement contribution={contribution} />);

    expect(hasVisitedCcPage("slug")).toBe(true);
  });
});

describe("<ContributionAgreement /> accessibilité", () => {
  afterEach(() => {
    window.location.hash = "";
  });

  it("place le focus sur le titre quand on arrive via le formulaire (hash) et lui donne un anneau de focus visible", async () => {
    window.location.hash = AGREEMENT_FOCUS_HASH;

    const { getByText } = render(
      <ContributionAgreement contribution={contribution} />
    );

    const title = getByText("Votre convention collective");
    expect(title).toHaveAttribute("tabindex", "-1");
    // Anneau de focus visible même lors d'un focus programmatique.
    expect(title.className).toContain(focusableTitle);

    await waitFor(() => {
      expect(document.activeElement).toBe(title);
    });
  });

  it("scrolle le titre dans la vue quand on arrive via le formulaire (hash)", async () => {
    window.location.hash = AGREEMENT_FOCUS_HASH;
    // `scrollIntoView` est mocké globalement (jsdom ne l'implémente pas) ;
    // on repart d'un historique vide pour ne pas compter les appels d'autres tests.
    const scrollSpy = jest
      .spyOn(Element.prototype, "scrollIntoView")
      .mockClear();

    const { getByText } = render(
      <ContributionAgreement contribution={contribution} />
    );

    const title = getByText("Votre convention collective");

    // Le focus et le scroll sont posés dans le même effet : une fois le focus
    // sur le titre, le scroll a forcément eu lieu.
    await waitFor(() => {
      expect(document.activeElement).toBe(title);
    });
    expect(scrollSpy).toHaveBeenCalledWith({ behavior: "smooth" });

    scrollSpy.mockRestore();
  });

  it("ne scrolle pas lors d'une arrivée directe sans hash", async () => {
    window.location.hash = "";
    const scrollSpy = jest
      .spyOn(Element.prototype, "scrollIntoView")
      .mockClear();

    render(<ContributionAgreement contribution={contribution} />);

    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(scrollSpy).not.toHaveBeenCalled();

    scrollSpy.mockRestore();
  });

  it("ne vole pas le focus lors d'une arrivée directe sans hash (SEO/Google, lien partagé, reload)", async () => {
    window.location.hash = "";

    const { getByText } = render(
      <ContributionAgreement contribution={contribution} />
    );

    const title = getByText("Votre convention collective");
    // Laisse passer le délai du setTimeout(100) de l'effet pour vérifier
    // qu'aucun focus n'est posé.
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(document.activeElement).not.toBe(title);
  });
});
