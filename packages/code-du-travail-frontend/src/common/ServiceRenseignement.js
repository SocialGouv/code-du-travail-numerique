import React from "react";
import { UID } from "react-uid";
import styled from "styled-components";
import { theme } from "@socialgouv/react-ui";

import servicesDeRenseignement from "../data/services-de-renseignement.json";

function DepartmentComponent(data) {
  return (
    <p>
      <a target="_blank" rel="noopener noreferrer" href={data.url}>
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
        <NumberInsertWrapper>
          <NumberInsert href="tel:+0033806000126">
            <Number>0 806 000 126</Number>
            <Pricing>Service gratuit + prix appel</Pricing>
          </NumberInsert>
        </NumberInsertWrapper>

        <h4>
          Trouver les coordonnées du service de renseignement de mon département
        </h4>
        <p>
          <UID name={id => `id_${id}`}>
            {id => (
              <>
                <label htmlFor={id}>
                  Saisissez votre numéro de département :
                </label>
                <Input
                  id={id}
                  ref={this.inputRef}
                  type="text"
                  maxLength="3"
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
                "le règlement des litiges, et la constitution des dossiers prud'homaux"
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

const { breakpoints, colors, fonts, spacing } = theme;

const NumberInsertWrapper = styled.div`
  @media (max-width: ${breakpoints.tablet}) {
    text-align: center;
  }
`;

const NumberInsert = styled.a`
  display: inline-flex;
  margin: ${spacing.base} 0 ${spacing.large};
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  background-color: ${colors.white};
  border: 1px solid ${colors.blueDark};
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const Number = styled.strong`
  padding: 0 ${spacing.base};
  color: ${colors.blueDark};
  font-size: 2rem;
`;

const Pricing = styled.em`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${spacing.base} 0 ${spacing.medium};
  color: ${colors.white};
  font-size: ${fonts.sizeBase};
  font-style: normal;
  background-color: ${colors.blueDark};
  @media (max-width: ${breakpoints.tablet}) {
    padding: ${spacing.small};
  }
  &::before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 0;
    height: 0;
    border-color: transparent transparent transparent ${colors.white};
    border-style: solid;
    border-width: 10px 0 10px 10px;
    transform: translateY(-50%);
    content: "";
    @media (max-width: ${breakpoints.tablet}) {
      display: none;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  margin-top: ${spacing.small};
`;

const Small = styled.small`
  display: block;
  margin-top: ${spacing.interComponent};
  color: ${colors.darkGrey};
`;
