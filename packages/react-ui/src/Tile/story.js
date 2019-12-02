import React from "react";

import { Section } from "../layout/Section";
import { Holidays, Time, Salary } from "../icons";
import { Tile } from ".";

export default {
  component: Tile,
  title: "Components|Tile"
};

export const base = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      width: "270px",
      maxWidth: "100%"
    }}
  >
    <Section>
      <Tile href="#" title="Basic tile" />
    </Section>
    <Section>
      <Tile href="#" icon={Time} title="Basic tile">
        With some basic content only to see how it behaves
      </Tile>
    </Section>
    <Section>
      <Tile href="#" custom title="Custom tile with purposely long title">
        Make sure there is no collision with custom icon. Beware of mobile.
      </Tile>
    </Section>
    <Section>
      <Tile href="#" icon={Salary} title="Tile with an icon" />
    </Section>
    <Section>
      <Tile href="#" icon={Holidays} custom title="Tile custom with an icon">
        And some basic content only to see how it behaves
      </Tile>
    </Section>
    <Section>
      <Tile title="Button tile, no href prop, should have an onClick" />
    </Section>
  </div>
);

export const wide = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      width: "600px",
      maxWidth: "100%"
    }}
  >
    <Section>
      <Tile wide href="#" title="Wide tile" subtitle="Some theme here " />
    </Section>
    <Section>
      <Tile wide href="#" title="Wide tile">
        With some basic content only to see how it behaves
      </Tile>
    </Section>
    <Section>
      <Tile
        wide
        href="#"
        custom
        title="Custom tile with purposely long title to see how it goes with custom icon"
      >
        Make sure there is no collision with custom icon. Beware of mobile.
      </Tile>
    </Section>
    <Section>
      <Tile
        wide
        href="#"
        custom
        subtitle="Custom tile with purposely long title to see how it goes with custom icon"
        title="Some title"
      >
        Make sure there is no collision with custom icon. Beware of mobile.
      </Tile>
    </Section>
    <Section>
      <Tile wide title="Button tile, no href prop, should have an onClick" />
    </Section>
  </div>
);
