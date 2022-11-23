import { Container, icons, theme } from "@socialgouv/cdtn-ui";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import {
  DureePreavisLicenciement,
  DureePreavisRetraite,
  fetchTool,
  loadPublicodesRules,
} from "../../src/outils";

const toolsBySlug = {
  "preavis-licenciement": DureePreavisLicenciement,
  "preavis-retraite": DureePreavisRetraite,
};

interface Props {
  icon: string;
  publicodesRules: any;
  slug: string;
  title: string;
  displayTitle: string | null;
}

function Widgets({
  icon,
  slug,
  title,
  displayTitle,
  publicodesRules,
}: Props): JSX.Element {
  const Tool = toolsBySlug[slug];

  return (
    <Container>
      <Tool
        icon={icon}
        title={title}
        displayTitle={displayTitle ?? title}
        publicodesRules={publicodesRules}
      />

      <StyledFooter>
        <Link passHref href="/politique-confidentialite">
          <a target="_blank" rel="noopener noreferrer">
            Politique de confidentialité
          </a>
        </Link>
        <Link passHref href="https://code.travail.gouv.fr/">
          <LeftLink target="_blank">
            <Logo />
          </LeftLink>
        </Link>
      </StyledFooter>
    </Container>
  );
}

export default Widgets;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const tool = await fetchTool(query.slug as string);
  if (!tool) {
    return {
      notFound: true,
    };
  }

  const { slug, icon, title, displayTitle } = tool;

  const publicodesRules = loadPublicodesRules(slug);

  return {
    props: {
      icon,
      publicodesRules,
      slug,
      title,
      displayTitle: displayTitle ?? null,
    },
  };
};

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
