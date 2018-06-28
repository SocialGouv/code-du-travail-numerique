import React from "react";
import styled from "styled-components";

import Explorer from "./Explorer";


const TogglerContainer = styled.div`
  margin: 20px 20px 0 20px;
  text-align: center;
`;

class Toggler extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      profile: '',  // Can be empty, `employee` or `employer`.
    };
  }

  reset () {
    this.setState({
      isHidden: true,
      profile: '',
    });
  }

  setProfile (profile) {
    if (profile && profile === this.state.profile) {
      // Reset `profile` when the user click again on the same button.
      profile = '';
    }
    this.setState({
      profile: profile
    });
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  showExplorer (e) {
    return !this.state.isHidden && this.state.profile;
  }

  render() {
    let employeeClassName = this.state.profile === 'employee' ? 'button' : 'button secondary';
    let employerClassName = this.state.profile === 'employer' ? 'button' : 'button secondary';
    return (
      <div>
        <TogglerContainer className='panel'>
          <h3 onClick={this.toggleHidden.bind(this)}>
            {this.state.isHidden ? '► ' : '▼ '}
            <span className='title-link'>Navigation par thèmes</span>
          </h3>
          {!this.state.isHidden && <p>
            <button className={employeeClassName} onClick={() => this.setProfile('employee')}>Je suis salarié</button>
            <button className={employerClassName} onClick={() => this.setProfile('employer')}>Je suis employeur</button>
          </p>}
        </TogglerContainer>
        {this.showExplorer() && <Explorer />}
      </div>
    );
  }

}

export default Toggler;
