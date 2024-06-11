import {
  Button,
  icons,
  ScreenReaderOnly,
  Section,
  theme,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";
import { Breadcrumb } from "@socialgouv/cdtn-types";

import Html from "../../src/common/Html";
import { toUrl } from "../lib";
import { getDisclaimer } from "./helpers";

export interface LetterModelProps {
  breadcrumbs: Breadcrumb[];
  date: string;
  intro: string;
  title: string;
  relatedItems: Array<any>;
  metaDescription: string;
  filesize: any;
  filename: string;
  html: any;
  meta_title: string;
  type: any;
  slug: string;
}

export const LetterModel = ({
  filename,
  filesize,
  html,
  slug,
}: LetterModelProps) => {
  const filesizeFormated = Math.round((filesize / 1000) * 100) / 100;
  const [, extension] = filename.split(/\.([a-z]{2,4})$/);
  return (
    <>
      <Section>
        <LightWrapper>
          <FloatWrapper>
            <Button
              as="a"
              className="no-after"
              href={toUrl(filename)}
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

      <Disclaimer as="p">{getDisclaimer(slug)}</Disclaimer>
      <Centered>
        <Button
          as="a"
          className="no-after"
          href={toUrl(filename)}
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
