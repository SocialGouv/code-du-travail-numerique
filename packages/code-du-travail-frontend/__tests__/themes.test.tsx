import { render } from "@testing-library/react";
import React from "react";

import Theme from "../pages/themes/[slug]";

const theme = {
  breadcrumbs: [
    {
      label: "Embauche et contrat de travail",
      slug: "/themes/1-embauche-et-contrat-de-travail",
    },
  ],
  children: [
    { label: "CDI", slug: "/themes/121-cdi" },
    { label: "CDD", slug: "/themes/122-cdd" },
    { label: "Intérim", slug: "/themes/123-interim" },
    {
      label: "Contrat d'apprentissage",
      slug: "/themes/124-contrat-dapprentissage",
    },
    {
      label: "Contrat de professionnalisation",
      slug: "/themes/125-contrat-de-professionnalisation",
    },
  ],
  description: "I am a description !",
  position: 12,
  slug: "12-contrat-de-travail",
  title: "Contrat de travail",
};

describe("<Theme />", () => {
  it("should render", () => {
    const { container } = render(<Theme theme={theme} />);
    expect(container).toMatchSnapshot();
  });
});
