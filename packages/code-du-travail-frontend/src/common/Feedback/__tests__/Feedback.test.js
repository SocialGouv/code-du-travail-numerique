import React from "react";
import { render } from "react-testing-library";

import { Feedback } from "..";

jest.mock("react-piwik", () => {
  let events = [];
  return {
    events,
    push: event => events.push(event),
    flush: () => {
      events = [];
    }
  };
});
const ReactPiwik = require("react-piwik");

afterEach(ReactPiwik.flush);

describe("<Feedback/>", () => {
  it("should render", () => {
    const { container } = render(
      <Feedback
        query="Query"
        source="Fiches"
        url="http://server/fiches/fiche1"
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render form once user answer yes", () => {
    const { container, getByText } = render(
      <Feedback
        query="Query"
        source="Fiches"
        url="http://server/fiches/fiche1"
      />
    );
    const button = getByText(/oui/i);
    button.click();
    expect(container).toMatchSnapshot();
  });
  it("should render form once user answer no", () => {
    const { container, getByText } = render(
      <Feedback
        query="Query"
        source="Fiches"
        url="http://server/fiches/fiche1"
      />
    );
    const button = getByText(/non/i);
    button.click();
    expect(container).toMatchSnapshot();
  });
  it("should send piwik event when click yes", () => {
    const { getByText } = render(
      <Feedback
        query="Query"
        source="Fiches"
        url="http://server/fiches/fiche1"
      />
    );
    const button = getByText(/oui/i);
    button.click();
    expect(JSON.stringify(ReactPiwik.events)).toMatchSnapshot();
    ReactPiwik.flush();
  });
  it("should send piwik event when click no", () => {
    const { getByText } = render(
      <Feedback
        query="Query"
        source="Fiches"
        url="http://server/fiches/fiche1"
      />
    );
    const button = getByText(/non/i);
    button.click();
    expect(JSON.stringify(ReactPiwik.events)).toMatchSnapshot();
  });
});
