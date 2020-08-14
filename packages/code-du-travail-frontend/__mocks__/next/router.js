const route = jest.fn();
const router = {
  asPath: "mock",
  pathname: "mock",
  push: jest.fn((path) => {
    route(path);
    return Promise.resolve();
  }),
  query: { q: "" },
  route,
};

module.exports = {
  events: {
    off() {},
    on() {},
    trigger() {},
  },
  mocked: true,
  router,
  useRouter: () => router,
  withRouter: (component) => {
    component.defaultProps = {
      ...component.defaultProps,
      router,
    };
    return component;
  },
};
