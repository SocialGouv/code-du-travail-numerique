import React from "react";
import { render } from "@testing-library/react";
import { cleanUrl, LienExterne, LienExterneCommente } from "../LienExterne";
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
});
describe("cleanUrl", () => {
  it("retourne la même url si pas code.travail.gouv.fr", () => {
    expect(cleanUrl("hello.fr")).toEqual("hello.fr");
  });

  it("retourne l'url sans query params si code.travail.gouv.fr", () => {
    expect(
      cleanUrl(
        "https://code.travail.gouv.fr/outils/indemnite-licenciement?src_url=https://service-public.fr/particuliers/vosdroits/F987"
      )
    ).toEqual("https://code.travail.gouv.fr/outils/indemnite-licenciement");
  });

  it("retourne la même url si code.travail.gouv.fr mais de query params", () => {
    expect(
      cleanUrl("https://code.travail.gouv.fr/outils/indemnite-licenciement")
    ).toEqual("https://code.travail.gouv.fr/outils/indemnite-licenciement");
  });

  it("ne fails pas si rien n'est passé", () => {
    // @ts-ignore
    expect(cleanUrl()).toEqual(undefined);
  });
});
