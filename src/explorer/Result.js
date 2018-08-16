import React from "react";
import * as Feather from "react-feather";

import Articles from "./Articles";
import Articulation from "./Articulation";
import FAQ, { hasFaq } from "./FAQ";
import FeedbackForm from "../common/FeedbackForm";
import Fiches, { hasFiche } from "./Fiches";
import SeeAlso from "../common/SeeAlso";

// page de résultats

const InfosRupture = () => (
  <div>
    <h3>Liens utiles</h3>
    <ul>
      <li>
        <a href="https://www.telerc.travail.gouv.fr/RuptureConventionnellePortailPublic/jsp/site/Portal.jsp">
          TELERC : saisie d'une demande d'homologation de R.C.{" "}
          <Feather.ExternalLink size="10" />
        </a>
      </li>
      <li>
        <a href="https://www.telerc.travail.gouv.fr/RuptureConventionnellePortailPublic/jsp/site/Portal.jsp?page=calculerdelairetractation">
          TELERC : calcul de retractation <Feather.ExternalLink size="10" />
        </a>
      </li>
      <li>
        <a href="https://www.telerc.travail.gouv.fr/RuptureConventionnellePortailPublic/jsp/site/Portal.jsp?page_id=14">
          TELERC : calcul de l'indemnité légale de rupture conventionnelle{" "}
          <Feather.ExternalLink size="10" />
        </a>
      </li>
    </ul>
  </div>
);

const Result = ({ onResetClick, theme }) => {
  const hasFaqEntry = hasFaq(theme);
  const hasFicheEntry = hasFiche(theme);

  return (
    <div>
      <div className="section-light">
        <div className="container">
          <div className="wrapper-light">
            {(hasFaqEntry || hasFicheEntry) && (
              <React.Fragment>
                <h2>F.A.Q. et fiches</h2>
                {hasFaqEntry && (
                  <React.Fragment>
                    <h3>
                      <Feather.HelpCircle size="20" /> F.A.Q. Code du travail
                    </h3>
                    <FAQ theme={theme} />
                  </React.Fragment>
                )}
                {hasFicheEntry && (
                  <React.Fragment>
                    <h3>
                      <Feather.FileText size="20" /> Fiches pratiques
                    </h3>
                    <Fiches theme={theme} />
                  </React.Fragment>
                )}
              </React.Fragment>
            )}

            {theme.id === 1700 && <InfosRupture />}

            <h2>Textes officiels</h2>
            <h3>
              <Feather.AlertTriangle size="20" /> Textes applicables
            </h3>
            <Articulation theme={theme} />
            {theme.articles &&
              theme.articles.length && (
                <React.Fragment>
                  <h3>
                    <Feather.Book size="20" /> Code du Travail Articles
                  </h3>
                  <Articles theme={theme} />
                </React.Fragment>
              )}
          </div>
        </div>
      </div>

      <SeeAlso />
      <FeedbackForm theme={theme.id} />
    </div>
  );
};

export default Result;
