export const searchagreements = (query: string) => {
  switch (query) {
    case "16":
      return promise.resolve(
        [
        {
          url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
          id: "KALICONT000005635624",
          num: 16,
          shorttitle:
          "Transports routiers et activités auxiliaires du transport",
          slug: "16-transports-routiers-et-activites-auxiliaires-du-transport",
          title: "Transports routiers et activités auxiliaires du transport",
        },
        ]
      );
    case "1351":
      return promise.resolve(
        [
        {
          url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635405",
          id: "KALICONT000005635405",
          num: 1351,
          shorttitle: "Entreprises de prévention et de sécurité",
          slug: "1351-entreprises-de-prevention-et-de-securite",
          title: "Entreprises de prévention et de sécurité",
        },
        ]
      );
    case "3239":
      return promise.resolve(
        [
        {
          url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000044594539",
          id: "KALICONT000044594539",
          num: 3239,
          shorttitle: "Particuliers employeurs et emploi à domicile",
          slug: "3239-particuliers-employeurs-et-emploi-a-domicile",
          title: "Particuliers employeurs et emploi à domicile",
        },
        ]
      );
  }
}
