import {
  Button,
  OverflowWrapper,
  ScreenReaderOnly,
  Section,
  theme,
  Wrapper,
  icons,
} from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";
import { Breadcrumb } from "@socialgouv/cdtn-utils";

import Html from "../../src/common/Html";
import { toUrl } from "../../src/lib";

export interface LetterModelProps {
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

export const LetterModel = ({ fileUrl, filesize, html }: LetterModelProps) => {
  const filesizeFormated = Math.round((filesize / 1000) * 100) / 100;
  const [filename] = fileUrl.match(/[^/]+$/);
  const [, extension] = filename.split(/\.([a-z]{2,4})$/);
  return (
    <>
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
        votre situation et est susceptible d’évoluer suite à des changements de
        règlementation. Assurez-vous d’avoir la dernière version mise à jour
        avant toute utilisation.
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
    </>
  );
};

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
