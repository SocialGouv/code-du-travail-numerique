---
name: ToggleButton
menu: Component
---
import { Playground, Props } from "docz";
import ToggleButton from ".";

# ToggleButton

<Playground>
  <p>
    <ToggleButton>Default button</ToggleButton>
    {" "}
    <ToggleButton pressed>Default button</ToggleButton>
    {" "}
    <ToggleButton disabled>Default button</ToggleButton>
    {" "}
    <ToggleButton pressed disabled>Default button</ToggleButton>
  </p>
  <p>
    <ToggleButton kind="primary">Button Primary</ToggleButton>
    {" "}
    <ToggleButton kind="primary" pressed>Button Primary</ToggleButton>
    {" "}
    <ToggleButton kind="primary" disabled>Button Primary</ToggleButton>
    {" "}
    <ToggleButton kind="primary" pressed disabled>Button Primary</ToggleButton>
    
  </p>
  <p>
    <ToggleButton kind="secondary">Button Secondary</ToggleButton>
    {" "}
    <ToggleButton kind="secondary" pressed>Button Secondary</ToggleButton>
    {" "}
    <ToggleButton kind="secondary" disabled>Button Secondary</ToggleButton>
    {" "}
    <ToggleButton kind="secondary" disabled pressed>Button Secondary</ToggleButton>
  </p>
  <p>
    <ToggleButton kind="info">Button Info</ToggleButton>
    {" "}
    <ToggleButton kind="info" pressed>Button Info</ToggleButton>
    {" "}
    <ToggleButton kind="info" disabled>Button Info</ToggleButton>
    {" "}
    <ToggleButton kind="info" disabled pressed>Button Info</ToggleButton>
  </p>
  <p>
    <ToggleButton kind="success">Button Success</ToggleButton>
    {" "}
    <ToggleButton kind="success" pressed>Button Success</ToggleButton>
    {" "}
    <ToggleButton kind="success" disabled>Button Success</ToggleButton>
    {" "}
    <ToggleButton kind="success" disabled pressed>Button Success</ToggleButton>
  </p>
  <p>
    <ToggleButton kind="warning">Button Warning</ToggleButton>
    {" "}
    <ToggleButton kind="warning" pressed>Button Warning</ToggleButton>
    {" "}
    <ToggleButton kind="warning" disabled>Button Warning</ToggleButton>
    {" "}
    <ToggleButton kind="warning" disabled pressed>Button Warning</ToggleButton>
  </p>
  <p>
    <ToggleButton kind="danger">Button Danger</ToggleButton>
    {" "}
    <ToggleButton kind="danger" pressed>Button Danger</ToggleButton>
    {" "}
    <ToggleButton kind="danger" disabled>Button Danger</ToggleButton>
    {" "}
    <ToggleButton kind="danger" disabled pressed>Button Danger</ToggleButton>
  </p>
</Playground>

<Props of={ToggleButton} />
