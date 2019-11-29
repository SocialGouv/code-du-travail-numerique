import React from "react";
import { Button, Heading } from "@socialgouv/react-ui";

export function TextSearch({ containerId }) {
  return (
    <form action="https://beta.legifrance.gouv.fr/search/kali#kali">
      <label htmlFor="search-agreement">
        <Heading>Recherche</Heading>
      </label>
      <p>
        <input
          id="search-agreement"
          type="search"
          name="query"
          placeholder="congé exceptionnel, prime"
        />{" "}
        <input type="hidden" name="cidKaliCont" value={containerId} />
        <input type="hidden" name="searchField" value="ALL" />
        <input type="hidden" name="searchType" value="ALL" />
        <input type="hidden" name="tab_selection" value="kali" />
        <input type="hidden" name="page" value="1" />
        <Button variant="secondary">Rechercher</Button>
      </p>
    </form>
  );
}
