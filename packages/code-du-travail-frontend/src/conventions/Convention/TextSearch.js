import {
  Button,
  icons,
  IconStripe,
  Input,
  theme,
  Title,
} from "@socialgouv/cdtn-ui";
import { push as matopush } from "@socialgouv/matomo-next";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

const { spacings } = theme;

export function TextSearch({ containerId, convention }) {
  const [query, setQuery] = useState("");
  const formatQuery = useCallback(
    (e) => {
      setQuery(`"${e.target.value}"`);
    },
    [setQuery]
  );
  const trackSearch = useCallback(() => {
    matopush(["trackEvent", "pagecc_searchcc", convention.shortTitle, query]);
  }, [query, convention]);
  return (
    <>
      <Title
        subtitle="Recherchez par mots clés dans le texte de la convention collective sur le site Légifrance."
        shift={spacings.larger}
      >
        Recherche dans la convention collective
      </Title>
      <Form
        target="_blank"
        action="https://legifrance.gouv.fr/search/kali#kali"
        onSubmit={trackSearch}
      >
        <Box>
          <StyledInput
            onChange={formatQuery}
            id="search-agreement"
            type="search"
            autoComplete="off"
            name="rawQuery"
            placeholder="Congés exceptionnels, prime"
          />
          <input type="hidden" name="query" value={query} />
          <input type="hidden" name="cidKaliCont" value={containerId} />
          <input type="hidden" name="searchField" value="ALL" />
          <input type="hidden" name="searchType" value="ALL" />
          <input type="hidden" name="tab_selection" value="kali" />
          <input type="hidden" name="page" value="1" />
          <SubmitIcon
            type="submit"
            small
            narrow
            variant="naked"
            aria-label="Recherchez dans la collection collective"
            title="Lancer une recherche"
          >
            <StyledSearchIcon aria-label="rechercher (nouvelle fenêtre)" />
          </SubmitIcon>
        </Box>
      </Form>
      <IconStripe centered icon={icons.Warning}>
        Selon le thème, un accord collectif d’entreprise peut prévoir des règles
        différentes par rapport à la convention collective.{" "}
        <Link href="/droit-du-travail#hierarchie">
          <a>En savoir plus</a>
        </Link>
        .
      </IconStripe>
    </>
  );
}

const Box = styled.div`
  position: relative;
  display: flex;
`;

const StyledInput = styled(Input)`
  width: 100%;
  input {
    padding-right: 5rem;
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

const Form = styled.form`
  margin-bottom: ${spacings.xmedium};
`;

const StyledSearchIcon = styled(icons.Search)`
  width: 3rem;
  height: 3rem;
`;
