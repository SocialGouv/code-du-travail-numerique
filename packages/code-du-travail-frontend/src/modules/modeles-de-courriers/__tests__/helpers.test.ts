import { wrapInParagraphIfNeeded } from "../helpers";

describe("wrapInParagraphIfNeeded", () => {
  it("should wrap plain text in <p> tags", () => {
    expect(wrapInParagraphIfNeeded("Ceci est mon intro")).toBe(
      "<p>Ceci est mon intro</p>"
    );
  });

  it("should wrap text with inline elements in <p> tags", () => {
    expect(
      wrapInParagraphIfNeeded("Text with <strong>bold</strong> content")
    ).toBe("<p>Text with <strong>bold</strong> content</p>");
  });

  it("should not wrap content that already starts with <p>", () => {
    const html = "<p>Already wrapped in paragraph</p>";
    expect(wrapInParagraphIfNeeded(html)).toBe(html);
  });

  it("should not wrap content that starts with <p> and has multiple paragraphs", () => {
    const html =
      "<p>First paragraph</p><p>Second paragraph with <a href='/test'>link</a></p>";
    expect(wrapInParagraphIfNeeded(html)).toBe(html);
  });

  it("should not wrap content that starts with <ul>", () => {
    const html = "<ul><li>Item 1</li><li>Item 2</li></ul>";
    expect(wrapInParagraphIfNeeded(html)).toBe(html);
  });

  it("should not wrap content that starts with <div>", () => {
    const html = "<div>Some content</div>";
    expect(wrapInParagraphIfNeeded(html)).toBe(html);
  });

  it("should not wrap content that starts with <h2>", () => {
    const html = "<h2>Title</h2><p>Content</p>";
    expect(wrapInParagraphIfNeeded(html)).toBe(html);
  });

  it("should wrap leading text before <ul> in <p>, leaving <ul> untouched", () => {
    const html =
      "La lettre de licenciement comporte des motifs. Après les délais suivants : <ul><li>7 jours ouvrables</li><li>15 jours</li></ul>";
    expect(wrapInParagraphIfNeeded(html)).toBe(
      "<p>La lettre de licenciement comporte des motifs. Après les délais suivants : </p><ul><li>7 jours ouvrables</li><li>15 jours</li></ul>"
    );
  });

  it("should wrap leading text before <ol> in <p>, leaving <ol> untouched", () => {
    const html = "Steps to follow: <ol><li>Step 1</li><li>Step 2</li></ol>";
    expect(wrapInParagraphIfNeeded(html)).toBe(
      "<p>Steps to follow: </p><ol><li>Step 1</li><li>Step 2</li></ol>"
    );
  });

  it("should wrap leading text with inline HTML before block element", () => {
    const html =
      "Text with <strong>bold</strong> and <em>italic</em> before <ul><li>item</li></ul>";
    expect(wrapInParagraphIfNeeded(html)).toBe(
      "<p>Text with <strong>bold</strong> and <em>italic</em> before </p><ul><li>item</li></ul>"
    );
  });

  it("should handle content starting with <p> followed by <ul>", () => {
    const html = "<p>Some text</p><ul><li>Item</li></ul>";
    expect(wrapInParagraphIfNeeded(html)).toBe(html);
  });

  it("should handle content with leading whitespace", () => {
    const html = "  <p>Content with leading whitespace</p>";
    expect(wrapInParagraphIfNeeded(html)).toBe(html);
  });

  it("should not wrap content starting with <table>", () => {
    const html = "<table><tr><td>Cell</td></tr></table>";
    expect(wrapInParagraphIfNeeded(html)).toBe(html);
  });

  it("should not wrap content starting with <details>", () => {
    const html = "<details><summary>Title</summary>Content</details>";
    expect(wrapInParagraphIfNeeded(html)).toBe(html);
  });

  it("should not wrap content starting with <blockquote>", () => {
    const html = "<blockquote>A quote</blockquote>";
    expect(wrapInParagraphIfNeeded(html)).toBe(html);
  });

  it("should wrap text before <div> block element", () => {
    const html = "Introduction text <div>Block content</div>";
    expect(wrapInParagraphIfNeeded(html)).toBe(
      "<p>Introduction text </p><div>Block content</div>"
    );
  });
});
