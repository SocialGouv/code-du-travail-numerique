import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import {
  Container,
  PageTitle,
  Subtitle as Suptitle,
  theme,
  Wrapper
} from "@socialgouv/react-ui/";

const Article = ({
  children,
  date,
  dateLabel,
  source,
  subtitle,
  suptitle,
  title
}) => {
  return (
    <Container>
      <Wrapper variant="main" data-main-content>
        {suptitle && <Suptitle>{suptitle}</Suptitle>}
        <StyledPageTitle
          tabIndex="-1"
          data-next-focus-root
          subtitle={subtitle}
          leftStripped
          shift={theme.spacings.larger}
        >
          {title}
        </StyledPageTitle>
        <Meta>
          {source &&
            (source.url ? (
              <Span>
                Source:{" "}
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.name}
                </a>
              </Span>
            ) : (
              <Span>Source: {source.name}</Span>
            ))}
          {source && date && (
            <HideOnMobile aria-hidden="true">&nbsp;-&nbsp;</HideOnMobile>
          )}
          {date && (
            <Span>
              {dateLabel}&nbsp;:&nbsp;{date}
            </Span>
          )}
        </Meta>
        <Content>{children}</Content>
      </Wrapper>
    </Container>
  );
};

Article.propTypes = {
  /** article title */
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.node,
  /** article content */
  children: PropTypes.node,
  date: PropTypes.string,
  dateLabel: PropTypes.string,
  source: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  }),
  style: PropTypes.object,
  /** when user clicks some tag */
  onTagClick: PropTypes.func
};

Article.defaultProps = {
  dateLabel: "Mis à jour le",
  subtitle: null
};

export default Article;

const { breakpoints, fonts, spacings } = theme;

const Meta = styled.div`
  display: flex;
  font-size: ${fonts.sizes.small};
  @media (max-width: ${breakpoints.mobile}) {
    flex-flow: column;
    align-items: flex-start;
  }
`;

const StyledPageTitle = styled(PageTitle)`
  margin-bottom: ${spacings.small};
  outline: none;
`;

const Content = styled.div`
  margin: ${spacings.large} 0 0 0;
  @media (max-width: ${breakpoints.mobile}) {
    margin-top: ${spacings.base};
  }
`;

const HideOnMobile = styled.span`
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

const Span = styled.span`
  @media (max-width: ${breakpoints.mobile}) {
    display: block;
  }
`;
