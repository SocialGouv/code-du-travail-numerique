import { replaceArticlesRefs } from "../replaceArticlesRefs";

describe("replaceArticlesRefs", () => {
  test("Should add domain to relative link with starting /", () => {
    const html = `<p></p>Un décret en Conseil d'Etat détermine les modalités d'application des <a data-title="1" href="/affichCodeArticle.do?cidTexte=LEGITEXT000006072050&amp;idArticle=LEGIARTI000006900875&amp;dateTexte=&amp;categorieLien=cid" title="Code du travail - art. L1224-1 (V)">articles L. 1224-1 et L. 1224-2</a>.<p></p>`;
    expect(replaceArticlesRefs("https://legifrance.gouv.fr", html)).toMatch(
      `<p></p>Un décret en Conseil d'Etat détermine les modalités d'application des <a data-title="1" href="https://legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006072050&amp;idArticle=LEGIARTI000006900875&amp;dateTexte=&amp;categorieLien=cid" title="Code du travail - art. L1224-1 (V)" rel="nofollow noopener" target="_blank">articles L. 1224-1 et L. 1224-2</a>.<p></p>`
    );
  });
  test("Should add domain to relative link missing /", () => {
    const html = `<p></p>Un décret en Conseil d'Etat détermine les modalités d'application des <a data-title="1" href="affichCodeArticle.do?cidTexte=LEGITEXT000006072050&amp;idArticle=LEGIARTI000006900875&amp;dateTexte=&amp;categorieLien=cid" title="Code du travail - art. L1224-1 (V)">articles L. 1224-1 et L. 1224-2</a>.<p></p>`;
    expect(replaceArticlesRefs("https://legifrance.gouv.fr", html)).toMatch(
      `<p></p>Un décret en Conseil d'Etat détermine les modalités d'application des <a data-title="1" href="https://legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006072050&amp;idArticle=LEGIARTI000006900875&amp;dateTexte=&amp;categorieLien=cid" title="Code du travail - art. L1224-1 (V)" rel="nofollow noopener" target="_blank">articles L. 1224-1 et L. 1224-2</a>.<p></p>`
    );
  });
});
