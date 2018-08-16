import React from "react";

import ServiceRenseignementModal from "./ServiceRenseignementModal";

const SeeAlso = theme => {
  let links = [
    {
      href: "https://socialgouv.github.io/faq-code-du-travail/",
      text: "Question-Réponse des services de renseignement"
    },
    {
      href:
        "http://bourgogne-franche-comte.direccte.gouv.fr/Le-code-BFC-Bienveillant-facile-et-comprehensible",
      text: "Le Code BFC (Bourgogne Franche Comté: fév 2017)"
    }
  ];

  // Contrat de travail / Rupture de contrat à durée Indéterminée (CDI) / Rupture conventionnelle (individuelle)
  if (theme && theme.id === 1700) {
    links.unshift({
      href:
        "https://www.telerc.travail.gouv.fr/RuptureConventionnellePortailPublic/jsp/site/Portal.jsp",
      text:
        "TELERC: Le service de saisie d'une demande d'homologation de Rupture Conventionnelle "
    });
  }

  return (
    <section className="section-light">
      <div className="container">
        <div className="block-2-cols wrapper-dark">
          <header>
            <h2>Voir aussi</h2>
          </header>
          <div className="block-2-cols__row">
            <div className="block-2-cols__col">
              <h3>
                <img src="/static/assets/icons/phone-call.svg" alt="" />Vos
                interlocuteurs
              </h3>
              <ul>
                <li>
                  <ServiceRenseignementModal />
                </li>
                <li>
                  <a
                    target="_blank"
                    className="external-link__after"
                    rel="noopener noreferrer"
                    href="https://www.defenseurdesdroits.fr/office"
                  >
                    Défenseur des droits
                  </a>
                </li>
              </ul>
            </div>
            <div className="block-2-cols__col">
              <h3>
                <img src="/static/assets/icons/line-chart.svg" alt="" />Liens et
                outils
              </h3>
              <ul>
                {links.map(link => (
                  <li key={link.href}>
                    <a
                      target="_blank"
                      className="external-link__after"
                      rel="noopener noreferrer"
                      href={link.href}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeeAlso;
