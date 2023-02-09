import { Container, icons, theme } from "@socialgouv/cdtn-ui";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import {
  DureePreavisLicenciement,
  DureePreavisRetraite,
  fetchTool,
} from "../../src/outils";

const toolsBySlug = {
  "preavis-licenciement": DureePreavisLicenciement,
  "preavis-retraite": DureePreavisRetraite,
};

interface Props {
  icon: string;
  slug: string;
  title: string;
  displayTitle: string;
}

function Widgets({ icon, slug, title, displayTitle }: Props): JSX.Element {
  const Tool = toolsBySlug[slug];

  return (
    <Container>
      <Tool icon={icon} title={title} displayTitle={displayTitle} slug={slug} />

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

  return {
    props: {
      icon,
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
