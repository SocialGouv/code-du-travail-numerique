import { render, waitFor } from "@testing-library/react";
import React from "react";

import {
  AGREEMENT_FOCUS_HASH,
  ContributionAgreement,
} from "../ContributionAgreement";
import { Contribution } from "../type";
import { focusableTitle } from "../../common/focusableTitle";

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
