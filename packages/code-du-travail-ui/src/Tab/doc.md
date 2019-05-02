---
name: Tab
menu: Component
---
import "@cdt/css";
import { Playground, Props } from "docz";
import Tabs from "../Tabs";
import Tab from ".";

# Tab

<Playground>
  <Tabs>
    <Tab>Informations</Tab>
    <Tab active={true}>Texte de base</Tab>
    <Tab>Textes attachés</Tab>
    <Tab>Textes salaires</Tab>
    <Tab>Recherche</Tab>
  </Tabs>
</Playground>

<Props of={Tab} />
