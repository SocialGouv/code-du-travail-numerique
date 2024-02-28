import { render } from "@testing-library/react";
import React from "react";

import PageContribution from "../pages/contribution/[slug]";

const contribution = {
  source: "contributions",
  linkedContent: [],
  references: [],
  idcc: "",
  ccnShortTitle: "Métallurgie",
  title: "La période d’essai peut-elle être renouvelée ?",
};
describe("<PageContribution />", () => {
  it("should render title with cc name in it", () => {

    const { getByRole } = render(
      <PageContribution isNewContribution={true} contribution={contribution} />
    );
    const titreH1 = getByRole("heading", { level: 1 });
    expect(titreH1.textContent).toBe(
      "La période d’essai peut-elle être renouvelée ? - Métallurgie"
    );
  });
  it("should render title with only question", () => {
    contribution.ccnShortTitle = "Ce short title fait plus de 15 caractères";
    const { getByRole } = render(
      <PageContribution isNewContribution={true} contribution={contribution} />
    );
    const titreH1 = getByRole("heading", { level: 1 });
    expect(titreH1.textContent).toBe(
      "La période d’essai peut-elle être renouvelée ?"
    );
  });
  it("should render title with linked content with no description", () => {
    let contribution = {
      source: "contributions",
      linkedContent: [{source: "", title: "My link", slug: ""}],
      references: [],
      idcc: "",
      ccnShortTitle: "Métallurgie",
      title: "La période d’essai peut-elle être renouvelée ?",
    };
    const { getByRole } = render(
      <PageContribution isNewContribution={true} contribution={contribution} />
    );
    const titreH3 = getByRole("heading", { level: 3 });
    expect(titreH3.textContent).toBe(
      "My link"
    );
  });
});
