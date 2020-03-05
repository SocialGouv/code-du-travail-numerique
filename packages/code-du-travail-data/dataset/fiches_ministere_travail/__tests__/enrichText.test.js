const { addTags } = require("../enrichText");

const testCase =
  "<p>La loi n’en prévoit pas. En revanche, certaines conventions collectives organisent en faveur des salariés licenciés (rarement pour ceux qui donnent leur démission) des temps d’absence - rémunérés ou non - pour rechercher un emploi pendant le préavis. Il convient donc, sur ce point, de se reporter aux conventions ou aux accords collectifs applicables dans l’entreprise.</p>";

test("should add tags to html content", () => {
  expect(addTags(testCase)).toMatchSnapshot();
});
