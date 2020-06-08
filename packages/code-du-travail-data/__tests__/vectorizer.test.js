const { vectorizeDocument, vectorizeQuery } = require("../indexing/vectorizer");

test("Should vectorize document", async () => {
    const vector = await vectorizeDocument("titre", "contenu");
    expect(vector).toMatchSnapshot();
});

test("Should vectorize query", async () => {
    const vector = await vectorizeQuery("query");
    expect(vector).toMatchSnapshot();
});

test("Should fail when no content passed", async () => {
    await vectorizeQuery().catch((e) =>
        expect(e).toEqual(new Error("Bad Request"))
    );
});
