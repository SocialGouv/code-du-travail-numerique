import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import {
  Container,
  PageTitle,
  Section,
  theme,
  Wrapper
} from "@socialgouv/react-ui/";

const Article = ({ title, sourceType, date, wide, children }) => {
  return (
    <Section data-main-content>
      <Container>
        <Wrapper variant="light">
          <Section>
            <Header narrow={!wide} noPadding>
              <PageTitle>{title}</PageTitle>
              <Meta>
                {sourceType && <Type>{sourceType}</Type>}
                {date && (
                  <Date>
                    Mis à jour le&nbsp;: <DateValue>{date}</DateValue>
                  </Date>
                )}
              </Meta>
            </Header>
            {children && (
              <Container narrow={!wide} noPadding>
                {children}
              </Container>
            )}
          </Section>
        </Wrapper>
      </Container>
    </Section>
  );
};

Article.propTypes = {
  /** article title */
  title: PropTypes.string.isRequired,
  /** article content */
  children: PropTypes.node,
  date: PropTypes.string,
  sourceType: PropTypes.string,
  wide: PropTypes.bool,
  style: PropTypes.object,
  /** when user clicks some tag */
  onTagClick: PropTypes.func
};

export default Article;

const { breakpoints, colors, fonts, spacings } = theme;

const Header = styled(Container)`
  position: relative;
  margin-bottom: ${spacings.medium};
`;

const Meta = styled.div`
  display: flex;
  align-items: flex-end;
  @media (max-width: ${breakpoints.mobile}) {
    flex-flow: column;
    align-items: flex-start;
  }
`;

const Type = styled.span`
  color: ${colors.altText};
  font-weight: 600;
`;

const Date = styled.span`
  display: inline-block;
  margin-left: ${spacings.base};
  color: ${colors.altText};
  font-size: ${fonts.sizes.small};
  @media (max-width: ${breakpoints.mobile}) {
    margin-left: 0;
  }
`;
const DateValue = styled.span`
  color: ${colors.altText};
  font-weight: 600;
`;
