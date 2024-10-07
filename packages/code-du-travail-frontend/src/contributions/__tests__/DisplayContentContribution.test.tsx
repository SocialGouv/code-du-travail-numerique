import { render } from "@testing-library/react";
import DisplayContentContribution from "../DisplayContentContribution";

describe("DisplayContentContribution", () => {
  describe("Headings", () => {
    it(`should replace span with class "title" and "sub-titles" with heading`, () => {
      const { baseElement } = render(
        <DisplayContentContribution
          content={`<span class="title">Mon titre</span>
                    <span class="sub-title">Mon sous titre</span>`}
          titleLevel={2}
        ></DisplayContentContribution>,
      );

      expect(baseElement.firstChild).toMatchInlineSnapshot(`
        <div>
          <div
            class="sc-525da103-0 clIhqj"
          >
            <h2
              class="sc-b879fc2d-0 hyiHle"
            >
              Mon titre
            </h2>
            <h3
              class="sc-b879fc2d-0 hyiHle"
            >
              Mon sous titre
            </h3>
          </div>
        </div>
      `);
    });
    it(`should replace span with with heading according to given title level`, () => {
      const { baseElement } = render(
        <DisplayContentContribution
          content={`<span class="title">Mon title</span><span class="sub-title">Mon title</span>`}
          titleLevel={4}
        ></DisplayContentContribution>,
      );

      expect(baseElement.firstChild).toMatchInlineSnapshot(`
        <div>
          <div
            class="sc-525da103-0 clIhqj"
          >
            <h4
              class="sc-b879fc2d-0 hyiHle"
            >
              Mon title
            </h4>
            <h5
              class="sc-b879fc2d-0 hyiHle"
            >
              Mon title
            </h5>
          </div>
        </div>
      `);
    });
    it(`should not add headings higher than h6 for titles`, () => {
      const { baseElement } = render(
        <DisplayContentContribution
          content={`<span class="title">Mon title</span><span class="sub-title">Mon title</span>`}
          titleLevel={6}
        ></DisplayContentContribution>,
      );

      expect(baseElement.firstChild).toMatchInlineSnapshot(`
        <div>
          <div
            class="sc-525da103-0 clIhqj"
          >
            <h6
              class="sc-b879fc2d-0 hyiHle"
            >
              Mon title
            </h6>
            <strong>
              Mon title
            </strong>
          </div>
        </div>
      `);
    });
    it(`should not add headings higher than h6 for accordion`, () => {
      const { asFragment } = render(
        <DisplayContentContribution
          content={`
        <details className=" details"><summary>Ceci est un titre</summary>
          <div data-type=" detailsContent">
            <span class="sub-title">Mon title</span>
          </div>
        </details>`}
          titleLevel={6}
        ></DisplayContentContribution>,
      );
      expect(asFragment().firstChild).toMatchSnapshot();
    });
  });

  describe("Accordions", () => {
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
          titleLevel={3}
        ></DisplayContentContribution>,
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
          titleLevel={3}
        ></DisplayContentContribution>,
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
          titleLevel={3}
        ></DisplayContentContribution>,
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
          titleLevel={3}
        ></DisplayContentContribution>,
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
          titleLevel={3}
        ></DisplayContentContribution>,
      );

      expect(getByTestId("contrib-accordion-0").textContent).toEqual(
        "Ceci est un titre HELLO",
      );
    });
    it(`should start title level to 4 if heading 3 before`, () => {
      const { getByTestId } = render(
        <DisplayContentContribution
          content={`
        <div>
          <span class="title">HELLO</span>
          <details className=" details">
          <summary>Ceci est un titre</summary>
          <div data-type=" detailsContent">
            <p>Ceci est le body</p>
            <p></p>
          </div>
          </details>
        </div>`}
          titleLevel={3}
        ></DisplayContentContribution>,
      );

      expect(getByTestId("contrib-accordion-0").textContent).toEqual(
        "Ceci est un titre",
      );
      expect(getByTestId("contrib-accordion-0").tagName).toEqual("H4");
    });
    it(`should handle title within nested accordion`, () => {
      const { getByText } = render(
        <DisplayContentContribution
          content={`
        <div>
          <details>
          <summary>Ceci est un titre</summary>
          <div data-type=" detailsContent">
            <details>
              <summary>Ceci est un sous titre</summary>
              <div data-type=" detailsContent">
                <span class="title">Ceci est un titre dans un accordion</span>
                <span class="sub-title">Ceci est un sous-titre dans un accordion</span>
              </div>
            </details>
          </div>
          </details>
        </div>`}
          titleLevel={4}
        ></DisplayContentContribution>,
      );

      expect(getByText("Ceci est un titre").tagName).toEqual("H4");
      expect(getByText("Ceci est un sous titre").tagName).toEqual("H5");
      expect(getByText("Ceci est un titre dans un accordion").tagName).toEqual(
        "H6",
      );
      expect(
        getByText("Ceci est un sous-titre dans un accordion").tagName,
      ).toEqual("STRONG");
    });
  });

  describe("Tables", () => {
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
          titleLevel={3}
        ></DisplayContentContribution>,
      );

      expect(asFragment().firstChild).toMatchInlineSnapshot(`
        <div
          class="sc-525da103-0 clIhqj"
        >
          <table
            class="sc-4e3ba411-0 kKVapO"
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
          titleLevel={3}
        ></DisplayContentContribution>,
      );

      expect(asFragment().firstChild).toMatchInlineSnapshot(`
        <div
          class="sc-525da103-0 clIhqj"
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
          titleLevel={3}
        ></DisplayContentContribution>,
      );

      expect(asFragment().firstChild).toMatchInlineSnapshot(`
        <div
          class="sc-525da103-0 clIhqj"
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
          titleLevel={3}
        ></DisplayContentContribution>,
      );

      expect(baseElement.firstChild).toMatchSnapshot();
    });
  });

  it(`should return html`, () => {
    const { asFragment } = render(
      <DisplayContentContribution
        content={`<p>hello</p>`}
        titleLevel={3}
      ></DisplayContentContribution>,
    );

    expect(asFragment().firstChild).toMatchInlineSnapshot(`
      <div
        class="sc-525da103-0 clIhqj"
      >
        <p>
          hello
        </p>
      </div>
    `);
  });
  it(`should keep whitespace in specific tag`, () => {
    const { asFragment } = render(
      <DisplayContentContribution
        content={`<p>Ceci est un<strong> </strong>texte généré<strong> </strong>par <em>tiptap </em>avec des<em> </em>résidus<em> </em>de balise</p>`}
        titleLevel={3}
      ></DisplayContentContribution>,
    );

    expect(asFragment().firstChild).toMatchInlineSnapshot(`
      <div
        class="sc-525da103-0 clIhqj"
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
  it(`should not remove space between strong and em tag in p tag`, () => {
    const { asFragment } = render(
      <DisplayContentContribution
        content={`<p><strong>À noter :</strong> <em>L'échelon professionnel du salarié est habituellement mentionné </em></p>`}
        titleLevel={3}
      ></DisplayContentContribution>,
    );

    expect(asFragment().firstChild).toMatchInlineSnapshot(`
      <div
        class="sc-525da103-0 clIhqj"
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

  describe("Alerts", () => {
    it(`should replace div with alert class to Alert component`, () => {
      const { asFragment } = render(
        <DisplayContentContribution
          content={`
        <div class="alert"><p><strong>Attention : </strong>En l’absence d’écrit, l’employeur peut être condamné à une amende de 3.750 € ou 7.500 € en cas de récidive.</p></div>`}
          titleLevel={3}
        ></DisplayContentContribution>,
      );

      expect(asFragment().firstChild).toMatchSnapshot();
    });

    it(`should replace div with alert class in li component to Alert component`, () => {
      const { asFragment } = render(
        <DisplayContentContribution
          content={`
        <div><p>Le contrat de mission (intérim) doit :</p><ul><li class="DisplayContentContribution__StyledLi-sc-c2bbc7a4-1 SBjaL"><p>Être<strong> écrit</strong> et <strong>rédigé</strong> en français (si conclu en France) ;</p></li><li class="DisplayContentContribution__StyledLi-sc-c2bbc7a4-1 SBjaL"><p>Être <strong>signé</strong>, dans un délai de <strong>2 jours</strong> suivant la mise à disposition du salarié auprès de l'entreprise ; si l’employeur transmet le CDD au salarié après le délai de 2 jours, il s'expose au paiement d'une indemnité égale à 1 mois de salaire maximum.</p></li><li class="DisplayContentContribution__StyledLi-sc-c2bbc7a4-1 SBjaL"><p>Être établi <strong>en plusieurs exemplaires</strong> ; c'est-à-dire autant d'exemplaires que de parties au contrat. Chaque partie au contrat aura un exemplaire.</p><p></p><div class="alert"><p><strong>Attention : </strong>En l’absence d’écrit, l’employeur peut être condamné à une amende de 3.750 € ou 7.500 € en cas de récidive.</p></div></li></ul></div>`}
          titleLevel={3}
        ></DisplayContentContribution>,
      );

      expect(asFragment().firstChild).toMatchSnapshot();
    });
  });
});
