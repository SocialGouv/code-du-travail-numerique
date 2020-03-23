import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import styled from "styled-components";
import { Button, FlatList, theme } from "@socialgouv/react-ui";

const ViewMore = ({ children, elementsDisplayed, label, onClick, query }) => {
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);
  const viewMore = useCallback(() => {
    onClick();
    setCurrentPage(currentPage + 1);
  }, [currentPage, setCurrentPage, onClick]);
  const nbChildrenVisible = elementsDisplayed * currentPage;
  const isShowMoreVisible = React.Children.count(children) > nbChildrenVisible;
  return (
    <>
      <FlatList>
        {React.Children.toArray(children).slice(0, nbChildrenVisible)}
      </FlatList>
      {isShowMoreVisible && (
        <ButtonWrapper>
          <StyledButton onClick={viewMore}>{label}</StyledButton>
        </ButtonWrapper>
      )}
    </>
  );
};

ViewMore.propTypes = {
  children: PropTypes.node.isRequired,
  elementsDisplayed: PropTypes.number,
  label: PropTypes.string,
  onClick: PropTypes.func,
  router: PropTypes.object.isRequired,
  query: PropTypes.string
};

ViewMore.defaultProps = {
  elementsDisplayed: 4,
  label: "Voir plus",
  onClick: () => {},
  query: ""
};

const RoutedViewMore = withRouter(ViewMore);

export { RoutedViewMore as ViewMore };

const { breakpoints, spacings } = theme;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${spacings.large};
  @media (max-width: ${breakpoints.mobile}) {
    justify-content: stretch;
  }
`;

const StyledButton = styled(Button)`
  @media (max-width: ${breakpoints.mobile}) {
    flex: 1 0 auto;
  }
`;
