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
      <div
        class="sc-ERObt zXiiV"
      >
        <p>
          hello
        </p>
      </div>
    `);
  });
  it(`should remove empty p tag`, () => {
    const { asFragment } = render(
      <DisplayContentContribution
        content={`<div>hello<p></p></div>`}
      ></DisplayContentContribution>
    );

    expect(asFragment().firstChild).toMatchInlineSnapshot(`
      <div
        class="sc-ERObt zXiiV"
      >
        <div>
          hello
        </div>
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
        class="sc-ERObt zXiiV"
      >
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
      <div
        class="sc-ERObt zXiiV"
      >
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
      </div>
    `);
  });

  it(`should keep whitespace in specific tag`, () => {
    const { asFragment } = render(
      <DisplayContentContribution
        content={`<p>Ceci est un<strong> </strong>texte généré<strong> </strong>par <em>tiptap </em>avec des<em> </em>résidus<em> </em>de balise</p>`}
      ></DisplayContentContribution>
    );

    expect(asFragment().firstChild).toMatchInlineSnapshot(`
      <div
        class="sc-ERObt zXiiV"
      >
        <p>
          Ceci est un
          <strong>
             
          </strong>
          texte généré
          <strong>
             
          </strong>
          par 
          <em>
            tiptap 
          </em>
          avec des
          <em>
             
          </em>
          résidus
          <em>
             
          </em>
          de balise
        </p>
      </div>
    `);
  });

  it(`should render correctly a table with multiple head lines`, () => {
    const { baseElement } = render(
      <DisplayContentContribution
        content={`
        <table>
  <tbody>
    <tr>
      <td colspan="1" rowspan="2" colwidth="444">
        <p>
          <strong>Nature du contrat de mission</strong>
        </p>
      </td>
      <td colspan="2" rowspan="1">
        <p>
          <strong>Durée maximale</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1">
        <p>
          <strong>Contrat de date à date</strong>
        </p>
      </td>
      <td colspan="1" rowspan="1">
        <p>
          <strong>Contrat sans terme certain</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" colwidth="444">
        <p>Remplacement d’un salarié absent ou dont le contrat de travail est suspendu</p>
      </td>
      <td colspan="1" rowspan="1">
        <p>18 mois</p>
      </td>
      <td colspan="1" rowspan="1">
        <p>Fin de l’absence</p>
      </td>
    </tr>
  </tbody>
</table>
`}
      ></DisplayContentContribution>
    );

    expect(baseElement.firstChild).toMatchSnapshot();
  });

  it(`should not remove space between strong and em tag in p tag`, () => {
    const { asFragment } = render(
      <DisplayContentContribution
        content={`<p><strong>À noter :</strong> <em>L'échelon professionnel du salarié est habituellement mentionné </em></p>`}
      ></DisplayContentContribution>
    );

    expect(asFragment().firstChild).toMatchInlineSnapshot(`
      <div
        class="sc-ERObt zXiiV"
      >
        <p>
          <strong>
            À noter :
          </strong>
           
          <em>
            L'échelon professionnel du salarié est habituellement mentionné 
          </em>
        </p>
      </div>
    `);
  });

  it(`should replace div with alert class to Alert component`, () => {
    const { asFragment } = render(
      <DisplayContentContribution
        content={`
        <div class="alert"><p><strong>Attention : </strong>En l’absence d’écrit, l’employeur peut être condamné à une amende de 3.750 € ou 7.500 € en cas de récidive.</p></div>`}
      ></DisplayContentContribution>
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it(`should replace div with alert class in li component to Alert component`, () => {
    const { asFragment } = render(
      <DisplayContentContribution
        content={`
        <div><p>Le contrat de mission (intérim) doit :</p><ul><li class="DisplayContentContribution__StyledLi-sc-c2bbc7a4-1 SBjaL"><p>Être<strong> écrit</strong> et <strong>rédigé</strong> en français (si conclu en France) ;</p></li><li class="DisplayContentContribution__StyledLi-sc-c2bbc7a4-1 SBjaL"><p>Être <strong>signé</strong>, dans un délai de <strong>2 jours</strong> suivant la mise à disposition du salarié auprès de l'entreprise ; si l’employeur transmet le CDD au salarié après le délai de 2 jours, il s'expose au paiement d'une indemnité égale à 1 mois de salaire maximum.</p></li><li class="DisplayContentContribution__StyledLi-sc-c2bbc7a4-1 SBjaL"><p>Être établi <strong>en plusieurs exemplaires</strong> ; c'est-à-dire autant d'exemplaires que de parties au contrat. Chaque partie au contrat aura un exemplaire.</p><p></p><div class="alert"><p><strong>Attention : </strong>En l’absence d’écrit, l’employeur peut être condamné à une amende de 3.750 € ou 7.500 € en cas de récidive.</p></div></li></ul></div>`}
      ></DisplayContentContribution>
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });
});
