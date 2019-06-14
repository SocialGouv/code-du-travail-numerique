import React from "react";
import PropTypes from "prop-types";
import { Section, Wrapper } from "@cdt/ui";
import SummaryTitle from "./SummaryTitle";
import TocList from "./toc/TocList";

const Sidebar = ({ node, onSummaryTitleToggleExpanded, tocbotEnabled }) => {
  return (
    <Section className="js-toc">
      {/* js-toc is the base class used by tocbot */}
      <Wrapper variant="dark">
        <TocList>
          {node.children.map(childNode => (
            <SummaryTitle
              key={childNode.data.id}
              onToggleExpanded={onSummaryTitleToggleExpanded}
              tocbotEnabled={tocbotEnabled}
              node={childNode}
            />
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
        data: PropTypes.shape({
          id: PropTypes.string
        })
      })
    )
  }).isRequired,
  onSummaryTitleToggleExpanded: PropTypes.func.isRequired
};

export default Sidebar;
