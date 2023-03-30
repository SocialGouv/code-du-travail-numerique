import React from "react";

import { Holidays, Salary, Time } from "../icons/index.js";
import { Section } from "../layout/Section/index.js";
import { Tile } from "./index.js";

export default {
  argTypes: {
    handler: { action: "clicked" },
  },
  component: Tile,
  title: "Components/Tile",
};

export const base = ({ handler }) => (
  <div
    style={{
      alignItems: "stretch",
      display: "flex",
      flexDirection: "column",
      maxWidth: "100%",
      width: "270px",
    }}
  >
    <Section>
      <Tile title="Basic tile" />
    </Section>
    <Section>
      <Tile icon={Time} title="Basic tile">
        With some basic content only to see how it behaves
      </Tile>
    </Section>
    <Section>
      <Tile custom title="Custom tile with purposely long title">
        Make sure there is no collision with custom icon. Beware of mobile.
      </Tile>
    </Section>
    <Section>
      <Tile icon={Salary} title="Tile with an icon" />
    </Section>
    <Section>
      <Tile striped title="Tile with an stripe" />
    </Section>
    <Section>
      <Tile icon={Holidays} custom title="Tile custom with an icon">
        And some basic content only to see how it behaves
      </Tile>
    </Section>
    <Section>
      <Tile
        title="Button tile"
        icon={Holidays}
        onClick={() => handler("button tile with icon clicked")}
      >
        It should look good ! And everything should be centered
      </Tile>
    </Section>
  </div>
);

export const wide = () => (
  <div
    style={{
      alignItems: "stretch",
      display: "flex",
      flexDirection: "column",
      maxWidth: "100%",
      width: "600px",
    }}
  >
    <Section>
      <Tile wide title="Wide tile" subtitle="Some theme here " />
    </Section>
    <Section>
      <Tile wide title="Wide tile">
        With some basic content only to see how it behaves
      </Tile>
    </Section>
    <Section>
      <Tile
        wide
        custom
        title="Custom tile with purposely long title to see how it goes with custom icon"
      >
        Make sure there is no collision with custom icon. Beware of mobile.
      </Tile>
    </Section>
    <Section>
      <Tile
        wide
        custom
        subtitle="Custom tile with purposely long title to see how it goes with custom icon"
        title="Some title"
      >
        Make sure there is no collision with custom icon. Beware of mobile.
      </Tile>
    </Section>
  </div>
);
