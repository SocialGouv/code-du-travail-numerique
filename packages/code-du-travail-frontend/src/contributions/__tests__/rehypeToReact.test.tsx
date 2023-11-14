import ToReact from "../rehypeToReact";
import { render } from "@testing-library/react";

describe("rehypeToReact", () => {
  test(`should return html`, () => {
    const { asFragment } = render(<ToReact content={`<p>hello</p>`}></ToReact>);

    expect(asFragment().firstChild).toMatchInlineSnapshot(`
      <p>
        hello
      </p>
    `);
  });
  test(`should remove empty p tag`, () => {
    const { asFragment } = render(
      <ToReact content={`<div>hello<p></p></div>`}></ToReact>
    );

    expect(asFragment().firstChild).toMatchInlineSnapshot(`
      <div>
        hello
      </div>
    `);
  });
  test(`should replace details element`, () => {
    const { asFragment } = render(
      <ToReact
        content={`
         <details className=" details"><summary>Ceci est un titre</summary>
          <div data-type=" detailsContent">
            <p>Ceci est le body</p>
            <p></p>
          </div>
        </details>`}
      ></ToReact>
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });
  test(`should replace details element within details element`, () => {
    const { asFragment } = render(
      <ToReact
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
      ></ToReact>
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });
  test(`should replace details element with rich summary`, () => {
    const { asFragment } = render(
      <ToReact
        content={`
         <details className=" details"><summary><strong>Ceci est un titre</strong> HELLO</summary>
          <div data-type=" detailsContent">
            <p>Ceci est le body</p>
            <p></p>
          </div>
        </details>`}
      ></ToReact>
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });

  test(`should start title level to 4 if heading 3 before`, () => {
    const { asFragment } = render(
      <ToReact
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
      ></ToReact>
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });
});
