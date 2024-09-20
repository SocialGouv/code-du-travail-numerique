/** @jest-environment node */

import { getLegalArticleBySlug } from "../service";

describe("Legal-articles", () => {
  it("getLegalArticleBySlug", async () => {
    const result = await getLegalArticleBySlug("r1225-18");
    expect(result).toEqual({
      _id: "11",
      dateDebut: 1209600000000,
      description:
        "Le salarié informe son employeur de sa démission, en application de l'article L. 1225-66 , par lettre recommandée avec avis de réception ou remise contre récépissé. Il adresse à l'employeur sa demande de réembauche, en application de l'article L. 1225-67 , par lettre recommandée avec avis de réception ou remise contre récépissé",
      html: "<p><br/>Le salarié informe son employeur de sa démission, en application de l'article <a href='/affichCodeArticle.do?cidTexte=LEGITEXT000006072050&idArticle=LEGIARTI000006900954&dateTexte=&categorieLien=cid' title='Code du travail - art. L1225-66 (VD)'>L. 1225-66</a>, par lettre recommandée avec avis de réception ou remise contre récépissé. <br/>Il adresse à l'employeur sa demande de réembauche, en application de l'article <a href='/affichCodeArticle.do?cidTexte=LEGITEXT000006072050&idArticle=LEGIARTI000006900955&dateTexte=&categorieLien=cid' title='Code du travail - art. L1225-67 (VD)'>L. 1225-67</a>, par lettre recommandée avec avis de réception ou remise contre récépissé.</p>",
      title: "R1225-18",
      url: "https://www.legifrance.gouv.fr/affichCodeArticle.do;?idArticle=LEGIARTI000018537778&cidTexte=LEGITEXT000006072050",
    });
  });
});
