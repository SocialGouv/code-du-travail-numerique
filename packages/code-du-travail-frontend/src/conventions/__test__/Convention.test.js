import React from "react";
import { render } from "react-testing-library";
import Convention from "../Convention";

const convention = {
  id: "KALICONT000005635691",
  title:
    "Convention collective nationale des activités industrielles de boulangerie et pâtisserie du 13 juillet 1993. Mise à jour par avenant n°10 du 11 octobre 2011.",
  slug:
    "1747-convention-collective-nationale-des-activites-industrielles-de-boulangerie",
  url:
    "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635691"
};

const conteneur = {
  id: "KALICONT000005635691",
  titre:
    "Convention collective nationale des activités industrielles de boulangerie et pâtisserie du 13 juillet 1993. Mise à jour par avenant n°10 du 11 octobre 2011.",
  etat: "VIGUEUR_ETEN",
  nature: "IDCC",
  num: "1747",
  date_publi: "1993-11-01T00:00:00.000Z",
  mtime: 1550003481,
  active: true,
  texte_de_base: "KALITEXT000005657284"
};

describe("<Convention />", () => {
  it("should render", () => {
    const { container } = render(
      <Convention convention={convention} conteneur={conteneur} />
    );
    expect(container).toMatchSnapshot();
  });
});
