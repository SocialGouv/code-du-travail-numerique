import * as Sentry from "@sentry/nextjs";
import { Button, Container, Section } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(err) {
    Sentry.captureException(err);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <CenteredContainer>
          <h1>Désolé, une erreur s’est produite…</h1>
          <p>Notre équipe technique a été informée et interviendra sous peu.</p>
          <Section>
            <Button variant="primary" as="a" href="/">
              Revenir à la page d’accueil
            </Button>
          </Section>
        </CenteredContainer>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  message: PropTypes.string,
};

ErrorBoundary.defaultProps = {
  message: "widget non disponible",
};

export { ErrorBoundary };

const CenteredContainer = styled(Container)`
  margin-top: 2em;
  text-align: center;
`;
