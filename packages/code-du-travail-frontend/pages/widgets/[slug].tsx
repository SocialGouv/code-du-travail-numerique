import tools from "@cdt/data...tools/internals.json";
import { Container, icons, theme } from "@socialgouv/cdtn-ui";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { loadPublicodes } from "../../src/outils/api/LoadPublicodes";
import { DureePreavisLicenciement } from "../../src/outils/DureePreavisLicenciement";
import { SimulateurPreavisRetraite } from "../../src/outils/DureePreavisRetraite";
import { Tool } from "../../src/outils/types";

const toolsBySlug = {
  "preavis-licenciement": DureePreavisLicenciement,
  "preavis-retraite": SimulateurPreavisRetraite,
};

interface Props {
  icon: string;
  publicodesRules: any;
  slug: string;
  title: string;
  displayTitle: string;
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
        displayTitle={displayTitle}
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
  const tool = (tools as Tool[]).find((tool) => tool.slug === query.slug);
  if (!tool) {
    return {
      notFound: true,
    };
  }

  const { slug, icon, title, displayTitle } = tool;

  const publicodesRules = loadPublicodes(slug);

  return {
    props: {
      icon,
      publicodesRules,
      slug,
      title,
      displayTitle,
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
