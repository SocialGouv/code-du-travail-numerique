import React from "react";

import Explorer from "./Explorer";

class Toggler extends React.Component {
  state = {
    isHidden: true,
    profile: "" // Can be empty, `employee` or `employer`.
  };

  reset() {
    this.setState({
      isHidden: true,
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

  toggleHidden() {
    this.setState(curState => ({
      isHidden: !curState.isHidden
    }));
  }

  showExplorer(e) {
    return !this.state.isHidden && this.state.profile;
  }

  render() {
    let employeeClassName =
      this.state.profile === "employee" ? "btn" : "btn btn-secondary";
    let employerClassName =
      this.state.profile === "employer" ? "btn" : "btn btn-secondary";
    return (
      <div>
        <div className="section-light">
          <div className="container center">
            <h3 onClick={this.toggleHidden.bind(this)}>
              {this.state.isHidden ? "► " : "▼ "}
              <span className="title-link">Navigation par thèmes</span>
            </h3>
            {!this.state.isHidden && (
              <p>
                <button
                  className={employeeClassName}
                  onClick={() => this.setProfile("employee")}
                >
                  Je suis salarié
                </button>
                 
                <button
                  className={employerClassName}
                  onClick={() => this.setProfile("employer")}
                >
                  Je suis employeur
                </button>
              </p>
            )}
          </div>
        </div>
        {this.showExplorer() && <Explorer />}
      </div>
    );
  }
}

export default Toggler;
