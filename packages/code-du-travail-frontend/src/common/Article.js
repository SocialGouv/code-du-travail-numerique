import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Container, Section, Tag, theme, Wrapper } from "@cdt/ui/";

const Article = ({
  title,
  tags,
  sourceType,
  date,
  icon: Icon,
  wide,
  onTagClick,
  children
}) => {
  return (
    <Section>
      <Container>
        <Wrapper variant="light">
          <Section>
            <Header narrow={!wide} noPadding>
              {Icon && (
                <IconWrapper>
                  <Icon />
                </IconWrapper>
              )}
              <h1>{title}</h1>
              <Meta>
                {sourceType && <Type>{sourceType}</Type>}
                {date && (
                  <Date>
                    Mis à jour le&nbsp;: <DateValue>{date}</DateValue>
                  </Date>
                )}
              </Meta>
              <Tags>
                {tags.map(tag => (
                  <StyledTag key={tag} onClick={() => onTagClick(tag)}>
                    {tag}
                  </StyledTag>
                ))}
              </Tags>
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
  icon: PropTypes.func,
  wide: PropTypes.bool,
  /** list of tags */
  tags: PropTypes.array,
  className: PropTypes.string,
  style: PropTypes.object,
  /** when user clicks some tag */
  onTagClick: PropTypes.func
};

Article.defaultProps = {
  tags: []
};

export default Article;

const { breakpoints, colors, fonts, spacing } = theme;

const Header = styled(Container)`
  position: relative;
  margin-bottom: ${spacing.interComponent};
`;

const ICON_WIDTH = "80px";

const IconWrapper = styled.div`
  position: absolute;
  top: ${spacing.small};
  left: calc(-${ICON_WIDTH} - ${spacing.interComponent});
  width: ${ICON_WIDTH};
  color: ${colors.lightText};
  @media (max-width: ${breakpoints.desktop}) {
    display: none;
  }
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
  color: ${colors.lightText};
  font-weight: 600;
`;

const Date = styled.span`
  margin-left: ${spacing.base};
  color: ${colors.darkerGrey};
  font-size: ${fonts.sizeSmall};
  display: inline-block;
  @media (max-width: ${breakpoints.mobile}) {
    margin-left: 0;
  }
`;
const DateValue = styled.span`
  color: ${colors.lightText};
  font-weight: 600;
`;

const Tags = styled.div`
  margin-left: -10px;
`;

const StyledTag = styled(Tag)`
  cursor: pointer;
`;
