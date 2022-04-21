import { render } from "@testing-library/react";
import React from "react";
import UnsupportedCCDisclaimer from "../component/UnsupportedCCDisclaimer";

describe("Unsupported CC Disclaimer component should render disclaimer", () => {
  it("with no link if no id", () => {
    const { getByText, queryByText } = render(<UnsupportedCCDisclaimer />);
    expect(
      getByText(
        /Nous vous invitons à consulter votre convention collective qui peut prévoir un nombre d’heures d’absence autorisée pour rechercher un emploi pendant un préavis/
      )
    ).toBeInTheDocument();
    expect(queryByText(/Vous pouvez consulter/)).toBeNull();
  });

  it("with link if an id is passed", () => {
    const { getByText } = render(
      <UnsupportedCCDisclaimer ccUrl={"https://my.url"} />
    );
    expect(
      getByText(
        /Nous vous invitons à consulter votre convention collective qui peut/
      )
    ).toBeInTheDocument();
    expect(
      getByText(/Vous pouvez consulter votre convention collective/)
    ).toBeInTheDocument();
    expect(getByText(/^ici/).getAttribute("href")).toEqual("https://my.url");
  });
});
