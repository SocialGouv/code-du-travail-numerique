import { render } from "@testing-library/react";
import React from "react";
import { Home } from "..";
import { HomePageProps } from "../queries";

const mockData: HomePageProps = {
  highlights: [
    {
      description: "Highlight description",
      link: "https://example.com/highlight",
      theme: "light",
      title: "Highlight Title",
    },
  ],
  tools: [
    {
      iconName: "tool-icon",
      link: "https://example.com/tool",
      title: "Tool Title",
      description: "Tool description",
    },
  ],
  modeles: [
    {
      description: "Model description",
      link: "https://example.com/model",
      theme: "dark",
      title: "Model Title",
    },
  ],
  contributions: [
    {
      description: "Contribution description",
      link: "https://example.com/contribution",
      theme: "light",
      title: "Contribution Title",
    },
  ],
  agreements: [
    {
      description: "Agreement description",
      link: "https://example.com/agreement",
      theme: "dark",
      title: "Agreement Title",
    },
  ],
  themes: [
    {
      iconName: "theme-icon",
      link: "https://example.com/theme",
      title: "Theme Title",
      description: "Theme description",
    },
  ],
};

describe("<Home />", () => {
  it("should match snapshot", () => {
    const { container } = render(<Home {...mockData} />);
    expect(container).toMatchSnapshot();
  });
});
