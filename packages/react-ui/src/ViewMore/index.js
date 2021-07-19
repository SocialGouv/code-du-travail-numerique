import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { Button } from "../Button/index.js";
import { FlatList } from "../FlatList/index.js";
import { breakpoints, spacings } from "../theme.js";

export const ViewMore = ({
  button,
  children,
  initialSize,
  tolerance,
  listContainer: ListContainer,
  query,
  stepSize,
}) => {
  const childSize = React.Children.count(children);
  // beware, we need to set childSize first for SSR
  const [currentSize, setCurrentSize] = useState(childSize);
  useEffect(() => {
    const toleratedSize = tolerance
      ? initialSize + tolerance
      : initialSize * 1.2 + 1;
    setCurrentSize(toleratedSize >= childSize ? childSize : initialSize);
  }, [childSize, initialSize, tolerance, query]);
  const viewMore = useCallback(() => {
    if (!stepSize) return setCurrentSize(childSize);
    const nextSize = currentSize + stepSize;
    const toleratedNextSize = tolerance
      ? nextSize + tolerance
      : nextSize * 1.2 + 1;
    if (toleratedNextSize >= childSize) return setCurrentSize(childSize);
    return setCurrentSize(nextSize);
  }, [stepSize, tolerance, currentSize, childSize]);
  const isShowMoreVisible = childSize > currentSize;
  return (
    <>
      <ListContainer>
        {React.Children.toArray(children).slice(0, currentSize)}
      </ListContainer>
      {isShowMoreVisible && <ButtonWrapper>{button(viewMore)}</ButtonWrapper>}
    </>
  );
};

ViewMore.propTypes = {
  button: PropTypes.func,
  children: PropTypes.node.isRequired,
  initialSize: PropTypes.number,
  listContainer: PropTypes.elementType,
  query: PropTypes.string,
  stepSize: PropTypes.number,
  tolerance: PropTypes.number,
};

const defaultRenderProp = (onClick) => (
  <StyledButton onClick={onClick}>Voir plus</StyledButton>
);

ViewMore.defaultProps = {
  button: defaultRenderProp,
  initialSize: 7,
  listContainer: FlatList,
  query: "",
};

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${breakpoints.mobile}) {
    justify-content: stretch;
  }
`;

const StyledButton = styled(Button)`
  margin-top: ${spacings.xmedium};
  ${(props) => props.styles && props.styles}
  @media (max-width: ${breakpoints.mobile}) {
    flex: 1 0 auto;
  }
`;
