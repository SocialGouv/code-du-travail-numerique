import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useUIDSeed } from "react-uid";

import {
  Button,
  FlatList,
  Heading,
  theme,
  Wrapper
} from "@socialgouv/react-ui";

export const ResultList = ({
  buttonLabel = "Plus de résultats",
  items,
  query,
  title
}) => {
  const pageSize = 4;
  const [page, setPage] = useState(1);
  const seedId = useUIDSeed();
  useEffect(() => {
    setPage(1);
  }, [query]);
  return (
    <StyledWrapper variant="light">
      <Heading>
        {`${title} (${items.length}`}&nbsp;
        {`résultat${items.length > 1 ? "s" : ""})`}
      </Heading>
      <FlatList>
        {items.slice(0, page * pageSize).map((item, index) => (
          <StyledListItem
            isLast={index === page * pageSize - 1}
            key={seedId(item)}
          >
            {item}
          </StyledListItem>
        ))}
      </FlatList>
      {items.length > page * pageSize && (
        <ButtonWrapper>
          <StyledButton
            variant="flat"
            small
            type="button"
            onClick={() => setPage(page + 1)}
          >
            {buttonLabel}
          </StyledButton>
        </ButtonWrapper>
      )}
    </StyledWrapper>
  );
};

const { box, breakpoints, spacings } = theme;

const StyledWrapper = styled(Wrapper)`
  & + & {
    margin-top: ${spacings.base};
  }
`;

const StyledListItem = styled.li`
  ${({ isLast }) =>
    isLast &&
    css`
      & > *:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
      }
    `}
  & + & {
    border-top: ${({ theme }) => box.border(theme.border)};
  }
`;

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
