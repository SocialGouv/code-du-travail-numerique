import { render, RenderResult } from "@testing-library/react";
import React from "react";

import InformationPage from "../pages/information/[slug]";
import { EditorialContentDataWrapper, SectionDisplayMode } from "cdtn-types";

const mockedProps: EditorialContentDataWrapper = {
  anchor: [],
  information: {
    _source: {
      breadcrumbs: [],
      contents: [],
    },
  },
};

jest.mock(
  "../src/information",
  jest.fn(() => {
    processToHtml: () => "myHtml";
  })
);

describe("Information Page", () => {
  let renderResult: RenderResult;
  let props;
  beforeEach(() => {
    renderResult = render(<InformationPage {...props} />);
  });
  describe("Given a parameter sectionDisplayMode = 'tab'", () => {
    beforeAll(() => {
      props = { ...mockedProps };
      props.information._source.sectionDisplayMode = SectionDisplayMode.tab;
    });
    it("should contain tabs", () => {
      const tabs = renderResult.queryByTestId("tabs");
      expect(tabs).toBeInTheDocument();
    });
  });
  describe("Given a parameter sectionDisplayMode = 'accordion'", () => {
    beforeAll(() => {
      props = { ...mockedProps };
      props.information._source.sectionDisplayMode =
        SectionDisplayMode.accordion;
    });
    it("should contain accordions", () => {
      const accordions = renderResult.queryByTestId("accordion");
      expect(accordions).toBeInTheDocument();
    });
  });
});
