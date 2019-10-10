import React from "react";
import { Container, Section, Wrapper } from "@socialgouv/react-ui";
import styled from "styled-components";

import { ErrorBoundary } from "../common/ErrorBoundary";

class SimulateurEmbauche extends React.PureComponent {
  simRef = React.createRef();

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://embauche.beta.gouv.fr/dist/simulateur.js";
    script.async = true;
    script.dataset.couleur = "#2975D1";
    script.id = "script-simulateur-embauche";

    if (this.simRef.current) {
      this.simRef.current.appendChild(script);
    }
  }

  render() {
    return (
      <Section>
        <Container>
          <Wrapper>
            <Title>Simulateur d’embauche</Title>
            <ErrorBoundary>
              <div ref={this.simRef} />;
            </ErrorBoundary>
          </Wrapper>
        </Container>
      </Section>
    );
  }
}
const Title = styled.h2`
  text-align: center;
`;
export { SimulateurEmbauche };
