import React from "react";
import PropTypes from "prop-types";

class AsyncFetch extends React.Component {
  state = {
    status: "idle",
    result: null
  };

  mounted = false;

  componentDidMount() {
    this.mounted = true;
    if (this.props.autoFetch) {
      this.fetch();
    }
  }
  // warning @lionelb
  // passing and arrow function in render
  // might turn this test useless
  componentDidUpdate(prevProps) {
    if (this.props.fetch !== prevProps.fetch) {
      this.fetch();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  fetch = args => {
    this.setState(
      {
        status: "loading"
      },
      () => {
        this.props
          .fetch(args)
          .then(result => {
            this.mounted &&
              this.setState({
                status: "success",
                result
              });
          })
          .catch(e => {
            this.mounted &&
              this.setState({
                status: "error",
                result: e.message
              });
          });
      }
    );
  };

  clear = () => {
    this.setState({
      result: null
    });
  };

  render() {
    return this.props.render({
      ...this.state,
      fetch: this.fetch,
      clear: this.clear
    });
  }
}

AsyncFetch.propTypes = {
  autoFetch: PropTypes.bool,
  // the fetch call function
  fetch: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired
};

AsyncFetch.defaultProps = {
  autoFetch: false
};

export default AsyncFetch;
