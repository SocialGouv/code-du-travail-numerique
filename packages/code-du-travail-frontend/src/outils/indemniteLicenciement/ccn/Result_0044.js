import React from "react";
import PropTypes from "prop-types";
import { Section } from "@cdt/ui";
import MathJax from "react-mathjax2";

const labelize = value => {
  if (isNaN(value) || !value) {
    return "-";
  }
  return `${Math.round(value)} €`;
};

class ResultDetail extends React.Component {
  static PropTypes = {
    formula: PropTypes.string.isRequired,
    salaireRef: PropTypes.string.isRequired,
    indemniteCC: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    echelon: PropTypes.shape({
      groupe: PropTypes.string,
      coefficient: PropTypes.string
    }).isRequired,
    hasOpe: PropTypes.string.isRequired,
    isEco: PropTypes.string.isRequired
  };

  render() {
    const {
      formula,
      salaireRef,
      indemnite,
      age,
      echelon,
      hasOpe,
      isEco
    } = this.props;
    return (
      <Section light>
        <React.Fragment>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexBasis: "50%",
                textAlign: "center"
              }}
            >
              <h2>Salaire moyen séléctionné</h2>
              <h3 style={{ fontSize: "2rem" }}>{labelize(salaireRef)}</h3>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexBasis: "50%",
                textAlign: "center"
              }}
            >
              <h2>Montant indicatif de votre indemnité</h2>
              <h3 style={{ fontSize: "2rem" }}>{labelize(indemnite)}</h3>
            </div>
          </div>
          <MathJax.Context input="ascii">
            <div
              style={{
                fontSize: "1.5em",
                textAlign: "center",
                fontFamily: "MJXc-TeX-main-R,MJXc-TeX-main-Rw"
              }}
            >
              <MathJax.Node inline>{formula}</MathJax.Node>;
            </div>
          </MathJax.Context>
        </React.Fragment>
      </Section>
    );
  }
}

export default ResultDetail;
