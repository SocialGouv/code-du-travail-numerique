import React from "react";
import { Section } from "@cdt/ui";
import SummaryTitle from "./SummaryTitle";

const Sidebar = ({ rootNode, onSummaryTitleToggleExpanded }) => {
  return (
    <Section className="wrapper-dark">
      {rootNode.children.map((child, idx) => (
        <SummaryTitle
          key={idx}
          onToggleExpanded={onSummaryTitleToggleExpanded}
          {...child}
        >
          {child.children}
        </SummaryTitle>
      ))}
    </Section>
  );
};

export default Sidebar;
