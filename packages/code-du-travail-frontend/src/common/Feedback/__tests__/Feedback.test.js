import React from "react";
import { render } from "react-testing-library";

import { Feedback } from "..";

global.fetch = jest.fn().mockResolvedValue({ json: () => ({ error: false }) });

jest.mock("../../../piwik", () => {
  let events = [];
  return {
    matopush: event => events.push(event),
    events,
    flushEvents() {
      events = [];
    }
  };
});
const { events, flushEvents } = require("../../../piwik");
afterEach(flushEvents);

describe("<Feedback/>", () => {
  it("should render", () => {
    const { container } = render(
      <Feedback
        query="Query"
        sourceType="Fiches Service Public"
        sourceFilter="fiches"
        url="http://server/fiches/fiche1"
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render form once user answer yes", () => {
    const { container, getByText } = render(
      <Feedback
        query="Query"
        sourceType="Fiches Service Public"
        sourceFilter="fiches"
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
        sourceType="Fiches Service Public"
        sourceFilter="fiches"
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
        sourceType="Fiches Service Public"
        sourceFilter="fiches"
        url="http://server/fiches/fiche1"
      />
    );
    const button = getByText(/oui/i);
    button.click();
    expect(JSON.stringify(events)).toMatchSnapshot();
    flushEvents();
  });
  it("should send piwik event when click no", () => {
    const { getByText } = render(
      <Feedback
        query="Query"
        sourceType="Fiches Service Public"
        sourceFilter="fiches"
        url="http://server/fiches/fiche1"
      />
    );
    const button = getByText(/non/i);
    button.click();
    expect(JSON.stringify(events)).toMatchSnapshot();
  });
});
