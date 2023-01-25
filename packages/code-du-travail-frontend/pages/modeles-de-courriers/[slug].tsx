import {
  Badge,
  Button,
  icons,
  OverflowWrapper,
  ScreenReaderOnly,
  Section,
  theme,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import getConfig from "next/config";
import React from "react";
import styled from "styled-components";

import Answer from "../../src/common/Answer";
import Html from "../../src/common/Html";
import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import { toUrl } from "../../src/lib";
import { Breadcrumb } from "cdtn-types";
import { handleError } from "../../src/lib/fetch-error";
import {SOURCES} from "@socialgouv/cdtn-sources";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const fetchCourrier = ({ slug }) =>
  fetch(`${API_URL}/items/modeles_de_courriers/${slug}`);

interface Props {
  breadcrumbs: Breadcrumb[];
  date: string;
  description: string;
  title: string;
  relatedItems: Array<any>;
  metaDescription;
  filesize;
  fileUrl;
  html;
  meta_title;
  type;
}

function ModeleCourrier(props: Props): JSX.Element {
  const {
    breadcrumbs,
    date,
    description = "",
    metaDescription,
    filesize,
    fileUrl,
    html,
    title,
    meta_title,
    type,
    relatedItems,
  } = props;
  const [filename] = fileUrl.match(/[^/]+$/);
  const [, extension] = filename.split(/\.([a-z]{2,4})$/);
  const filesizeFormated = Math.round((filesize / 1000) * 100) / 100;
  const category = `Modèle ${
    type !== "fichier" ? `de ${type}` : "à télécharger"
  }`;
  return (
    <Layout currentPage={SOURCES.LETTERS}>
      <Metas
        title={`${category} :  ${meta_title ?? title}`}
        description={
          metaDescription ||
          description.slice(0, description.indexOf(" ", 150)) + "…"
        }
      />
      <Answer
        title={`Modèle - ${title}`}
        relatedItems={relatedItems}
        emptyMessage="Modèle de document introuvable"
        intro={description}
        metaDescription={metaDescription}
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
                href={toUrl(fileUrl)}
                narrow
                variant="primary"
              >
                <Download />
                <ScreenReaderOnly>
                  Télécharger le document ({extension} - {filesizeFormated}Ko)
                </ScreenReaderOnly>
              </Button>
            </FloatWrapper>
            <OverflowWrapper>
              <Html>{html}</Html>
            </OverflowWrapper>
          </LightWrapper>
        </Section>
        <Notice>
          Type: Modèle de document - Format: {extension} - Taille:{" "}
          {filesizeFormated}
          Ko{" "}
        </Notice>

        <Disclaimer as="p">
          Attention, chaque modèle de document proposé est à personnaliser selon
          votre situation et est susceptible d’évoluer suite à des changements
          de règlementation. Assurez-vous d’avoir la dernière version mise à
          jour avant toute utilisation.
        </Disclaimer>
        <Centered>
          <Button
            as="a"
            className="no-after"
            href={toUrl(fileUrl)}
            variant="primary"
          >
            Télécharger le modèle ({extension} - {filesizeFormated}Ko) &nbsp;
            <Download />
          </Button>
        </Centered>
      </Answer>
    </Layout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const response = await fetchCourrier(query);
  if (!response.ok) {
    return handleError(response);
  }

  const data = await response.json();
  return { props: { relatedItems: data.relatedItems, ...data._source } };
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
const Disclaimer = styled(Wrapper).attrs(() => ({ variant: "dark" }))`
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
