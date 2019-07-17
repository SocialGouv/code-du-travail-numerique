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
          Plus d’informations sur les conventions collectives
          <VerticalArrow />
        </Title>
        {!hidden && (
          <React.Fragment>
            <SubTitle>
              Qu’est ce qu’une convention collective ?
            </SubTitle>
            <p>
              Une convention collective est un accord négocié entre des
              organisations syndicales de salariés et des organisations
              d’employeurs.
              <br />
              Elle permet d’aménager les règles issues du code du travail
              concernant les conditions d’emploi, la formation
              professionnelle, le travail des salariés et les garanties
              sociales aux spécificités des secteurs d’activité et
              géographiques concernés. Elle peut également prévoir d’autres
              mesures qui ne sont pas prévues par le code du travail.
            </p>
            <SubTitle>
              Une convention collective de branche s’applique-t-elle à ma
              situation ?
            </SubTitle>
            <p>
              Pour pouvoir s’appliquer à vous, la convention collective de
              branche doit être applicable à votre entreprise.
              <br />
              L’employeur a l’obligation d’appliquer la convention collective
              lorsque l’entreprise entre dans le champ d’application professionnel
              et géographie défini par la convention et que :
            </p>
            <ul>
              <li>
                La convention collective de branche a été étendue par le ministère du travail.
              </li>
              <li>
                L’entreprise est adhérente à une organisation patronale signataire
                de la convention collective.
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
