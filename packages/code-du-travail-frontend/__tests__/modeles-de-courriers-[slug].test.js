import { render } from "@testing-library/react";
import React from "react";

import ModelesDeCourriers from "../pages/modeles-de-courriers/[slug]";

describe("<ModelesDeCourrier />", () => {
  it("should render", () => {
    const data = {
      _source: {
        breadcrumbs: [{ label: "theme", slug: "/themes/theme" }],
        date: "01/01/2020",
        description: "un description",
        fileUrl: "api.url/docs/filename.pdf",
        filesize: "12345",
        html: "<p>youhou</p>",
        title: "Courrier Epistolaire",
      },
    };
    const { container } = render(<ModelesDeCourriers data={data} />);
    expect(container).toMatchSnapshot();
  });
});
