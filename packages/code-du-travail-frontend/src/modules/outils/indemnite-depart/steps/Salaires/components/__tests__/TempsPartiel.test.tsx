import { render } from "@testing-library/react";
import React from "react";
import TempsPartiel from "../TempsPartiel";
import { IndemniteDepartType } from "../../../../types";

describe("<TempsPartiel />", () => {
  it("doit contenir le texte pour l'indemnité de licenciement", () => {
    expect(
      render(
        <TempsPartiel type={IndemniteDepartType.LICENCIEMENT} />
      ).asFragment()
    ).toHaveTextContent(
      /Le calcul de l’indemnité de licenciement dans le cas d’une alternance de temps plein et de temps partiel est actuellement en cours de développement/
    );
  });

  it("doit contenir le texte pour l'indemnité de rupture conventionnelle", () => {
    expect(
      render(
        <TempsPartiel type={IndemniteDepartType.RUPTURE_CONVENTIONNELLE} />
      ).asFragment()
    ).toHaveTextContent(
      /Le calcul de l’indemnité de rupture conventionnelle dans le cas d’une alternance de temps plein et de temps partiel est actuellement en cours de développement/
    );
  });
});
