import React from "react";
import { Wrapper, VerticalArrow } from "@cdt/ui";
import styled from "styled-components";

const HIDDEN_KEY = "convention-explainer-hidden";

class ConventionExplainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hidden: false };
  }

  componentDidMount = () => {
    // we store values as strings in sessionStorage
    this.setState({ hidden: sessionStorage.getItem(HIDDEN_KEY) === "true" });
  };

  render = () => {
    const { hidden } = this.state;
    return (
      <Wrapper variant="dark">
        <Title
          href="#"
          aria-expanded={!hidden}
          onClick={e => {
            e.preventDefault();
            this.setState({ hidden: !hidden });
            sessionStorage.setItem(HIDDEN_KEY, (!hidden).toString());
          }}
        >
          Plus d&apos;informations sur les conventions collectives
          <VerticalArrow />
        </Title>
        {!hidden && (
          <React.Fragment>
            <SubTitle>
              Qu&apos;est ce qu&apos;une convention collective ?
            </SubTitle>
            <p>
              Une convention collective est un accord négocié entre des
              organisations syndicales de salariés et des organisations
              d&apos;employeurs.
              <br />
              Elle permet d&apos;aménager les règles issues du code du travail
              concernant les conditions d&apos;emploi, la formation
              professionnelle, le travail des salariés et les garanties
              sociales aux spécificités des secteurs d&apos;activité et
              géographiques concernés. Elle peut également prévoir d&apos;autres
              mesures qui ne sont pas prévues par le code du travail.
            </p>
            <SubTitle>
              Une convention collective de branche s&apos;applique-t-elle à ma
              situation ?
            </SubTitle>
            <p>
              Pour pouvoir s&apos;appliquer à vous, la convention collective de
              branche doit être applicable à votre entreprise.
              <br />
              Lorsque votre entreprise entre dans le champ professionnel et
              géographique d&apos;une convention collective de branche, il
              existe deux situations dans lesquelles votre entreprise a
              l&apos;obligation de l&apos;appliquer :
            </p>
            <ul>
              <li>
                soit la convention collective de branche a été étendue par le
                ministère du travail rendant la convention collective
                obligatoire pour toutes les entreprises qui entrent dans son
                champ d&apos;application professionnel et géographique.
              </li>
              <li>
                soit votre entreprise est adhérente à une
                organisation patronale signataire de la convention collective.
              </li>
            </ul>
          </React.Fragment>
        )}
      </Wrapper>
    );
  };
}

const Title = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubTitle = styled.p`
  text-decoration: underline;
`;

export default ConventionExplainer;
