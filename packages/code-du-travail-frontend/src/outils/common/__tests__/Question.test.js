/* eslint-disable no-irregular-whitespace */
import { render } from "@testing-library/react";
import React from "react";

import { Question } from "../Question";

describe("<Question />", () => {
  it("should render question", () => {
    const { container } = render(<Question>ma question</Question>);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <label
          class="sc-kTCsyW jLHhUc"
        >
          <span
            class="sc-bBjRSN fzTfxR"
          >
            ma question
          </span>
        </label>
      </div>
    `);
  });
  it("should render mandatory question", () => {
    const { container } = render(
      <Question required>ma question obligatoire</Question>
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <label
          class="sc-kTCsyW jLHhUc"
        >
          <span
            class="sc-bBjRSN fzTfxR"
          >
            ma question obligatoire
          </span>
          <span
            class="sc-bBjRSN jPMLlF"
          >
             (obligatoire)
          </span>
        </label>
      </div>
    `);
  });
});
