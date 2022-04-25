import { render } from "@testing-library/react";
import React from "react";
import UnsupportedCCDisclaimer from "../component/UnsupportedCCDisclaimer";

describe("Unsupported CC Disclaimer component should render disclaimer", () => {
  it("should not show the link if agreement is not available on legifrance", () => {
    const { getByText, queryByText } = render(<UnsupportedCCDisclaimer />);
    expect(
      getByText(
        /Nous vous invitons à consulter votre convention collective pour obtenir votre durée de préavis./
      )
    ).toBeInTheDocument();
    expect(queryByText(/Vous pouvez consulter/)).toBeNull();
  });

  it("should show the link if agreement is available on legifrance", () => {
    const { getByText } = render(
      <UnsupportedCCDisclaimer ccUrl={"https://legifrance.url"} />
    );
    expect(
      getByText(
        /Nous vous invitons à consulter votre convention collective pour obtenir votre durée de préavis./
      )
    ).toBeInTheDocument();
    expect(
      getByText(/Vous pouvez consulter votre convention collective/)
    ).toBeInTheDocument();
    expect(getByText(/ici/).getAttribute("href")).toEqual("https://my.url");
  });
});
