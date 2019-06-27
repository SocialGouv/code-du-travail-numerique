module.exports = {
  events: {
    on() {},
    off() {},
    trigger() {}
  },
  withRouter: component => {
    component.defaultProps = {
      ...component.defaultProps,
      router: {
        asPath: "mock",
        route: "mock",
        pathname: "mock",
        query: {}
      }
    };
    return component;
  }
};
