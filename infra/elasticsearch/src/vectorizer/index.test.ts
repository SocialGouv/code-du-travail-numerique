import { preprocess, vectorizeDocument, vectorizeQuery } from "../vectorizer";

const timeout = 10000;

test(
  "Should vectorize document",
  async () => {
    const vector1 = await vectorizeDocument("titre", "contenu");
    expect(vector1).toBeDefined();
    expect(vector1).toMatchSnapshot();

    // preprocessing should make those embeddings equal
    const vector2 = await vectorizeDocument("le titre", "et le contènu");
    expect(vector2).toEqual(vector1);
  },
  timeout
);

test(
  "Should vectorize query",
  async () => {
    const vector1 = await vectorizeQuery("requete");
    expect(vector1).toMatchSnapshot();
    const vector2 = await vectorizeQuery("la requête");
    expect(vector2).toEqual(vector1);
  },
  timeout
);

test("Should preprocess text", () => {
  expect(preprocess("à la nôtre")).toEqual("");
  expect(preprocess("çode du tràvail")).toEqual("code travail");
  // this one should be "aime code travail" when using better tokenization
  expect(preprocess("j'aime le code du travail")).toEqual(
    "j'aime code travail"
  );
});
