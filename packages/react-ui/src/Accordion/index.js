import { fr } from "@codegouvfr/react-dsfr";
import { Accordion } from "@codegouvfr/react-dsfr/Accordion";
import PropTypes from "prop-types";
import React from "react";

import { VerticalArrow as AccordionArrow } from "./components/VerticalArrow";

export const AccordionCustom = ({ items, ...props }) => {
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
    <div className={fr.cx("fr-accordions-group")}>
      {items.map(({ body, id, title }, index) => (
        <div id={id} key={`${id}-${index}`}>
          <Accordion label={title}>{body}</Accordion>
        </div>
      ))}
    </div>
  );
};

AccordionCustom.propTypes = {
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

AccordionCustom.defaultProps = {
  preExpanded: [],
  variant: "base",
};

export { AccordionArrow };
