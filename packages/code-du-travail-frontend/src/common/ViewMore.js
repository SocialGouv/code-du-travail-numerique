import { Button, FlatList, theme } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const ViewMore = ({
  buttonProps,
  children,
  initialSize,
  label,
  listContainer: ListContainer,
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
  initialSize: PropTypes.number,
  label: PropTypes.string,
  listContainer: PropTypes.elementType,
  onClick: PropTypes.func,
  query: PropTypes.string,
  stepSize: PropTypes.number,
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

ViewMore.defaultProps = {
  buttonProps: {},
  initialSize: 7,
  label: "Voir plus",
  listContainer: StyledFlatList,
  onClick: () => {},
  query: "",
  stepSize: 7,
};
