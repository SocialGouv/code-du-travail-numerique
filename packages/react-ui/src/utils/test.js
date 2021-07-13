import React from "react";

import { Title } from "../Titles/Title/index.js";
import { getTextFromComponent } from "./getTextFromComponent.js";

describe("getTextFromComponent", () => {
  it("returns nothing if component is empty", () => {
    const text = getTextFromComponent(<div />);
    expect(text).toBe("");
  });
  it("returns nothing if component has no text inside", () => {
    const text = getTextFromComponent(<Title />);
    expect(text).toBe("");
  });
  it("returns the text", () => {
    const expectedString = "I am a title";
    const text = getTextFromComponent(<Title>{expectedString}</Title>);
    expect(text).toBe(expectedString);
  });
});
