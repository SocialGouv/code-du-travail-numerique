---
name: Button
menu: Component
---
import "@cdt/css";
import { Playground, Props } from "docz";
import Button from ".";

## \<Button/\>

<Playground>
  <Button>Button</Button>
  <br />
  <br />
  <Button primary>Button primary</Button>
  <br />
  <br />
  <Button secondary>Button secondary</Button>
  <br />
  <br />
  <Button warning>Button warning</Button>
  <br />
  <br />
  <Button success>Button success</Button>
  <br />
  <br />
  <Button info>Button info</Button>
  <br />
  <br />
  <Button danger>Button danger</Button>
  <br />
  <br />
  <Button link>Button link</Button>
  <br />
  <br />
  <Button link className="link">
    Button link
  </Button>
</Playground>

<Props of={Button} />
