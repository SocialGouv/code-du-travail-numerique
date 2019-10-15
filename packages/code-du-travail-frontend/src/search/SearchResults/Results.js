import React from "react";
import { withRouter } from "next/router";
import styled from "styled-components";
import { List, ListItem } from "@cdt/ui-old";
import { Container, theme } from "@socialgouv/react-ui";

import { ResultContent } from "./ResultContent";

export const Results = withRouter(({ id, isSearch, items, query, router }) => {
  const isThemePage = router.pathname.match(/^\/themes\//);
  return (
    <Container narrow>
      {isSearch ? (
        <H1 id={id}>{`Résultats pour "${query}"`}</H1>
      ) : (
        <h2 id={id}>{"Contenu correspondant"}</h2>
      )}
      <List>
        {items.map((item, i) => {
          const { slug } = item;
          return (
            <ListItem key={slug}>
              <ResultContent
                {...item}
                query={query}
                focused={i === 0}
                isThemePage={isThemePage}
              />
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
});

const { spacing } = theme;

const H1 = styled.h1`
  margin: ${spacing.interComponent} 0;
`;
