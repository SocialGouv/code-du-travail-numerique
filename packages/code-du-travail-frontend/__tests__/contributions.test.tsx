import { render } from "@testing-library/react";
import React from "react";

import PageContribution from "../pages/contribution/[slug]";
import { ElasticSearchContribution } from "@socialgouv/cdtn-types";

const contribution = {
  source: "contributions",
  linkedContent: [],
  references: [],
  idcc: "",
  metas: {
    title: "SEO Title",
    description: "SEO Description",
  },
  title: "La période d’essai peut-elle être renouvelée ?",
  breadcrumbs: [],
} as Partial<ElasticSearchContribution> as any;

describe("<PageContribution />", () => {
  it("should render title with cc name in it", () => {
    const { getByRole } = render(
      <PageContribution contribution={contribution} />
    );
    const titreH1 = getByRole("heading", { level: 1 });
    expect(titreH1.textContent).toBe(
      "La période d’essai peut-elle être renouvelée ?"
    );
  });
  it("should render title with only question", () => {
    contribution.ccnShortTitle = "Ce short title fait plus de 15 caractères";
    const { getByRole } = render(
      <PageContribution contribution={contribution} />
    );
    const titreH1 = getByRole("heading", { level: 1 });
    expect(titreH1.textContent).toBe(
      "La période d’essai peut-elle être renouvelée ?"
    );
  });
  it("should render title with linked content with no description", () => {
    let contribution = {
      source: "contributions",
      linkedContent: [{ source: "", title: "My link", slug: "" }],
      references: [],
      idcc: "",
      metas: {
        title: "SEO Title",
        description: "SEO Description",
      },
      title: "La période d’essai peut-elle être renouvelée ?",
    } as any;
    const { getByRole } = render(
      <PageContribution contribution={contribution} />
    );
    const titreH3 = getByRole("heading", { level: 3 });
    expect(titreH3.textContent).toBe("My link");
  });
});
