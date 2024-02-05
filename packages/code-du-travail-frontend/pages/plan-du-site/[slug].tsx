import { Container, PageTitle, Section, Wrapper } from "@socialgouv/cdtn-ui";
import { GetServerSideProps } from "next";
import React from "react";
import Metas from "../../src/common/Metas";
import { SITE_URL } from "../../src/config";
import { Layout } from "../../src/layout/Layout";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { StyledLi, StyledSection } from "./index";
import Link from "next/link";

export interface Props {
  contribGeneric: {
    slug: string;
    title: string;
  };
  contributions: {
    slug: string;
    title: string;
  }[];
}

function ContributionList({
  contribGeneric,
  contributions,
}: Props): JSX.Element {
  return (
    <Layout>
      <Metas
        title="Plan du site"
        description="Plan du site du Code du travail numérique"
      />
      <Section>
        <Container>
          <PageTitle>Fiches pratiques : {contribGeneric.title}</PageTitle>
          <Wrapper variant="main">
            <StyledSection>
              <Link href={contribGeneric.slug}>{contribGeneric.title}</Link>
              <ul>
                {contributions.map((c) => (
                  <StyledLi key={c.slug}>
                    <Link
                      href={`/${getRouteBySource(SOURCES.CONTRIBUTIONS)}/${c.slug}`}
                    >
                      {c.title}
                    </Link>
                  </StyledLi>
                ))}
              </ul>
            </StyledSection>
          </Wrapper>
        </Container>
      </Section>
    </Layout>
  );
}

export default ContributionList;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const responseContainer = await fetch(
    `${SITE_URL}/api/plan-du-site/${query.slug}`
  );
  if (!responseContainer.ok) {
    return {
      notFound: true,
    };
  }
  const result = await responseContainer.json();
  const contribGeneric = result[0];
  return {
    props: {
      contribGeneric: contribGeneric,
      contributions: result.slice(1).sort((a, b) => a.title.localeCompare(b.title)) ,
    },
  };
};
