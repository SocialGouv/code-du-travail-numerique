import React from "react";
import PropTypes from "prop-types";
import { Section, Wrapper } from "@cdt/ui";
import SummaryTitle from "./SummaryTitle";

const Sidebar = ({ topNode, onSummaryTitleToggleExpanded }) => {
  return (
    <Section>
      <Wrapper variant="dark">
        {topNode.children.map((child, idx) => (
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
  topNode: PropTypes.shape({
    children: PropTypes.arrayOf(
      PropTypes.shape({
        children: PropTypes.array
      })
    )
  }).isRequired,
  onSummaryTitleToggleExpanded: PropTypes.func.isRequired
};

export default Sidebar;
