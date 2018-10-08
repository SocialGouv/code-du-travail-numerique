import React from "react";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";

import Answer from "../src/search/Answer";

// a FAQ answer

const fetchQuestion = ({ slug }) =>
  fetch(`${process.env.API_URL}/items/faq/${slug}`)
    .then(r => r.json())
    .then(data => ({
      data
    }))
    .catch(e => {
      console.log("e", e);
      res.statusCode = 404;
      throw e;
    });

class Question extends React.Component {
  static async getInitialProps({ res, query }) {
    return await fetchQuestion(query);
  }

  render() {
    const { data } = this.props;
    return (
      <Answer
        title={data._source.title}
        emptyMessage="Cette question n'a pas été trouvée"
        html={data._source.html}
        footer="Informations fournies par vos services de renseignements des DIRECCTE en région"
      />
    );
  }
}

export default withRouter(Question);
