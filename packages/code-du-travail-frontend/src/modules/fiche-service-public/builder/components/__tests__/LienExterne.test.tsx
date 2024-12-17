import React from "react";
import { render } from "@testing-library/react";
import { LienExterne, LienExterneCommente } from "../LienExterne";
import lienExterneCommenteDataMock from "./mocks/lienExterneCommenteData.json";
import lienExterneDataMock from "./mocks/lienExterneData.json";
import {
  FicheSPDataLienExterne,
  FicheSPDataLienExterneCommente,
} from "../../type";

describe("<LienExterneCommente />", () => {
  it("should render", () => {
    const { container } = render(
      <LienExterneCommente
        data={lienExterneCommenteDataMock as FicheSPDataLienExterneCommente}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
describe("<LienExterne />", () => {
  it("should render", () => {
    const { container } = render(
      <LienExterne data={lienExterneDataMock as FicheSPDataLienExterne} />
    );
    expect(container).toMatchSnapshot();
  });
  it("should clean url if it's a link to code.travail.gouv.fr", () => {
    const data: FicheSPDataLienExterne = {
      type: "element",
      name: "LienExterne",
      attributes: {
        URL: "https://code.travail.gouv.fr/outils/indemnite-licenciement?src_url=https://service-public.fr/particuliers/vosdroits/F987",
      },
      children: [
        {
          type: "text",
          text: "formulaire",
        },
      ],
    };

    const { getByText } = render(<LienExterne data={data} />);
    expect(getByText("formulaire")).toHaveAttribute(
      "href",
      "https://code.travail.gouv.fr/outils/indemnite-licenciement"
    );
  });
  it("should not fails if no url", () => {
    const data = {
      type: "element",
      name: "LienExterne",
      attributes: {},
      children: [
        {
          type: "text",
          text: "formulaire",
        },
      ],
    };

    // @ts-ignore
    const { getByText } = render(<LienExterne data={data} />);
    expect(getByText("formulaire")).toHaveAttribute("href", "");
  });
});
