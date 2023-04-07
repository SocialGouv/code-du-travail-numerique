import { render } from "@testing-library/react";
import React from "react";

import FicheMT from "../pages/fiche-ministere-travail/[slug]";

describe("<FicheMT />", () => {
  it("should render", () => {
    const data = {
      breadcrumbs: [
        {
          label: "Santé, sécurité et conditions de travail",
          slug: "/themes/6-sante-securite-et-conditions-de-travail",
        },
      ],
      date: "01/01/2020",
      description: "lorem ipsum description",
      intro: "lorem ipsum intro",
      sections: [
        {
          anchor: "t1-Visite-d-information-et-de-prevention-pour-qui",
          html:
            '<p>Depuis le 1er janvier 2017, la <strong>visite d’information et de prévention</strong> vient remplacer la traditionnelle visite médicale d’embauche qui devait être réalisée au plus tard avant la fin de la période d’essai.</p><p>Désormais, la visite doit être organisée dans un délai maximum de trois mois à compter de l’occupation effective du poste de travail (sauf cas de dispense). Néanmoins, pour certains salariés, comme les jeunes de moins de 18 ans ou  les travailleurs de nuit, elle doit toujours avoir lieu avant la prise de fonction.</p><p><strong>Bon à savoir&nbsp;!</strong> Tout salarié affecté à un poste présentant des risques particuliers pour sa santé (exposition à l’amiante, au plomb, à des agents cancérogènes, etc.) doit passer, avant sa prise de fonction, <strong>un examen médical d’aptitude</strong> et non une simple visite d’information et de prévention.</p><p><strong>La visite d’information et de prévention</strong> permet d’interroger le salarié sur son état de santé, et d’envisager, si besoin, son orientation spécifique vers le médecin du travail. Elle vise aussi à informer le salarié sur les risques éventuels auxquels l’expose son poste de travail, et à le sensibiliser sur les moyens de prévention.</p><p><strong>Cette visite n’est pas toujours assurée par le médecin du travail lui-même</strong>. Le salarié peut être reçu par un professionnel de santé (par exemple, un infirmier) intervenant sous son autorité.. Toutefois, certains salariés comme par exemple les femmes enceintes, celles qui viennent d’accoucher ou allaitent leur enfant, ou encore les travailleurs handicapés, sont adressés au médecin du travail afin que leur soit proposé un suivi adapté à leur situation.</p><p><strong>Pour davantage de détails</strong> consultez <a href="https://travail-emploi.gouv.fr/sante-au-travail/suivi-de-la-sante-au-travail-10727/article/le-suivi-de-l-etat-de-sante-des-salaries" class="spip_in" target="_blank" rel="nofollow, noopener">notre fiche sur le suivi de l’état de santé des salariés</a>.</p>',
          title: "1) Visite d’information et de prévention : pour qui ?",
        },
      ],
      title: "Fiche MT test",
      url: "fiche.travail.url",
      relatedItems: [],
    };
    const { container } = render(<FicheMT {...data} />);
    expect(container).toMatchSnapshot();
  });
});
