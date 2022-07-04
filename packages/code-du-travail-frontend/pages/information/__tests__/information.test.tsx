import { render, RenderResult } from "@testing-library/react";
import React from "react";

import InformationPage from "../[slug]";
import { EditorialContentDataWrapper, SectionDisplayMode } from "cdtn-types";

const mockedProps: EditorialContentDataWrapper = {
  anchor: "test",
  information: {
    _source: {
      breadcrumbs: [],
      contents: [],
    },
  },
};

jest.mock("rehype-parse", jest.fn());
jest.mock("rehype-react", jest.fn());

describe("Information Page", () => {
  let renderResult: RenderResult;
  beforeEach(() => {
    renderResult = render(<InformationPage {...mockedProps} />);
  });
  describe("Given a parameter sectionDisplayMode = 'tab'", () => {
    beforeAll(() => {
      mockedProps.information._source.sectionDisplayMode =
        SectionDisplayMode.tab;
    });
    it("should contain tabs", () => {
      const tabs = renderResult.getByTestId("tabs");
      expect(tabs).toBeInTheDocument();
    });
  });
  describe("Given a parameter sectionDisplayMode = 'accordion'", () => {
    beforeAll(() => {
      mockedProps.information._source.sectionDisplayMode =
        SectionDisplayMode.accordion;
    });
    it("should contain accordions", () => {
      const accordions = renderResult.getByTestId("accordion");
      expect(accordions).toBeInTheDocument();
    });
  });
});
