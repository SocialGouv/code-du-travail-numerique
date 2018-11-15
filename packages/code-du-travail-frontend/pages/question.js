import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";

import Answer from "../src/search/Answer";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchQuestion = ({ slug }) =>
  fetch(`${API_URL}/items/faq/${slug}`).then(r => r.json());

class Question extends React.Component {
  static async getInitialProps({ res, query }) {
    return await fetchQuestion(query)
      .then(data => ({
        data
      }))
      .catch(e => {
        console.log("e", e);
        res.statusCode = 404;
        throw e;
      });
  }

  render() {
    const { data } = this.props;
    let author;
    switch (data._source.author) {
      case "DGT":
        author = "Informations fournies par la Direction Générale du Travail";
        break;
      default:
        author =
          "Informations fournies par vos services de renseignements des DIRECCTE en région";
    }
    return (
      <Answer
        title={data._source.title}
        emptyMessage="Cette question n'a pas été trouvée"
        html={data._source.html}
        date={data._source.date}
        sourceType="Réponse détaillée"
        footer={author}
      />
    );
  }
}

export default withRouter(Question);
