import React from "react";
import { render } from "@testing-library/react";
import ModelesDeCourriers from "../pages/modeles-de-courriers/[slug]";

describe("<ModelesDeCourriers />", () => {
  it("should render", () => {
    const data = {
      _source: {
        breadcrumbs: [{ title: "theme", slug: "theme" }],
        date: "01/01/2020",
        description: "un description",
        filename: "filename.pdf",
        filesize: "12345",
        html: "<p>youhou</p>",
        title: "Courrier Epistolaire"
      }
    };
    const { container } = render(<ModelesDeCourriers data={data} />);
    expect(container).toMatchSnapshot();
  });
});
