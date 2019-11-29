import React, { useState, useCallback } from "react";
import { CardList, Heading, Tile, theme } from "@socialgouv/react-ui";
import styled from "styled-components";
import { blocs } from "./blocs.data";
function getBlocLabel(id) {
  return blocs[id];
}
function getArticleUrl({ id, containerId }) {
  return `https://beta.legifrance.gouv.fr/conv_coll/id/${id}/?idConteneur=${containerId}`;
}
function Articles({ blocs, containerId }) {
  const options = [...new Set(blocs.map(({ bloc }) => bloc))];
  const [theme, setTheme] = useState(options[0]);
  const { articles } = blocs.find(({ bloc }) => bloc === theme);

  const onChangeTheme = useCallback(event => {
    setTheme(event.target.value);
  }, []);
  return (
    <>
      <Heading>Articles par themes</Heading>
      <Label htmlFor="article-bloc">
        Sélectionnez un thème pour consulter les articles de la convention
        collective&nbsp;:
      </Label>
      {/* eslint-disable-next-line jsx-a11y/no-onchange */}
      <select id="article-bloc" onChange={onChangeTheme}>
        {options.map(value => (
          <option key={value} value={value}>
            {getBlocLabel(value)}
          </option>
        ))}
      </select>
      <CardList title="" columns={3}>
        {articles.map(({ title, id }) => (
          <StyledTile key={id} href={getArticleUrl({ id, containerId })}>
            Article {title}
          </StyledTile>
        ))}
      </CardList>
    </>
  );
}

export { Articles };

const { spacings } = theme;

const StyledTile = styled(Tile)`
  min-height: 80px;
`;
const Label = styled.label`
  display: inline-block;
  margin-bottom: ${spacings.medium};
`;
