import { render, RenderResult } from "@testing-library/react";
import React from "react";

import InformationPage, {
  EditorialContentDataWrapper,
} from "../pages/information/[slug]";
import { EditorialSectionDisplayMode } from "@socialgouv/cdtn-types";

const mockedProps: EditorialContentDataWrapper = {
  information: {
    _source: {
      breadcrumbs: [],
      contents: [],
      slug: "",
    },
  },
};

jest.mock("../src/information/htmlProcess.service");

describe("Information Page", () => {
  let renderResult: RenderResult;
  let props;
  beforeEach(() => {
    renderResult = render(<InformationPage {...props} />);
  });
  describe("Given a parameter sectionDisplayMode = 'tab'", () => {
    beforeAll(() => {
      props = { ...mockedProps };
      props.information._source.sectionDisplayMode =
        EditorialSectionDisplayMode.tab;
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
        EditorialSectionDisplayMode.accordion;
    });
    it("should contain accordions", () => {
      const accordions = renderResult.queryByTestId("accordion");
      expect(accordions).toBeInTheDocument();
    });
  });
});
