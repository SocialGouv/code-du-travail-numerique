import React from "react";
import PropTypes from "prop-types";
import { X, Download } from "react-feather";
import styled from "styled-components";
import { Button } from "@cdt/ui";
import { IdccSuggester } from "./IdccSuggester";

export class ConventionForm extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired
  };

  state = {
    convention: null
  };

  onSelectConvention = convention => {
    this.setState({ convention: convention });
  };

  onClearConvention = () => {
    this.setState({ convention: null });
  };

  render() {
    return (
      <form>
        <h2>Convention collective</h2>
        <div>
          Saisissez l&apos;identifiant de convention collective (IDCC), le nom
          de la branche, ou le code NAF :
          <SuggestWrapper>
            {!this.state.convention ? (
              <IdccSuggester
                onSearch={this.props.onSearch}
                onSelect={this.onSelectConvention}
              />
            ) : (
              <React.Fragment>
                <ConventionPreview data={this.state.convention} />
                <Button link onClick={this.onClearConvention}>
                  <X size="16" />
                </Button>
              </React.Fragment>
            )}
          </SuggestWrapper>
          <Title>Comment trouver ma convention collective ?</Title>
          <ul>
            <li>
              Elle doit figurer au <b>bulletin de paie</b>, et sur une notice
              remise à l&apos;embauche ou <b>sur le contrat de travail</b>
            </li>
            <li>
              Sur l&apos;affichage obligatoire dans l&apos;entreprise (avec les
              modalités de consultation en entreprise)
            </li>
          </ul>
          <Title>Quelle est la convention collective applicable ?</Title>
          <ul>
            <li>
              En principe celle relevant de l&apos;activité principale dans
              l&apos;entreprise pour les cas les plus simples.
            </li>
          </ul>
        </div>
      </form>
    );
  }
}

const SuggestWrapper = styled.div`
  margin-top: 10px;
`;

const Title = styled.h3`
  color: initial;
  font-size: 1.2em;
  margin-top: 20px;
`;

const ConventionPreview = ({ data }) => {
  return (
    <a target="_blank" href={data.url} rel="noopener noreferrer">
      <Download
        alt="Télécharger la convention"
        title="Télécharger la convention"
        size="16"
        style={{ marginRight: 5 }}
      />
      {data.title}
    </a>
  );
};
ConventionPreview.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};
