import React from "react";

import Explorer from "./Explorer";

class Toggler extends React.Component {
  state = {
    profile: "" // Can be empty, `employee` or `employer`.
  };

  reset() {
    this.setState({
      profile: ""
    });
  }

  setProfile(profile) {
    if (profile && profile === this.state.profile) {
      // Reset `profile` when the user click again on the same button.
      profile = "";
    }
    this.setState({
      profile: profile
    });
  }

  showExplorer(e) {
    return this.state.profile;
  }

  render() {
    let employeeClassName =
      this.state.profile === "employee" ? "btn" : "btn btn__secondary";
    let employerClassName =
      this.state.profile === "employer" ? "btn" : "btn btn__secondary";
    return (
      <div>
        <section className="section-light shadow-bottom">
          <div className="container center">
            <header>
              <h3>
                Choisissez un thème pour explorer les ressources du code du
                travail numérique
              </h3>
              <p>
                1604 thèmes, 10789 articles, 206 fiches pratiques, 680
                conventions, 50 réponses
              </p>
            </header>
            <p>
              <button
                className={employeeClassName}
                onClick={() => this.setProfile("employee")}
              >
                Je suis salarié
              </button>
              <span> </span>
              <button
                className={employerClassName}
                onClick={() => this.setProfile("employer")}
              >
                Je suis employeur
              </button>
            </p>
          </div>
        </section>
        {this.showExplorer() && <Explorer />}
      </div>
    );
  }
}

export default Toggler;
