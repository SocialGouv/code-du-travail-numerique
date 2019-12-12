import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { Button, icons, theme } from "@socialgouv/react-ui";

import { Heading } from "./index";

const mobileMediaQuery = `(max-width: ${theme.breakpoints.mobile})`;

export function TextSearch({ containerId }) {
  const [hasButton, setButtonVisible] = useState(false);
  const [query, setQuery] = useState("");
  const formatQuery = useCallback(
    e => {
      setQuery(`"${e.target.value}"`);
    },
    [setQuery]
  );
  const mqlListener = useCallback(
    e => {
      setButtonVisible(!e.matches);
    },
    [setButtonVisible]
  );
  useEffect(() => {
    if (window.matchMedia) {
      const mql = window.matchMedia(mobileMediaQuery);
      setButtonVisible(!mql.matches);
      mql.addListener(mqlListener);
      return () => {
        mql.removeListener(mqlListener);
      };
    }
  }, [mqlListener]);
  return (
    <form
      target="_blank"
      action="https://beta.legifrance.gouv.fr/search/kali#kali"
    >
      <Heading>Recherche</Heading>
      <p>
        <label htmlFor="search-agreement">
          Effectuez une recherche dans le texte de la convention collective sur
          legifrance&nbsp;:
        </label>
      </p>
      <Box>
        <Input
          onChange={formatQuery}
          id="search-agreement"
          type="search"
          placeholder="congé exceptionnel, prime"
        />{" "}
        <input type="hidden" name="query" value={query} />
        <input type="hidden" name="cidKaliCont" value={containerId} />
        <input type="hidden" name="searchField" value="ALL" />
        <input type="hidden" name="searchType" value="ALL" />
        <input type="hidden" name="tab_selection" value="kali" />
        <input type="hidden" name="page" value="1" />
        {hasButton ? (
          <Button variant="secondary">Rechercher</Button>
        ) : (
          <SubmitIcon type="submit" small narrow variant="naked">
            <StyledSearchIcon />
          </SubmitIcon>
        )}
      </Box>
    </form>
  );
}

const Box = styled.div`
  position: relative;
  display: flex;
`;

const Input = styled.input`
  flex: 1 1 40%;
  @media ${mobileMediaQuery} {
    padding-right: 5.5rem;
  }
`;

const SubmitIcon = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  width: 3rem;
  height: 5.4rem;
  color: ${({ theme }) => theme.secondary};
`;

const StyledSearchIcon = styled(icons.Search)`
  width: 3rem;
  height: 3rem;
`;
