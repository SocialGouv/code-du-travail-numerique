import React from "react";
import { render } from "@testing-library/react";
import { Themes } from "../Themes";

const themes = [
  {
    children: [
      {
        title: "Embauche",
        slug: "11-embauche"
      },
      {
        title: "Contrat de travail",
        slug: "12-contrat-de-travail"
      }
    ],
    icon: "Contract",
    position: 1,
    title: "Embauche et contrat de travail",
    slug: "1-embauche-et-contrat-de-travail"
  },
  {
    children: [
      {
        title: "Salaire",
        slug: "21-salaire"
      },
      {
        title: "Primes et avantages",
        slug: "22-primes-et-avantages"
      },
      {
        title: "Remboursement des frais de transport",
        slug: "23-remboursement-des-frais-de-transport"
      },
      {
        title: "Épargne salariale",
        slug: "24-epargne-salariale"
      },
      {
        title: "Bulletin de salaire et cotisations sociales",
        slug: "25-bulletin-de-salaire-et-cotisations-sociales"
      }
    ],
    icon: "Salary",
    position: 2,
    title: "Salaire et Rémunération",
    slug: "2-salaire-et-remuneration"
  },
  {
    children: [
      {
        title: "Durée du travail",
        slug: "31-duree-du-travail"
      },
      {
        title: "Temps partiel",
        slug: "32-temps-partiel"
      },
      {
        title: "Aménagement du temps de travail",
        slug: "33-amenagement-du-temps-de-travail"
      },
      {
        title: "Heures supplémentaires, d'équivalence et astreintes",
        slug: "34-heures-supplementaires-dequivalence-et-astreintes"
      },
      {
        title: "Travail de nuit et en soiréee",
        slug: "36-travail-de-nuit-et-en-soireee"
      }
    ],
    icon: "Time",
    position: 3,
    title: "Temps de travail",
    slug: "3-temps-de-travail"
  }
];

describe("<Themes />", () => {
  it("should render", () => {
    const { container } = render(<Themes themes={themes} />);
    expect(container).toMatchSnapshot();
  });
});
