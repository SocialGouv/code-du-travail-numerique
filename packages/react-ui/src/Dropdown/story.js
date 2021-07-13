import React from "react";

import { Button } from "../Button/index.js";
import { Section } from "../layout/Section/index.js";
import { Dropdown } from "./index.js";

export default {
  component: Dropdown,
  title: "Components/Dropdown",
};

export const base = () => (
  <>
    <Section>
      <div style={{ display: "flex" }}>
        <Dropdown
          opener={(openDropdown) => (
            <Button onClick={() => openDropdown()}>
              Click me to open dropdown
            </Button>
          )}
        >
          I am opened, yay !
          <br />
          Ideally, I should have some focusable element inside so that the&nbsp;
          <code>focusout</code> event can trigger the removal of the dropdown.
          <button>Any button will do</button>
        </Dropdown>
      </div>
    </Section>
  </>
);
