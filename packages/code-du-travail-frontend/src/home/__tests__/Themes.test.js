import React from "react";
import { render } from "react-testing-library";
import Themes from "../Themes";
const themes = [
  {
    id: 1,
    label: "Recrutement et contrat de travail",
    slug: "1-recrutement-et-contrat-de-travail"
  },
  {
    id: 2,
    label: "Salaire et Rémunération",
    slug: "2-salaire-et-remuneration"
  },
  {
    id: 3,
    label: "Temps de travail et congés",
    slug: "3-temps-de-travail-et-conges"
  },
  {
    id: 4,
    label: "Emploi et formation",
    slug: "4-emploi-et-formation"
  },
  {
    id: 5,
    label: "Santé, sécurité et conditions de travail",
    slug: "5-sante,-securite-et-conditions-de-travail"
  },
  {
    id: 6,
    label: "Représentation du personnel et négociation collective",
    slug: "6-representation-du-personnel-et-negociation-collective"
  },
  {
    id: 7,
    label: "Départ de l'entreprise",
    slug: "7-depart-de-lentreprise"
  },
  {
    id: 8,
    label: "Conflits au travail et contrôle de la réglementation",
    slug: "8-conflits-au-travail-et-controle-de-la-reglementation"
  }
];

describe("<Themes />", () => {
  it("should render", () => {
    const { container } = render(<Themes themes={themes} />);
    expect(container).toMatchSnapshot();
  });
});
