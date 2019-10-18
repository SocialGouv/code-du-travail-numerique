import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { Layers } from "react-feather";
import { Container, Section, CardList, Tile } from "@socialgouv/react-ui";

export default class Themes extends React.Component {
  static propTypes = {
    themes: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired
      }).isRequired
    )
  };

  render() {
    const { themes } = this.props;
    if (!(themes.length > 0)) {
      return null;
    }
    return (
      <Section>
        <Container>
          <CardList
            title="Thèmes"
            desc="Retrouvez tous nos contenus autour de grands thèmes"
            href="/themes"
          >
            {themes.map(({ slug, title }) => (
              <Link
                key={slug}
                href="/themes/[slug]"
                as={`/themes/${slug}`}
                passHref
              >
                <StyledTile icon={Layers}>{title}</StyledTile>
              </Link>
            ))}
          </CardList>
        </Container>
      </Section>
    );
  }
}

const StyledTile = styled(Tile)`
  min-height: 120px;
`;
