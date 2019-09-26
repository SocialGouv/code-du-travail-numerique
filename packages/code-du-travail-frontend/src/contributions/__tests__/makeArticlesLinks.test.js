import makeArticlesLinks from "../makeArticlesLinks";

// Tus : TODO
const tests = [
  "Article L3123-5",
  "Article R.3123-5",
  "Article D.  3123-5",
  "Article L  3123-5",
  "Article L-3123-5",
  "Article L3123-5 et L234-12",
  "Article L3123-5 et [L234-12](http://travail.gouv.fr)",
  "Article L3123-5, L3123-7, L3123-52-1",
  "Article L3123-5, L3123-7, L3123-52-1 et L3123-7, L3123-52-1",
  "Article L-3123-5, L.3123-7, L 3123-52-1, L. 3123-52-1",
  "XD2432-1",
  "D12"
];

tests.forEach(t => {
  test(`should detect ${t} correctly`, () => {
    expect(makeArticlesLinks(t)).toMatchSnapshot();
  });
});
