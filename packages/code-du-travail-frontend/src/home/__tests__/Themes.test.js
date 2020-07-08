import { render } from "@testing-library/react";
import React from "react";

import { Themes } from "../Themes";

const themes = [
  {
    children: [
      {
        slug: "11-embauche",
        title: "Embauche",
      },
      {
        slug: "12-contrat-de-travail",
        title: "Contrat de travail",
      },
    ],
    icon: "Contract",
    position: 1,
    slug: "1-embauche-et-contrat-de-travail",
    title: "Embauche et contrat de travail",
  },
  {
    children: [
      {
        slug: "21-salaire",
        title: "Salaire",
      },
      {
        slug: "22-primes-et-avantages",
        title: "Primes et avantages",
      },
      {
        slug: "23-remboursement-des-frais-de-transport",
        title: "Remboursement des frais de transport",
      },
      {
        slug: "24-epargne-salariale",
        title: "Épargne salariale",
      },
      {
        slug: "25-bulletin-de-salaire-et-cotisations-sociales",
        title: "Bulletin de salaire et cotisations sociales",
      },
    ],
    icon: "Salary",
    position: 2,
    slug: "2-salaire-et-remuneration",
    title: "Salaire et Rémunération",
  },
  {
    children: [
      {
        slug: "31-duree-du-travail",
        title: "Durée du travail",
      },
      {
        slug: "32-temps-partiel",
        title: "Temps partiel",
      },
      {
        slug: "33-amenagement-du-temps-de-travail",
        title: "Aménagement du temps de travail",
      },
      {
        slug: "34-heures-supplementaires-dequivalence-et-astreintes",
        title: "Heures supplémentaires, d'équivalence et astreintes",
      },
      {
        slug: "36-travail-de-nuit-et-en-soireee",
        title: "Travail de nuit et en soiréee",
      },
    ],
    icon: "Time",
    position: 3,
    slug: "3-temps-de-travail",
    title: "Temps de travail",
  },
];

describe("<Themes />", () => {
  it("should render", () => {
    const { container } = render(<Themes themes={themes} />);
    expect(container).toMatchSnapshot();
  });
});
