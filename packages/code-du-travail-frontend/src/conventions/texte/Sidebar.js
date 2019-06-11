import React from "react";
import PropTypes from "prop-types";
import { Section, Wrapper } from "@cdt/ui";
import SummaryTitle from "./SummaryTitle";
import TocList from "./toc/TocList";

const Sidebar = ({ node, onSummaryTitleToggleExpanded, tocbotEnabled }) => {
  return (
    <Section className="js-toc">
      <Wrapper variant="dark">
        <TocList>
          {node.children.map((child, idx) => (
            <SummaryTitle
              key={idx}
              onToggleExpanded={onSummaryTitleToggleExpanded}
              tocbotEnabled={tocbotEnabled}
              {...child}
            >
              {child.children}
            </SummaryTitle>
          ))}
        </TocList>
      </Wrapper>
    </Section>
  );
};

Sidebar.propTypes = {
  node: PropTypes.shape({
    children: PropTypes.arrayOf(
      PropTypes.shape({
        children: PropTypes.array
      })
    )
  }).isRequired,
  onSummaryTitleToggleExpanded: PropTypes.func.isRequired
};

export default Sidebar;
