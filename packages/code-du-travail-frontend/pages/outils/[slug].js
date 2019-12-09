import React from "react";
import getConfig from "next/config";
import { getRouteBySource, SOURCES } from "@cdt/sources";

import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";

import { CalculateurIndemnite } from "../../src/outils/IndemniteLicenciement";
import { DureePreavisLicenciement } from "../../src/outils/DureePreavisLicenciement";
import { SimulateurEmbauche } from "../../src/outils/SimulateurEmbauche";
import { SimulateurIndemnitePrecarite } from "../../src/outils/IndemnitePrecarite";
import { DureePreavisDemission } from "../../src/outils/DureePreavisDemission";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const outilsBySlug = {
  "indemnite-licenciement": CalculateurIndemnite,
  "preavis-licenciement": DureePreavisLicenciement,
  "simulateur-embauche": SimulateurEmbauche,
  "indemnite-precarite": SimulateurIndemnitePrecarite,
  "preavis-demission": DureePreavisDemission
};

class Outils extends React.Component {
  render() {
    const {
      description,
      ogImage,
      pageUrl,
      searchTerm,
      Simulator,
      title
    } = this.props;
    return (
      <Layout>
        <Metas
          url={pageUrl}
          title={title}
          description={description}
          image={ogImage}
        />
        <Simulator q={searchTerm} title={title} />
      </Layout>
    );
  }
}

export default Outils;

Outils.getInitialProps = async ({ query }) => {
  // we don't request data from api since outils are client side only
  const { slug, q: searchTerm } = query;
  const toolResponse = await fetch(
    `${API_URL}/items/${getRouteBySource(SOURCES.TOOLS)}/${slug}`
  );
  if (!toolResponse.ok) {
    return { statusCode: toolResponse.status };
  }
  const {
    _source: { title, description }
  } = await toolResponse.json();

  // const tools = toolHits.map(({ _source }) => _source);
  return {
    description,
    title,
    searchTerm,
    Simulator: outilsBySlug[slug]
  };
};
