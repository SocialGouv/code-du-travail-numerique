import { render } from "@testing-library/react";
import DisplayContentContribution from "../DisplayContentContribution";

describe("DisplayContentContribution", () => {
  it(`should return html`, () => {
    const { asFragment } = render(
      <DisplayContentContribution
        content={`<p>hello</p>`}
      ></DisplayContentContribution>
    );

    expect(asFragment().firstChild).toMatchInlineSnapshot(`
      <p>
        hello
      </p>
    `);
  });
  it(`should remove empty p tag`, () => {
    const { asFragment } = render(
      <DisplayContentContribution
        content={`<div>hello<p></p></div>`}
      ></DisplayContentContribution>
    );

    expect(asFragment().firstChild).toMatchInlineSnapshot(`
      <div>
        hello
      </div>
    `);
  });
  it(`should replace details element`, () => {
    const { asFragment } = render(
      <DisplayContentContribution
        content={`
        <details className=" details"><summary>Ceci est un titre</summary>
          <div data-type=" detailsContent">
            <p>Ceci est le body</p>
            <p></p>
          </div>
        </details>`}
      ></DisplayContentContribution>
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });
  it(`should replace details element within details element`, () => {
    const { asFragment } = render(
      <DisplayContentContribution
        content={`
        <details className=" details"><summary>Ceci est un titre</summary>
          <div data-type=" detailsContent">
          <details className=" details"><summary>Ceci est un sous titre</summary>
            <div data-type=" detailsContent">
              <p>Ceci est le body</p>
              <p></p>
            </div>
          </details>
          </div>
        </details>`}
      ></DisplayContentContribution>
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });
  it(`should replace details element with rich summary`, () => {
    const { getByTestId } = render(
      <DisplayContentContribution
        content={`
         <details className=" details"><summary><strong>Ceci est un titre</strong> HELLO</summary>
          <div data-type=" detailsContent">
            <p>Ceci est le body</p>
            <p></p>
          </div>
        </details>`}
      ></DisplayContentContribution>
    );

    expect(getByTestId("contrib-accordion-0").textContent).toEqual(
      "Ceci est un titre HELLO"
    );
  });

  it(`should start title level to 4 if heading 3 before`, () => {
    const { getByTestId, baseElement } = render(
      <DisplayContentContribution
        content={`
        <div>
          <h3>HELLO</h3>
          <details className=" details"><summary>Ceci est un titre</summary>
          <div data-type=" detailsContent">
            <p>Ceci est le body</p>
            <p></p>
          </div>
          </details>
        </div>`}
      ></DisplayContentContribution>
    );

    expect(getByTestId("contrib-accordion-0").textContent).toEqual(
      "Ceci est un titre"
    );
    expect(getByTestId("contrib-accordion-0").tagName).toEqual("H4");
  });
});
