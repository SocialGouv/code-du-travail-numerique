import React from "react";
import Link from "next/link";

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <div>
        <p className="center" style={{ padding: "20% 0", fontSize: "2em" }}>
          {this.props.statusCode
            ? `Une erreur ${this.props.statusCode} est apparue sur le serveur`
            : "Une erreur est apparue sur le client"}
          <br />
          <br />
          <br />
          <Link href="/">Retour à la page d'accueil</Link>
        </p>
      </div>
    );
  }
}
