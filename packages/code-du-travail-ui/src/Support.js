import React from "react";
import PropTypes from "prop-types";
import { Search } from "./icons";

const Support = ({ onSubmit, children }) => (
  <section className="section-dark">
    <div className="container center">
      <div className="wrapper-narrow">
        <header>
          <h2>Besoin d’un accompagnement personnel ?</h2>
          <p>
            Services de renseignement, conseil aux salariés, défenseurs des
            droits…
            <br /> Indiquez l&apos;adresse de votre lieu de travail pour obtenir
            une liste de vos interlocuteurs.
          </p>
        </header>
        <form className="support__form" onSubmit={onSubmit}>
          {/*eslint-disable-next-line jsx-a11y/label-has-for */}
          <label className="support__label">
            {children}
            <Search className="support__icon" title="Recherche par adresse" />
          </label>
        </form>
      </div>
    </div>
  </section>
);

Support.propTypes = {
  children: PropTypes.element,
  onSubmit: PropTypes.func.isRequired
};

Support.defaultProps = {
  children: (
    <input
      type="search"
      className="support__input"
      placeholder="ex: 12 avenue du Palais, Metz"
    />
  )
};
export default Support;
