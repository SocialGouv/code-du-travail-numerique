import React from "react";
import { Container, Section, Title, Wrapper } from "@socialgouv/react-ui";
import Spinner from "react-svg-spinner";

class SimulateurEmbauche extends React.PureComponent {
  simRef = React.createRef();
  state = {
    simulator: "error"
  };

  onError = error => {
    this.setState({ simulator: "error", error });
  };

  onLoad = () => {
    this.setState({ simulator: "success" });
    if (this.simRef.current.children.length === 0) {
      this.setState({ simulator: "error", error: "empty child" });
    }
  };

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://embauche.beta.gouv.fr/dist/simulateur.js";
    script.async = true;
    script.dataset.couleur = "#2975D1";
    script.id = "script-simulateur-embauche";
    script.onload = this.onLoad;
    script.onerror = this.onError;

    if (this.simRef.current) {
      this.simRef.current.appendChild(script);
    }
  }

  render() {
    const { simulator } = this.state;
    return (
      <Section>
        <Container>
          <Wrapper>
            <Title>Simulateur d’embauche</Title>
            {simulator === "loading" && (
              <p>
                <Spinner /> Chargement de l’outil
              </p>
            )}
            {simulator === "error" ? (
              <p>
                Le simulateur d’embauche n’est pas disponible actuellement.
                <br />
                Retrouvez les autres simulateurs autour du thème de
                l’entreprise, sur le site:{" "}
                <a
                  title="Voir les simulateurs"
                  href="https://mon-entreprise.fr/"
                >
                  https://mon-entreprise.fr/
                </a>
              </p>
            ) : (
              <div ref={this.simRef} />
            )}
          </Wrapper>
        </Container>
      </Section>
    );
  }
}
export { SimulateurEmbauche };
