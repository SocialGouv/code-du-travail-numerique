---
name: SearchForm
menu: Component
---
import "@cdt/css";
import { Playground, PropsTable } from "docz";
import SearchForm from ".";

## \<SearchForm/\>

<Playground>
  <SearchForm
    placeholder="Comment puis-je vous aider ?"
    onSubmit={query => alert(query)}
  />
</Playground>

<PropsTable of={SearchForm} />
