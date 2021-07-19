import { render } from "@testing-library/react";
import React from "react";

import { Highlights } from "../Highlights";

const highlights = [
  {
    breadcrumbs: [
      {
        label: "Santé, sécurité et conditions de travail",
        slug: "/themes/6-sante-securite-et-conditions-de-travail",
      },
    ],
    description: "1. Dois-je prévenir mon employeur si je reviens, ou si...",
    slug: "coronavirus-questions-reponses-pour-les-entreprises-et-les-salaries#Je-suis-salarie",
    source: "fiches_ministere_travail",
    title: "Coronavirus : je suis salarié",
  },
  {
    breadcrumbs: [
      {
        label: "Santé, sécurité et conditions de travail",
        slug: "/themes/6-sante-securite-et-conditions-de-travail",
      },
    ],
    description: "9. Quelles sont les recommandations sanitaires pour...",
    slug: "coronavirus-questions-reponses-pour-les-entreprises-et-les-salaries#Je-suis-employeur",
    source: "fiches_ministere_travail",
    title: "Coronavirus : je suis employeur",
  },
];

describe("<Highlights />", () => {
  it("should render", () => {
    const { container } = render(<Highlights highlights={highlights} />);
    expect(container).toMatchSnapshot();
  });
});
