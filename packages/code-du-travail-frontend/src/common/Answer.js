import React from "react";
import Head from "next/head";
import { Alert, Article, Button, Container, theme } from "@cdt/ui";
import styled from "styled-components";
import { withRouter } from "next/router";
import ReactPiwik from "react-piwik";

import { Link } from "../../routes";
import ReferencesJuridiques from "../ReferencesJuridiques";
import Disclaimer from "../common/Disclaimer";
import Html from "../common/Html";
import Search from "../search/Search";
import { FeedbackModal } from "../common/FeedbackModal";

const { spacing } = theme;

const BigError = ({ children }) => (
  <Container style={{ fontSize: "2em", textAlign: "center", margin: "20%" }}>
    <Alert warning>{children}</Alert>
  </Container>
);

const BackToResultsLink = ({ query }) => {
  if (!query.q) return null;

  return (
    <BacklinkWrapper>
      <Link route="recherche" params={{ ...query }}>
        <a>{"< Retour aux résultats"}</a>
      </Link>
    </BacklinkWrapper>
  );
};

class Answer extends React.Component {
  state = {
    modalVisible: false,
    searchResults: []
  };

  onValidate = () => {
    ReactPiwik.push([
      "trackEvent",
      "feedback",
      "thumb up",
      this.props.router.asPath,
      this.props.router.query.q
    ]);
  };
  showModal = () => {
    ReactPiwik.push([
      "trackEvent",
      "feedback",
      "thumb down",
      this.props.router.asPath,
      this.props.router.query.q
    ]);
    this.setState({ modalVisible: true });
  };
  closeModal = () => {
    this.setState({ modalVisible: false });
  };
  setResults = searchResults => {
    this.setState({ searchResults });
  };
  render() {
    const {
      router,
      title,
      intro = null,
      html = null,
      children = null,
      footer,
      date,
      icon,
      sourceType,
      additionalContent,
      referencesJuridiques = [],
      emptyMessage = "Aucun résultat"
    } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>{title}</title>
        </Head>
        <Search />
        <BackToResultsLink query={router.query} />
        {!html && !children && <BigError>{emptyMessage}</BigError>}
        {(html || children) && (
          <React.Fragment>
            <FeedbackModal
              results={this.state.searchResults}
              isOpen={this.state.modalVisible}
              closeModal={this.closeModal}
              query={router.query.q || title}
              source={router.query.source}
              url={router.asPath}
            />
            <Article
              title={title}
              onValidate={this.onValidate}
              onInvalidate={this.showModal}
              icon={icon}
              date={date}
              sourceType={sourceType}
            >
              <Disclaimer />
              {intro}
              {html && <Html>{html}</Html>}
              {children}
              <div
                style={{
                  background: "var(--color-light-background)",
                  padding: 10,
                  marginTop: 50
                }}
              >
                {footer}
              </div>
            </Article>
          </React.Fragment>
        )}
        {additionalContent}
        {referencesJuridiques.length > 0 && (
          <ReferencesJuridiques references={referencesJuridiques} />
        )}
        <Button onClick={this.showModal}>Posez votre question</Button>
      </React.Fragment>
    );
  }
}

export default withRouter(Answer);

const BacklinkWrapper = styled(Container)`
  margin-top: ${spacing.base};
`;
