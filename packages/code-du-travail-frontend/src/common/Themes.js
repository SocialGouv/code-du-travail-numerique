import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { Layers } from "react-feather";

import {
  Grid,
  GridCell,
  Container,
  Section,
  theme,
  Tile
} from "@socialgouv/react-ui";

export default class Themes extends React.Component {
  static propTypes = {
    isRoot: PropTypes.bool,
    title: PropTypes.string,
    themes: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired
      }).isRequired
    )
  };

  static defaultProps = {
    title: "Retrouvez nos réponses thématiques",
    isRoot: false
  };

  render() {
    const { isRoot, title, themes } = this.props;
    if (!(themes.length > 0)) return null;
    return (
      <Section>
        <Container>
          <Title>{title}</Title>
          <Grid>
            {themes.map(({ slug, title }) => (
              <StyledGridCell isRoot={isRoot} key={slug + title}>
                <Link href="/themes/[slug]" as={`/themes/${slug}`} passHref>
                  <Tile icon={Layers}>{title}</Tile>
                </Link>
              </StyledGridCell>
            ))}
          </Grid>
        </Container>
      </Section>
    );
  }
}
const { spacing } = theme;

const Title = styled.h2`
  text-align: center;
  margin-bottom: ${spacing.large};
`;

const StyledGridCell = styled(GridCell)`
  height: ${({ isRoot }) => (isRoot ? "120px" : "auto")};
`;
