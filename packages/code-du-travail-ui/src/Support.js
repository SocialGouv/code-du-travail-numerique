import React from "react";
import PropTypes from "prop-types";

import SupportImage from "./SupportImage";

const Support = ({ children }) => (
  <section className="section-light">
    <div className="container">
      <div className="support wrapper-dark shadow-bottom">
        <SupportImage style={{ marginRight: "var(--spacing-large)" }} />
        <div>{children}</div>
      </div>
    </div>
  </section>
);

const defaultContent = (
  <React.Fragment>
    <header>
      <h2>Besoin d’un accompagnement personnel ?</h2>
      <p>
        Les services de renseignement sont ouverts au public gratuitement chaque
        semaine et vous donnent des conseils adaptés à votre situation.
      </p>
    </header>
    <form className="support__form">
      <input type="text" placeholder="Code postal" className="support__input" />
      <input type="submit" value="Envoyer" className="support__submit btn" />
    </form>
  </React.Fragment>
);

Support.propTypes = {
  children: PropTypes.element.isRequired
};

Support.defaultProps = {
  children: defaultContent
};

export default Support;
