import React from "react";
import { ListLink } from "../SearchResults/Results";
import { render } from "@testing-library/react";
import { matopush } from "../../piwik";

jest.mock("../../piwik", () => ({
  matopush: jest.fn(),
}));

jest.mock("next/link", () => {
  return ({ children }) => children;
});

const item = {
  source: "fiches_service_public",
  title: "Mer il est fou!",
  slug: "mer-il-est-fou",
  description: "description",
  algo: "semantic",
  breadcrumbs: [
    { slug: "/themes/theme-root", label: "test content" },
    { slug: "/themes/theme-test", label: "test theme content" },
  ],
};

describe("ListLink", () => {
  it("should track event selectResult on click", () => {
    jest.resetAllMocks();
    const { getByText } = render(
      <ListLink item={item} query="demission">
        {item.title}
      </ListLink>
    );

    const link = getByText(/Mer il est fou!/);
    link.click();
    expect(matopush).toHaveBeenCalledWith([
      "trackEvent",
      "selectResult",
      '{"url":"/fiche-service-public/mer-il-est-fou","algo":"semantic"}',
    ]);
  });
});
