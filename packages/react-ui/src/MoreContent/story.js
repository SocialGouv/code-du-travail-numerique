import React from "react";

import { Section } from "../layout/Section/index.js";
import { MoreContent } from "./index.js";

export default {
  component: MoreContent,
  title: "Components/MoreContent",
};

export const base = () => (
  <>
    <Section>
      <MoreContent title="Would you like to know more ?">
        <a
          title="then click here"
          href="https://www.youtube.com/watch?v=RvPRrIOa8Nw"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.youtube.com/watch?v=RvPRrIOa8Nw (nouvelle fenêtre)
        </a>
      </MoreContent>
    </Section>
    <Section>
      <MoreContent noLeftPadding title="Without left padding">
        text is not aligned with title but full left
      </MoreContent>
    </Section>
  </>
);
