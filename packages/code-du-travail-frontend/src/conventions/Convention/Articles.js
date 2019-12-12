import React, { useState, useCallback } from "react";
import { CardList, Tile, theme } from "@socialgouv/react-ui";
import styled from "styled-components";

import { Heading } from "./index";
import { blocs } from "./blocs.data";

function getBlocLabel(id) {
  return blocs[id];
}

function getArticleUrl({ id, containerId }) {
  return `https://beta.legifrance.gouv.fr/conv_coll/id/${id}/?idConteneur=${containerId}`;
}

function Articles({ blocs, containerId }) {
  const options = [...new Set(blocs.map(({ bloc }) => bloc))];
  const [theme, setTheme] = useState();
  const bloc = blocs.find(({ bloc }) => bloc === theme);

  const onChangeTheme = useCallback(event => {
    setTheme(event.target.value);
  }, []);

  return (
    <>
      <Heading>Articles par themes</Heading>
      <Label htmlFor="article-bloc">
        Sélectionnez un thème parmi ceux traités dans la convention collective
        pour consulter les articles qui y sont rattachés&nbsp;:
      </Label>
      {/* eslint-disable-next-line jsx-a11y/no-onchange */}
      <select id="article-bloc" onChange={onChangeTheme} defaultValue="none">
        <option disabled value="none">
          ...
        </option>
        {options.map(value => (
          <option key={value} value={value}>
            {getBlocLabel(value)}
          </option>
        ))}
      </select>
      {bloc && (
        <CardList title="" columns={3}>
          {bloc.articles.map(({ title, id, section }) => (
            <Tile
              key={id}
              wide
              href={getArticleUrl({ id, containerId })}
              title={`Article ${title}`}
              subtitle={section}
            />
          ))}
        </CardList>
      )}
    </>
  );
}

export { Articles };

const { spacings } = theme;

const Label = styled.label`
  display: inline-block;
  margin-bottom: ${spacings.medium};
`;
