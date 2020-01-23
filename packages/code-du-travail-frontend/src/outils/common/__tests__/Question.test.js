import React from "react";
import { render } from "@testing-library/react";
import { Question } from "../Question";

describe("<Question />", () => {
  it("should render question", () => {
    const { container } = render(<Question>ma question</Question>);
    expect(container).toMatchInlineSnapshot(`
      .c0 {
        display: block;
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-weight: 600;
        font-size: 1.8rem;
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
          ma question
        </label>
      </div>
    `);
  });
  it("should render mandatory question", () => {
    const { container } = render(
      <Question required>ma question obligatoire</Question>
    );
    expect(container).toMatchInlineSnapshot(`
      .c0 {
        display: block;
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-weight: 600;
        font-size: 1.8rem;
        cursor: pointer;
      }

      .c1 {
        display: inline-block;
        margin-left: 1rem;
        color: #eb5757;
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
          ma question obligatoire
          <span
            aria-label="champs obligatoire"
            class="c1"
          >
            *
          </span>
        </label>
      </div>
    `);
  });
});
