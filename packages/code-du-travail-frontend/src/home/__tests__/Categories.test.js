import React from "react";
import { render } from "react-testing-library";
import Categories from "../Categories";
const themes = [
  {
    label: "Rupture de contrat",
    text: "Licenciement, démission, rupture conventionnelle…",
    icon: "/static/assets/icons/file-3.svg",
    slug: "rupture-de-contrat"
  },
  {
    slug: "embauche-et-contrat",
    label: "Contrat de travail et embauche",
    text: "Obligations liées à l'embauche et vie du contrat de travail",
    icon: "/static/assets/icons/handshake.svg"
  },
  {
    slug: "duree-du-travail-et-conges",
    label: "Durée de travail et congés",
    text: "heures supplémentaires, congés payés, durée maximale du travail...",
    icon: "/static/assets/icons/time.svg"
  },
  {
    slug: "remuneration",
    label: "Rémunération",
    text: "Salaire, primes, avantages, bulletin de salaire...",
    icon: "/static/assets/icons/remuneration.svg"
  },
  {
    slug: "sante-et-securite",
    label: "Santé et sécurité",
    text: "conditions de travail, surveillance médicale...",
    icon: "/static/assets/icons/shield.svg"
  },
  {
    slug: "formation",
    label: "Formation",
    text: "Evolution de carrière, VAE",
    icon: "/static/assets/icons/hiring-1.svg"
  },
  {
    slug: "contentieux-et-coercitif",
    label: "prud’hommes, inspection du travail, procédures...",
    text: "Les syndicats à votre service",
    icon: "/static/assets/icons/chat.svg"
  },
  {
    slug: "maladies-et-inaptitudes",
    label: "Maladie et inaptitude",
    text:
      "inaptitude, arrêts de travail, accident du travail / maladie professionnelle...",
    icon: "/static/assets/icons/certificate.svg"
  }
];
describe("<Categories />", () => {
  it("should render", () => {
    const { container } = render(<Categories themes={themes} />);
    expect(container).toMatchSnapshot();
  });
});
