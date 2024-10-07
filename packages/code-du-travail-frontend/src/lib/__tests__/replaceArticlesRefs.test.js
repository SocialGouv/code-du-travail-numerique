import { replaceArticlesRefs } from "../replaceArticlesRefs";

describe("replaceArticlesRefs", () => {
  test("Should add domain to relative link with starting /", () => {
    const html = `<p></p>Un décret en Conseil d'Etat détermine les modalités d'application des <a data-title="1" href="/affichCodeArticle.do?cidTexte=LEGITEXT000006072050&amp;idArticle=LEGIARTI000006900875&amp;dateTexte=&amp;categorieLien=cid" title="Code du travail - art. L1224-1 (V)">articles L. 1224-1 et L. 1224-2</a>.<p></p>`;
    expect(replaceArticlesRefs("https://legifrance.gouv.fr", html)).toMatch(
      `<p></p>Un décret en Conseil d'Etat détermine les modalités d'application des <a data-title="1" href='https://legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006072050&amp;idArticle=LEGIARTI000006900875&amp;dateTexte=&amp;categorieLien=cid' target='_blank' title="Code du travail - art. L1224-1 (V)">articles L. 1224-1 et L. 1224-2</a>.<p></p>`,
    );
  });

  test("Should add domain to relative link (handle simple quote)", () => {
    const html = `<p>Ne sont pas applicables au licenciement d'un salarié de moins de deux ans d'ancienneté dans l'entreprise et au licenciement opéré par un employeur employant habituellement moins de onze salariés, les dispositions relatives à la sanction :</p><p>1° De la nullité du licenciement, prévues à l'article <a href='/affichCodeArticle.do?cidTexte=LEGITEXT000006072050&idArticle=LEGIARTI000035643497&dateTexte=&categorieLien=id' title='Code du travail - art. L1235-11 (V)'>L. 1235-11 </a>;</p><p>2° (supprimé) ;</p><p>3° Du non-respect de la priorité de réembauche, prévues à l'article <a href='/affichCodeArticle.do?cidTexte=LEGITEXT000006072050&idArticle=LEGIARTI000035643440&dateTexte=&categorieLien=id' title='Code du travail - art. L1235-13 (V)'>L. 1235-13</a>.</p><p>Le salarié peut prétendre, en cas de licenciement abusif, à une indemnité correspondant au préjudice subi.</p>`;
    expect(replaceArticlesRefs("https://legifrance.gouv.fr", html)).toMatch(
      `<p>Ne sont pas applicables au licenciement d'un salarié de moins de deux ans d'ancienneté dans l'entreprise et au licenciement opéré par un employeur employant habituellement moins de onze salariés, les dispositions relatives à la sanction :</p><p>1° De la nullité du licenciement, prévues à l'article <a href='https://legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006072050&idArticle=LEGIARTI000035643497&dateTexte=&categorieLien=id' target='_blank' title='Code du travail - art. L1235-11 (V)'>L. 1235-11 </a>;</p><p>2° (supprimé) ;</p><p>3° Du non-respect de la priorité de réembauche, prévues à l'article <a href='https://legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006072050&idArticle=LEGIARTI000035643440&dateTexte=&categorieLien=id' target='_blank' title='Code du travail - art. L1235-13 (V)'>L. 1235-13</a>.</p><p>Le salarié peut prétendre, en cas de licenciement abusif, à une indemnité correspondant au préjudice subi.</p>`,
    );
    // const html = `<p>Ne sont pas applicables au licenciement d'un salarié de moins de deux ans d'ancienneté dans l'entreprise et au licenciement opéré par un employeur employant habituellement moins de onze salariés, les dispositions relatives à la sanction :</p>`;
    // expect(replaceArticlesRefs("https://legifrance.gouv.fr", html)).toMatch(
    //   `<p>Ne sont pas applicables au licenciement d'un salarié de moins de deux ans d'ancienneté dans l'entreprise et au licenciement opéré par un employeur employant habituellement moins de onze salariés, les dispositions relatives à la sanction :</p>`
    // );
  });
});
