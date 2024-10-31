/** @jest-environment node */

import { fetchAllModels, fetchModel } from "../queries";

describe("Modèles de courrier", () => {
  it("Récupération de tous les modèles de courrier", async () => {
    const result = await fetchAllModels(["slug", "title", "type"]);
    expect(result).toEqual([
      {
        slug: "demande-de-rendez-vous-en-vue-dune-rupture-conventionnelle",
        title: "Demande de rendez-vous en vue d’une rupture conventionnelle",
      },
      {
        slug: "rupture-de-periode-dessai-a-linitiative-de-lemployeur",
        title: "Rupture de période d’essai à l’initiative de l’employeur",
      },
      {
        slug: "certificat-de-travail",
        title: "Certificat de travail",
      },
    ]);
  });

  it("Récupération d'un modèle de courrier avec son slug", async () => {
    const result = await fetchModel({
      slug: "demande-de-rendez-vous-en-vue-dune-rupture-conventionnelle",
    });
    expect(result).toEqual({
      "_id": "15",
      "author": "Ministère du Travail",
      "breadcrumbs": [
        {
          "label": "Départ de l’entreprise",
          "position": 8,
          "slug": "/themes/depart-de-lentreprise"
        },
        {
          "label": "Rupture conventionnelle",
          "position": 3,
          "slug": "/themes/rupture-conventionnelle"
        },
        {
          "label": "Rupture conventionnelle individuelle",
          "position": 1,
          "slug": "/themes/rupture-conventionnelle-individuelle"
        }
      ],
      "date": "16/12/2019",
      "description": "La rupture conventionnelle individuelle est une modalité de rupture spécifique du CDI. Elle nécessite le consentement de l’employeur et du salarié, et son homologation par l’administration. La rupture ouvre droit à une indemnité de rupture conventionnelle. Ce modèle permet d’initier la procédure de rupture par l’invitation à un premier entretien.",
      "filename": "demande_rdv_rupture_conventionnelle.docx",
      "filesize": 14.54,
      "extension": "docx",
      "html": "<style>\n.courrier-expediteur {display: flex; align-items: flex-start; flex-direction:column;}\n.courrier-destinataire {display: flex; align-items: flex-end; flex-direction:column;}\n.courrier-signature {display: flex; flex-direction:column; align-items: flex-end;}\n.title-center {display: flex; align-items: center; flex-direction:column; font-size: 1.8rem; font-weight:bold}\n.center {display: flex; align-items: center; flex-direction:column; }\n.checklist { list-style-image: url(data:image/svg+xml;,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221rem%22%20height%3D%221rem%22%20viewBox%3D%220%200%2011%2011%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M2%202h10v10H2z%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20stroke%3D%22currentColor%22%20stroke-width%3D%22.5%22%20d%3D%22M1%201h9v9H1z%22%2F%3E%3C%2Fsvg%3E);}\n.editable {color: #4d73b8}\n</style><div class=\"courrier-expediteur\"><p><span class='editable'>« Prénom Nom du salarié »</span></p><p><span class='editable'>« Adresse »</span></p><p><span class='editable'>« Code postal + Ville »</span></p><p><span class='editable'>« Tél : 00.00.00.00.00 »</span></p><p><span class='editable'>« E-mail : …………@... »</span></p></div><div class=\"courrier-destinataire\"><p><span class='editable'>« Société »</span></p><p><span class='editable'>« Prénom Nom du représentant »</span></p><p><span class='editable'>« Fonction (DRH, etc.) »</span></p><p><span class='editable'>« Adresse »</span></p><p><span class='editable'>« Code postal + Ville »</span></p><p>A<a id=\"__DdeLink__1875_1685986494\"></a> <span class='editable'>« lieu »</span>, le <span class='editable'>« date »</span></p></div><div class=\"courrier-expediteur\"><p>Objet : Demande de rendez-vous en vue d’une éventuelle rupture conventionnelle</p></div><p><span class='editable'>« Madame / Monsieur »</span>,</p><p>Je sollicite un entretien afin de vous proposer que nous convenions ensemble, si vous en êtes d’accord, de la rupture de mon contrat de travail dans le cadre légal de la rupture conventionnelle. </p><p>A cette occasion, je vous présenterai les raisons de ma démarche et nous pourrons déterminer d’un commun accord les modalités de la rupture de mon contrat de travail.</p><p>Seriez-vous disponible pour un rendez-vous ce mois-ci, à la date qui vous convient ? </p><p>Vous pouvez me joindre aux coordonnées présentées ci-dessus.</p><p>Veuillez agréer, <span class='editable'>« Madame / Monsieur »</span>, l’expression de ma considération distinguée.</p><div class=\"courrier-destinataire\"><p><span class='editable'>« Prénom Nom du salarié »</span></p><p><span class='editable'>« Signature »</span></p></div>",
      "metaDescription": "La rupture conventionnelle individuelle est une modalité de rupture spécifique du CDI. Elle nécessite le consentement de l’employeur et du salarié, et son homologation par l’administration. La rupture ouvre droit à une indemnité de rupture conventionnelle. Ce modèle permet d’initier la procédure de rupture par l’invitation à un premier entretien.",
      "title": "Demande de rendez-vous en vue d’une rupture conventionnelle"
    });
  });

  it("Récupération d'un modèle de courrier retourne undefined s'il n'existe pas", async () => {
    const result = await fetchModel({ slug: "wrong" });
    expect(result).toEqual(undefined);
  });

  it("Récupération d'un modèle de courrier avec son id", async () => {
    const result = await fetchModel({ _id: "15" });
    expect(result?.title).toEqual("Demande de rendez-vous en vue d’une rupture conventionnelle");
    expect(result?._id).toEqual("15");
  });
});
