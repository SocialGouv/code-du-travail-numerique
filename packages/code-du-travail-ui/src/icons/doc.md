---
name: Icons
menu: Component
---
import "@cdt/css";
import styled from "styled-components";
import { Playground, Props } from "docz";
import * as icons from ".";

# Icons

## Basics

We use the icons available [here](https://feathericons.com/) wrapped into react
components thanks to this package: [react-feather](https://github.com/feathericons/react-feather)

## Customs

However, we also have custom icons: 
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
