import React from "react";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

import ConventionModal from "../common/ConventionModal";

const Footer = () => (
  <footer className="section-dark site-footer" id="footer">
    <div className="container">
      <div className="main-footer">
        <div className="footer__block">
          <h3>Code du travail numérique</h3>
          <ul>
            <li>
              <a href="https://code-du-travail.beta.gouv.fr">
                Navigation par thèmes
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__block">
          <h3>Aidez-nous à améliorer cet outil</h3>
          <ul>
            <li>
              <a
                href={
                  "https://github.com/SocialGouv/code-du-travail-numerique/tree/v" +
                  publicRuntimeConfig.PACKAGE_VERSION
                }
                className="external-link__after"
              >
                Contribuer sur Github
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__block">
          <h3>Liens et outils</h3>
          <ul>
            <li>
              <a
                href="https://socialgouv.github.io/faq-code-du-travail"
                className="external-link__after"
              >
                Question-Réponse des services de renseignement
              </a>
            </li>
            <li>
              <ConventionModal />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
