import React from "react";
import getConfig from "next/config";
import { Section } from "@cdt/ui-old";
import fetch from "isomorphic-unfetch";

import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import Themes from "../../src/common/Themes";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const ThemesPage = ({ pageUrl, ogImage, children = [] }) => (
  <Layout>
    <Metas
      url={pageUrl}
      title={`Thèmes - Code du travail numérique`}
      description={`Explorez les contenus autour des thèmes`}
      image={ogImage}
    />
    <Section variant="white">
      <Themes isRoot={true} themes={children} />
    </Section>
  </Layout>
);

ThemesPage.getInitialProps = async () => {
  const response = await fetch(`${API_URL}/themes`);
  if (!response.ok) {
    return { statusCode: response.status };
  }
  const { children } = await response.json();
  return { children };
};

export default ThemesPage;
