//

import { synonyms } from "./index";

test("should return an array of french stop words", () => {
  expect(Array.isArray(synonyms)).toBeTruthy();
  expect(synonyms.length).toBeGreaterThan(0);
  // from cdtn_synonyms.json
  expect(synonyms.slice(0, 5)).toEqual(
    expect.arrayContaining(["à quel moment, quand => quand"])
  );
  // From TESS.json
  expect(synonyms.slice(5, 10)).toEqual(
    expect.arrayContaining(["accident vasculaire cérébral, avc => avc"])
  );
});
