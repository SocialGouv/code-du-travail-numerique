/* eslint-disable no-irregular-whitespace */
import { render } from "@testing-library/react";
import React from "react";

import { Question } from "../Question";

describe("<Question />", () => {
  it("should render question", () => {
    const { container } = render(<Question>ma question</Question>);
    expect(container).toMatchInlineSnapshot(`
      .c0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-top: 2rem;
        margin-bottom: 1rem;
        position: relative;
      }

      .c1 {
        font-size: 1.8rem;
        font-weight: 600;
        margin: 0;
      }

      @media (max-width:600px) {
        .c1 {
          font-size: 1.6rem;
        }
      }

      <div>
        <div>
          <div
            class="c0"
          >
            <label
              class="c1"
            >
              ma question
               
            </label>
          </div>
        </div>
      </div>
    `);
  });
  it("should render mandatory question", () => {
    const { container } = render(
      <Question required>ma question obligatoire</Question>
    );
    expect(container).toMatchInlineSnapshot(`
      .c2 {
        color: #3e486e;
        line-height: 1.25;
        font-size: 1.6rem;
        font-weight: 400;
      }

      .c0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-top: 2rem;
        margin-bottom: 1rem;
        position: relative;
      }

      .c1 {
        font-size: 1.8rem;
        font-weight: 600;
        margin: 0;
      }

      @media (max-width:600px) {
        .c1 {
          font-size: 1.6rem;
        }
      }

      <div>
        <div>
          <div
            class="c0"
          >
            <label
              class="c1"
            >
              ma question obligatoire
               
              <span
                class="c2"
              >
                 (obligatoire)
              </span>
            </label>
          </div>
        </div>
      </div>
    `);
  });
});
