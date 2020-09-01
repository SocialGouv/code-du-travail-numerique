import React from "react";

import { Section } from "../layout/Section";
import { MoreContent } from ".";

export default {
  component: MoreContent,
  title: 'Components/MoreContent',
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
          https://www.youtube.com/watch?v=RvPRrIOa8Nw
        </a>
      </MoreContent>
    </Section>
    <Section>
      <MoreContent title="Without left padding">
        text is not aligned with title but full left
      </MoreContent>
    </Section>
  </>
);
