import React from "react";
import { render } from "@testing-library/react";
import { Highlights } from "../Highlights";

const highlights = [
  {
    description: "1. Dois-je prévenir mon employeur si je reviens, ou si...",
    source: "fiches_ministere_travail",
    title: "Coronavirus : je suis salarié",
    breadcrumbs: [
      {
        label: "Santé, sécurité et conditions de travail",
        slug: "/themes/6-sante-securite-et-conditions-de-travail"
      }
    ],
    slug:
      "coronavirus-questions-reponses-pour-les-entreprises-et-les-salaries#Je-suis-salarie"
  },
  {
    description: "9. Quelles sont les recommandations sanitaires pour...",
    source: "fiches_ministere_travail",
    title: "Coronavirus : je suis employeur",
    breadcrumbs: [
      {
        label: "Santé, sécurité et conditions de travail",
        slug: "/themes/6-sante-securite-et-conditions-de-travail"
      }
    ],
    slug:
      "coronavirus-questions-reponses-pour-les-entreprises-et-les-salaries#Je-suis-employeur"
  }
];

describe("<Highlights />", () => {
  it("should render", () => {
    const { container } = render(<Highlights highlights={highlights} />);
    expect(container).toMatchSnapshot();
  });
});
