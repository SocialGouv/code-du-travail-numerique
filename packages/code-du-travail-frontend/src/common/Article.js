import {
  Container,
  PageTitle,
  Subtitle as Suptitle,
  theme,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { A11yLink } from "./A11yLink";
import { Share } from "./Share";

const Article = ({
  children,
  date,
  dateLabel,
  source,
  subtitle,
  suptitle,
  title,
  metaDescription,
}) => {
  return (
    <Container>
      <Wrapper variant="main">
        <Flex>
          <ShareContainer>
            <Share title={title} metaDescription={metaDescription} />
          </ShareContainer>
          {suptitle && <OrderedSuptitle>{suptitle}</OrderedSuptitle>}
          <StyledPageTitle
            subtitle={subtitle}
            stripe="left"
            shift={theme.spacings.larger}
          >
            {title}
          </StyledPageTitle>
          <Meta>
            {source &&
              (source.url ? (
                <Span>
                  Source:{" "}
                  <A11yLink
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.name}
                  </A11yLink>
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
        </Flex>
        <Content>{children}</Content>
      </Wrapper>
    </Container>
  );
};

Article.propTypes = {
  /** article content */
  children: PropTypes.node,

  date: PropTypes.string,

  dateLabel: PropTypes.string,

  metaDescription: PropTypes.string,

  /** when user clicks some tag */
  onTagClick: PropTypes.func,

  source: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),

  style: PropTypes.object,

  subtitle: PropTypes.node,
  /** article title */
  title: PropTypes.string.isRequired,
};

Article.defaultProps = {
  dateLabel: "Mis à jour le",
  metaDescription: "",
  subtitle: null,
};

export default Article;

const { breakpoints, fonts, spacings } = theme;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShareContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  order: 1;
  margin-bottom: ${spacings.small};
  @media (max-width: ${breakpoints.mobile}) {
    justify-content: flex-start;
    order: 5;
    margin-top: ${spacings.small};
    margin-bottom: 0;
  }
  @media print {
    display: none;
  }
`;

const OrderedSuptitle = styled(Suptitle)`
  order: 2;
`;

const StyledPageTitle = styled(PageTitle)`
  order: 3;
  margin-bottom: ${spacings.small};
  outline: none;
`;

const Meta = styled.div`
  display: flex;
  order: 4;
  font-size: ${fonts.sizes.small};
  @media (max-width: ${breakpoints.mobile}) {
    flex-flow: column;
    align-items: flex-start;
  }
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
