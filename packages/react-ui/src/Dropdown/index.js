import PropTypes from "prop-types";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import useOnClickOutside from "use-onclickoutside";

import { box, colors, spacings } from "../theme.js";
import { displayInViewport } from "../utils";

export const Dropdown = ({ labelledBy, opener, ...props }) => {
  const [isDropdownDisplayed, setDropdownOpen] = useState(false);
  const dropdownWrapperRef = useRef(null);
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => {
    setDropdownOpen(false);
  });

  // handle focus outside Dropdown
  const onFocusOut = useCallback(
    function (e) {
      if (!this.contains(e.relatedTarget)) {
        setDropdownOpen(false);
      }
    },
    [setDropdownOpen]
  );

  // handle the Dropdown: make sure it is displayed in viewport
  // and removes it on click out / focus out
  const customRef = useCallback(
    (node) => {
      // first of all, clean listeners if node changes !
      dropdownRef.current &&
        dropdownRef.current.removeEventListener("focusout", onFocusOut);
      dropdownRef.current = node;
      // everytime the ref exists and changes
      if (node) {
        node.addEventListener("focusout", onFocusOut);
        displayInViewport(node, dropdownWrapperRef.current);
      }
    },
    [onFocusOut]
  );

  return (
    <DropdownWrapper ref={dropdownWrapperRef}>
      {opener(() => setDropdownOpen(true))}
      {isDropdownDisplayed && (
        <RootDropdown
          ref={customRef}
          aria-live="assertive"
          aria-labelledby={labelledBy}
          {...props}
        />
      )}
    </DropdownWrapper>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node,
  labelledBy: PropTypes.string,
  opener: PropTypes.func,
};

const DropdownWrapper = styled.div`
  position: relative;
`;

const RootDropdown = styled.div`
  position: absolute;
  z-index: 3;
  margin: ${spacings.small};
  padding: ${spacings.small};
  background-color: ${colors.white};
  border-radius: ${box.borderRadius};
  box-shadow: ${({ theme }) => box.shadow.large(theme.secondary)};
`;
