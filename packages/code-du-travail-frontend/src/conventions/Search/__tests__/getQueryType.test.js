import getQueryType from "../getQueryType";

test.each`
  query                | expected
  ${`carrefour paris`} | ${`text`}
  ${`airbus`}          | ${`text`}
  ${`148`}             | ${`idcc`}
  ${`1486`}            | ${`idcc`}
  ${`148614869`}       | ${`siren`}
  ${`1486148697777`}   | ${`siret`}
`("returns $expected when $query", ({ query, expected }) => {
  expect(getQueryType(query)).toBe(expected);
});
