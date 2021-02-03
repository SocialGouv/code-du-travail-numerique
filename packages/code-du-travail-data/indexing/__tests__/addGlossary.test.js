import { addGlossary } from "../glossary";

const glossaryTerms = [
  {
    definition: "Contenu tooltip.",
    term: "term1",
    variants: ["term111"],
  },
  {
    tagName: "tag-veryspecial",
    term: "veryspecial",
  },
  {
    term: "accord de branche",
  },
];

describe("addGlossary HTML", () => {
  test("should replace in HTML content", () => {
    const content = `<p>some <b>HTML</b> with <a href="#">term1</a> and its variant term111</p>`;
    expect(
      addGlossary({ content, contentType: "html", glossaryTerms })
    ).toEqual(
      `<p>some <b>HTML</b> with <a href="#"><span><webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip></span></a> and its variant<span> <webcomponent-tooltip content="Contenu%20tooltip.">term111</webcomponent-tooltip></span></p>`
    );
  });

  test("should replace in loose HTML content", () => {
    const content = `<p>some <b>HTML</b> with <a href="#">term1</a> and its variant term111 also`;
    expect(
      addGlossary({ content, contentType: "html", glossaryTerms })
    ).toEqual(
      `<p>some <b>HTML</b> with <a href="#"><span><webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip></span></a> and its variant<span> <webcomponent-tooltip content="Contenu%20tooltip.">term111</webcomponent-tooltip> </span>also</p>`
    );
  });

  test("should replace in starting words", () => {
    const content = `term1 is here`;
    expect(
      addGlossary({ content, contentType: "html", glossaryTerms })
    ).toEqual(
      `<span><webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip> </span>is here`
    );
  });

  test("should replace in ending words", () => {
    const content = `now there term1`;
    expect(
      addGlossary({ content, contentType: "html", glossaryTerms })
    ).toEqual(
      `now there<span> <webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip></span>`
    );
  });

  test("should replace in nested HTML", () => {
    const content = `now <div><ul>
<li>Term1 inside some list</li<
</ul></div>`;
    expect(
      addGlossary({ content, contentType: "html", glossaryTerms })
    ).toEqual(
      `now <div><ul>
<li><span><webcomponent-tooltip content="Contenu%20tooltip.">Term1</webcomponent-tooltip> </span>inside some list</li></ul></div>`
    );
  });

  test("should NOT replace in attribute", () => {
    const content = `now <div title="some term1">hello</div>`;
    expect(
      addGlossary({ content, contentType: "html", glossaryTerms })
    ).toEqual(`now <div title="some term1">hello</div>`);
  });

  test("should NOT replace in tagname", () => {
    const content = `now <term1>hello</term1>`;
    expect(
      addGlossary({ content, contentType: "html", glossaryTerms })
    ).toEqual(`now <term1>hello</term1>`);
  });

  test("should NOT replace partial word", () => {
    const content = `now term1é`;
    expect(
      addGlossary({ content, contentType: "html", glossaryTerms })
    ).toEqual(`now term1é`);
  });

  test("should use custom tagName", () => {
    const content = `now for some veryspecial term`;
    expect(
      addGlossary({ content, contentType: "html", glossaryTerms })
    ).toEqual(
      `now for some<span> <tag-veryspecial>veryspecial</tag-veryspecial> </span>term`
    );
  });
});

describe("addGlossary Markdown", () => {
  test("should replace in Markdown content", () => {
    const content = `# Hello term1

    Some content with *term1* and term111`;
    expect(
      addGlossary({ content, contentType: "markdown", glossaryTerms })
    ).toEqual(
      `# Hello <webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip>

Some content with *<webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip>* and <webcomponent-tooltip content="Contenu%20tooltip.">term111</webcomponent-tooltip>`
    );
  });

  test("should replace in starting words", () => {
    const content = `term1 is here`;
    expect(
      addGlossary({ content, contentType: "markdown", glossaryTerms })
    ).toEqual(
      `<webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip> is here`
    );
  });

  test("should replace in ending words", () => {
    const content = `now there term1`;
    expect(
      addGlossary({ content, contentType: "markdown", glossaryTerms })
    ).toEqual(
      `now there <webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip>`
    );
  });

  test("should replace in quotes", () => {
    const content = `now is "term1"`;
    expect(
      addGlossary({ content, contentType: "markdown", glossaryTerms })
    ).toEqual(
      `now is "<webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip>"`
    );
  });

  test("should replace with apos", () => {
    const content = `now is l'term1`;
    expect(
      addGlossary({ content, contentType: "markdown", glossaryTerms })
    ).toEqual(
      `now is l'<webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip>`
    );
  });

  test("should replace with perentheses", () => {
    const content = `now is (term1)`;
    expect(
      addGlossary({ content, contentType: "markdown", glossaryTerms })
    ).toEqual(
      `now is (<webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip>)`
    );
  });

  test("should replace in MDX content", () => {
    const content = `<Tab>
<Title>some title term1</Title>
</Tab>

> And now some term111 text
`;
    expect(
      addGlossary({ content, contentType: "markdown", glossaryTerms })
    ).toEqual(
      `<Tab>
  <Title>some title <webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip></Title>
</Tab>

> And now some <webcomponent-tooltip content="Contenu%20tooltip.">term111</webcomponent-tooltip> text`
    );
  });

  test("should use custom tagName", () => {
    const content = `# now for some __veryspecial__ term`;
    expect(
      addGlossary({ content, contentType: "markdown", glossaryTerms })
    ).toEqual(
      `# now for some **<tag-veryspecial>veryspecial</tag-veryspecial>** term`
    );
  });

  test("should handle complex markdown", () => {
    const content = `Some text

<Tab>

<HDN>

Some content

- entry 1
- term1
- entry 3

</HDN>

</Tab>`;
    expect(
      addGlossary({ content, contentType: "markdown", glossaryTerms })
    ).toEqual(
      `Some text

<Tab>
  <HDN>
    Some content

    - entry 1
    - <webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip>
    - entry 3
  </HDN>
</Tab>`
    );
  });
});
