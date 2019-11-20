import externalContent from "../externalContent";

const tests = [
  {
    label: "External content SP",
    data:
      '<Content href="https://www.service-public.fr/professionnels-entreprises/vosdroits/F33693"/>',
    url:
      "https://www.service-public.fr/professionnels-entreprises/vosdroits/F33693"
  },
  {
    label: "External content SP with Mdx",
    data:
      '<Content href="https://www.service-public.fr/particuliers/vosdroits/F31897"/>\n\n<HDN>\n\nLa durée du délai de carence entre 2 CDD prévue par le code du travail s’applique sauf si une convention ou un accord collectif de branche étendu fixe cette durée.\n\n</HDN>\n\n_Source_ :\n[Article L1244-3-1 du code du travail](https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000035639421&cidTexte=LEGITEXT000006072050&dateTexte=20191029&oldAction=rechCodeArticle&fastReqId=554557662&nbResultRech=1)',
    url: "https://www.service-public.fr/particuliers/vosdroits/F31897"
  },
  {
    label: "External content MT with Mdx",
    data:
      'Le code du travail prévoit plusieurs congés pour événements familiaux (naissance, mariage, etc.).\n\n<Content href="https://travail-emploi.gouv.fr/droit-du-travail/les-absences-pour-maladie-et-conges-pour-evenements-familiaux/article/les-conges-pour-evenements-familiaux"/>\n\n<HDN>\n\nL’employeur applique la mesure la plus favorable pour l’ensemble des salariés, que cette mesure soit prévue par la loi, une convention ou un accord collectif de branche et/ou d’entreprise. Le contrat de travail peut toujours prévoir des mesures plus favorables, qui s’appliqueront.\n\n</HDN>',
    url:
      "https://travail-emploi.gouv.fr/droit-du-travail/les-absences-pour-maladie-et-conges-pour-evenements-familiaux/article/les-conges-pour-evenements-familiaux"
  }
];

tests.forEach(t => {
  test(`should extract url from ${t.label} correctly`, () => {
    expect(externalContent(t.data)).toMatchSnapshot(t.url);
  });
});
