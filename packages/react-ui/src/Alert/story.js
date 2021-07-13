import React from "react";

import { Section } from "../layout/Section/index.js";
import { Wrapper } from "../layout/Wrapper/index.js";
import { Alert, AlertWithIcon } from "./index.js";

export default {
  component: Alert,
  title: "Components/Alert",
};

export const AlertIcon = () => (
  <Section>
    <Wrapper>
      <Alert variant="primary">Simple alert (primary variant)</Alert>
    </Wrapper>
    <Wrapper>
      <Alert variant="secondary" size="small">
        <p>
          Minus quisquam nostrum tenetur occaecati quaerat natus quam. Minus
          impedit ullam id amet amet sequi aut animi magni. Consectetur in
          tempore voluptatem atque earum dolores non quia unde. Sint enim quis
          molestiae repellendus modi. Vel officiis odio et iure voluptas aut
          minima aut.
        </p>
        <p>
          Dolorum enim sit ut dolor temporibus provident cupiditate officiis et.
          Similique est aspernatur delectus aut architecto dolore occaecati
          rerum voluptas. Soluta culpa officia. Ut sapiente ut aut.
        </p>
      </Alert>
    </Wrapper>
    <Wrapper>
      <AlertWithIcon variant="primary">Alert with icon</AlertWithIcon>
    </Wrapper>
    <Wrapper>
      <AlertWithIcon variant="secondary" size="small">
        <p>
          Minus quisquam nostrum tenetur occaecati quaerat natus quam. Minus
          impedit ullam id amet amet sequi aut animi magni. Consectetur in
          tempore voluptatem atque earum dolores non quia unde. Sint enim quis
          molestiae repellendus modi. Vel officiis odio et iure voluptas aut
          minima aut.
        </p>
        <p>
          Dolorum enim sit ut dolor temporibus provident cupiditate officiis et.
          Similique est aspernatur delectus aut architecto dolore occaecati
          rerum voluptas. Soluta culpa officia. Ut sapiente ut aut.
        </p>
      </AlertWithIcon>
    </Wrapper>
  </Section>
);
