import React from "react";
import { UID } from "react-uid";

import servicesDeRenseignement from "../data/services-de-renseignement.json";

function DepartmentComponent(data) {
  return (
    <p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={data.url}
        className="external-link__after"
      >
        <mark>{data.url}</mark>
      </a>
    </p>
  );
}

class ServiceRenseignement extends React.Component {
  state = {
    departmentData: null
  };

  inputRef = React.createRef();

  onDepartmentInput = e => {
    let departmentNum = (e.target.value || "").toLowerCase();
    let departmentData = servicesDeRenseignement[departmentNum];
    this.setState({
      departmentData: departmentData
    });
  };

  render() {
    let department = this.state.departmentData
      ? DepartmentComponent(this.state.departmentData)
      : null;

    return (
      <React.Fragment>
        <h2>Trouver votre service de renseignement</h2>
        <p>
          <UID name={id => `id_${id}`}>
            {id => (
              <React.Fragment>
                <label htmlFor={id}>
                  Saisissez votre numéro de département :
                </label>
                <input
                  id={id}
                  ref={this.inputRef}
                  type="text"
                  maxLength="3"
                  className="full-width"
                  onChange={this.onDepartmentInput}
                />
              </React.Fragment>
            )}
          </UID>
        </p>
        {department}
      </React.Fragment>
    );
  }
}

export { ServiceRenseignement };
