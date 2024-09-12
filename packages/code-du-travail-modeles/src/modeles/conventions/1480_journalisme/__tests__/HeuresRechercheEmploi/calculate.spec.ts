
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "1480");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"2 heures par jour ouvrable, dans la limite de 50 heures","unit":""},"expectedReferences":[{"article":"Article 46","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C82F1F97F72A0703119C7E8E78BB85F7.tpdila10v_3?idArticle=KALIARTI000005786645&cidTexte=KALITEXT000005652402&dateTexte=20090818"}],"expectedNotifications":["Le salaire est maintenu.","Ces heures sont fixées alternativement par l'employeur et le journaliste. Toutefois, ce dernier peut, avec l'accord de l'employeur, bloquer tout ou partie de ces heures avant la fin du préavis. Le journaliste professionnel qui a trouvé un emploi ne peut plus utiliser les heures d'absence autorisée pour rechercher un emploi."],"situation":{"contrat salarié . convention collective . journalisme . typeRupture":"'Démission'"}},
          {"expectedResult":{"expectedValue":"2 heures par jour ouvrable, dans la limite de 50 heures","unit":""},"expectedReferences":[{"article":"Article 46","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C82F1F97F72A0703119C7E8E78BB85F7.tpdila10v_3?idArticle=KALIARTI000005786645&cidTexte=KALITEXT000005652402&dateTexte=20090818"}],"expectedNotifications":["Le salaire est maintenu.","Ces heures sont fixées alternativement par l'employeur et le journaliste. Toutefois, ce dernier peut, avec l'accord de l'employeur, bloquer tout ou partie de ces heures avant la fin du préavis. Le journaliste professionnel qui a trouvé un emploi ne peut plus utiliser les heures d'absence autorisée pour rechercher un emploi."],"situation":{"contrat salarié . convention collective . journalisme . typeRupture":"'Licenciement'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1480'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});