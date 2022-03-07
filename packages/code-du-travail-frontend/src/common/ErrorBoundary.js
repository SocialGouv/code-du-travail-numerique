import * as Sentry from "@sentry/nextjs";
import PropTypes from "prop-types";
import React from "react";

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
      return <i>{this.props.message}</i>;
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
