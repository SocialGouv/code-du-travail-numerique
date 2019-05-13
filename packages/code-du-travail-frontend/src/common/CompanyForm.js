import React from "react";
import PropTypes from "prop-types";
import { X } from "react-feather";
import styled from "styled-components";
import { Button } from "@cdt/ui";
import { CompanySuggester } from "./CompanySuggester";
import { ConventionPreview, SuggestWrapper, Title } from "./ConventionForm";

class CompanyForm extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    getCompany: PropTypes.func.isRequired
  };

  state = {
    company: null
  };

  onSelect = async company => {
    this.setState({ company });
    const fullCompany = await this.props.getCompany(company.siret);
    this.setState({ company: fullCompany });
  };

  onClear = () => this.setState({ company: null });

  render() {
    const { company } = this.state;
    return (
      <form>
        <Title>Recherche par SIRET</Title>
        Saisissez le numéro de SIRET de votre entreprise afin d’obtenir votre
        convention collective&nbsp;:
        <SuggestWrapper>
          {!this.state.company ? (
            <React.Fragment>
              <CompanySuggester
                onSearch={this.props.onSearch}
                onSelect={this.onSelect}
              />
              <p style={{ fontStyle: "italic" }}>
                Vous pouvez chercher le SIRET de votre entreprise sur&nbsp;
                <a href="https://entreprise.data.gouv.fr/">
                  entreprise.data.gouv.fr
                </a>
              </p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Company onClear={this.onClear} {...company} />
            </React.Fragment>
          )}
        </SuggestWrapper>
      </form>
    );
  }
}

const Company = ({ name, idccList, onClear }) => {
  return (
    <div>
      <div>
        <b>{name}</b>
        <div>
          <Button variant="link" onClick={onClear}>
            Chercher une autre entreprise
          </Button>
          <Button variant="link" onClick={onClear}>
            {/* it does not seem to work when in the same Button */}
            <X size="16" />
          </Button>
        </div>
      </div>
      {idccList ? (
        <React.Fragment>
          <CompanyIdccListWrapper>
            Cette entreprise emploie des salariés sous
            {idccList.length == 1
              ? " une seule convention collective"
              : ` ${idccList.length} conventions collectives`}
            &nbsp;:
          </CompanyIdccListWrapper>
          <ul>
            {idccList.map(idcc => (
              <li key={idcc.num} data-testid="companyIdcc">
                <ConventionPreview idcc={idcc.num} title={idcc.titre} />
              </li>
            ))}
          </ul>
        </React.Fragment>
      ) : (
        "..."
      )}
    </div>
  );
};

const CompanyIdccListWrapper = styled.div`
  margin: 10px 0;
`;

export { CompanyForm };
