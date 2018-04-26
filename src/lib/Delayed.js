import React from "react";

class Delayed extends React.Component {
  state = {
    ready: false
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        ready: true
      });
    }, this.props.delay || 100);
  }

  render() {
    return (
      <div className={`FadeDelay-ready-${this.state.ready}`}>
        {this.props.children}
      </div>
    );
  }
}

export default Delayed;
