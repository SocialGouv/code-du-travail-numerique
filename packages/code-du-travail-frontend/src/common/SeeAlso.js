import React from "react";

import ServiceRenseignementModal from "./ServiceRenseignementModal";

const SeeAlso = () => {
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
                <img src="/static/assets/icons/phone-call.svg" alt="" />
                Vos interlocuteurs
              </h3>
              <ul>
                <li>
                  <ServiceRenseignementModal />
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-link__after"
                    href="https://www.defenseurdesdroits.fr/office"
                  >
                    Défenseur des droits
                  </a>
                </li>
              </ul>
            </div>
            <div className="block-2-cols__col">
              <h3>
                <img src="/static/assets/icons/line-chart.svg" alt="" />
                Liens et outils
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
