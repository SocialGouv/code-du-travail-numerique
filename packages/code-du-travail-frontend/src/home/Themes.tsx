import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-types";
import {
  Button,
  Container,
  GridCell,
  icons,
  PageTitle,
  RootGrid,
  Section,
  theme,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { LinkedTile } from "../common/tiles/LinkedTile";

type Props = {
  themes: Array<{
    icon: string;
    slug: string;
    title: string;
  }>;
};

export const Themes = ({ themes = [] }: Props) => {
  const enrichedThemes = themes.map(({ icon, slug, title }) => {
    return (
      <GridCell key={slug}>
        <LinkedTile
          title={title}
          icon={icons[icon]}
          titleTagType="h3"
          key={slug}
          href={`/${getRouteBySource(SOURCES.THEMES)}/${slug}`}
        />
      </GridCell>
    );
  });

  const [t1, t2, ...otherThemes] = enrichedThemes;

  const titleCell = (
    <DesktopOnlyGridCell key="title cell">
      <ShiftedPageTitleWrapper>
        <PageTitle
          as="h2"
          stripe="left"
          subtitle="Retrouvez tous nos contenus organisés par thèmes"
        >
          Thèmes
        </PageTitle>
      </ShiftedPageTitleWrapper>
    </DesktopOnlyGridCell>
  );

  const ghostCell = <DesktopOnlyGridCell key="ghost cell" />;

  const illustrationCell = (
    <DesktopOnlyGridCell key="icon">
      <StyledThemeIcon />
    </DesktopOnlyGridCell>
  );

  return (
    <Section large decorated variant="light">
      <RelativeContainer>
        <DesktopBackground>
          <StyledShadeIcon />
        </DesktopBackground>
        <MobileTitleWrapper>
          <PageTitle
            as="h2"
            subtitle="Retrouvez tous nos contenus organisés par thèmes"
          >
            Thèmes
          </PageTitle>
        </MobileTitleWrapper>
        <RootGrid>
          {[titleCell, ghostCell, t1, t2, illustrationCell].concat(otherThemes)}
        </RootGrid>
        <Link href="/themes" passHref legacyBehavior>
          <Button variant="primary" as="a">
            Voir tous les thèmes <StyledArrowRight />
          </Button>
        </Link>
      </RelativeContainer>
    </Section>
  );
};

const { breakpoints, spacings } = theme;

const DesktopOnlyGridCell = styled(GridCell)`
  display: ${({ theme }) => (theme.noColors ? "none" : "flex")};
  align-items: center;
  justify-content: center;
  max-height: 18rem;
  overflow: visible;
  @media (max-width: ${breakpoints.desktop}) {
    display: none;
  }
`;

const MobileTitleWrapper = styled.div`
  display: none;
  @media (max-width: ${breakpoints.desktop}) {
    display: block;
  }
`;

const RelativeContainer = styled(Container)`
  position: relative;
  text-align: center;
`;

const DesktopBackground = styled.div`
  position: absolute;
  top: 13rem;
  left: 3rem;
  display: ${({ theme }) => (theme.noColors ? "none" : "block")};
  width: 81rem;
  height: 52rem;
  @media (max-width: ${breakpoints.desktop}) {
    display: none;
  }
`;

const StyledShadeIcon = styled(icons.Shade)`
  width: 100%;
  color: ${({ theme }) => theme.secondary};
`;

const ShiftedPageTitleWrapper = styled.div`
  width: 100%;
  transform: translateX(20%);
`;

const StyledThemeIcon = styled(icons.WorkersTheme)`
  flex: 1 1 auto;
  height: 115%;
  overflow: visible;
`;

const StyledArrowRight = styled(icons.DirectionRight)`
  width: 2.8rem;
  height: 1.5rem;
  margin-left: ${spacings.base};
`;
