import request from "supertest";
import server from "nextjs-http-supertest";

describe("Test enterprise endpoint", () => {
  test("Call returns 404 if no enterprises found", async () => {
    const apiEnterpriseResponse = {
      body: "Not found",
      status: 404,
    };

    (global as any).fetch = jest.fn(() => apiEnterpriseResponse);

    const response = await request(server).get("/api/enterprises?q=NOT-FOUND");

    expect(response.status).toEqual(404);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api-entreprise/search?q=NOT-FOUND&page=1&per_page=25&etat_administratif=A&sort_by_size=true`
    );

    expect(response.body).toEqual({ message: "Not found" });
  });

  test("Call encode query params", async () => {
    const apiEnterpriseResponse = {
      json: () => ({
        results: [],
      }),
      status: 200,
    };

    (global as any).fetch = jest.fn(() => apiEnterpriseResponse);

    const response = await request(server).get(
      `/api/enterprises?q=${encodeURIComponent("La pêche à la ligne")}`
    );

    expect(response.status).toEqual(200);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://api-entreprise/search?q=La%20p%C3%AAche%20%C3%A0%20la%20ligne&page=1&per_page=25&etat_administratif=A&sort_by_size=true"
    );
  });

  test("A call to retrieve agreements from an enterprise", async () => {
    const apiEnterpriseResponse = {
      json: () => ({
        results: [
          {
            siren: "752517367",
            nom_complet: "AUTOEXPRESS (AUTOEXPRESS)",
            nom_raison_sociale: "AUTOEXPRESS",
            sigle: "AUTOEXPRESS",
            nombre_etablissements: 1,
            nombre_etablissements_ouverts: 0,
            siege: {
              activite_principale: "45.11Z",
              activite_principale_registre_metier: null,
              annee_tranche_effectif_salarie: null,
              adresse: "2 AVENUE LOUIS PREVEL 06000 NICE",
              caractere_employeur: "N",
              cedex: null,
              code_pays_etranger: null,
              code_postal: "06000",
              commune: "06088",
              complement_adresse: null,
              coordonnees: "43.721260999999984,7.271630999999998",
              date_creation: "2012-05-23",
              date_debut_activite: "2017-01-04",
              date_fermeture: "2017-01-04",
              date_mise_a_jour: null,
              date_mise_a_jour_insee: "2024-03-30T09:27:56",
              departement: "06",
              distribution_speciale: null,
              epci: "200030195",
              est_siege: true,
              etat_administratif: "F",
              geo_adresse: null,
              geo_id: null,
              indice_repetition: null,
              latitude: "43.721260999999984",
              libelle_cedex: null,
              libelle_commune: "NICE",
              libelle_commune_etranger: null,
              libelle_pays_etranger: null,
              libelle_voie: "LOUIS PREVEL",
              liste_enseignes: ["AUTOEXPRESS"],
              liste_finess: null,
              liste_id_bio: null,
              liste_idcc: null,
              liste_id_organisme_formation: null,
              liste_rge: null,
              liste_uai: null,
              longitude: "7.271630999999998",
              nom_commercial: null,
              numero_voie: "2",
              region: "93",
              siret: "75251736700013",
              statut_diffusion_etablissement: "O",
              tranche_effectif_salarie: null,
              type_voie: "AVENUE",
            },
            activite_principale: "45.11Z",
            categorie_entreprise: null,
            caractere_employeur: null,
            annee_categorie_entreprise: null,
            date_creation: "2012-05-23",
            date_fermeture: null,
            date_mise_a_jour: "2024-06-14T10:00:10",
            date_mise_a_jour_insee: "2024-03-22T14:26:06",
            date_mise_a_jour_rne: "2024-01-13T14:06:16",
            dirigeants: [],
            etat_administratif: "A",
            nature_juridique: "5499",
            section_activite_principale: "G",
            tranche_effectif_salarie: null,
            annee_tranche_effectif_salarie: null,
            statut_diffusion: "O",
            matching_etablissements: [
              {
                activite_principale: "45.11Z",
                annee_tranche_effectif_salarie: null,
                adresse: "2 AVENUE LOUIS PREVEL 06000 NICE",
                caractere_employeur: "N",
                code_postal: "06000",
                commune: "06088",
                date_creation: "2012-05-23",
                date_debut_activite: "2017-01-04",
                date_fermeture: "2017-01-04",
                epci: "200030195",
                est_siege: true,
                etat_administratif: "F",
                geo_id: null,
                latitude: "43.721260999999984",
                libelle_commune: "NICE",
                liste_enseignes: ["AUTOEXPRESS"],
                liste_finess: null,
                liste_id_bio: null,
                liste_idcc: null,
                liste_id_organisme_formation: null,
                liste_rge: null,
                liste_uai: null,
                longitude: "7.271630999999998",
                nom_commercial: null,
                region: "93",
                siret: "75251736700013",
                statut_diffusion_etablissement: "O",
                tranche_effectif_salarie: null,
              },
            ],
            finances: {},
            complements: {
              collectivite_territoriale: null,
              convention_collective_renseignee: false,
              egapro_renseignee: false,
              est_association: false,
              est_bio: false,
              est_entrepreneur_individuel: false,
              est_entrepreneur_spectacle: false,
              est_ess: false,
              est_finess: false,
              est_organisme_formation: false,
              est_qualiopi: false,
              liste_id_organisme_formation: null,
              est_rge: false,
              est_service_public: false,
              est_siae: false,
              est_societe_mission: false,
              est_uai: false,
              identifiant_association: null,
              statut_entrepreneur_spectacle: null,
              type_siae: null,
            },
          },
        ],
        total_results: 1,
        page: 1,
        per_page: 25,
        total_pages: 1,
      }),
      status: 200,
    };

    (global as any).fetch = jest.fn(() => apiEnterpriseResponse);

    const response = await request(server).get(
      "/api/enterprises?q=AUTOEXPRESS"
    );

    expect(response.status).toEqual(200);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://api-entreprise/search?q=AUTOEXPRESS&page=1&per_page=25&etat_administratif=A&sort_by_size=true"
    );

    expect(response.body).toEqual({
      entreprises: [
        {
          activitePrincipale:
            "45.11Z - Commerce de voitures et de véhicules automobiles légers",
          address: "2 AVENUE LOUIS PREVEL 06000 NICE",
          conventions: [],
          etablissements: 0,
          firstMatchingEtablissement: {
            address: "2 AVENUE LOUIS PREVEL 06000 NICE",
            siret: "75251736700013",
          },
          highlightLabel: "AUTOEXPRESS",
          label: "AUTOEXPRESS (AUTOEXPRESS)",
          matching: 0,
          simpleLabel: "AUTOEXPRESS (AUTOEXPRESS)",
          siren: "752517367",
        },
      ],
    });
  });

  test("Call should pass address if provided", async () => {
    const apiEnterpriseResponse = {
      json: () => ({
        results: [],
      }),
      status: 200,
    };

    (global as any).fetch = jest.fn(() => apiEnterpriseResponse);

    const response = await request(server).get(
      "/api/enterprises?q=hello&a=my%20address"
    );

    expect(response.status).toEqual(200);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://api-entreprise/search?ranked=true&query=hello&convention=false&open=true&matchingLimit=0&address=my%20address"
    );
  });

  // test("Call retrieving agreement with a slug from an enterprise", async () => {
  //   const apiEnterpriseResponse = {
  //     json: () => ({
  //       results: [],
  //     }),
  //     status: 200,
  //   };

  //   (global as any).fetch = jest.fn(() => apiEnterpriseResponse);

  //   const response = await request(server).get(
  //     "/api/enterprises?q=AUTOEXPRESS"
  //   );

  //   expect(response.status).toEqual(200);
  //   expect(fetch).toHaveBeenCalledTimes(1);
  //   expect(fetch).toHaveBeenCalledWith(
  //     `https://api-entreprise/search?ranked=true&query=AUTOEXPRESS&convention=false&open=true&matchingLimit=0`,
  //     { headers: { referer: "cdtn-api" } }
  //   );

  //   expect(response.body.entreprises).toHaveLength(1);
  //   expect(response.body.entreprises[0].conventions).toHaveLength(1);
  //   expect(response.body.entreprises[0].conventions[0].slug).toEqual(
  //     "1090-services-de-lautomobile-commerce-et-reparation-de-lautomobile-du-cycle"
  //   );
  // });

  // test("Call retrieving agreements with slug and no slug from an enterprise", async () => {
  //   const apiEnterpriseResponse = {
  //     json: () => ({
  //       entreprises: [
  //         {
  //           conventions: [
  //             {
  //               idcc: 1090,
  //             },
  //             {
  //               idcc: 99999,
  //             },
  //           ],
  //         },
  //       ],
  //     }),
  //     status: 200,
  //   };

  //   (global as any).fetch = jest.fn(() => apiEnterpriseResponse);

  //   const response = await request(server).get(
  //     "/api/enterprises?q=AUTOEXPRESS"
  //   );

  //   expect(response.status).toEqual(200);
  //   expect(fetch).toHaveBeenCalledTimes(1);
  //   expect(fetch).toHaveBeenCalledWith(
  //     `https://api-entreprise/search?ranked=true&query=AUTOEXPRESS&convention=false&open=true&matchingLimit=0`,
  //     { headers: { referer: "cdtn-api" } }
  //   );

  //   expect(response.body.entreprises).toHaveLength(1);
  //   expect(response.body.entreprises[0].conventions).toHaveLength(2);
  //   expect(
  //     response.body.entreprises[0].conventions.find(
  //       (agreement) => agreement.num === 1090
  //     ).slug
  //   ).toEqual(
  //     "1090-services-de-lautomobile-commerce-et-reparation-de-lautomobile-du-cycle"
  //   );

  //   const agreementNoSlug = response.body.entreprises[0].conventions.find(
  //     (agreement) => agreement.num === 99999
  //   );
  //   expect(agreementNoSlug.slug).toBeUndefined();
  //   expect(agreementNoSlug.shortTitle).toEqual(
  //     "Convention collective non reconnue"
  //   );
  // });

  // test("Call retrieving agreement not in elastic from an enterprise", async () => {
  //   const apiEnterpriseResponse = {
  //     json: () => ({
  //       entreprises: [
  //         {
  //           conventions: [
  //             {
  //               idcc: 123456,
  //             },
  //           ],
  //         },
  //       ],
  //     }),
  //     status: 200,
  //   };

  //   const expectedResponse = {
  //     entreprises: [
  //       {
  //         conventions: [
  //           {
  //             num: 123456,
  //             shortTitle: "Convention collective non reconnue",
  //             id: "123456",
  //             contributions: false,
  //             title: "",
  //           },
  //         ],
  //       },
  //     ],
  //   };

  //   (global as any).fetch = jest.fn(() => apiEnterpriseResponse);

  //   const response = await request(server).get(
  //     "/api/enterprises?q=AUTOEXPRESS"
  //   );

  //   expect(response.status).toEqual(200);
  //   expect(fetch).toHaveBeenCalledTimes(1);
  //   expect(fetch).toHaveBeenCalledWith(
  //     `https://api-entreprise/search?ranked=true&query=AUTOEXPRESS&convention=false&open=true&matchingLimit=0`,
  //     { headers: { referer: "cdtn-api" } }
  //   );

  //   expect(response.body).toEqual(expectedResponse);
  // });

  // test("Call retrieving enterprise without conventions", async () => {
  //   const apiEnterpriseResponse = {
  //     json: () => ({
  //       entreprises: [
  //         {
  //           activitePrincipale:
  //             "Entretien et réparation de véhicules automobiles",
  //           conventions: [],
  //         },
  //       ],
  //     }),
  //     status: 200,
  //   };

  //   (global as any).fetch = jest.fn(() => apiEnterpriseResponse);

  //   const response = await request(server).get(
  //     "/api/enterprises?q=AUTOEXPRESS"
  //   );

  //   expect(response.status).toEqual(200);
  //   expect(fetch).toHaveBeenCalledTimes(1);
  //   expect(fetch).toHaveBeenCalledWith(
  //     `https://api-entreprise/search?ranked=true&query=AUTOEXPRESS&convention=false&open=true&matchingLimit=0`,
  //     { headers: { referer: "cdtn-api" } }
  //   );

  //   expect(response.body).toEqual(apiEnterpriseResponse.json());
  // });

  // test("Call retrieving agreements for multiple enterprise", async () => {
  //   const apiEnterpriseResponse = {
  //     json: () => ({
  //       entreprises: [
  //         {
  //           conventions: [
  //             {
  //               idcc: 1090,
  //             },
  //           ],
  //         },
  //         {
  //           conventions: [
  //             {
  //               idcc: 1090,
  //             },
  //           ],
  //         },
  //       ],
  //     }),
  //     status: 200,
  //   };

  //   (global as any).fetch = jest.fn(() => apiEnterpriseResponse);

  //   const response = await request(server).get(
  //     "/api/enterprises?q=AUTOEXPRESS"
  //   );

  //   expect(response.status).toEqual(200);
  //   expect(fetch).toHaveBeenCalledTimes(1);
  //   expect(fetch).toHaveBeenCalledWith(
  //     `https://api-entreprise/search?ranked=true&query=AUTOEXPRESS&convention=false&open=true&matchingLimit=0`,
  //     { headers: { referer: "cdtn-api" } }
  //   );

  //   expect(response.body.entreprises).toHaveLength(2);
  //   response.body.entreprises.forEach((enterprise) => {
  //     expect(enterprise.conventions).toHaveLength(1);
  //     expect(enterprise.conventions[0].num).toEqual(1090);
  //     expect(enterprise.conventions[0].slug).not.toBeUndefined();
  //   });
  // });

  // test("A call to retrieve not supported agreements from an enterprise", async () => {
  //   const enterpriseApiDataResponse = {
  //     entreprises: [
  //       {
  //         activitePrincipale:
  //           "Entretien et réparation de véhicules automobiles",
  //         conventions: [
  //           {
  //             idcc: 1747,
  //           },
  //         ],
  //         etablissements: 1,
  //         highlightLabel: "<b><u>AUTOEXPRESS</b></u>",
  //         label: "AUTOEXPRESS",
  //         matching: 1,
  //         matchingEtablissement: {
  //           address: "1 Rue Clément Ader 08110 Carignan",
  //           siret: "75280280100023",
  //         },
  //         simpleLabel: "AUTOEXPRESS",
  //         siren: "752802801",
  //       },
  //     ],
  //   };
  //   const apiEnterpriseResponse = {
  //     json: () => enterpriseApiDataResponse,
  //     status: 200,
  //   };

  //   (global as any).fetch = jest.fn(() => apiEnterpriseResponse);

  //   const response = await request(server).get(
  //     "/api/enterprises?q=AUTOEXPRESS"
  //   );

  //   expect(response.status).toEqual(200);
  //   expect(fetch).toHaveBeenCalledTimes(1);
  //   expect(fetch).toHaveBeenCalledWith(
  //     `https://api-entreprise/search?ranked=true&query=AUTOEXPRESS&convention=false&open=true&matchingLimit=0`,
  //     { headers: { referer: "cdtn-api" } }
  //   );

  //   expect(response.body.entreprises[0].conventions[0].num).toEqual(1747);
  //   expect(response.body.entreprises[0].conventions[0].contributions).toEqual(
  //     false
  //   );
  // });

  // test("A call to retrieve supported agreements from an enterprise", async () => {
  //   const enterpriseApiDataResponse = {
  //     entreprises: [
  //       {
  //         activitePrincipale:
  //           "Entretien et réparation de véhicules automobiles",
  //         conventions: [
  //           {
  //             idcc: 843,
  //           },
  //         ],
  //         etablissements: 1,
  //         highlightLabel: "<b><u>AUTOEXPRESS</b></u>",
  //         label: "AUTOEXPRESS",
  //         matching: 1,
  //         matchingEtablissement: {
  //           address: "1 Rue Clément Ader 08110 Carignan",
  //           siret: "75280280100023",
  //         },
  //         simpleLabel: "AUTOEXPRESS",
  //         siren: "752802801",
  //       },
  //     ],
  //   };
  //   const apiEnterpriseResponse = {
  //     json: () => enterpriseApiDataResponse,
  //     status: 200,
  //   };

  //   (global as any).fetch = jest.fn(() => apiEnterpriseResponse);

  //   const response = await request(server).get(
  //     "/api/enterprises?q=AUTOEXPRESS"
  //   );

  //   expect(response.status).toEqual(200);
  //   expect(fetch).toHaveBeenCalledTimes(1);
  //   expect(fetch).toHaveBeenCalledWith(
  //     `https://api-entreprise/search?ranked=true&query=AUTOEXPRESS&convention=false&open=true&matchingLimit=0`,
  //     { headers: { referer: "cdtn-api" } }
  //   );

  //   expect(response.body.entreprises[0].conventions[0].num).toEqual(843);
  //   expect(response.body.entreprises[0].conventions[0].contributions).toEqual(
  //     true
  //   );
  // });

  // test("Check display of agreements with split", async () => {
  //   const enterpriseApiDataResponse = {
  //     entreprises: [
  //       {
  //         activitePrincipale:
  //           "Entretien et réparation de véhicules automobiles",
  //         conventions: [
  //           {
  //             idcc: 1740,
  //           },
  //         ],
  //         etablissements: 1,
  //         highlightLabel: "<b><u>AUTOEXPRESS</b></u>",
  //         label: "AUTOEXPRESS",
  //         matching: 1,
  //         matchingEtablissement: {
  //           address: "1 Rue Clément Ader 08110 Carignan",
  //           siret: "75280280100023",
  //         },
  //         simpleLabel: "AUTOEXPRESS",
  //         siren: "752802801",
  //       },
  //     ],
  //   };
  //   const apiEnterpriseResponse = {
  //     json: () => enterpriseApiDataResponse,
  //     status: 200,
  //   };

  //   (global as any).fetch = jest.fn(() => apiEnterpriseResponse);

  //   const response = await request(server).get(
  //     "/api/enterprises?q=AUTOEXPRESS"
  //   );

  //   expect(response.status).toEqual(200);
  //   expect(fetch).toHaveBeenCalledTimes(1);
  //   expect(fetch).toHaveBeenCalledWith(
  //     `https://api-entreprise/search?ranked=true&query=AUTOEXPRESS&convention=false&open=true&matchingLimit=0`,
  //     { headers: { referer: "cdtn-api" } }
  //   );

  //   expect(response.body.entreprises[0].conventions[0].num).toEqual(1596);
  //   expect(response.body.entreprises[0].conventions[0].contributions).toEqual(
  //     false
  //   );
  //   expect(response.body.entreprises[0].conventions[1].num).toEqual(1597);
  //   expect(response.body.entreprises[0].conventions[1].contributions).toEqual(
  //     false
  //   );
  // });

  // test("Check display of agreements with merge", async () => {
  //   const enterpriseApiDataResponse = {
  //     entreprises: [
  //       {
  //         activitePrincipale:
  //           "Entretien et réparation de véhicules automobiles",
  //         conventions: [
  //           {
  //             idcc: 54,
  //           },
  //           {
  //             idcc: 650,
  //           },
  //         ],
  //         etablissements: 1,
  //         highlightLabel: "<b><u>AUTOEXPRESS</b></u>",
  //         label: "AUTOEXPRESS",
  //         matching: 1,
  //         matchingEtablissement: {
  //           address: "1 Rue Clément Ader 08110 Carignan",
  //           siret: "75280280100023",
  //         },
  //         simpleLabel: "AUTOEXPRESS",
  //         siren: "752802801",
  //       },
  //     ],
  //   };
  //   const apiEnterpriseResponse = {
  //     json: () => enterpriseApiDataResponse,
  //     status: 200,
  //   };

  //   (global as any).fetch = jest.fn(() => apiEnterpriseResponse);

  //   const response = await request(server).get(
  //     "/api/enterprises?q=AUTOEXPRESS"
  //   );

  //   expect(response.status).toEqual(200);
  //   expect(fetch).toHaveBeenCalledTimes(1);
  //   expect(fetch).toHaveBeenCalledWith(
  //     `https://api-entreprise/search?ranked=true&query=AUTOEXPRESS&convention=false&open=true&matchingLimit=0`,
  //     { headers: { referer: "cdtn-api" } }
  //   );

  //   expect(response.body.entreprises[0].conventions.length).toEqual(1);
  //   expect(response.body.entreprises[0].conventions[0].num).toEqual(3248);
  //   expect(response.body.entreprises[0].conventions[0].contributions).toEqual(
  //     false
  //   );
  // });
});
