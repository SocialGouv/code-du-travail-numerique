import { Button, theme, ViewMore, Wrapper } from "@socialgouv/cdtn-ui";
import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  query: string;
  children: ReactNode;
};

export function ResultList({ query, children }: Props): JSX.Element {
  const viewMoreButton = (onClick) => (
    <ViewMoreButton onClick={onClick}>Voir plus</ViewMoreButton>
  );

  return (
    <WrapperNoPadding variant="light" data-id="toto">
      <ViewMore
        button={viewMoreButton}
        query={query}
        stepSize={5}
        initialSize={3}
      >
        {children}
      </ViewMore>
    </WrapperNoPadding>
  );
}

export const ListItem: React.FC = ({ children }) => {
  return <Li> {children}</Li>;
};

const Li = styled.li`
  margin-left: 0;
`;

const WrapperNoPadding = styled(Wrapper)`
  padding: 0;
`;

const ViewMoreButton = styled(Button)`
  margin-top: ${theme.spacings.tiny};
  margin-bottom: ${theme.spacings.medium};
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex: 1 0 auto;
  }
`;
