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
  it(`should replace details element by one accordion`, () => {
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

  it(`should not fail if no summary tag`, () => {
    const { baseElement } = render(
      <DisplayContentContribution
        content={`
        <details class="details">
    <summary>
      <strong>Report ou suspension du préavis</strong>
    </summary>
    <div data-type="detailsContent">
      <p>
        En principe, le préavis de licenciement court de date à date sans
        interruption, ni suspension. Dans certaines situations, il existe des
        exceptions qui peuvent suspendre le déroulement du préavis.
      </p>
      <details class="details">
        <summary>
          <strong>Congés payés</strong>
        </summary>
        <div data-type="detailsContent">
          <details class="details">
            <summary>
              <strong>
                Dates des congés fixées avant la notification du licenciement
              </strong>
            </summary>
            <div data-type="detailsContent">
              <p>
                Des congés payés qui interviennent pendant le préavis et qui ont
                été demandés à l'employeur avant la notification du licenciement
                suspendent le préavis. Par conséquent, le préavis est prolongé
                d'une durée équivalente à celle des congés.
              </p>
            </div>
          </details>
          <details class="details">
            <summary>
              <strong>
                Dates des congés fixées après la notification du licenciement
              </strong>
            </summary>
            <div data-type="detailsContent">
              <p>
                Des congés payés qui interviennent pendant le préavis et qui ont
                été&nbsp;demandés à l'employeur&nbsp;après la notification du
                licenciement ne suspendent pas le préavis. Par conséquent, le
                préavis n'est pas prolongé d'une durée équivalente à celle des
                congés.
              </p>
            </div>
          </details>
          <details class="details">
            <summary>
              <strong>Licenciement notifié pendant les congés payés</strong>
            </summary>
            <div data-type="detailsContent">
              <p>
                Dans ce cas, le préavis ne commencera qu'après les congés payés.
              </p>
            </div>
          </details>
        </div>
      </details>
    </div>
  </details>`}
      ></DisplayContentContribution>
    );

    expect(baseElement.firstChild).toMatchSnapshot();
  });
  it(`should replace multiple details element by one accordion`, () => {
    const { baseElement } = render(
      <DisplayContentContribution
        content={`
        <details className=" details"><summary>Ceci est le titre 1</summary>
          <div data-type=" detailsContent">
            <p>Ceci est le body 1</p>
            <p></p>
          </div>
        </details>
        <details className=" details"><summary>Ceci est le titre 2</summary>
          <div data-type=" detailsContent">
            <p>Ceci est le body 2</p>
            <p></p>
          </div>
        </details>`}
      ></DisplayContentContribution>
    );

    expect(baseElement).toMatchSnapshot();
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
    const { getByTestId } = render(
      <DisplayContentContribution
        content={`
        <div>
          <h3>HELLO</h3>
          <details className=" details">
          <summary>Ceci est un titre</summary>
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

  it(`should add thead to table if not present and move table into a Table element`, () => {
    const { asFragment } = render(
      <DisplayContentContribution
        content={`
        <table>
        <tbody>
            <tr>
              <th colspan="1" rowspan="1"></th>
              <th colspan="1" rowspan="1"><p>Titre 1</p></th>
            </tr>
            <tr>
                <td colspan="1" rowspan="1"><p>Pour les <strong>cadres</strong>, la prolongation ...</p></td>
                <td colspan="1" rowspan="1"><ul><li><p>L’employeur et le salarié donnent par écrit ou par mail.</p></li></ul></td>
            </tr>
        </tbody>
        </table>`}
      ></DisplayContentContribution>
    );

    expect(asFragment().firstChild).toMatchInlineSnapshot(`
      <div
        class="sc-gFAWRd jDjoBq"
      >
        <div
          class="sc-gmPhUn kUNTdL"
        >
          <table
            class="sc-iMWBiJ Rlfrk"
          >
            <thead>
              <tr>
                <th
                  colspan="1"
                  rowspan="1"
                />
                <th
                  colspan="1"
                  rowspan="1"
                >
                  <p>
                    Titre 1
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colspan="1"
                  rowspan="1"
                >
                  <p>
                    Pour les 
                    <strong>
                      cadres
                    </strong>
                    , la prolongation ...
                  </p>
                </td>
                <td
                  colspan="1"
                  rowspan="1"
                >
                  <ul>
                    <li>
                      <p>
                        L’employeur et le salarié donnent par écrit ou par mail.
                      </p>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `);
  });
  it(`should not change if thead is already present`, () => {
    const { asFragment } = render(
      <DisplayContentContribution
        content={`
        <table>
        <thead>
            <tr>
              <th colspan="1" rowspan="1"></th>
              <th colspan="1" rowspan="1"><p>Titre 1</p></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="1" rowspan="1"><p>Pour les <strong>cadres</strong>, la prolongation ...</p></td>
                <td colspan="1" rowspan="1"><ul><li><p>L’employeur et le salarié donnent par écrit ou par mail.</p></li></ul></td>
            </tr>
        </tbody>
        </table>`}
      ></DisplayContentContribution>
    );

    expect(asFragment().firstChild).toMatchInlineSnapshot(`
      <table>
        <tbody>
          <tr>
            <td
              colspan="1"
              rowspan="1"
            >
              <p>
                Pour les 
                <strong>
                  cadres
                </strong>
                , la prolongation ...
              </p>
            </td>
            <td
              colspan="1"
              rowspan="1"
            >
              <ul>
                <li>
                  <p>
                    L’employeur et le salarié donnent par écrit ou par mail.
                  </p>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    `);
  });
});
