import React from "react";
import PropTypes from "prop-types";
import { Container, Section, Wrapper } from "@cdt/ui";
import { Header } from "./stepStyles";
import MathJax from "react-mathjax-preview";
import styled from "styled-components";
import { ErrorBoundary } from "../../common/ErrorBoundary";

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

class ResultDetail extends React.Component {
  static propTypes = {
    indemnite: PropTypes.number,
    inaptitude: PropTypes.bool,
    moyenneSalaires: PropTypes.number,
    moyenne3DerniersMois: PropTypes.number,
    anciennete: PropTypes.number,
    salaireRef: PropTypes.number,
    isSmallAnciennete: PropTypes.bool,
    isR12342: PropTypes.bool,
    salaires: PropTypes.shape({
      isPartiel: PropTypes.bool
    })
  };

  render() {
    const {
      indemnite,
      inaptitude,
      moyenneSalaires,
      moyenne3DerniersMois,
      salaireRef,
      isSmallAnciennete,
      isR12342,
      salaires,
      formula
    } = this.props;
    const infoFinContrat = isR12342 ? (
      <React.Fragment>
        Base minimum : fin de contrat &lt;= au{" "}
        <a href="https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000019225838&cidTexte=LEGITEXT000006072050&categorieLien=id&dateTexte=20170926">
          27/09/2017
        </a>
      </React.Fragment>
    ) : (
      <React.Fragment>
        Base minimum : fin de contrat &gt; au{" "}
        <a href="https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000019225838&cidTexte=LEGITEXT000006072050">
          27/09/2017
        </a>
      </React.Fragment>
    );
    return (
      <React.Fragment>
        {indemnite > 0 && (
          <Section>
            <Container>
              <Wrapper>
                <Header>
                  <h2>Montant indicatif de votre indemnité</h2>
                  <h3 style={{ fontSize: "2rem" }}>{labelize(indemnite)}</h3>
                  <p>
                    <em>
                      Sur la base du calcul de l’indemnité minimum légale de
                      licenciement.
                      {inaptitude && (
                        <React.Fragment>
                          <br /> Ce montant prend en compte l’indemnité spéciale
                          de licenciement.
                        </React.Fragment>
                      )}
                    </em>
                  </p>
                </Header>
              </Wrapper>
            </Container>
          </Section>
        )}
        <Section>
          <Container>
            <Wrapper>
              <Table width="100%" style={{ fontSize: "1.2em" }}>
                <tbody>
                  {!salaires.isPartiel && (
                    <Row value={labelize(moyenneSalaires)}>
                      Moyenne des 12 derniers mois
                    </Row>
                  )}
                  {!salaires.isPartiel && (
                    <Row value={labelize(moyenne3DerniersMois)}>
                      Moyenne des 3 derniers mois
                    </Row>
                  )}
                  <Row value={labelize(salaireRef)}>Salaire de référence</Row>
                  <Row value={isR12342 ? "1 / 5" : "1 / 4"}>
                    {infoFinContrat}
                  </Row>
                  <Row value={isSmallAnciennete ? "< 10 ans" : "> 10 ans"}>
                    Ancienneté
                  </Row>
                </tbody>
              </Table>
              {salaireRef > 0 && (
                <div
                  style={{
                    fontSize: "2.5em",
                    textAlign: "center",
                    fontFamily: "MJXc-TeX-main-R,MJXc-TeX-main-Rw"
                  }}
                >
                  <ErrorBoundary>
                    <MathJax math={"`" + formula + "`"} />
                  </ErrorBoundary>
                </div>
              )}
            </Wrapper>
          </Container>
        </Section>
      </React.Fragment>
    );
  }
}

const Table = styled.table`
  color: #757575;
  a:link {
    color: #757575;
  }
`;
export { ResultDetail };
