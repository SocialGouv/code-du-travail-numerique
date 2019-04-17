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
    <ToggleButton primary>Button Primary</ToggleButton>
    {" "}
    <ToggleButton primary pressed>Button Primary</ToggleButton>
    {" "}
    <ToggleButton primary disabled>Button Primary</ToggleButton>
    {" "}
    <ToggleButton primary pressed disabled>Button Primary</ToggleButton>
    
  </p>
  <p>
    <ToggleButton secondary>Button Secondary</ToggleButton>
    {" "}
    <ToggleButton secondary pressed>Button Secondary</ToggleButton>
    {" "}
    <ToggleButton secondary disabled>Button Secondary</ToggleButton>
    {" "}
    <ToggleButton secondary disabled pressed>Button Secondary</ToggleButton>
  </p>
  <p>
    <ToggleButton info>Button Info</ToggleButton>
    {" "}
    <ToggleButton info pressed>Button Info</ToggleButton>
    {" "}
    <ToggleButton info disabled>Button Info</ToggleButton>
    {" "}
    <ToggleButton info disabled pressed>Button Info</ToggleButton>
  </p>
  <p>
    <ToggleButton success>Button Success</ToggleButton>
    {" "}
    <ToggleButton success pressed>Button Success</ToggleButton>
    {" "}
    <ToggleButton success disabled>Button Success</ToggleButton>
    {" "}
    <ToggleButton success disabled pressed>Button Success</ToggleButton>
  </p>
  <p>
    <ToggleButton warning>Button Warning</ToggleButton>
    {" "}
    <ToggleButton warning pressed>Button Warning</ToggleButton>
    {" "}
    <ToggleButton warning disabled>Button Warning</ToggleButton>
    {" "}
    <ToggleButton warning disabled pressed>Button Warning</ToggleButton>
  </p>
  <p>
    <ToggleButton danger>Button Danger</ToggleButton>
    {" "}
    <ToggleButton danger pressed>Button Danger</ToggleButton>
    {" "}
    <ToggleButton danger disabled>Button Danger</ToggleButton>
    {" "}
    <ToggleButton danger disabled pressed>Button Danger</ToggleButton>
  </p>
</Playground>

<Props of={ToggleButton} />
