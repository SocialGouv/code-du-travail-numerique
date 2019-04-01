---
name: BreadCrumbs
menu: Component
---
import "@cdt/css";
import { Playground, PropsTable } from "docz";
import BreadCrumbs from ".";

## \<BreadCrumbs/\>

<Playground>
  <BreadCrumbs />
  <BreadCrumbs
    entries={[
      <a href="/">Accueil</a>,
      <a href="/contacts">Vos contacts</a>,
      "En région"
    ]}
  />
</Playground>

<PropsTable of={BreadCrumbs} />
