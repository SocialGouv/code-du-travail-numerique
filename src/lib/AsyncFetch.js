import React from "react";

class AsyncFetch extends React.Component {
  state = {
    status: "idle",
    result: null
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = args => {
    this.setState(
      {
        status: "loading"
      },
      () => {
        this.props
          .fetch(args)
          .then(r => r.json())
          .then(result => {
            this.setState({
              status: "success",
              result
            });
          })
          .catch(e => {
            console.log("e", e);
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

export default AsyncFetch;
