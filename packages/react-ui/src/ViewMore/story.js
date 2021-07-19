import React from "react";
import styled from "styled-components";

import { Button } from "../Button/index.js";
import { Section } from "../layout/Section/index.js";
import { Title } from "../Titles/Title/index.js";
import { ViewMore } from "./index.js";

const WeirdListContainer = styled.ul`
  border: 1px solid red;
`;
const StyledButton = styled(Button)`
  align-self: flex-start;
`;

export default {
  argTypes: {
    handler: { action: "clicked" },
  },
  component: ViewMore,
  title: "Components/ViewMore",
};

const arrayOfData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const base = ({ handler }) => (
  <>
    <Section>
      <Title subtitle="By default, the show more button will display all the other results">
        Default props
      </Title>
      <ViewMore>
        {arrayOfData.map((data) => (
          <li key={`example-1-${data}`}>
            <a href="/">{`link-1-${data}`}</a>
          </li>
        ))}
      </ViewMore>
    </Section>
    <Section>
      <Title subtitle="How many elements do you want to display before click ? On click ?">
        With some other props
      </Title>
      <ViewMore initialSize={4} stepSize={2}>
        {arrayOfData.map((data) => (
          <li key={`example-2-${data}`}>
            <a href="/">{`link-1-${data}`}</a>
          </li>
        ))}
      </ViewMore>
    </Section>
    <Section>
      <Title subtitle="You can decide the tolerance to display or not the button according to the number of elements">
        With some props
      </Title>
      <ViewMore initialSize={9} stepSize={4}>
        {arrayOfData.map((data) => (
          <li key={`example-3-${data}`}>
            <a href="/">{`link-1-${data}`}</a>
          </li>
        ))}
      </ViewMore>
    </Section>
    <Section>
      <Title subtitle="You can provide you own list wrapper and button">
        Custom wrapper and button
      </Title>
      <ViewMore
        listContainer={WeirdListContainer}
        button={(onClick) => (
          <StyledButton
            variant="flat"
            onClick={() => {
              handler("Nice click !");
              onClick();
            }}
          >
            Different button
          </StyledButton>
        )}
      >
        {arrayOfData.map((data) => (
          <li key={`example-4-${data}`}>
            <a href="/">{`link-1-${data}`}</a>
          </li>
        ))}
      </ViewMore>
    </Section>
  </>
);
