import React from "react";
import tools from "@cdt/data...tools";

import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";

import { CalculateurIndemnite } from "../../src/outils/IndemniteLicenciement";
import { DureePreavisLicenciement } from "../../src/outils/DureePreavisLicenciement";
import { SimulateurEmbauche } from "../../src/outils/SimulateurEmbauche";
import { SimulateurIndemnitePrecarite } from "../../src/outils/IndemnitePrecarite";
import { DureePreavisDemission } from "../../src/outils/DureePreavisDemission";

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
  const { slug, q: searchTerm } = query;
  const { description, title } = tools.find(tool => tool.slug === slug);
  return {
    description,
    title,
    searchTerm,
    Simulator: outilsBySlug[slug]
  };
};
