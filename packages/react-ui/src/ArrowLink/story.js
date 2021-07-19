import React from "react";

import { Section } from "../layout/Section/index.js";
import { Wrapper } from "../layout/Wrapper/index.js";
import { ArrowLink } from "./index.js";

export default {
  component: ArrowLink,
  title: "Components/ArrowLink",
};

export const base = () => (
  <>
    <Section>
      <Wrapper>
        I get some text in there and suddenly, I get a link !{" "}
        <ArrowLink href="#">Arrow is to the right by default</ArrowLink>, and
        then everything gets back to normal
      </Wrapper>
      <Wrapper style={{ width: "30rem" }}>
        <div>
          <ArrowLink arrowPosition="left" href="#">
            But it can be on the left
          </ArrowLink>
        </div>
        <div>
          <ArrowLink arrowPosition="left" href="#">
            I should get back to line and don’t overflow. Is it the case ?
          </ArrowLink>
        </div>
        <div>
          <ArrowLink arrowPosition="left" href="#">
            But it can be on the left
          </ArrowLink>
        </div>
      </Wrapper>
    </Section>
  </>
);
