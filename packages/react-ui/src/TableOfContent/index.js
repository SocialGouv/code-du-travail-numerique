import PropTypes from "prop-types";
import React, { useEffect } from "react";
import styled from "styled-components";

import { breakpoints, colors, fonts, spacings } from "../theme.js";
import { useTOCReducer } from "./useTOCReducer.js";

const initialState = {
  titles: [],
};

export const TableOfContent = ({
  contents,
  observerArea,
  threshold,
  ...props
}) => {
  const { observerCallback, setTitles, titles } = useTOCReducer(initialState);

  useEffect(() => {
    const titles = [];
    if (contents && contents.length) {
      contents.map(({ label, id }) => {
        if (label && !id) {
          return titles.push({ isSection: true, label });
        }
        if (id) {
          const titleElement = document.getElementById(id);
          if (titleElement) {
            titles.push({
              active: false,
              element: titleElement,
              id,
            });
          }
        }
      });
    }
    setTitles(titles);
  }, [contents, setTitles]);

  useEffect(() => {
    let observer = false;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(observerCallback, {
        rootMargin: `-${observerArea.top} 0px -${observerArea.bottom} 0px`,
        threshold,
      });
      titles.forEach((title) => {
        if (title.element) {
          observer.observe(title.element);
        }
      });
    }

    return () => {
      observer && observer.disconnect();
    };
  }, [titles, observerArea, observerCallback, threshold]);

  return (
    <div {...props}>
      {titles.map(({ isSection, active, element, label, id }) =>
        isSection ? (
          <TableSection key={`menu-${label}`}>{label}</TableSection>
        ) : (
          <TableItem active={active} key={`menu-${id}`} href={`#${element.id}`}>
            {element.getAttribute("data-short-title") || element.textContent}
          </TableItem>
        )
      )}
    </div>
  );
};

TableOfContent.propTypes = {
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  observerArea: PropTypes.shape({
    bottom: PropTypes.string,
    top: PropTypes.string,
  }),
  threshold: PropTypes.arrayOf(PropTypes.string),
};

TableOfContent.defaultProps = {
  ids: [],
  observerArea: { bottom: "70%", top: "0px" },
  threshold: ["1"],
};

const TableSection = styled.span`
  display: block;
  padding: ${spacings.base} 0 ${spacings.small} 0;
  color: ${colors.altText};
  font-weight: bold;
  font-size: ${fonts.sizes.small};
  font-family: "Open Sans", sans-serif;
  text-transform: uppercase;
`;

const TableItem = styled.a`
  display: block;
  padding: ${spacings.tiny} 0;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  text-decoration: none;
  @media (max-width: ${breakpoints.tablet}) {
    font-weight: normal;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
`;
