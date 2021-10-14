import React from "react";
import { HelpCircle } from "react-feather";

import { Section } from "../layout/Section";
import { Text } from "../Text";
import { DisclosureIcon } from "./index.js";

export default {
  component: DisclosureIcon,
  title: "Components/DisclosureIcon",
};

export const base = () => (
  <>
    <Section>
      <p>
        <Text fontSize="hsmall" fontWeight="700">
          Example:
        </Text>
      </p>
      <p>
        Info button
        <DisclosureIcon
          iconTitle="Find out what lies beneath"
          icon={<HelpCircle size="20" aria-label="?" />}
        >
          Here I am! I am the buried treasure!
        </DisclosureIcon>
      </p>
    </Section>
  </>
);
