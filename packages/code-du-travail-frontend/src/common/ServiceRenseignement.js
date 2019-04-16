import React from "react";
import { UID } from "react-uid";
import styled from "styled-components";
import { theme } from "@cdt/ui";

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
    const departmentNum = (e.target.value || "").toLowerCase();
    const departmentData = servicesDeRenseignement[departmentNum];
    this.setState({
      departmentData: departmentData
    });
  };

  render() {
    const department = this.state.departmentData
      ? DepartmentComponent(this.state.departmentData)
      : null;

    return (
      <>
        <h4>Contacter les services de renseignement par téléphone</h4>
        <NumberInsert href="tel:+0033806000126">
          <strong>0 806 000 126</strong>
          <em>Service gratuit + prix appel</em>
        </NumberInsert>
        <h4>
          Trouver les coordonnées du service de renseignements de mon
          département
        </h4>
        <p>
          <UID name={id => `id_${id}`}>
            {id => (
              <>
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
              </>
            )}
          </UID>
        </p>
        {department}
        <Small>
          Attention, ces services délivrent une information juridique, ils ne
          sont pas compétents pour :
          <ul>
            <li>{"les demandes d'intervention en entreprise"}</li>
            <li>
              {
                "le règlement des litiges, et la consitution des dossiers prud'homaux"
              }
            </li>
            <li>{"les calculs de droit au chômage"}</li>
            <li>{"vous renseigner sur les cotisations sociales"}</li>
          </ul>
        </Small>
      </>
    );
  }
}

export { ServiceRenseignement };

const { colors, fonts, spacing } = theme;

const NumberInsert = styled.a`
  display: inline-flex;
  margin: ${spacing.base} 0 ${spacing.large};
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  background-color: ${colors.white};
  border: 1px solid ${colors.blueDark};
  strong {
    padding: 0 ${spacing.base};
    color: ${colors.blueDark};
    font-size: 2rem;
  }
  em {
    position: relative;
    padding: 0 ${spacing.base} 0 ${spacing.medium};
    display: flex;
    align-items: center;
    color: ${colors.white};
    font-style: normal;
    font-size: ${fonts.sizeBase};
    background-color: ${colors.blueDark};
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -10px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 0 10px 10px;
      border-color: transparent transparent transparent ${colors.white};
    }
  }
`;

const Small = styled.small`
  display: block;
  margin-top: ${spacing.interComponent};
  color: ${colors.darkGrey};
`;
