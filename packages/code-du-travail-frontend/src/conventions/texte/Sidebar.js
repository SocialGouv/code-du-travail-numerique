import React from "react";
import { Section, Wrapper } from "@cdt/ui";
import SummaryTitle from "./SummaryTitle";

const Sidebar = ({ rootNode, onSummaryTitleToggleExpanded }) => {
  return (
    <Section>
      <Wrapper variant="dark">
        {rootNode.children.map((child, idx) => (
          <SummaryTitle
            key={idx}
            onToggleExpanded={onSummaryTitleToggleExpanded}
            {...child}
          >
            {child.children}
          </SummaryTitle>
        ))}
      </Wrapper>
    </Section>
  );
};

export default Sidebar;
