import React from "react";
import { UID } from "react-uid";
import styled from "styled-components";
import { Heading, Input, theme } from "@socialgouv/react-ui";

import servicesDeRenseignement from "../data/services-de-renseignement.json";

function DepartmentComponent(data) {
  return (
    <p>
      <a target="_blank" rel="noopener noreferrer" href={data.url}>
        {data.url}
      </a>
    </p>
  );
}

class ServiceRenseignement extends React.Component {
  state = {
    departmentData: null
  };

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
        <Heading as="h4">Contact téléphonique</Heading>
        <NumberInsert href="tel:+0033806000126">
          <Number>0 806 000 126</Number>
          <Pricing>
            Service gratuit <span>+ prix appel</span>
          </Pricing>
        </NumberInsert>

        <Heading as="h4">Contact par email et prise de rendez-vous</Heading>
        <p>
          <UID name={id => `id_${id}`}>
            {id => (
              <>
                <label htmlFor={id}>
                  Saisissez votre numéro de département&nbsp;:
                </label>
                <StyledInput
                  id={id}
                  type="text"
                  name="search-service"
                  autoComplete="off"
                  maxLength="3"
                  placeholder="ex. 31, 35, 75"
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
            <li>{"la constitution des dossiers prud'homaux"}</li>
            <li>{"les calculs de droit au chômage"}</li>
            <li>{"vous renseigner sur les cotisations sociales"}</li>
          </ul>
        </Small>
      </>
    );
  }
}

export { ServiceRenseignement };

const { box, breakpoints, fonts, spacings } = theme;

const NumberInsert = styled.a`
  display: inline-flex;
  margin: ${spacings.base} 0 ${spacings.large};
  padding-right: ${spacings.small};
  font-weight: bold;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  line-height: 1.3;
  text-decoration: none;
  background-color: ${({ theme }) => theme.white};
  border: ${({ theme }) => box.border(theme.placeholder)};
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    padding-right: 0;
  }
`;

const Number = styled.strong`
  padding: 0 ${spacings.small};
  color: ${({ theme }) => theme.placeholder};
  font-size: ${fonts.sizes.headings.medium};
  text-align: center;
`;

const Pricing = styled.em`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: -3px 0 -3px 0;
  padding: 0 ${spacings.small} 0 ${spacings.medium};
  color: ${({ theme }) => theme.white};
  font-size: ${fonts.sizes.default};
  font-style: normal;
  background-color: ${({ theme }) => theme.placeholder};
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: row;
    margin: 0;
    padding: 0 ${spacings.small} 0 ${spacings.base};
    font-size: ${fonts.sizes.tiny};
    line-height: 1.8;
  }
  &:before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 0;
    height: 0;
    border-color: transparent transparent transparent
      ${({ theme }) => theme.white};
    border-style: solid;
    border-width: 10px 0 10px 10px;
    transform: translateY(-50%);
    content: "";
    @media (max-width: ${breakpoints.mobile}) {
      display: none;
    }
  }
  &:after {
    position: absolute;
    top: 0;
    left: 0.9rem;
    display: none;
    width: 0;
    height: 0;
    border-color: ${({ theme }) => theme.white} transparent transparent
      transparent;
    border-style: solid;
    border-width: 8px 8px 0 8px;
    content: "";
    @media (max-width: ${breakpoints.mobile}) {
      display: block;
    }
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
  margin-top: ${spacings.small};
`;

const Small = styled.small`
  display: block;
  margin-top: ${spacings.medium};
`;
