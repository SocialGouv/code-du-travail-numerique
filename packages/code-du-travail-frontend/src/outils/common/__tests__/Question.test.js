/* eslint-disable no-irregular-whitespace */
import { render } from "@testing-library/react";
import React from "react";

import { Question } from "../Question";

describe("<Question />", () => {
  it("should render question", () => {
    const { container } = render(<Question>ma question</Question>);
    expect(container).toMatchInlineSnapshot(`
      .c1 {
        color: #3e486e;
        font-size: 1.6rem;
        font-weight: 600;
      }

      .c0 {
        display: block;
        margin: 1rem 0;
        cursor: pointer;
      }

      @media (max-width:600px) {
        .c0 {
          font-size: 1.6rem;
        }
      }

      <div>
        <label
          class="c0"
        >
          <span
            class="c1"
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
      .c1 {
        color: #3e486e;
        font-size: 1.6rem;
        font-weight: 600;
      }

      .c2 {
        color: #3e486e;
        font-size: 1.6rem;
        font-weight: 400;
      }

      .c0 {
        display: block;
        margin: 1rem 0;
        cursor: pointer;
      }

      @media (max-width:600px) {
        .c0 {
          font-size: 1.6rem;
        }
      }

      <div>
        <label
          class="c0"
        >
          <span
            class="c1"
          >
            ma question obligatoire
          </span>
          <span
            class="c2"
          >
             (obligatoire)
          </span>
        </label>
      </div>
    `);
  });
});
