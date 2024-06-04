import { render } from "@testing-library/react";
import React from "react";

import ModelesDeCourriers from "../pages/modeles-de-courriers/[slug]";

describe("<ModelesDeCourrier />", () => {
  it("should render", () => {
    const data = {
      breadcrumbs: [{ label: "theme", slug: "/themes/theme", position: 0 }],
      date: "01/01/2020",
      intro: "un description",
      metaDescription: "un description",
      filename: "filename.pdf",
      filesize: "12345",
      html: "<p>youhou</p>",
      meta_title: "Courrier Epistolaire",
      type: "the type",
      title: "Courrier Epistolaire",
      relatedItems: [],
      slug: "courrier-epistolaire",
    };
    const { container } = render(<ModelesDeCourriers {...data} />);
    expect(container).toMatchSnapshot();
  });
});
