import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, FlatList, theme } from "@socialgouv/react-ui";

const ViewMore = ({
  buttonProps,
  children,
  CustomContainer,
  elementsDisplayed,
  label,
  onClick,
  query,
}) => {
  const [totalDisplayed, setTotalDisplayed] = useState(1);
  useEffect(() => {
    setTotalDisplayed(elementsDisplayed);
  }, [elementsDisplayed, query]);
  const viewMore = useCallback(() => {
    onClick();
    setTotalDisplayed(totalDisplayed + elementsDisplayed);
  }, [elementsDisplayed, totalDisplayed, setTotalDisplayed, onClick]);
  const isShowMoreVisible = React.Children.count(children) > totalDisplayed;
  const ChildrenContainer = CustomContainer || StyledFlatList;
  return (
    <>
      <ChildrenContainer>
        {React.Children.toArray(children).slice(0, totalDisplayed)}
      </ChildrenContainer>
      {isShowMoreVisible && (
        <ButtonWrapper>
          <StyledButton {...buttonProps} onClick={viewMore}>
            {label}
          </StyledButton>
        </ButtonWrapper>
      )}
    </>
  );
};

ViewMore.propTypes = {
  buttonProps: PropTypes.object,
  children: PropTypes.node.isRequired,
  CustomContainer: PropTypes.elementType,
  elementsDisplayed: PropTypes.number,
  label: PropTypes.string,
  onClick: PropTypes.func,
  query: PropTypes.string,
};

ViewMore.defaultProps = {
  buttonProps: {},
  CustomContainer: null,
  elementsDisplayed: 4,
  label: "Voir plus",
  onClick: () => {},
  query: "",
};

export { ViewMore };

const { breakpoints, spacings } = theme;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${spacings.xmedium};
  @media (max-width: ${breakpoints.mobile}) {
    justify-content: stretch;
  }
`;

const StyledFlatList = styled(FlatList)`
  margin-bottom: ${spacings.larger};
`;

const StyledButton = styled(Button)`
  @media (max-width: ${breakpoints.mobile}) {
    flex: 1 0 auto;
  }
`;
