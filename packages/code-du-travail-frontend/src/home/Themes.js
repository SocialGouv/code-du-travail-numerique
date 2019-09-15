import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";

import {
  Container,
  Grid,
  Category,
  GridCell,
  Section,
  theme
} from "@cdt/ui-old";

const iconsMap = {
  1: "hiring-1.svg",
  2: "remuneration.svg",
  3: "time.svg",
  4: "certificate.svg",
  5: "shield.svg",
  6: "handshake.svg",
  7: "file-3.svg",
  8: "book_web.svg"
};

export default class Themes extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    themes: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired
      }).isRequired
    )
  };

  static defaultProps = {
    title: "Retrouvez nos réponses thématiques"
  };

  render() {
    const { title, themes } = this.props;
    if (!(themes.length > 0)) return null;
    return (
      <Section>
        <Container>
          <Title>{title}</Title>
          <Grid>
            {themes.map(({ id, slug, title, parent }) => (
              <GridCell key={slug + title}>
                <Link href="/themes/[slug]" as={`/themes/${slug}`} passHref>
                  <Tile title={title}>
                    <Category
                      small={Boolean(parent)}
                      title={title}
                      icon={`/static/assets/icons/${iconsMap[id] ||
                        "profiles.svg"}`}
                    />
                  </Tile>
                </Link>
              </GridCell>
            ))}
          </Grid>
        </Container>
      </Section>
    );
  }
}
const { box, spacing, colors } = theme;

const Title = styled.h2`
  text-align: center;
  margin-bottom: ${spacing.large};
`;

const Tile = styled.a`
  text-decoration: none;
  display: block;
  height: 100%;
  border-radius: ${box.borderRadius};
  & > * {
    transition: all 0.2s ease;
  }
  :focus > *,
  :active > *,
  :hover > * {
    transform: scale(1.1);
    border: 1px solid ${colors.focus};
    box-shadow: 0 0 2px 2px ${colors.focusShadow};
  }
`;
