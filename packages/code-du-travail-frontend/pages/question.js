import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";

import Answer from "../src/common/Answer";
import { DownloadFile } from "../src/common/DownloadFile";
import ModeleCourrierIcon from "../src/icons/ModeleCourrierIcon";
import { AsideTitle } from "@cdt/ui";

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
        res.statusCode = 404;
        throw e;
      });
  }

  render() {
    const { data } = this.props;
    const { modele_de_courriers, ...otherSource } = data.relatedItems;
    let author;
    switch (data._source.author) {
      case "DGT":
        author = "Informations fournies par la Direction Générale du Travail";
        break;
      default:
        author =
          "Informations fournies par vos services de renseignements des DIRECCTE en région";
    }

    const otherContent = getOtherContent(otherSource);

    return (
      <React.Fragment>
        <Answer
          title={data._source.title}
          emptyMessage="Cette question n'a pas été trouvée"
          html={data._source.html}
          date={data._source.date}
          sourceType="Réponse détaillée"
          footer={author}
        >
          {modele_de_courriers && (
            <React.Fragment>
              <AsideTitle>Télécharger le modèle</AsideTitle>
              <DownloadFile
                title={modele_de_courriers._source.title}
                file={`${API_URL}/docs/${modele_de_courriers._source.filename}`}
                type="Modèle de document"
                icon={ModeleCourrierIcon}
              />
            </React.Fragment>
          )}
        </Answer>
        {otherContent}
      </React.Fragment>
    );
  }
}

export default withRouter(Question);

function getOtherContent(sources) {
  return (
    <ul>
      {Object.keys(sources).map(source => {
        return <li key={source._id}>{source}</li>;
      })}
    </ul>
  );
}
