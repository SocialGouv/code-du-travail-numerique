import { render } from "@testing-library/react";
import React from "react";

import { ContributionLayout } from "../ContributionLayout";
import { ElasticSearchContribution } from "@socialgouv/cdtn-types";

const contribution = {
  source: "contributions",
  linkedContent: [],
  references: [],
  idcc: "0000",
  metas: {
    title: "SEO Title",
    description: "SEO Description",
  },
  title: "La période d’essai peut-elle être renouvelée ?",
  breadcrumbs: [],
  slug: "slug",
  ccnShortTitle: "Nom de la CC",
} as Partial<ElasticSearchContribution> as any;

describe("<PageContribution />", () => {
  it("should render title only if generic", () => {
    const { getByRole } = render(
      <ContributionLayout contribution={contribution} />
    );
    const titreH1 = getByRole("heading", { level: 1 });
    expect(titreH1.textContent).toBe(
      "La période d’essai peut-elle être renouvelée ?"
    );
  });
  it("should render title with cc short name if contribution with CC", () => {
    contribution.idcc = "0029";
    const { getByRole } = render(
      <ContributionLayout contribution={contribution} />
    );
    const titreH1 = getByRole("heading", { level: 1 });
    expect(titreH1.textContent).toBe(
      "La période d’essai peut-elle être renouvelée ? Nom de la CC"
    );
  });
});
