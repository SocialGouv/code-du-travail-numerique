import React from "react";
import PropTypes from "prop-types";
import { Lost } from "../icons";

const NoAnswer = ({ children }) => {
  return (
    <section className="section">
      <div className="container">
        <div className="wrapper-narrow wrapper-dark no-answer">
          <Lost className="no-answer__illus" />
          <div className="no-answer__content">
            <h3 className="section__title">
              Vous n&apos;avez pas trouvé votre réponse
            </h3>
            <p>
              Laissez nous vos impressions et commentaires. Nous étudions tous
              vos retours avec attention pour améliorer cet outil.
            </p>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

NoAnswer.propTypes = {
  children: PropTypes.node
};
export default NoAnswer;
