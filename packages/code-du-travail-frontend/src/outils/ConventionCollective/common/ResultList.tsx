import { Button, theme, ViewMore, Wrapper } from "@socialgouv/cdtn-ui";
import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  query: string;
  children: ReactNode;
};

export function ResultList({ query, children }: Props): JSX.Element {
  const viewMoreButton = (onClick) => (
    <ViewMoreButton small onClick={onClick}>
      Voir plus
    </ViewMoreButton>
  );

  return (
    <WrapperNoPadding variant="light">
      <ViewMore
        button={viewMoreButton}
        query={query}
        stepSize={5}
        initialSize={5}
      >
        {children}
      </ViewMore>
    </WrapperNoPadding>
  );
}

export const ListItem: React.FC = ({ children }) => {
  return <Div> {children}</Div>;
};

const Div = styled.div`
  margin-left: 0;
  & + &::before {
    content: "";
    display: block;
    margin: 0 ${theme.spacings.xmedium};
    border-top: 1px solid ${({ theme }) => theme.border};
  }
`;

const WrapperNoPadding = styled(Wrapper)`
  padding: 0;
`;

const ViewMoreButton = styled(Button)`
  margin-top: ${theme.spacings.base};
  margin-bottom: ${theme.spacings.base};
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex: 1 0 auto;
  }
`;

export const ResultItem = styled.a`
  display: block;
  appearance: none;
  width: 100%;
  background-color: transparent;
  font-weight: 500;
  border: none;
  font-size: ${theme.fonts.sizes.default};
  padding: ${({ small }) =>
      small ? theme.spacings.xsmall : theme.spacings.medium}
    ${theme.spacings.xmedium};
  color: ${({ theme }) => theme.paragraph};
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  &:hover {
    color: ${({ theme }) => theme.title};
    background-color: ${({ theme }) => theme.bgTertiary};
  }
`;
