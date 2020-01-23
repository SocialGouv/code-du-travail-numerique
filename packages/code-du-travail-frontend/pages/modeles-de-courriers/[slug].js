import React from "react";
import { withRouter } from "next/router";
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
  theme
} from "@socialgouv/react-ui";

import Html from "../../src/common/Html";
import Answer from "../../src/common/Answer";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchCourrier = ({ slug }) =>
  fetch(`${API_URL}/items/modeles_de_courriers/${slug}`);

class ModeleCourrier extends React.Component {
  static async getInitialProps({ query }) {
    const response = await fetchCourrier(query);
    if (!response.ok) {
      return { statusCode: response.status };
    }

    const data = await response.json();
    return { data };
  }

  render() {
    const {
      data: {
        _source: {
          breadcrumbs,
          date,
          description = "",
          filename,
          filesize,
          html,
          title
        },
        relatedItems,
        status
      } = { _source: {} },
      pageUrl,
      ogImage
    } = this.props;
    if (status === 404) {
      return <Answer emptyMessage="Modèle de document introuvable" />;
    }
    const [, extension] = filename.split(/\.([a-z]{2,4})$/);
    const filesizeFormated = Math.round((filesize / 1000) * 100) / 100;
    return (
      <Layout>
        <Metas
          url={pageUrl}
          title={`Modèle de document :  ${title}`}
          description={
            description.slice(0, description.indexOf(" ", 150)) + "…"
          }
          image={ogImage}
        />
        <Answer
          title={title}
          relatedItems={relatedItems}
          emptyMessage="Modèle de document introuvable"
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
                  variant="primary"
                  narrow
                  href={`${API_URL}/docs/${filename}`}
                >
                  <Download />
                  <ScreenReaderOnly>
                    Télécharger le modèle ({extension} - {filesizeFormated}Ko)
                  </ScreenReaderOnly>
                </Button>
              </FloatWrapper>
              <Html>{html}</Html>
            </LightWrapper>
          </Section>
          <Notice>
            Type: Modèle de courrier - Format: {extension} - Taille:{" "}
            {filesizeFormated}
            Ko{" "}
          </Notice>

          <Disclaimenr>
            Attention, chaque modèle de document proposé est à personnaliser
            selon votre situation et est susceptible d’évoluer suite à des
            changements de règlementation. Assurez-vous d’avoir la dernière
            version mise à jour avant toute utilisation.
          </Disclaimenr>
          <Centered>
            <Button variant="primary" href={`${API_URL}/docs/${filename}`}>
              Télécharger le modèle ({extension} - {filesizeFormated}Ko)
              <Download />
            </Button>
          </Centered>
        </Answer>
      </Layout>
    );
  }
}

export default withRouter(ModeleCourrier);

const { spacings, fonts } = theme;

const FloatWrapper = styled.div`
  position: absolute;
  top: -1rem;
  right: 2rem;
`;

const LightWrapper = styled(Wrapper).attrs(() => ({ variant: "light" }))`
  position: relative;
`;
const Disclaimenr = styled(Wrapper).attrs(() => ({ variant: "dark" }))`
  margin-top: ${spacings.medium};
  margin-bottom: ${spacings.large};
`;

const Download = styled(icons.Download)`
  min-width: 3rem;
`;

const Notice = styled.p`
  margin-top: -2rem;
  font-size: ${fonts.sizes.small};
`;

const Centered = styled.p`
  display: flex;
  justify-content: center;
`;
