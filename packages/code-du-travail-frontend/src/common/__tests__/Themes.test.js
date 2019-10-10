import React from "react";
import { render } from "@wrapped-testing-library/react";
import Themes from "../Themes";
const themes = [
  {
    id: 1,
    title: "Recrutement et contrat de travail",
    slug: "1-recrutement-et-contrat-de-travail"
  },
  {
    id: 2,
    title: "Salaire et Rémunération",
    slug: "2-salaire-et-remuneration"
  },
  {
    id: 3,
    title: "Temps de travail et congés",
    slug: "3-temps-de-travail-et-conges"
  },
  {
    id: 4,
    title: "Emploi et formation",
    slug: "4-emploi-et-formation"
  },
  {
    id: 5,
    title: "Santé, sécurité et conditions de travail",
    slug: "5-sante,-securite-et-conditions-de-travail"
  },
  {
    id: 6,
    title: "Représentation du personnel et négociation collective",
    slug: "6-representation-du-personnel-et-negociation-collective"
  },
  {
    id: 7,
    title: "Départ de l'entreprise",
    slug: "7-depart-de-lentreprise"
  },
  {
    id: 8,
    title: "Conflits au travail et contrôle de la réglementation",
    slug: "8-conflits-au-travail-et-controle-de-la-reglementation"
  }
];

describe("<Themes />", () => {
  it("should render", () => {
    const { container } = render(<Themes themes={themes} />);
    expect(container).toMatchSnapshot();
  });
});
