import React from "react";

import { Section } from "../layout/Section";
import { ViewMore } from ".";

export default {
  component: ViewMore,
  title: "Components/ViewMore",
};

const arrayOfData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const base = () => (
  <>
    <Section>
      <ViewMore>
        {arrayOfData.map((data) => (
          <li key={`example-1-${data}`}>
            <a href="/">{`link-1-${data}`}</a>
          </li>
        ))}
      </ViewMore>
    </Section>
  </>
);
