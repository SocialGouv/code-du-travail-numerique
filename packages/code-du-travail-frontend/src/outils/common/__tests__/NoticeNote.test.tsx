import { render } from "@testing-library/react";
import React from "react";
import { NoticeNote } from "../NoticeNote";

describe("<NoticeNote />", () => {
  it.each`
    numberOfElements | expected
    ${3}             | ${/1/}
    ${3}             | ${/2/}
    ${3}             | ${/3/}
    ${1}             | ${/\*/}
  `(
    "should render a list for each number of elements $numberOfElements",
    ({ numberOfElements, expected }) => {
      const { getByText } = render(
        <NoticeNote isList numberOfElements={numberOfElements} />
      );
      expect(getByText(expected)).toBeInTheDocument();
    }
  );

  it.each`
    numberOfElements | currentElement | expected
    ${3}             | ${1}           | ${/1/}
    ${3}             | ${2}           | ${/2/}
    ${1}             | ${1}           | ${/\*/}
  `(
    "should render $expected for each current element $currentElement",
    ({ numberOfElements, currentElement, expected }) => {
      const { getByText } = render(
        <NoticeNote
          currentElement={currentElement}
          numberOfElements={numberOfElements}
        />
      );
      expect(getByText(expected)).toBeInTheDocument();
    }
  );

  it.each`
    numberOfElements | currentElement | expected
    ${3}             | ${3}           | ${/5/}
    ${1}             | ${1}           | ${/1/}
  `(
    "should not render an example for simulator $simulator",
    ({ numberOfElements, currentElement, expected }) => {
      const { getByText } = render(
        <NoticeNote
          currentElement={currentElement}
          numberOfElements={numberOfElements}
        />
      );
      expect(() => getByText(expected)).toThrow("Unable to find an element");
    }
  );
});
