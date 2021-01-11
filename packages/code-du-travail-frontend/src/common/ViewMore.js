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
  const childSize = React.Children.count(children);
  const [currentSize, setCurrentSize] = useState(childSize);
  useEffect(() => {
    setCurrentSize(initialSize);
  }, [initialSize, query]);
  const viewMore = useCallback(() => {
    onClick();
    setCurrentSize(stepSize ? currentSize + stepSize : childSize);
  }, [stepSize, currentSize, childSize, onClick]);
  const isShowMoreVisible = childSize > currentSize;
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
  label: PropTypes.string.isRequired,
  listContainer: PropTypes.elementType,
  onClick: PropTypes.func,
  query: PropTypes.string,
  stepSize: PropTypes.number,
};

export { ViewMore };

const { breakpoints, spacings } = theme;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${breakpoints.mobile}) {
    justify-content: stretch;
  }
`;

const StyledFlatList = styled(FlatList)`
  margin-bottom: ${spacings.larger};
`;

const StyledButton = styled(Button)`
  margin-top: ${spacings.xmedium};
  ${(props) => props.styles && props.styles}
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
};
