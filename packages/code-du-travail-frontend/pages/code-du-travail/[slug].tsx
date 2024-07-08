import { getLabelBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { Breadcrumb, LaborCodeArticle } from "@socialgouv/cdtn-types";
import { Alert } from "@socialgouv/cdtn-ui";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import React from "react";

import Answer from "../../src/common/Answer";
import Html from "../../src/common/Html";
import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import { replaceArticlesRefs } from "../../src/lib/replaceArticlesRefs";
import { getBySourceAndSlugItems } from "../../src/api";

interface Props {
  breadcrumbs: Breadcrumb[];
  dateDebut: string;
  description: string;
  title: string;
  url: string;
  html;
  notaHtml;
  referencedTexts;
  relatedItems: Array<any>;
}

function Fiche(props: Props): JSX.Element {
  const { title, description, dateDebut, html, url, notaHtml, relatedItems } =
    props;

  const fixedHtml = replaceArticlesRefs("https://legifrance.gouv.fr", html);
  return (
    <Layout>
      <Metas title={title} description={description} />
      <Answer
        suptitle={getLabelBySource(SOURCES.CDT)}
        title={title}
        relatedItems={relatedItems}
        date={
          dateDebut &&
          format(new Date(dateDebut), "dd/MM/yyyy", {
            locale: frLocale,
          })
        }
        emptyMessage="Article introuvable"
        html={fixedHtml}
        source={{ name: "Code du travail", url }}
      >
        {notaHtml && (
          <Alert>
            <strong>NOTA</strong>
            <Html>{notaHtml}</Html>
          </Alert>
        )}
      </Answer>
    </Layout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const data = await getBySourceAndSlugItems<LaborCodeArticle>(
    "code_du_travail",
    query.slug
  );
  return { props: { relatedItems: data.relatedItems, ...data._source } };
};

export default Fiche;
