"use client";
import React from "react";

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
      !this.simRef.current?.querySelector("#simulateurEmbauche")
    ) {
      this.setState({ error: "empty child", simulator: "error" });
    }
  };

  componentDidMount() {
    const script = document.createElement("script");
    script.src =
      "https://mon-entreprise.urssaf.fr/simulateur-iframe-integration.js";
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
      <>
        {simulator === "loading" && <p>Chargement de l’outil</p>}
        {simulator === "error" ? (
          <>
            <p>Le simulateur d’embauche n’est pas disponible actuellement.</p>
            <p>
              Retrouvez les autres simulateurs autour du thème de l’entreprise,
              sur le site:{" "}
              <a
                title="Voir les simulateurs"
                rel="noopener noreferrer"
                href="https://mon-entreprise.urssaf.fr/"
              >
                https://mon-entreprise.urssaf.fr/
              </a>
            </p>
          </>
        ) : (
          <div ref={this.simRef} />
        )}
      </>
    );
  }
}

export { SimulateurEmbauche };
