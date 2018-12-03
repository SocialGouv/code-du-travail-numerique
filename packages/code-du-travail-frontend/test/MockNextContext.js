// https://github.com/zeit/next.js/issues/5205#issuecomment-422846339

import React from "react";
import PropTypes from "prop-types";
export default class MockNextContext extends React.Component {
  static propTypes = {
    headManager: PropTypes.object,
    router: PropTypes.object
  };

  static childContextTypes = {
    headManager: PropTypes.object,
    router: PropTypes.object
  };

  getChildContext() {
    const { headManager, router } = this.props;
    return {
      headManager: {
        updateHead() {},
        ...headManager
      },
      router: {
        asPath: "/",
        route: "/",
        pathname: "/",
        query: {},
        // TODO: Properly mock the following methods
        back() {},
        beforePopState() {},
        prefetch() {},
        push() {},
        reload() {},
        replace() {},
        events: {
          // TODO: Implement EventEmitter
          on() {},
          off() {},
          trigger() {}
        },
        ...router
      }
    };
  }

  render() {
    return this.props.children;
  }
}
