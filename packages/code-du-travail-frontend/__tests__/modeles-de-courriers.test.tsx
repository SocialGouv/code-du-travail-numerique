import { render } from "@testing-library/react";
import React from "react";

import ModelesDeCourriers from "../pages/modeles-de-courriers/index";

describe("<ModelesDeCourriers />", () => {
  it("should render", () => {
    const data = [
      {
        breadcrumbs: [
          {
            label: "Embauche et contrat de travail",
            slug: "/themes/1-embauche-et-contrat-de-travail",
          },
          {
            label: "Embauche",
            slug: "/themes/11-embauche",
          },
          {
            label: "Période d'essai",
            slug: "/themes/113-periode-dessai",
          },
        ],
        description:
          "Pendant la période d’essai, le contrat de travail peut être rompu librement par l'employeur. L'employeur doit dans ce cas informer le salarié et respecter un délai de prévenance.",
        slug: "rupture-de-periode-dessai-a-linitiative-de-lemployeur",
        source: "modeles_de_courriers",
        title: "Rupture de période d’essai à l'initiative de l'employeur",
      },
      {
        breadcrumbs: [
          {
            label: "Départ de l'entreprise",
            slug: "/themes/8-depart-de-lentreprise",
          },
          {
            label: "Rupture conventionnelle",
            slug: "/themes/83-rupture-conventionnelle",
          },
          {
            label: "Rupture conventionnelle individuelle",
            slug: "/themes/831-rupture-conventionnelle-individuelle",
          },
        ],
        description:
          "La rupture conventionnelle individuelle est une modalité de rupture spécifique du CDI. Elle nécessite le consentement de l’employeur et du salarié, et son homologation par l’administration. La rupture ouvre droit à une indemnité de rupture conventionnelle. Ce modèle permet d’initier la procédure de rupture par l’invitation à un premier entretien.",
        slug: "demande-de-rendez-vous-en-vue-dune-rupture-conventionnelle",
        source: "modeles_de_courriers",
        title: "Demande de rendez-vous en vue d’une rupture conventionnelle",
      },
    ];
    const { container } = render(<ModelesDeCourriers data={data} />);
    expect(container).toMatchSnapshot();
  });
});
