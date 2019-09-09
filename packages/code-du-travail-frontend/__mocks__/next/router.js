module.exports = {
  events: {
    on() {},
    off() {},
    trigger() {}
  },
  useRouter: () => ({
    asPath: "mock",
    route: "mock",
    pathname: "mock",
    query: {}
  }),
  push: jest.fn(),
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
