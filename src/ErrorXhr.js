import React from 'react'
import styled from 'styled-components'


const ErrorXhrContainer = styled.div`margin-top: 20px;`

class ErrorXhr extends React.Component {
  render() {
    const error = this.props.error;
    return (<ErrorXhrContainer className="notification error">
      <p>{error}</p>
    </ErrorXhrContainer>)
  }
}

export default ErrorXhr
