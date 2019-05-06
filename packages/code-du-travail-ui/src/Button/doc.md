---
name: Button
menu: Component
---
import { Playground, Props } from "docz";
import IconClose from "react-feather/dist/icons/x";
import IconEnlarge from "react-feather/dist/icons/maximize";
import Button from ".";

# Button

<Playground>
  <p>
    <Button>Default button</Button>
    {" "}
    <Button variant="default" disabled>Default button disabled</Button>
    {" "}
    <Button pressed>Default button pressed</Button>
  </p>
  <p>
    <Button variant="primary">Button Primary</Button>
    {" "}
    <Button variant="primary" disabled>Button Primary disabled</Button>
    {" "}
    <Button variant="primary" pressed>Button Primary pressed</Button>
  </p>
  <p>
    <Button variant="secondary">Button Secondary</Button>
    {" "}
    <Button variant="secondary" disabled>Button Secondary disabled</Button>
    {" "}
    <Button variant="secondary" pressed>Button Secondary pressed</Button>
  </p>
  <p>
    <Button variant="info">Button Info</Button>
    {" "}
    <Button variant="info" disabled>Button Info disabled</Button>
    {" "}
    <Button variant="info" pressed>Button Info pressed</Button>
  </p>
  <p>
    <Button variant="success">Button Success</Button>
    {" "}
    <Button variant="success" disabled>Button Success disabled</Button>
    {" "}
    <Button variant="success" pressed>Button Succes pressed</Button>
  </p>
  <p>
    <Button variant="warning">Button Warning</Button>
    {" "}
    <Button variant="warning" disabled>Button Warning disabled</Button>
    {" "}
    <Button variant="warning" pressed>Button Warning pressed</Button>
  </p>
  <p>
    <Button variant="danger">Button Danger</Button>
    {" "}
    <Button variant="danger" disabled>Button Danger disabled</Button>
    {" "}
    <Button variant="danger" pressed>Button Danger pressed</Button>
  </p>
  <p>
    <Button variant="link">Button link</Button>
  </p>
  <p>
    <Button variant="icon">
      <IconClose />
    </Button>
    <br />
    <br />
    <Button variant="icon">
      <IconEnlarge />
    </Button>
  </p>
</Playground>

<Props of={Button} />
