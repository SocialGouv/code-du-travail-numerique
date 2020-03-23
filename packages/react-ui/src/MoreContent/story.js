import React from "react";
import { MoreContent } from ".";

export default {
  component: MoreContent,
  title: "Components|MoreContent",
};

export const base = () => (
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
);
