import React from "react";
import PropTypes from "prop-types";
import Search from "react-feather/dist/icons/search";

class Support extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    onSubmit: PropTypes.func.isRequired
  };

  inputRef = React.createRef();

  submit = event => {
    event.preventDefault();
    if (this.inputRef.current) {
      this.props.onSubmit({ target: this.inputRef.current });
    } else {
      this.props.onSubmit({ target: event.target });
    }
  };
  render() {
    const { children } = this.props;
    return (
      <section className="section-dark">
        <div className="container center">
          <div className="wrapper-narrow">
            <header>
              <h2>Besoin d’un accompagnement personnel ?</h2>
              <p>
                Services de renseignement, conseil aux salariés, défenseurs des
                droits…
                <br /> Indiquez l&apos;adresse de votre lieu de travail pour
                obtenir une liste de vos interlocuteurs.
              </p>
            </header>
            <form className="support__form" onSubmit={this.submit}>
              {/*eslint-disable-next-line jsx-a11y/label-has-for */}
              <label className="support__label">
                {children ? (
                  children
                ) : (
                  <input
                    ref={this.inputRef}
                    type="search"
                    className="support__input"
                    placeholder="ex: 12 avenue du Palais, Metz"
                  />
                )}
                <Search
                  className="support__icon"
                  title="Rechercher par adresse"
                />
              </label>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
export default Support;
