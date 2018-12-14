import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";

import Answer from "../src/common/Answer";
import { DownloadFile } from "../src/common/DownloadFile";
import ModeleCourrierIcon from "../src/icons/ModeleCourrierIcon";
import { AsideTitle, Section } from "@cdt/ui";
import styled from "styled-components";
import ArticleIcon from "../src/icons/ArticleIcon";
import { BigLink } from "../src/common/BigLink";
import ReponseIcon from "../src/icons/ReponseIcon";

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
    const { query } = this.props.router;

    const {
      modeles_de_courriers = [],
      code_du_travail = [],
      faq = []
    } = data.relatedItems;

    let author;
    switch (data._source.author) {
      case "DGT":
        author = "Informations fournies par la Direction Générale du Travail";
        break;
      default:
        author =
          "Informations fournies par vos services de renseignements des DIRECCTE en région";
    }

    const additionalContent = (
      <React.Fragment>
        <MoreLinks
          title="Articles de loi correspondants"
          icon={ArticleIcon}
          query={query.q}
          items={code_du_travail}
        >
          <div className="wrapper-narrow">
            <DisclaimerContent>
              Pensez à vérifier votre accord d’entreprise : S’il prévoit des «
              garanties au moins équivalentes » à ce sujet, ces clauses
              s’appliquent dans votre cas -
              <a href="#" title="consulter la hierachie des normes">
                En savoir plus
              </a>
            </DisclaimerContent>
          </div>
        </MoreLinks>
        <MoreLinks
          title="Pour aller plus loin"
          icon={ReponseIcon}
          query={query.q}
          items={faq}
        />
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <Answer
          title={data._source.title}
          emptyMessage="Cette question n'a pas été trouvée"
          html={data._source.html}
          date={data._source.date}
          sourceType="Réponse détaillée"
          footer={author}
          additionalContent={additionalContent}
        >
          {modeles_de_courriers.length > 0 && (
            <React.Fragment>
              <AsideTitle>Télécharger le modèle</AsideTitle>
              <DownloadFile
                title={modeles_de_courriers[0]._source.title}
                file={`${API_URL}/docs/${
                  modeles_de_courriers[0]._source.filename
                }`}
                type="Modèle de document"
                icon={ModeleCourrierIcon}
              />
            </React.Fragment>
          )}
        </Answer>
      </React.Fragment>
    );
  }
}

export default withRouter(Question);

function MoreLinks({ items, icon, query, title, children }) {
  if (items.length === 0) {
    return null;
  }
  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      {children}
      <List>
        {items.map(item => (
          <ListItem key={item._id}>
            <BigLink data={item} icon={icon} query={query} />
          </ListItem>
        ))}
      </List>
    </Section>
  );
}

const SectionTitle = styled.h2`
  text-align: center;
  font-weight: 700;
`;

const DisclaimerContent = styled.div`
  color: #53657d;
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 20px 130px 20px 100px;
`;
const ListItem = styled.li`
  margin: 0;
`;
