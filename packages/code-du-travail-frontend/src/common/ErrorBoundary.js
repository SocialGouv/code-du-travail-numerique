import * as Sentry from "@sentry/nextjs";
import PropTypes from "prop-types";
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static propTypes = {
    message: PropTypes.string,
  };

  static defaultProps = {
    message: "widget non disponible",
  };

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

export { ErrorBoundary };
