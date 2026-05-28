import { render, waitFor } from "@testing-library/react";
import React from "react";

import { ContributionAgreement } from "../ContributionAgreement";
import { Contribution } from "../type";

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
  it("place le focus sur le titre 'Votre convention collective' au montage", async () => {
    const { getByText } = render(
      <ContributionAgreement contribution={contribution} />
    );

    const title = getByText("Votre convention collective");
    expect(title).toHaveAttribute("tabindex", "-1");

    await waitFor(() => {
      expect(document.activeElement).toBe(title);
    });
  });
});
