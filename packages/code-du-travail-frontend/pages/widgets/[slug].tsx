import { Container, icons, theme } from "@socialgouv/cdtn-ui";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useIframeResizer } from "../../src/common/hooks";

import {
  DureePreavisLicenciement,
  DureePreavisRetraite,
  DismissalProcess,
  CalculateurIndemnite,
  fetchTool,
  SimulateurIndemnitePrecarite,
  AgreementSearch,
} from "../../src/outils";

const toolsBySlug = {
  "preavis-licenciement": DureePreavisLicenciement,
  "preavis-retraite": DureePreavisRetraite,
  "procedure-licenciement": DismissalProcess,
  "indemnite-licenciement": CalculateurIndemnite,
  "indemnite-precarite": SimulateurIndemnitePrecarite,
  "convention-collective": AgreementSearch
};

interface Props {
  icon: string;
  slug: string;
  title: string;
  displayTitle: string;
}

function Widgets({ icon, slug, title, displayTitle }: Props): JSX.Element {
  useIframeResizer();
  const Tool = toolsBySlug[slug];

  return (
    <>
      <StyledContainer>
        <Tool
          icon={icon}
          title={title}
          displayTitle={displayTitle}
          slug={slug}
          widgetMode
        />
        <StyledFooter>
          <Link
            href="/politique-confidentialite"
            target="_blank"
            rel="noopener noreferrer"
          >
            Politique de confidentialité
          </Link>
          <Link passHref href="https://code.travail.gouv.fr/" legacyBehavior>
            <LeftLink target="_blank">
              <Logo />
            </LeftLink>
          </Link>
        </StyledFooter>
      </StyledContainer>
    </>
  );
}

export default Widgets;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const slug = query.slug as string;
  const tool = await fetchTool(slug);
  if (!tool) {
    return {
      notFound: true,
    };
  }

  const { icon, title, displayTitle } = tool;

  return {
    props: {
      icon,
      slug,
      title,
      displayTitle,
    },
  };
};

const StyledContainer = styled(Container)`
  padding: 0;
  & > div:before {
    box-shadow: none;
  }
`;

const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacings.base};
  @media print {
    display: none;
  }
`;

const Logo = styled(icons.Logo)`
  width: auto;
  height: 7rem;
  color: ${({ theme }) => theme.primary};
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 5rem;
  }
`;
const LeftLink = styled.a`
  &:after {
    content: "" !important;
  }
`;
