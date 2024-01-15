import { fr } from "@codegouvfr/react-dsfr";
import React from "react";

/*
{
    position: absolute;
    top: -27px;
    left: -50%;
    z-index: -1;
    width: 200%;
    height: 400px;
    background-color: rgb(242, 245, 250);
    border-radius: 100%;
    content: "";
}
 */
export const Footer = () => {
  return (
    <footer id="fr-footer" role="contentinfo">
      <div
        className={
          "fr-container--fluid fr-background-action-high--blue-ecume fr-py-2w fr-mt-1w"
        }
        style={{
          backgroundColor:
            fr.colors.decisions.background.contrast.blueFrance.default,
        }}
      >
        <div className={"fr-container"} style={{ textAlign: "center" }}>
          <p className={"fr-text--xl fr-text--heavy"}>
            Besoin d&apos;information ?
          </p>
          <p>
            Les services du ministère du Travail en région informent,
            conseillent et orientent les salariés et les employeurs du secteur
            privé sur leurs questions en droit du travail.
          </p>
          <button className="fr-btn fr-btn--secondary">Contacter nos services en régions</button>
        </div>
      </div>
      <div className="fr-footer">
        <div className="fr-footer__top">
          <div className="fr-container">
            <div className="fr-grid-row fr-grid-row--gutters">
              <div className="fr-col-12 fr-col-sm-3 fr-col-md-2">
                <h3 className="fr-footer__top-cat">
                  Code du travail numérique
                </h3>
                <ul className="fr-footer__top-list">
                  <li>
                    <a href="#" className="fr-footer__top-link">
                      Le droit du travail
                    </a>
                  </li>
                  <li>
                    <a href="#" className="fr-footer__top-link">
                      Glossaire
                    </a>
                  </li>
                  <li>
                    <a href="#" className="fr-footer__top-link">
                      À propos
                    </a>
                  </li>
                  <li>
                    <a href="#" className="fr-footer__top-link">
                      Statistiques d’utilisation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="fr-footer__top-link">
                      Intégrer les outils du Code du travail numérique
                    </a>
                  </li>
                </ul>
              </div>
              <div className="fr-col-12 fr-col-sm-3 fr-col-md-2">
                <h3 className="fr-footer__top-cat">Outils populaires</h3>
                <ul className="fr-footer__top-list">
                  <li>
                    <a href="#" className="fr-footer__top-link">
                      Calcul du salaire brut/net
                    </a>
                  </li>
                  <li>
                    <a href="#" className="fr-footer__top-link">
                      Calcul de l&apos;indemnité de licenciement
                    </a>
                  </li>
                  <li>
                    <a href="#" className="fr-footer__top-link">
                      Trouver sa convention collective
                    </a>
                  </li>
                </ul>
              </div>
              <div className="fr-col-12 fr-col-sm-3 fr-col-md-2">
                <h3 className="fr-footer__top-cat">Modèles populaires</h3>
                <ul className="fr-footer__top-list">
                  <li>
                    <a href="#" className="fr-footer__top-link">
                      Lettre de démission
                    </a>
                  </li>
                  <li>
                    <a href="#" className="fr-footer__top-link">
                      Rupture du contrat en période d&apos;essai par le salarié
                    </a>
                  </li>
                  <li>
                    <a href="#" className="fr-footer__top-link">
                      Convocation à un entretien préalable au licenciement pour
                      motif personnel
                    </a>
                  </li>
                </ul>
              </div>
              <div className="fr-col-12 fr-col-sm-3 fr-col-md-2">
                <h3 className="fr-footer__top-cat">
                  Fiches pratiques populaires
                </h3>
                <ul className="fr-footer__top-list">
                  <li>
                    <a href="#" className="fr-footer__top-link">
                      Durée du préavis de démission
                    </a>
                  </li>
                  <li>
                    <a href="#" className="fr-footer__top-link">
                      Congés pour événements familiaux
                    </a>
                  </li>
                  <li>
                    <a href="#" className="fr-footer__top-link">
                      Maintien du salaire en cas d&apos;arrêt maladie
                    </a>
                  </li>
                </ul>
              </div>
              <div className="fr-col-12 fr-col-sm-3 fr-col-md-2">
                <h3 className="fr-footer__top-cat">
                  Conventions collectives populaires
                </h3>
                <ul className="fr-footer__top-list">
                  <li>
                    <a href="#" className="fr-footer__top-link">
                      Services de l&apos;automobile
                    </a>
                  </li>
                  <li>
                    <a href="#" className="fr-footer__top-link">
                      Métallurgie
                    </a>
                  </li>
                  <li>
                    <a href="#" className="fr-footer__top-link">
                      Commerce de gros
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="fr-container">
          <div className="fr-footer__body">
            <div className="fr-footer__brand fr-enlarge-link">
              <a href="#" title="#">
                <p className="fr-logo">
                  MINISTÈRE
                  <br />
                  DU TRAVAIL,
                  <br />
                  DU PLEIN EMPLOI
                  <br />
                  ET DE L&apos;INSERTION FRANÇAISE
                </p>
              </a>
            </div>
            <div className="fr-footer__content">
              <p className="fr-footer__content-desc"></p>
              <ul className="fr-footer__content-list">
                <li className="fr-footer__content-item">
                  <a
                    className="fr-footer__content-link"
                    target="_blank"
                    href="https://legifrance.gouv.fr"
                    title="legifrance.gouv.fr - ouvre une nouvelle fenêtre"
                  >
                    legifrance.gouv.fr
                  </a>
                </li>
                <li className="fr-footer__content-item">
                  <a
                    className="fr-footer__content-link"
                    target="_blank"
                    href="https://gouvernement.fr"
                    title="gouvernement.fr - ouvre une nouvelle fenêtre"
                  >
                    gouvernement.fr
                  </a>
                </li>
                <li className="fr-footer__content-item">
                  <a
                    className="fr-footer__content-link"
                    target="_blank"
                    href="https://service-public.fr"
                    title="service-public.fr - ouvre une nouvelle fenêtre"
                  >
                    service-public.fr
                  </a>
                </li>
                <li className="fr-footer__content-item">
                  <a
                    className="fr-footer__content-link"
                    target="_blank"
                    href="https://data.gouv.fr"
                    title="data.gouv.fr - ouvre une nouvelle fenêtre"
                  >
                    data.gouv.fr
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="fr-footer__bottom">
            <ul className="fr-footer__bottom-list">
              <li className="fr-footer__bottom-item">
                <a href="#" className="fr-footer__bottom-link">
                  Plan du site
                </a>
              </li>
              <li className="fr-footer__bottom-item">
                <span className="fr-footer__bottom-link">
                  Accessibilité: partiellement conforme
                </span>
              </li>
              <li className="fr-footer__bottom-item">
                <a href="#" className="fr-footer__bottom-link">
                  Mentions légales
                </a>
              </li>
            </ul>
            <div className="fr-footer__bottom-copy">
              <p>Ma super licence !</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
