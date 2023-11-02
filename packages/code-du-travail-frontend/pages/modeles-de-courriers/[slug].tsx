import React from "react";
import { Badge } from "@socialgouv/cdtn-ui";

import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import { handleError } from "../../src/lib/fetch-error";
import { SITE_URL } from "../../src/config";
import { LetterModel, LetterModelProps, getTitle } from "../../src/modeles";
import Answer from "../../src/common/Answer";
import EventTracker from "../../src/lib/tracking/EventTracker";

const fetchCourrier = ({ slug }) =>
  fetch(`${SITE_URL}/api/items/modeles_de_courriers/${slug}`);

function ModeleCourrier(props: LetterModelProps): JSX.Element {
  const {
    description = "",
    metaDescription,
    title,
    meta_title,
    type,
    relatedItems,
    date,
    breadcrumbs,
    slug,
  } = props;
  const category = `Modèle ${
    type !== "fichier" ? `de ${type}` : "à télécharger"
  }`;
  return (
    <Layout>
      <Metas
        title={`${category} :  ${meta_title ?? title}`}
        description={
          metaDescription ||
          description.slice(0, description.indexOf(" ", 150)) + "…"
        }
      />
      <Answer
        title={getTitle(slug, title)}
        relatedItems={relatedItems}
        emptyMessage="Modèle de document introuvable"
        intro={description}
        metaDescription={metaDescription}
        date={date}
        breadcrumbs={breadcrumbs}
      >
        <Badge />
        <LetterModel {...props}></LetterModel>
      </Answer>
      <EventTracker />
    </Layout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const response = await fetchCourrier(query);
  if (!response.ok) {
    return handleError(response);
  }

  const data = await response.json();
  return {
    props: {
      relatedItems: data.relatedItems,
      ...data._source,
      slug: query.slug,
    },
  };
};
export default ModeleCourrier;
