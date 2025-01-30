/** @jest-environment node */

import { fetchContributionBySlug, fetchContributions } from "../queries";

describe("Contributions", () => {
  it("Récupération de toutes les contributions", async () => {
    const result = await fetchContributions(["slug", "title", "contentType"]);
    expect(result).toEqual([
      {
        slug: "les-conges-pour-evenements-familiaux",
        title: "Les congés pour événements familiaux",
      },
      {
        slug: "quelles-sont-les-consequences-du-deces-de-lemployeur-sur-le-contrat-de-travail",
        title:
          "Quelles sont les conséquences du décès de l’employeur sur le contrat de travail ?",
      },
      {
        slug: "44-quelles-sont-les-consequences-du-deces-de-lemployeur-sur-le-contrat-de-travail",
        title:
          "Quelles sont les conséquences du décès de l’employeur sur le contrat de travail ?",
      },
      {
        slug: "1090-quelles-sont-les-consequences-du-deces-de-lemployeur-sur-le-contrat-de-travail",
        title:
          "Quelles sont les conséquences du décès de l’employeur sur le contrat de travail ?",
      },
      {
        slug: "quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
        title:
          "Quand le salarié a-t-il droit à une prime d’ancienneté ? Quel est son montant ?",
      },
      {
        contentType: "ANSWER",
        slug: "44-quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
        title:
          "Quand le salarié a-t-il droit à une prime d’ancienneté ? Quel est son montant ?",
      },
    ]);
  });

  it("Récupération d'une contribution par son slug sans articles liées", async () => {
    const result = await fetchContributionBySlug(
      "les-conges-pour-evenements-familiaux"
    );
    expect(result).toEqual({
      _id: "32",
      breadcrumbs: [
        {
          label: "Congés et repos",
          position: 3,
          slug: "/themes/conges-et-repos",
        },
        {
          label: "Congés",
          position: 1,
          slug: "/themes/conges",
        },
        {
          label: "Congés pour événement familial",
          position: 3,
          slug: "/themes/conges-pour-evenement-familial",
        },
      ],
      idcc: "0000",
      isFicheSP: false,
      isGeneric: true,
      isNoCDT: false,
      relatedItems: [],
      slug: "les-conges-pour-evenements-familiaux",
      title: "Les congés pour événements familiaux",
    });
  });

  it("Récupération d'une contribution par son slug avec articles liées", async () => {
    const result = await fetchContributionBySlug(
      "44-quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant"
    );
    expect(result).toEqual({
      _id: "37",
      breadcrumbs: [
        {
          label: "Salaire et Rémunération",
          position: 1,
          slug: "/themes/salaire-et-remuneration",
        },
        {
          label: "Primes et avantages",
          position: 2,
          slug: "/themes/primes-et-avantages",
        },
      ],
      ccnShortTitle: "Industries chimiques et connexes",
      ccnSlug: "44-industries-chimiques-et-connexes",
      content:
        "<span class=\"title\">Qui est concerné ?</span><p>La convention collective prévoit une prime d'ancienneté pour les salariés appartenant à la catégorie des :</p><ul><li><p>Ouvriers, employés et techniciens (groupes I à III) et ;</p></li><li><p>Agents de maîtrise et techniciens (groupe IV).</p></li></ul><p>Le salarié doit avoir au moins 3 ans d'ancienneté.</p><span class=\"title\">Montant de la prime</span><p>La prime d'ancienneté est calculée en appliquant un pourcentage sur le minimum conventionnel correspondant au coefficient hiérarchique du salarié, augmenté, le cas échéant, des majorations pour heures supplémentaires et proportionnellement à l'horaire de travail. Les taux de la prime sont les suivants :</p><ul><li><p>3% après 3 ans d'ancienneté dans l'entreprise ;</p></li><li><p>6% après 6 ans d'ancienneté dans l'entreprise ;</p></li><li><p>9% après 9 ans d'ancienneté dans l'entreprise ;</p></li><li><p>12% après 12 ans d'ancienneté dans l'entreprise ;</p></li><li><p>15% après 15 ans d'ancienneté dans l'entreprise.</p></li></ul>",
      idcc: "0044",
      isFicheSP: false,
      isGeneric: false,
      isNoCDT: false,
      linkedContent: [
        {
          breadcrumbs: [
            {
              label: "Salaire et Rémunération",
              position: 1,
              slug: "/themes/salaire-et-remuneration",
            },
            {
              label: "Primes et avantages",
              position: 2,
              slug: "/themes/primes-et-avantages",
            },
          ],
          description:
            "Une convention collective peut prévoir des primes que l'employeur doit verser aux salariés. Elle précise alors leurs conditions d'attribution et montant.",
          slug: "quelles-sont-les-primes-prevues-par-la-convention-collective",
          source: "contributions",
          title:
            "Quelles sont les primes prévues par la convention collective ?",
        },
        {
          breadcrumbs: [
            {
              label: "Salaire et Rémunération",
              position: 1,
              slug: "/themes/salaire-et-remuneration",
            },
            {
              label: "Primes et avantages",
              position: 2,
              slug: "/themes/primes-et-avantages",
            },
          ],
          description:
            "Non, la réglementation du code du travail n'impose pas à votre employeur de vous verser une prime d'ancienneté. Nous vous expliquons dans quelles conditions la prime doit être versée si elle existe.",
          slug: "salaire-du-secteur-prive-la-prime-danciennete-est-elle-obligatoire",
          source: "fiches_service_public",
          title:
            "Salaire du secteur privé : la prime d'ancienneté est-elle obligatoire ?",
        },
      ],
      messageBlock:
        "<p>Ces informations sont issues de l’analyse des règles prévues par votre convention collective de branche étendue et par le Code du travail. Elles s’appliqueront sauf si une convention ou un accord d’entreprise (ou de groupe, ou d’établissement) existant dans votre entreprise prévoit également des règles sur le même sujet. En effet, dans ce cas, cette convention ou accord s’appliquera, qu’il soit plus ou moins favorable que la convention de branche, sous réserve d’être au moins aussi favorable que le Code du travail. Dans tous les cas, reportez-vous à votre contrat de travail car s’il contient des règles plus favorables, ce sont ces dernières qui s’appliqueront. </p><p>Attention, d’autres règles non étendues peuvent potentiellement vous être applicables.</p>",
      references: [
        {
          title:
            "Avenant n° 1 Ouvriers et collaborateurs du 11 février 1971 Article 10",
          url: "https://legifrance.gouv.fr/conv_coll/id/KALIARTI000005846371/?idConteneur=KALICONT000005635613",
        },
        {
          title:
            "Avenant n° 2 Agents de maîtrise et techniciens du 14 mars 1955 Article 16",
          url: "https://legifrance.gouv.fr/conv_coll/id/KALIARTI000005846453/?idConteneur=KALICONT000005635613",
        },
      ],
      relatedItems: [
        {
          items: [],
          title: "Modèles et outils liés",
        },
        {
          items: [
            {
              source: "contributions",
              title:
                "Quelles sont les primes prévues par la convention collective ?",
              url: "/contribution/quelles-sont-les-primes-prevues-par-la-convention-collective",
            },
            {
              source: "fiches_service_public",
              title:
                "Salaire du secteur privé : la prime d'ancienneté est-elle obligatoire ?",
              url: "/fiche-service-public/salaire-du-secteur-prive-la-prime-danciennete-est-elle-obligatoire",
            },
          ],
          title: "Articles liés",
        },
      ],
      slug: "44-quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
      title:
        "Quand le salarié a-t-il droit à une prime d’ancienneté ? Quel est son montant ?",
      type: "content",
    });
  });
});
