import React from "react";
import PropTypes from "prop-types";
import { Section, Wrapper } from "@cdt/ui";
import SummaryTitle from "./SummaryTitle";

const Sidebar = ({ node, onSummaryTitleToggleExpanded }) => {
  return (
    <Section className="js-toc">
      <Wrapper variant="dark" className="toc-list">
        {node.children.map((child, idx) => (
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
