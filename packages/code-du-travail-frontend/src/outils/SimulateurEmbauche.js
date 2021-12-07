import { Alert, Section, Title, Wrapper } from "@socialgouv/cdtn-ui";
import React from "react";
import Spinner from "react-svg-spinner";

class SimulateurEmbauche extends React.PureComponent {
  simRef = React.createRef();
  state = {
    simulator: "loading",
  };

  onError = (error) => {
    this.setState({ error, simulator: "error" });
  };

  onLoad = () => {
    this.setState({ simulator: "success" });
    if (
      !this.simRef.current ||
      !this.simRef.current.querySelector("#simulateurEmbauche")
    ) {
      this.setState({ error: "empty child", simulator: "error" });
    }
  };

  componentDidMount() {
    const script = document.createElement("script");
    script.src =
      "https://mon-entreprise.urssaf.fr/simulateur-iframe-integration.js";
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
      <Wrapper variant="main">
        <Title>Salaire brut/net</Title>
        <Alert>
          Pour information, l’estimation du salaire net après impôt est basée
          sur la situation d’une personne célibataire sans enfants ni
          patrimoine.
        </Alert>
        {simulator === "loading" && (
          <p>
            <Spinner /> Chargement de l’outil
          </p>
        )}
        {simulator === "error" ? (
          <p>
            Le simulateur d’embauche n’est pas disponible actuellement.
            <br />
            Retrouvez les autres simulateurs autour du thème de l’entreprise,
            sur le site:{" "}
            <a
              title="Voir les simulateurs"
              href="https://mon-entreprise.urssaf.fr/"
            >
              https://mon-entreprise.urssaf.fr/
            </a>
          </p>
        ) : (
          <Section>
            <div ref={this.simRef} />
          </Section>
        )}
      </Wrapper>
    );
  }
}

export { SimulateurEmbauche };
