import { push as matopush } from "@socialgouv/matomo-next";
import { render } from "@testing-library/react";
import React from "react";

import { ListLink } from "../SearchResults/Results";

jest.mock("next/link", () => {
  return ({ children }) => children;
});

const item = {
  algo: "semantic",
  breadcrumbs: [
    { label: "test content", slug: "/themes/theme-root" },
    { label: "test theme content", slug: "/themes/theme-test" },
  ],
  description: "description",
  slug: "mer-il-est-fou",
  source: "fiches_service_public",
  title: "Mer il est fou!",
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
      '{"algo":"semantic","url":"/fiche-service-public/mer-il-est-fou"}',
    ]);
  });
});
