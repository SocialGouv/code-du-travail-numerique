import { xssWrapper } from "../xss";

describe("XSS Security", () => {
  test("HTML Accordion Button", () => {
    const src =
      '<button class="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-467706029" type="button" data-fr-js-collapse-button="true"> Retranscription textuelle </button>';
    expect(xssWrapper(src)).toBe(src);
  });
  test("HTML Accordion Button with onClick injection", () => {
    const src =
      '<button class="fr-accordion__btn" onClick="() => { alert("xss"); }" onBlur="() => { alert("xss"); }" onmouseover="() => { alert("xss"); }" aria-expanded="false" aria-controls="accordion-467706029" type="button" data-fr-js-collapse-button="true"> Retranscription textuelle </button>';
    expect(xssWrapper(src)).toBe(src);
  });
});
