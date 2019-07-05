import React from "react";
import ErrorPage from "../../pages/_error";

export default Component => {
  return class WithError extends React.Component {
    static async getInitialProps(ctx) {
      const props =
        (Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : null) || {};
      if (props.statusCode && ctx.res) {
        ctx.res.statusCode = props.statusCode;
      }
      return props;
    }
    render() {
      if (this.props.statusCode) {
        return <ErrorPage statusCode={this.props.statusCode} />;
      }
      return <Component {...this.props} />;
    }
  };
};
