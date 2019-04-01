---
name: Icons
menu: Component
---
import "@cdt/css";
import styled from "styled-components";
import { Playground, Props } from "docz";
import * as icons from ".";

## Playground

<Playground>
  {
    () => {
      return Object.entries(icons).map(([name, Icon]) => <div key={name}>
          <p>{name}</p>
          <Icon width="3rem" />
        </div>
      )
    }
  }
</Playground>
