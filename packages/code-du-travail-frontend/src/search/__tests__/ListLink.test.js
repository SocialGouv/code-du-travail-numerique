import React from "react";
import { ListLink } from "../SearchResults/Results";
import { render } from "@testing-library/react";
import { matopush } from "../../piwik";

jest.mock("../../piwik", () => ({
  matopush: jest.fn()
}));

jest.mock("next/link", () => {
  return ({ children }) => children;
});

const item = {
  source: "fiches_service_public",
  title: "Mer il est fou!",
  slug: "mer-il-est-fou",
  description: "description",
  breadcrumbs: [
    { slug: "theme-root", title: "test content" },
    { slug: "theme-test", title: "test theme content" }
  ]
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
      "/fiche-service-public/mer-il-est-fou"
    ]);
  });
});
