import React from "react";
import { jsxJoin } from "../jsxJoin";

describe("jsxJoin", () => {
  test("it should join an array of jsx node", () => {
    const arr = ["a", "b"].map((item, index) => <em key={index}>{item}</em>);
    expect(jsxJoin(arr)).toMatchInlineSnapshot(`
      <React.Fragment>
        <em>
          a
        </em>
        , 
        <em>
          b
        </em>
      </React.Fragment>
    `);
  });
  test("it should join an array of jsx node using jsx as separator", () => {
    const arr = ["a", "b"].map((item, index) => <em key={index}>{item}</em>);
    const sep = <strong> | </strong>;
    expect(jsxJoin(arr, sep)).toMatchInlineSnapshot(`
      <React.Fragment>
        <em>
          a
        </em>
        <strong>
           | 
        </strong>
        <em>
          b
        </em>
      </React.Fragment>
    `);
  });
});
