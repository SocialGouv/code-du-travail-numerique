import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { VerticalArrow as AccordionArrow } from "./components/VerticalArrow";

export const Accordion = ({
  items,
  disableStyles,
  variant,
  titleLevel,
  ...props
}) => {
  React.useEffect(() => {
    if (props?.preExpanded?.length && props.preExpanded[0]?.length) {
      try {
        const anchor = document?.querySelector(`#${props.preExpanded[0]}`);
        if (anchor) {
          anchor.scrollIntoView();
        }
      } catch (_) {
        props.preExpanded = [];
      }
    }
  }, [props.preExpanded]);

  return (
    <div className="fr-accordions-group" {...props}>
      {items.map(({ body, id, title }, index) => (
        <section className="fr-accordion" id={id} key={`${id}-${index}`}>
          <h3 className="fr-accordion__title">
            <button
              className="fr-accordion__btn"
              aria-expanded="false"
              aria-controls={`accordion-${id}-${index}`}
            >
              {title}
            </button>
          </h3>
          <div className="fr-collapse" id={`accordion-${id}-${index}`}>
            {body}
          </div>
        </section>
      ))}
    </div>
  );
};

Accordion.propTypes = {
  "data-testid": PropTypes.string,
  disableStyles: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.node.isRequired,
      icon: PropTypes.elementType,
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  preExpanded: PropTypes.arrayOf(PropTypes.string),
  titleLevel: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(["base", "tile", "hierarchy"]),
};

Accordion.defaultProps = {
  preExpanded: [],
  variant: "base",
};

const AccordionItemPanelContent = styled.div`
  & > div:first-child > *:first-child,
  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;

export { AccordionArrow };
