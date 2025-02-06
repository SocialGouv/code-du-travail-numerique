import { render } from "@testing-library/react";
import DisplayContentContribution from "../DisplayContentContribution";

let count = 0;
jest.mock("uuid", () => ({
  v4: jest.fn(() => {
    return "123" + count++;
  }),
}));

describe("DisplayContentContribution", () => {
  describe("Headings", () => {
    it(`should replace span with class "title" and "sub-titles" with heading`, () => {
      const { baseElement } = render(
        <DisplayContentContribution
          content={`<span class="title">Mon titre</span>
                    <span class="sub-title">Mon sous titre</span>`}
          titleLevel={2}
        ></DisplayContentContribution>
      );

      expect(baseElement.firstChild).toMatchSnapshot();
    });
    it(`should replace span with with heading according to given title level`, () => {
      const { getByText } = render(
        <DisplayContentContribution
          content={`<span class="title">Ceci est un titre</span><span class="sub-title">Ceci est un sous titre</span>`}
          titleLevel={4}
        ></DisplayContentContribution>
      );

      expect(getByText("Ceci est un titre").tagName).toEqual("H4");
      expect(getByText("Ceci est un sous titre").tagName).toEqual("H5");
    });
    it(`should not add headings higher than h6 for titles`, () => {
      const { getByText } = render(
        <DisplayContentContribution
          content={`<span class="title">Ceci est un titre</span><span class="sub-title">Ceci est un sous titre</span>`}
          titleLevel={6}
        ></DisplayContentContribution>
      );

      expect(getByText("Ceci est un titre").tagName).toEqual("H6");
      expect(getByText("Ceci est un sous titre").tagName).toEqual("STRONG");
    });
    it(`should not add headings higher than h6 for accordion`, () => {
      const { getByText } = render(
        <DisplayContentContribution
          content={`
        <details className=" details"><summary>Ceci est un titre</summary>
          <div data-type=" detailsContent">
            <span class="title">Ceci est un sous titre</span>
            <span class="sub-title">Ceci est un sous sous titre</span>
          </div>
        </details>`}
          titleLevel={6}
        ></DisplayContentContribution>
      );
      expect(getByText("Ceci est un titre")?.tagName).toEqual("BUTTON");
      expect(getByText("Ceci est un titre").parentElement?.tagName).toEqual(
        "H6"
      );
      expect(getByText("Ceci est un sous titre").tagName).toEqual("STRONG");
      expect(getByText("Ceci est un sous sous titre").tagName).toEqual(
        "STRONG"
      );
    });
    it(`should handle sub-title in accordion even if no title`, () => {
      const { getByText } = render(
        <DisplayContentContribution
          content={`
        <details className=" details"><summary>Ceci est un titre</summary>
          <div data-type=" detailsContent">
            <span class="sub-title">Ceci est un sous titre</span>
          </div>
        </details>`}
          titleLevel={4}
        ></DisplayContentContribution>
      );
      expect(getByText("Ceci est un titre").tagName).toEqual("BUTTON");
      expect(getByText("Ceci est un titre").parentElement?.tagName).toEqual(
        "H4"
      );
      expect(getByText("Ceci est un sous titre").tagName).toEqual("H5");
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
          titleLevel={3}
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
          titleLevel={3}
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
          titleLevel={3}
        ></DisplayContentContribution>
      );

      expect(asFragment().firstChild).toMatchSnapshot();
    });
    it(`should replace details element with rich summary`, () => {
      const { getByText } = render(
        <DisplayContentContribution
          content={`
         <details className=" details"><summary><strong>Ceci est un titre</strong> HELLO</summary>
          <div data-type=" detailsContent">
            <p>Ceci est le body</p>
            <p></p>
          </div>
        </details>`}
          titleLevel={3}
        ></DisplayContentContribution>
      );

      expect(getByText("Ceci est un titre HELLO")).toBeInTheDocument();
    });
    it(`should start title level to 4 if heading 3 before`, () => {
      const { getByText } = render(
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
        ></DisplayContentContribution>
      );

      expect(getByText("HELLO").tagName).toEqual("H3");
      expect(getByText("Ceci est un titre").tagName).toEqual("BUTTON");
      expect(getByText("Ceci est un titre").parentElement?.tagName).toEqual(
        "H4"
      );
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
        ></DisplayContentContribution>
      );

      expect(getByText("Ceci est un titre").tagName).toEqual("BUTTON");
      expect(getByText("Ceci est un titre").parentElement?.tagName).toEqual(
        "H4"
      );
      expect(getByText("Ceci est un sous titre").tagName).toEqual("BUTTON");
      expect(
        getByText("Ceci est un sous titre").parentElement?.tagName
      ).toEqual("H5");
      expect(getByText("Ceci est un titre dans un accordion").tagName).toEqual(
        "H6"
      );
      expect(
        getByText("Ceci est un sous-titre dans un accordion").tagName
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
        ></DisplayContentContribution>
      );

      expect(asFragment().firstChild).toMatchSnapshot();
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
        ></DisplayContentContribution>
      );

      expect(asFragment().firstChild).toMatchSnapshot();
    });

    it(`should replace td by th in thead`, () => {
      const { asFragment } = render(
        <DisplayContentContribution
          content={`
        <table>
        <thead>
            <tr>
              <td colspan="1" rowspan="1">Titre 1</td>
              <td colspan="1" rowspan="1">Titre 2</td>
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
        ></DisplayContentContribution>
      );

      expect(asFragment().firstChild).toMatchSnapshot();
    });

    it(`should keep whitespace in specific tag`, () => {
      const { asFragment } = render(
        <DisplayContentContribution
          content={`<p>Ceci est un<strong> </strong>texte généré<strong> </strong>par <em>tiptap </em>avec des<em> </em>résidus<em> </em>de balise</p>`}
          titleLevel={3}
        ></DisplayContentContribution>
      );

      expect(asFragment().firstChild).toMatchSnapshot();
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
        ></DisplayContentContribution>
      );

      expect(baseElement.firstChild).toMatchSnapshot();
    });
  });

  it(`should return html`, () => {
    const { asFragment } = render(
      <DisplayContentContribution
        content={`<p>hello</p>`}
        titleLevel={3}
      ></DisplayContentContribution>
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });
  it(`should keep whitespace in specific tag`, () => {
    const { asFragment } = render(
      <DisplayContentContribution
        content={`<p>Ceci est un<strong> </strong>texte généré<strong> </strong>par <em>tiptap </em>avec des<em> </em>résidus<em> </em>de balise</p>`}
        titleLevel={3}
      ></DisplayContentContribution>
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });
  it(`should not remove space between strong and em tag in p tag`, () => {
    const { asFragment } = render(
      <DisplayContentContribution
        content={`<p><strong>À noter :</strong> <em>L'échelon professionnel du salarié est habituellement mentionné </em></p>`}
        titleLevel={3}
      ></DisplayContentContribution>
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });

  describe("Alerts", () => {
    it(`should replace div with alert class to Alert component`, () => {
      const { asFragment } = render(
        <DisplayContentContribution
          content={`
        <div class="alert"><p><strong>Attention : </strong>En l’absence d’écrit, l’employeur peut être condamné à une amende de 3.750 € ou 7.500 € en cas de récidive.</p></div>`}
          titleLevel={3}
        ></DisplayContentContribution>
      );

      expect(asFragment().firstChild).toMatchSnapshot();
    });

    it(`should replace div with alert class in li component to Alert component`, () => {
      const { asFragment } = render(
        <DisplayContentContribution
          content={`
        <div><p>Le contrat de mission (intérim) doit :</p><ul><li class="DisplayContentContribution__StyledLi-sc-c2bbc7a4-1 SBjaL"><p>Être<strong> écrit</strong> et <strong>rédigé</strong> en français (si conclu en France) ;</p></li><li class="DisplayContentContribution__StyledLi-sc-c2bbc7a4-1 SBjaL"><p>Être <strong>signé</strong>, dans un délai de <strong>2 jours</strong> suivant la mise à disposition du salarié auprès de l'entreprise ; si l’employeur transmet le CDD au salarié après le délai de 2 jours, il s'expose au paiement d'une indemnité égale à 1 mois de salaire maximum.</p></li><li class="DisplayContentContribution__StyledLi-sc-c2bbc7a4-1 SBjaL"><p>Être établi <strong>en plusieurs exemplaires</strong> ; c'est-à-dire autant d'exemplaires que de parties au contrat. Chaque partie au contrat aura un exemplaire.</p><p></p><div class="alert"><p><strong>Attention : </strong>En l’absence d’écrit, l’employeur peut être condamné à une amende de 3.750 € ou 7.500 € en cas de récidive.</p></div></li></ul></div>`}
          titleLevel={3}
        ></DisplayContentContribution>
      );

      expect(asFragment().firstChild).toMatchSnapshot();
    });

    it(`should have space in table item for a strong and an other content`, () => {
      const { asFragment } = render(
        <DisplayContentContribution
          content={`<table class="sc-4e3ba411-0 kGLBMt"><thead><tr><td colspan="1" rowspan="1"><p></p></td><td colspan="1" rowspan="1"><p><strong>Repos compensateur&nbsp;</strong></p></td><td colspan="1" rowspan="1"><p><strong>Majoration de salaire</strong></p></td></tr></thead><tbody><tr><td colspan="1" rowspan="1"><p><strong>Salariés</strong></p></td><td colspan="1" rowspan="1"><p>Une journée entière déterminée par roulement et par quinzaine</p></td><td colspan="1" rowspan="2"><p>Pour les commerces avec une surface de vente <strong>supérieure à 400 m2</strong>,<strong></strong>la loi prévoit une majoration de&nbsp;salaire d’au moins 30 % par rapport au salaire normalement dû pour une durée équivalente</p><p>Pour les commerces avec une surface de vente <strong>inférieure ou égale à 400 m2</strong>, la loi ne prévoit aucune majoration de salaire.&nbsp;Mais l’employeur, s’il le souhaite, ou un <webcomponent-tooltip content="Accord%20conclu%20entre%20un%20employeur%20ou%20des%20repr%C3%A9sentants%20d%E2%80%99employeurs%20et%20une%20ou%20plusieurs%20organisations%20syndicales%20ou%20des%20repr%C3%A9sentants%20de%20salari%C3%A9s%2C%20ou%20dans%20certains%20cas%2C%20%C3%A0%20la%20suite%20de%20la%20consultation%20des%20salari%C3%A9s%2C%20en%20respectant%20des%20r%C3%A8gles%20de%20validit%C3%A9%20issues%20du%20code%20du%20travail.%20Il%20peut%20%C3%AAtre%20conclu%20%C3%A0%20plusieurs%20niveaux%20%3A%20branche%20professionnelle%2C%20groupe%2C%20entreprise%2C%20%C3%A9tablissement...%20L%E2%80%99accord%20collectif%20concerne%20un%20ou%20plusieurs%20th%C3%A8mes%20contrairement%20%C3%A0%20la%20convention%20collective%20qui%20traite%20de%20l%E2%80%99ensemble%20des%20conditions%20d%E2%80%99emploi%2C%20de%20travail%20et%20de%20formation%20professionnelle%20et%20des%20garanties%20sociales%20des%20salari%C3%A9s.%20">accord collectif</webcomponent-tooltip>, peuvent le prévoir.</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Salariés de moins de 21 ans logés chez leur employeur</strong></p></td><td colspan="1" rowspan="1"><p>Un autre après-midi déterminé par roulement et par quinzaine</p></td></tr></tbody></table>`}
          titleLevel={3}
        ></DisplayContentContribution>
      );

      expect(asFragment().firstChild).toMatchSnapshot();
    });
  });

  describe("Infographic", () => {
    it(`should replace div with infographic class to Infographic component`, () => {
      const { asFragment } = render(
        <DisplayContentContribution
          content={`
        <div class="infographic" data-pdf="file.pdf" data-pdf-size="3200" data-infographic="file.svg"><img src="https://cdtn-dev-public.s3.gra.io.cloud.ovh.net/draft/default/infographie_test.svg" height="auto" width="500"><div><div class="details" data-type="details"><button type="button"></button><div><summary>Afficher le contenu de l'infographie</summary><div data-type="detailsContent" hidden="hidden"><p>Décrire ici le contenu de l'infographie</p></div></div></div></div></div>`}
          titleLevel={3}
        ></DisplayContentContribution>
      );

      expect(asFragment().firstChild).toMatchSnapshot();
    });
  });
  describe("Links", () => {
    it(`should replace anchor tag with the same tag`, () => {
      const { getByTitle } = render(
        <DisplayContentContribution
          content={`
        <a class="alert" href="hello.com" title="link"><span>Mon Lien</span></a>`}
          titleLevel={3}
        ></DisplayContentContribution>
      );

      const anchor = getByTitle("link");
      expect(anchor.getAttribute("href")).toEqual("hello.com");
      expect(anchor.getAttribute("class")).toEqual("alert");
      expect(anchor.getElementsByTagName("span").item(0)?.textContent).toEqual(
        "Mon Lien"
      );
    });
    it(`should add "Nouvelle fenêtre" if ancher had target="_blank" attribute`, () => {
      const { getByText } = render(
        <DisplayContentContribution
          content={`
        <a target="_blank" href="hello.com">Mon Lien</a>`}
          titleLevel={3}
        ></DisplayContentContribution>
      );

      expect(getByText("Mon Lien").getAttribute("title")).toEqual(
        "Mon Lien - nouvelle fenêtre"
      );
    });
  });
});
