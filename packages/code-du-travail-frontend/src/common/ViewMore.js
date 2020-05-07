import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, FlatList, theme } from "@socialgouv/react-ui";

const ViewMore = ({
  buttonProps,
  children,
  initialSize,
  label,
  ListContainer,
  onClick,
  query,
  stepSize,
}) => {
  const [currentSize, setCurrentSize] = useState(1);
  useEffect(() => {
    setCurrentSize(initialSize);
  }, [initialSize, query]);
  const viewMore = useCallback(() => {
    onClick();
    setCurrentSize(currentSize + stepSize);
  }, [stepSize, currentSize, onClick]);
  const isShowMoreVisible = React.Children.count(children) > currentSize;
  return (
    <>
      <ListContainer>
        {React.Children.toArray(children).slice(0, currentSize)}
      </ListContainer>
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
  ListContainer: PropTypes.elementType,
  initialSize: PropTypes.number,
  stepSize: PropTypes.number,
  label: PropTypes.string,
  onClick: PropTypes.func,
  query: PropTypes.string,
};

ViewMore.defaultProps = {
  buttonProps: {},
  ListContainer: StyledFlatList,
  initialSize: 7,
  stepSize: 7,
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
