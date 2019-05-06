---
name: ToggleButton
menu: Component
---
import { Playground, Props } from "docz";
import IconClose from "react-feather/dist/icons/x";
import IconEnlarge from "react-feather/dist/icons/maximize";
import ToggleButton from ".";

# ToggleButton

<Playground>
  <p>
    <ToggleButton>Default button</ToggleButton>
    {" "}
    <ToggleButton variant="default" disabled>Default button disabled</ToggleButton>
    {" "}
    <ToggleButton pressed>Default button pressed</ToggleButton>
  </p>
  <p>
    <ToggleButton variant="primary">Button Primary</ToggleButton>
    {" "}
    <ToggleButton variant="primary" disabled>Button Primary disabled</ToggleButton>
    {" "}
    <ToggleButton variant="primary" pressed>Button Primary pressed</ToggleButton>
  </p>
  <p>
    <ToggleButton variant="secondary">Button Secondary</ToggleButton>
    {" "}
    <ToggleButton variant="secondary" disabled>Button Secondary disabled</ToggleButton>
    {" "}
    <ToggleButton variant="secondary" pressed>Button Secondary pressed</ToggleButton>
  </p>
  <p>
    <ToggleButton variant="info">Button Info</ToggleButton>
    {" "}
    <ToggleButton variant="info" disabled>Button Info disabled</ToggleButton>
    {" "}
    <ToggleButton variant="info" pressed>Button Info pressed</ToggleButton>
  </p>
  <p>
    <ToggleButton variant="success">Button Success</ToggleButton>
    {" "}
    <ToggleButton variant="success" disabled>Button Success disabled</ToggleButton>
    {" "}
    <ToggleButton variant="success" pressed>Button Succes pressed</ToggleButton>
  </p>
  <p>
    <ToggleButton variant="warning">Button Warning</ToggleButton>
    {" "}
    <ToggleButton variant="warning" disabled>Button Warning disabled</ToggleButton>
    {" "}
    <ToggleButton variant="warning" pressed>Button Warning pressed</ToggleButton>
  </p>
  <p>
    <ToggleButton variant="danger">Button Danger</ToggleButton>
    {" "}
    <ToggleButton variant="danger" disabled>Button Danger disabled</ToggleButton>
    {" "}
    <ToggleButton variant="danger" pressed>Button Danger pressed</ToggleButton>
  </p>
  <p>
    <ToggleButton variant="link">Button link</ToggleButton>
  </p>
  <p>
    <ToggleButton variant="icon">
      <IconClose />
    </ToggleButton>
    <br />
    <br />
    <ToggleButton variant="icon">
      <IconEnlarge />
    </ToggleButton>
  </p>
</Playground>

<Props of={ToggleButton} />
