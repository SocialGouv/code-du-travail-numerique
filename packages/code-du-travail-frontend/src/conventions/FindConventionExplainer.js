import React from "react";
import { Wrapper, VerticalArrow } from "@cdt/ui";
import styled from "styled-components";

const HIDDEN_KEY = "find-convention-explainer-hidden";

class FindConventionExplainer extends React.Component {
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
          Comment trouver ma convention collective ?
          <VerticalArrow />
        </Title>
        {!hidden && (
          <React.Fragment>
            <SubTitle>Comment trouver ma convention collective ?</SubTitle>
            <ul>
              <li>
                Elle doit figurer au <b>bulletin de paie</b>, et sur une notice
                remise à l’embauche ou <b>sur le contrat de travail</b>
              </li>
              <li>
                Sur l’affichage obligatoire dans l’entreprise (avec les
                modalités de consultation en entreprise)
              </li>
            </ul>
            <SubTitle>
              Quelle est la convention collective applicable ?
            </SubTitle>
            <ul>
              <li>
                En principe celle relevant de l’activité principale dans
                l’entreprise pour les cas les plus simples.
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

export default FindConventionExplainer;
