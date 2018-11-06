import React from "react";
import PropTypes from "prop-types";
import { Section } from "@cdt/ui";
import MathJax from "react-mathjax2";
import { headStyle } from "./steps_styles";

const round = fl => parseInt(fl * 100) / 100;

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

const getJaxFormula = ({
  meilleurMoyenne,
  isSmallAnciennete,
  anciennete,
  isR12342
}) => {
  //return `\\frac{1}{6}`;
  if (isR12342) {
    // "calculavant2017" : date du licenciement < 26 / 09 / 2017
    // Si "ancienneté inférieure ou égale à 10 ans
    if (isSmallAnciennete) {
      // indemnite = 1 / 5 * c * 10
      return `(1/5 * ${round(meilleurMoyenne)} * ${anciennete}) / 12`;
    } else {
      // Si ancienneté supérieur à 10 ans:
      // indemnite = 1 / 5 * c * 10 + 2 / 5 * c * d
      return `(1/5  * ${round(meilleurMoyenne)} * 10) + (2/5 * ${round(
        meilleurMoyenne
      )} * (${Math.floor(anciennete / 12)} - 10))`;
    }
  } else {
    if (isSmallAnciennete) {
      // indemnite = 1 / 4 * c * 10
      return `(1/4 * ${round(meilleurMoyenne)} * ${anciennete}) / 12`;
    } else {
      // Si ancienneté supérieurd à 10 ans:
      //indemnite = 1 / 4 * c * 10 + 1 / 3 * c * d
      return `(1/4 * ${round(meilleurMoyenne)} * 10) + (1/3 * ${round(
        meilleurMoyenne
      )} * (${Math.floor(anciennete / 12)} - 10))`;
    }
  }
};

class ResultDetail extends React.Component {
  static propTypes = {
    indemnite: PropTypes.number,
    moyenneSalaires: PropTypes.number,
    moyenne3DerniersMois: PropTypes.number,
    anciennete: PropTypes.number,
    meilleurMoyenne: PropTypes.number,
    isSmallAnciennete: PropTypes.bool,
    isR12342: PropTypes.bool
  };

  render() {
    const {
      anciennete,
      indemnite,
      moyenneSalaires,
      moyenne3DerniersMois,
      meilleurMoyenne,
      isSmallAnciennete,
      isR12342
    } = this.props;

    const formulaParams = {
      meilleurMoyenne,
      isSmallAnciennete,
      anciennete,
      isR12342
    };

    const infoFinContrat = isR12342 ? (
      <React.Fragment>
        Base minimum : fin de contrat &lt;= au
        <a href="https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=F6CD29C2DCBBBB2A5009383ADBDDAA29.tplgfr43s_2?idArticle=LEGIARTI000019225838&cidTexte=LEGITEXT000006072050&categorieLien=id&dateTexte=20170926">
          25/09/2017
        </a>
      </React.Fragment>
    ) : (
      <React.Fragment>
        Base minimum : fin de contrat &gt; au{" "}
        <a href="https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000019225838&cidTexte=LEGITEXT000006072050">
          25/09/2017
        </a>
      </React.Fragment>
    );
    return (
      <React.Fragment>
        {indemnite && (
          <Section light>
            <div style={headStyle}>
              <h2>Montant indicatif de votre indemnité</h2>
              <h3 style={{ fontSize: "2rem" }}>{labelize(indemnite)}</h3>
              <p>
                <em>
                  Sur la base du calcul de l'indemnité légale de licenciement.
                </em>
              </p>
            </div>
          </Section>
        )}
        <Section light>
          <React.Fragment>
            <table width="100%" style={{ fontSize: "1.2em" }}>
              <tbody>
                <Row value={labelize(moyenneSalaires)}>
                  Moyenne des 12 derniers mois
                </Row>
                <Row value={labelize(moyenne3DerniersMois)}>
                  Moyenne des 3 derniers sois
                </Row>
                <Row value={labelize(meilleurMoyenne)}>Salaire retenu</Row>
                <Row value={isR12342 ? "1 / 5" : "1 / 4"}>{infoFinContrat}</Row>
                <Row value={isSmallAnciennete ? "< 10 ans" : "> 10 ans"}>
                  Ancienneté
                </Row>
              </tbody>
            </table>
            <div style={{ fontSize: "1.5em" }}>
              <MathJax.Context input="ascii">
                <div
                  style={{
                    fontSize: "1.5em",
                    textAlign: "center",
                    fontFamily: "MJXc-TeX-main-R,MJXc-TeX-main-Rw"
                  }}
                >
                  <MathJax.Node inline>
                    {getJaxFormula(formulaParams)}
                  </MathJax.Node>
                </div>
              </MathJax.Context>
            </div>
          </React.Fragment>
        </Section>
      </React.Fragment>
    );
  }
}

export { ResultDetail };
