import React from "react";
import { render } from "@wrapped-testing-library/react";
import { ThemeBreadcrumbs } from "../ThemeBreadcrumbs";

describe("<ThemeBreadcrumbs />", () => {
  it("should render nothing", () => {
    const { container } = render(<ThemeBreadcrumbs />);
    expect(container).toMatchSnapshot();
  });

  it("should render a ThemeBreadcrumbs from theme", () => {
    const theme = {
      title: "title theme",
      slug: "title-theme",
      breadcrumbs: [
        { title: "theme 1", slug: "theme-1" },
        { title: "theme 2", slug: "theme-2" }
      ]
    };

    const { container } = render(<ThemeBreadcrumbs theme={theme} />);
    expect(container).toMatchSnapshot();
  });

  it("should render a ThemeBreadcrumbs from breadcrumbs", () => {
    const breadcrumbs = [
      { title: "theme 1", slug: "theme-1" },
      { title: "theme 2", slug: "theme-2" }
    ];

    const { container } = render(
      <ThemeBreadcrumbs breadcrumbs={breadcrumbs} />
    );
    expect(container).toMatchSnapshot();
  });
});
