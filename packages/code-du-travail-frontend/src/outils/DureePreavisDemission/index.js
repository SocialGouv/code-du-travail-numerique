import React from "react";
import { Section, Container, Wrapper } from "@cdt/ui";
import { OnChange } from "react-final-form-listeners";

import { Wizard } from "../common/Wizard";
import { initialSteps, stepReducer } from "./stepReducer";

function Rules({ dispatch }) {
  return (
    <>
      <OnChange name="branche">
        {async value => {
          if (value && value !== "0000") {
            const module = await import(`./ccn/${value}`);
            dispatch({
              type: "add_branche",
              payload: module.default
            });
          } else {
            dispatch({ type: "remove_branche" });
          }
        }}
      </OnChange>
    </>
  );
}
function DureePreavisDemission() {
  return (
    <Section>
      <Container>
        <Wrapper size="large" variant="light">
          <h1>Simuler votre durée de préavis de démission</h1>
          <Wizard
            initialSteps={initialSteps}
            stepReducer={stepReducer}
            Rules={Rules}
          />
        </Wrapper>
      </Container>
    </Section>
  );
}

export { DureePreavisDemission };
