import React from "react";
import PropTypes from "prop-types";

const NoAnswer = ({ children }) => {
  return (
    <div>
      <section className="section">
        <div className="wrapper-narrow wrapper-dark no-answer">
          <Lost color="" className="no-answer__illus" />
          <div className="no-answer__content">
            <h1>Vous n'avez pas trouvé votre réponse</h1>
            <p>
              Laissez nous vos impressions et commentaires. Nous étudions tous
              vos retours avec attention pour améliorer cet outil.
            </p>
            {children}
          </div>
        </div>
      </section>
    </div>
  );
};

NoAnswer.propTypes = {
  children: PropTypes.node
};

export { NoAnswer };
