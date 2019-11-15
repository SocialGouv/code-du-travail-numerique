const route = jest.fn();
const router = {
  asPath: "mock",
  route,
  pathname: "mock",
  query: { q: undefined },
  push: jest.fn(path => {
    route(path);
    return Promise.resolve();
  })
};

module.exports = {
  router,
  mocked: true,
  events: {
    on() {},
    off() {},
    trigger() {}
  },
  useRouter: () => router,
  withRouter: component => {
    component.defaultProps = {
      ...component.defaultProps,
      router
    };
    return component;
  }
};
