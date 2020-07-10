import { theme } from "@socialgouv/cdtn-ui";
import styled from "styled-components";

const { breakpoints, spacings } = theme;

// prefixing is only needed for grid properties/values
const prefixer = (css) =>
  `${css.replace(/grid-template/g, "grid").replace(/grid/g, "-ms-grid")}${css}`;

const getChildNumber = (index, emptyCells) => {
  const matchNumber = [...Array(index)].reduce((accumulator, unused, i) => {
    return emptyCells.includes(i + 1) ? accumulator + 1 : accumulator;
  }, 0);
  return index - matchNumber + 1;
};

/*
  The empty cell numbers must correspond to the following count:

  Imagine a 3 x 4 grid on desktop

    1  |  4  |  7  |  10
  ----------------------
    2  |  5  |  8  |  11
  ----------------------
    3  |  6  |  9  |  12

  On mobile, elements will be below each others, according to markup.
*/

export const MultiFieldRow = styled.div`
  ${({ gridRows, gridColumns }) =>
    prefixer(`
    display: grid;
    grid-template-rows: ${gridRows.join(" ")};
    grid-template-columns: ${gridColumns.join(" ")};
  `)}
  margin-top: ${spacings.base};
  margin-bottom: ${spacings.base};
  ${({ emptyCells, gridColumns, gridRows }) =>
    [...Array(gridColumns.length * gridRows.length)]
      .map((unused, i) => {
        if (emptyCells.includes(i + 1)) {
          return "";
        }
        return `
        & > *:nth-child(${getChildNumber(i, emptyCells)}) {
          ${prefixer(`
            grid-row: ${(i + 1) % gridRows.length ? 1 : 2};
            grid-column: ${Math.floor(i / gridRows.length + 1)};
          `)}
        }
      `;
      })
      .join("")}
  @media (max-width: ${breakpoints.mobile}) {
    display: block;
    margin-bottom: ${spacings.large};
  }
`;
