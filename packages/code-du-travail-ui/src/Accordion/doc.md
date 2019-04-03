---
name: Accordion
menu: Component
---

import "@cdt/css";
import { Playground, Props } from "docz";
import Accordion from ".";

# Accordion

<Playground>
  <Accordion items={[{ title: "This is the title of a single item accordion", body: "this is the body" }]}/>
  <Accordion items={[
    { title: "This is the title 1", body: "this is the body" },
    { title: "This is the title 2", body: "this is the body" },
  ]}/>
</Playground>

<Props of={Accordion} />
