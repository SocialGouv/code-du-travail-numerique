---
name: SearchForm
menu: Component
---
import "@cdt/css";
import { Playground, Props } from "docz";
import SearchForm from ".";

## \<SearchForm/\>

<Playground>
  <SearchForm
    placeholder="Comment puis-je vous aider ?"
    onSubmit={query => alert(query)}
  />
</Playground>

<Props of={SearchForm} />
