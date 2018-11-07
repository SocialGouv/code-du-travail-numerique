import React from "react";
import PropTypes from "prop-types";
import { Container, Section } from "@cdt/ui";
import MathJax from "react-mathjax2";
import { headStyle } from "../steps_styles";
const round = fl => parseFloat((fl * 100) / 100).toFixed(2);

const labelize = value => {
  if (isNaN(value) || !value) {
    return "-";
  }
  return `${round(value)} €`;
};

const Row = ({ children, value }) => (
  <tr>
    <td style={{ textAlign: "left", fontWeight: "bold" }}>{children}</td>
    <td style={{ textAlign: "center" }}>{value}</td>
  </tr>
);
Row.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string
};

class ResultDetail extends React.Component {
  static propTypes = {
    formula: PropTypes.string.isRequired,
    salaireRef: PropTypes.number.isRequired,
    indemnite: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    echelon: PropTypes.shape({
      groupe: PropTypes.string,
      coefficient: PropTypes.string
    }).isRequired,
    hasOpe: PropTypes.bool.isRequired,
    isEco: PropTypes.bool.isRequired
  };

  render() {
    const {
      formula,
      salaireRef,
      moyenneSalaires,
      dernierSalaire,
      indemnite,
      convention,
      age,
      anciennete,
      echelon,
      hasOpe,
      isEco
    } = this.props;
    return (
      <React.Fragment>
        <Section light>
          <div style={headStyle}>
            <h2>Montant indicatif de votre indemnité</h2>
            <h3 style={{ fontSize: "2rem" }}>{labelize(indemnite)}</h3>
            <p>
              <em>Calculé sur la base de la </em>
              {convention.ccName}
            </p>
          </div>
        </Section>
        <Container>
          <table width="100%" style={{ fontSize: "1.2em" }}>
            <tbody>
              <Row value={`${labelize(moyenneSalaires)}`}>
                Moyenne des 12 derniers mois
              </Row>
              <Row value={`${labelize(dernierSalaire)}`}>
                Dernier salaire
                {echelon.groupe === "V" && "avant préavis"}
              </Row>
              <Row value={`${labelize(salaireRef)}`}>Salaire retenu</Row>
              <Row value={echelon.groupe}>Echelon</Row>
              <Row value={hasOpe ? "Oui" : "non"}>
                L'entreprise est affiliée a une Organisation Patronnale
                Employeur
              </Row>
              <Row value={`${age}`}>Age</Row>
              <Row value={`${anciennete / 12}`}>
                Ancienneté en mois par année
              </Row>
            </tbody>
          </table>
        </Container>
        <Section light>
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
        </Section>
      </React.Fragment>
    );
  }
}

export default ResultDetail;
