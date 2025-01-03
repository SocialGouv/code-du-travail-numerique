import { fr } from "@codegouvfr/react-dsfr";
import { PACKAGE_VERSION } from "../../config";
import { BrandTop } from "./BrandTop";
import { NeedMoreInfo } from "./infos";

export const Footer = () => {
  return (
    <footer>
      <NeedMoreInfo />
      <div className={fr.cx("fr-footer")} role="contentinfo">
        <div className={fr.cx("fr-footer__top")}>
          <div className={fr.cx("fr-container")}>
            <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
              <div className={fr.cx("fr-col-12", "fr-col-sm-3", "fr-col-md-2")}>
                <h3 className={fr.cx("fr-footer__top-cat")}>
                  Code du travail numérique
                </h3>
                <ul className={fr.cx("fr-footer__top-list")}>
                  <li>
                    <a
                      href="/droit-du-travail"
                      className={fr.cx("fr-footer__top-link")}
                    >
                      Le droit du travail
                    </a>
                  </li>
                  <li>
                    <a
                      href="/glossaire"
                      className={fr.cx("fr-footer__top-link")}
                    >
                      Glossaire
                    </a>
                  </li>
                  <li>
                    <a
                      href="/a-propos"
                      className={fr.cx("fr-footer__top-link")}
                    >
                      À propos
                    </a>
                  </li>
                  <li>
                    <a href="/stats" className={fr.cx("fr-footer__top-link")}>
                      Statistiques d&apos;utilisation
                    </a>
                  </li>
                  <li>
                    <a
                      href="/integration"
                      className={fr.cx("fr-footer__top-link")}
                    >
                      Intégrer les outils du Code du travail numérique
                    </a>
                  </li>
                </ul>
              </div>

              <div className={fr.cx("fr-col-12", "fr-col-sm-3", "fr-col-md-2")}>
                <h3 className={fr.cx("fr-footer__top-cat")}>
                  Outils populaires
                </h3>
                <ul className={fr.cx("fr-footer__top-list")}>
                  <li>
                    <a
                      href="/outils/simulateur-embauche"
                      className={fr.cx("fr-footer__top-link")}
                    >
                      Calcul du salaire brut/net
                    </a>
                  </li>
                  <li>
                    <a
                      href="/outils/indemnite-rupture-conventionnelle"
                      className={fr.cx("fr-footer__top-link")}
                    >
                      Calcul de l&apos;indemnité de rupture conventionnelle
                    </a>
                  </li>
                  <li>
                    <a
                      href="/outils/convention-collective"
                      className={fr.cx("fr-footer__top-link")}
                    >
                      Trouver sa convention collective
                    </a>
                  </li>
                </ul>
              </div>

              <div className={fr.cx("fr-col-12", "fr-col-sm-3", "fr-col-md-2")}>
                <h3 className={fr.cx("fr-footer__top-cat")}>
                  Modèles populaires
                </h3>
                <ul className={fr.cx("fr-footer__top-list")}>
                  <li>
                    <a
                      href="/modeles-de-courriers/lettre-de-demission"
                      className={fr.cx("fr-footer__top-link")}
                    >
                      Lettre de démission
                    </a>
                  </li>
                  <li>
                    <a
                      href="/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-par-le-salarie"
                      className={fr.cx("fr-footer__top-link")}
                    >
                      Rupture du contrat en période d&apos;essai par le salarié
                    </a>
                  </li>
                  <li>
                    <a
                      href="/modeles-de-courriers/convocation-a-un-entretien-prealable-au-licenciement-pour-motif-personnel"
                      className={fr.cx("fr-footer__top-link")}
                    >
                      Convocation à un entretien préalable au licenciement pour
                      motif personnel
                    </a>
                  </li>
                </ul>
              </div>

              {/* Fiches pratiques populaires */}
              <div className={fr.cx("fr-col-12", "fr-col-sm-3", "fr-col-md-2")}>
                <h3 className={fr.cx("fr-footer__top-cat")}>
                  Fiches pratiques populaires
                </h3>
                <ul className={fr.cx("fr-footer__top-list")}>
                  <li>
                    <a
                      href="/contribution/quelle-est-la-duree-du-preavis-en-cas-de-demission"
                      className={fr.cx("fr-footer__top-link")}
                    >
                      Durée du préavis de démission
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contribution/les-conges-pour-evenements-familiaux"
                      className={fr.cx("fr-footer__top-link")}
                    >
                      Congés pour événements familiaux
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contribution/en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire"
                      className={fr.cx("fr-footer__top-link")}
                    >
                      Maintien du salaire en cas d&apos;arrêt maladie
                    </a>
                  </li>
                </ul>
              </div>

              <div className={fr.cx("fr-col-12", "fr-col-sm-3", "fr-col-md-2")}>
                <h3 className={fr.cx("fr-footer__top-cat")}>
                  Conventions collectives populaires
                </h3>
                <ul className={fr.cx("fr-footer__top-list")}>
                  <li>
                    <a
                      href="/convention-collective/1090-services-de-lautomobile-commerce-et-reparation-de-lautomobile-du-cycle"
                      className={fr.cx("fr-footer__top-link")}
                    >
                      Services de l&apos;automobile
                    </a>
                  </li>
                  <li>
                    <a
                      href="/convention-collective/3248-metallurgie"
                      className={fr.cx("fr-footer__top-link")}
                    >
                      Métallurgie
                    </a>
                  </li>
                  <li>
                    <a
                      href="/convention-collective/573-commerces-de-gros"
                      className={fr.cx("fr-footer__top-link")}
                    >
                      Commerce de gros
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={fr.cx("fr-container")}>
          <div className={fr.cx("fr-footer__body")}>
            <div className={fr.cx("fr-footer__brand", "fr-enlarge-link")}>
              <div className={fr.cx("fr-logo")}>
                <BrandTop />
              </div>
            </div>

            <div className={fr.cx("fr-footer__content")}>
              <ul className={fr.cx("fr-footer__content-list")}>
                {[
                  "travail-emploi.gouv.fr",
                  "info.gouv.fr",
                  "service-public.fr",
                  "legifrance.gouv.fr",
                  "data.gouv.fr",
                ].map((domain) => (
                  <li key={domain} className={"fr-footer__content-item"}>
                    <a
                      className={fr.cx("fr-footer__content-link")}
                      href={`https://${domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {domain}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={fr.cx("fr-footer__bottom")}>
            <ul className={fr.cx("fr-footer__bottom-list")}>
              <li className={fr.cx("fr-footer__bottom-item")}>
                <a
                  href="/mentions-legales"
                  className={fr.cx("fr-footer__bottom-link")}
                >
                  Accessibilité : partiellement conforme
                </a>
              </li>
              <li className={fr.cx("fr-footer__bottom-item")}>
                <a
                  href="/mentions-legales"
                  className={fr.cx("fr-footer__bottom-link")}
                >
                  Mentions légales
                </a>
              </li>
              <li className={fr.cx("fr-footer__bottom-item")}>
                <a
                  href="/politique-confidentialite"
                  className={fr.cx("fr-footer__bottom-link")}
                >
                  Politique de confidentialité
                </a>
              </li>
              <li className={fr.cx("fr-footer__bottom-item")}>
                <a
                  href={`https://github.com/SocialGouv/code-du-travail-numerique/tree/v${PACKAGE_VERSION}`}
                  className={fr.cx("fr-footer__bottom-link")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contribuer sur Github
                </a>
              </li>
              <li className={fr.cx("fr-footer__bottom-item")}>
                <a
                  href="/plan-du-site"
                  className={fr.cx("fr-footer__bottom-link")}
                >
                  Plan du site
                </a>
              </li>
            </ul>
            <div className={fr.cx("fr-footer__bottom-copy")}>
              <p>
                Sauf mention explicite de propriété intellectuelle détenue par
                des tiers, les contenus de ce site sont proposés sous{" "}
                <a
                  href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  licence etalab-2.0
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
