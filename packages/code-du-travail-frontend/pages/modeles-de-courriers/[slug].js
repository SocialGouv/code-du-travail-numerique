import React from "react";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import {
  Badge,
  Button,
  ScreenReaderOnly,
  Section,
  Wrapper,
  icons,
  theme,
} from "@socialgouv/react-ui";

import Html from "../../src/common/Html";
import Answer from "../../src/common/Answer";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

export async function getServerSideProps({ query: { slug } }) {
  const response = await fetch(`${API_URL}/items/modeles_de_courriers/${slug}`);
  if (!response.ok) {
    return { props: { errorCode: response.status } };
  }

  const data = await response.json();
  return { props: { data, slug } };
}

const ModeleCourrier = ({
  data: {
    _source: {
      breadcrumbs,
      date,
      description = "",
      metaDescription,
      filename,
      filesize,
      html,
      title,
    },
    errorCode,
    relatedItems,
  } = { _source: {} },
  slug,
}) => {
  const [, extension] = filename.split(/\.([a-z]{2,4})$/);
  const filesizeFormated = Math.round((filesize / 1000) * 100) / 100;
  return (
    <Layout errorCode={errorCode}>
      <Metas
        description={
          metaDescription ||
          description.slice(0, description.indexOf(" ", 150)) + "…"
        }
        pathname={`/modeles-de-courriers/${slug}`}
        title={`Modèle de document :  ${title}`}
      />
      <Answer
        title={title}
        relatedItems={relatedItems}
        intro={description}
        date={date}
        breadcrumbs={breadcrumbs}
      >
        <Badge />
        <Section>
          <LightWrapper>
            <FloatWrapper>
              <Button
                as="a"
                className="no-after"
                href={`${API_URL}/docs/${filename}`}
                narrow
                variant="primary"
              >
                <Download />
                <ScreenReaderOnly>
                  Télécharger le document ({extension} - {filesizeFormated}Ko)
                </ScreenReaderOnly>
              </Button>
            </FloatWrapper>
            <Html>{html}</Html>
          </LightWrapper>
        </Section>
        <Notice>
          Type: Modèle de document - Format: {extension} - Taille:{" "}
          {filesizeFormated}
          Ko{" "}
        </Notice>

        <Disclaimenr>
          Attention, chaque modèle de document proposé est à personnaliser selon
          votre situation et est susceptible d’évoluer suite à des changements
          de règlementation. Assurez-vous d’avoir la dernière version mise à
          jour avant toute utilisation.
        </Disclaimenr>
        <Centered>
          <Button
            as="a"
            className="no-after"
            href={`${API_URL}/docs/${filename}`}
            variant="primary"
          >
            Télécharger le modèle ({extension} - {filesizeFormated}Ko) &nbsp;
            <Download />
          </Button>
        </Centered>
      </Answer>
    </Layout>
  );
};

export default ModeleCourrier;

const { spacings, fonts } = theme;

const FloatWrapper = styled.div`
  position: absolute;
  top: -1rem;
  right: 2rem;
`;

const LightWrapper = styled(Wrapper).attrs(() => ({ variant: "light" }))`
  position: relative;
  padding-top: ${spacings.large};
`;
const Disclaimenr = styled(Wrapper).attrs(() => ({ variant: "dark" }))`
  margin-top: ${spacings.medium};
  margin-bottom: ${spacings.large};
`;

const Download = styled(icons.Download)`
  width: 3rem;
`;

const Notice = styled.p`
  margin-top: -2rem;
  font-size: ${fonts.sizes.small};
`;

const Centered = styled.p`
  display: flex;
  justify-content: center;
`;
