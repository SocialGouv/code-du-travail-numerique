---
name: Fiche
route: /
---

import "@cdt/css";
import { Playground, Props } from "docz";

import Fiche from "./components/Fiche";
import mock from "../\_\_tests\_\_/ficheData.mock.json"

## \<Fiche/\>

Afficher une fiche SP complète.

<Playground>
  <Fiche data={mock['$']}/>
</Playground>

<Props of={Fiche} />
