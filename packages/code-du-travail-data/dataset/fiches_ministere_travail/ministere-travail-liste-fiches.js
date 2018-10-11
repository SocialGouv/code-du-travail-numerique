/*

données récupérées via http://travail-emploi.gouv.fr/mot/fiches-pratiques-du-droit-du-travail?max_articles=400

copy($$('article').map(a => ({
   url:"http://travail-emploi.gouv.fr/"+a.querySelector('a.technicalLink').getAttribute('href'),
   title: a.textContent.trim()
})))

avec ces données on peut lancer ministere-travail-extract-fiches.js qui complète les informations

*/
module.exports = [
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/emploi-et-handicap/fiphfp",
    title:
      "Emploi et handicap : fonds pour l’insertion des personnes handicapées dans la fonction publique (FIPHFP)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/emploi-et-handicap/article/les-aides-de-l-agefiph",
    title: "Les aides de l’AGEFIPH"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/indemnisation/article/allocation-de-solidarite-specifique-ass",
    title: "Allocation de solidarité spécifique (ASS)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/indemnisation/article/allocation-temporaire-d-attente-ata",
    title: "Allocation temporaire d’attente (ATA)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/emploi-et-handicap/article/emploi-et-handicap-le-dispositif-de-l-emploi-accompagne",
    title: "Emploi et handicap : le dispositif de l’emploi accompagné"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/rupture-de-contrats/licenciement/article/la-definition-du-licenciement-pour-motif-economique",
    title: "La définition du licenciement pour motif économique"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/rupture-de-contrats/licenciement/article/la-procedure-de-licenciement-economique-de-2-a-9-salaries",
    title: "La procédure de licenciement économique de 2 à 9 salariés"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/formation-professionnelle/evoluer-professionnellement/article/moncompteactivite-gouv-fr",
    title: "moncompteactivite.gouv.fr"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/formation-professionnelle/evoluer-professionnellement/vae",
    title: "La validation des acquis de l’expérience (VAE)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/formation-professionnelle/evoluer-professionnellement/article/conseil-en-evolution-professionnelle-cep",
    title: "Conseil en évolution professionnelle (CÉP)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/formation-professionnelle/se-former-en-alternance/l-apprentissage-160/article/le-contrat-d-apprentissage-amenage",
    title: "Le contrat d’apprentissage aménagé"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/formation-professionnelle/se-former-en-alternance/le-contrat-de-professionnalisation/article/le-contrat-de-professionnalisation",
    title: "Le contrat de professionnalisation"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/emploi-et-handicap/rqth",
    title:
      "Emploi et handicap : la reconnaissance de la qualité de travailleur handicapé (RQTH)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/dialogue-social/representants-du-personnel/article/les-delegues-syndicaux",
    title: "Les délégués syndicaux"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/sante-au-travail/suivi-de-la-sante-au-travail-10727/article/le-suivi-de-l-etat-de-sante-des-salaries",
    title: "Le suivi de l’état de santé des salariés"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/accompagnement-des-mutations-economiques/appui-aux-mutations-economiques/article/gestion-previsionnelle-de-l-emploi-et-des-competences-gpec",
    title: "Gestion prévisionnelle de l’emploi et des compétences (GPEC)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/indemnisation/article/interessement-a-la-reprise-d-activite-des-beneficiaires-des-allocations-du",
    title:
      "Intéressement à la reprise d’activité des bénéficiaires des allocations du régime de solidarité"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/dialogue-social/negociation-collective/la-negociation-collective-dans-l-entreprise/article/les-negociations-obligatoires-dans-l-entreprise-theme-periodicite-et",
    title:
      "Les négociations obligatoires dans l’entreprise : thème, périodicité et déroulement"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/emploi-et-handicap/article/emploi-et-handicap-les-entreprises-adaptees-les-centres-de-distribution-de",
    title:
      "Emploi et handicap : les entreprises adaptées, les centres de distribution de travail à domicile (CDTD) et les aides aux employeurs"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/rupture-de-contrats/article/la-rupture-conventionnelle-du-contrat-de-travail-a-duree-indeterminee",
    title:
      "La rupture conventionnelle du contrat de travail à durée indéterminée"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/rupture-de-contrats/licenciement/article/l-allocation-temporaire-degressive",
    title: "L’allocation  temporaire dégressive"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/remuneration-et-participation-financiere/remuneration/article/saisie-et-cessions-des-remunerations",
    title: "Saisie et cessions des rémunérations"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/rupture-de-contrats/licenciement/article/le-licenciement-pour-motif-personnel-les-causes-possibles-les-sanctions",
    title:
      "Le licenciement pour motif personnel : les causes possibles, les sanctions applicables"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/rupture-de-contrats/licenciement/article/la-procedure-en-cas-de-licenciement-pour-motif-personnel",
    title: "La procédure en cas de licenciement pour motif personnel"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/rupture-de-contrats/licenciement/article/l-ordre-des-licenciements",
    title: "L’ordre des licenciements"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/sante-au-travail/suivi-de-la-sante-au-travail-10727/article/la-reconnaissance-de-l-inaptitude-medicale-au-travail-et-ses-consequences",
    title:
      "La reconnaissance de l’inaptitude médicale au travail et ses conséquences"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/conges-et-absences/article/le-compte-epargne-temps-cet",
    title: "Le compte épargne-temps (CET)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/contrats-de-travail/article/le-contrat-a-duree-indeterminee-de-chantier-ou-d-operation",
    title: "Le contrat à durée indéterminée de chantier ou d’opération"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/formation-professionnelle/se-former-en-alternance/l-apprentissage-160/contrat-apprentissage",
    title: "Le contrat d’apprentissage"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/article/contrat-de-travail-les-principales-caracteristiques",
    title: "Contrat de travail : les principales caractéristiques"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/emploi-et-handicap/article/les-etablissements-ou-services-d-aide-par-le-travail",
    title: "Les établissements ou services d’aide par le travail"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/accompagnement-des-mutations-economiques/article/les-accords-de-maintien-de-l-emploi",
    title: "Accords de maintien de l’emploi"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/accompagnement-des-mutations-economiques/accompagnement-des-licenciements-economiques/csp",
    title: "Contrat de sécurisation professionnelle (CSP)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/accompagnement-des-mutations-economiques/accompagnement-des-licenciements-economiques/article/licenciement-economique-le-conge-de-reclassement",
    title: "Congé de reclassement"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/accompagnement-des-mutations-economiques/activite-partielle",
    title: "Activité partielle"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/formation-professionnelle/evoluer-professionnellement/titres-professionnels-373014",
    title: "Titres professionnels"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/maternite-paternite-et-adoption/article/les-garanties-liees-a-la-maternite-ou-a-l-adoption",
    title: "Les garanties liées à la maternité ou à l’adoption"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/rupture-de-contrats/licenciement/article/les-documents-remis-aux-salaries-lors-de-la-rupture-du-contrat-de-travail",
    title:
      "Les documents remis aux salariés lors de la rupture du contrat de travail"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/article/la-modification-du-contrat-de-travail",
    title: "La modification du contrat de travail"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/dialogue-social/representants-du-personnel/article/les-regles-de-decompte-des-effectifs",
    title: "Les règles de décompte des effectifs"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/mesures-jeunes/article/les-stages-etudiants-en-milieu-professionnel",
    title: "Les stages étudiants en milieu professionnel"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/formation-professionnelle/evoluer-professionnellement/article/compte-personnel-de-formation-cpf",
    title: "Compte personnel de formation (CPF)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/insertion-par-l-activite-economique/article/l-association-intermediaire",
    title: "L’association intermédiaire"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/insertion-par-l-activite-economique/article/les-ateliers-et-chantiers-d-insertion-aci",
    title: "Les ateliers et chantiers d’insertion (ACI)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/insertion-par-l-activite-economique/article/fonds-departemental-d-insertion-fdi",
    title: "Fonds départemental d’insertion (FDI)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/insertion-par-l-activite-economique/article/entreprise-d-insertion-ei",
    title: "Entreprise d’insertion (EI)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/insertion-par-l-activite-economique/article/l-entreprise-de-travail-temporaire-d-insertion-etti",
    title: "L’entreprise de travail temporaire d’insertion (ETTI)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/sante-au-travail/statut-des-travailleurs-et-dispositions-particulieres/article/l-interdiction-de-fumer-dans-les-lieux-de-travail",
    title: "L’interdiction de fumer dans les lieux de travail"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/ministere/documentation-et-publications-officielles/rapports/article/du-teletravail-au-travail-mobile",
    title: "Rapport | Du télétravail à la mobilité"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/conges-et-absences/article/les-conges-payes",
    title: "Les congés payés"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/conges-et-absences/article/le-conge-du-proche-aidant",
    title: "Le congé du proche aidant"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/accompagnement-des-mutations-economiques/appui-aux-mutations-economiques/article/conventions-de-fne-formation",
    title: "Conventions de FNE-Formation"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/parcours-emploi-competences/cui-cae",
    title:
      "Le contrat unique d’insertion - contrat d’accompagnement dans l’emploi (CUI-CAE)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/actualites/l-actualite-du-ministere/article/la-validation-des-acquis-de-l-experience-vae-expliquee",
    title:
      "5 questions/réponses sur la validation des acquis de l’expérience (VAE)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/emploi-et-handicap/oeth",
    title:
      "Emploi et handicap : l’obligation d’emploi en faveur des travailleurs handicapés"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/mesures-jeunes/article/le-contrat-starter",
    title: "Le contrat starter"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/dialogue-social/representants-du-personnel/article/la-protection-en-cas-de-licenciement",
    title: "La protection en cas de licenciement"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/parcours-emploi-competences/article/le-contrat-unique-d-insertion-cui-dispositions-generales",
    title: "Le contrat unique d’insertion (CUI) : dispositions générales"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/parcours-emploi-competences/cui-cie",
    title:
      "Le contrat unique d’insertion - contrat initiative emploi (CUI - CIE)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/mesures-jeunes/article/les-emplois-d-avenir",
    title: "Les emplois d’avenir"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/temps-de-travail/article/amenagement-du-temps-de-travail",
    title: "Aménagement du temps de travail"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/temps-de-travail/article/le-temps-de-travail-des-jeunes-de-moins-de-18-ans",
    title: "Le temps de travail des jeunes de moins de 18 ans"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/temps-de-travail/article/le-travail-en-soiree",
    title: "Le travail en soirée"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/formation-professionnelle/evoluer-professionnellement/article/le-bilan-de-competences",
    title: "Le bilan de compétences"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/remuneration-et-participation-financiere/remuneration/article/le-salaire-fixation-et-paiement",
    title: "Le salaire : fixation et paiement"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/relations-au-travail/pouvoir-de-direction/article/le-reglement-interieur",
    title: "Le règlement intérieur"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/teletravail-et-mobilite/article/la-mobilite-volontaire-securisee",
    title: "La mobilité volontaire sécurisée"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/article/les-obligations-de-l-employeur-lors-de-l-embauche",
    title: "Les obligations de l’employeur lors de l’embauche"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/mesures-jeunes/article/job-d-ete-formalites-et-obligations",
    title: "Job d’été : formalités et obligations"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/article/le-registre-unique-du-personnel",
    title: "Le registre unique du personnel"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/conges-et-absences/article/le-conge-pour-creation-ou-reprise-d-entreprise-ou-participation-a-la-direction",
    title:
      'Le congé ou temps partiel pour création ou reprise d’entreprise ou participation à la direction d’une "jeune entreprise innovante"'
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/accompagnement-des-mutations-economiques/accompagnement-des-licenciements-economiques/pse",
    title: "Plan de sauvegarde de l’emploi (PSE)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/remuneration-et-participation-financiere/remuneration/article/la-prise-en-charge-des-frais-de-transport-par-l-employeur",
    title: "La prise en charge des frais de transport par l’employeur"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/maternite-paternite-et-adoption/article/le-conge-de-maternite",
    title: "Le congé de maternité"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/maternite-paternite-et-adoption/article/le-conge-d-adoption",
    title: "Le congé d’adoption"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/developpement-de-l-emploi/creation-d-activite/article/le-salarie-createur-ou-repreneur-d-entreprise",
    title: "Le salarié créateur ou repreneur d’entreprise"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/article/offre-d-emploi-et-embauche-les-droits-du-candidat",
    title: "Offre d’emploi et embauche : les droits du candidat"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/conges-et-absences/article/le-conge-sabbatique",
    title: "Le congé sabbatique"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/rupture-de-contrats/licenciement/article/la-procedure-en-cas-de-licenciement-individuel-pour-motif-economique",
    title:
      "La procédure en cas de licenciement individuel pour motif économique"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/temps-de-travail/article/le-travail-du-dimanche",
    title: "Le travail du dimanche"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/conges-et-absences/article/le-conge-de-solidarite-familiale",
    title: "Le congé de solidarité familiale"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/archives/archives-courantes/article/5-questions-reponses-sur-le-recours-devant-les-prud-hommes",
    title: '5 questions-réponses sur le recours devant les "Prud’hommes"'
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/remuneration-et-participation-financiere/remuneration/article/le-bulletin-de-paie",
    title: "Le bulletin de paie"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/remuneration-et-participation-financiere/remuneration/article/le-smic-374531",
    title: "Le SMIC"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/contrats-de-travail/article/le-contrat-de-travail-temporaire",
    title: "Le contrat de travail temporaire"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/employe-de-maison-assistante-maternelle/article/reduction-d-impot-credit-d-impot-et-exoneration-de-charges-patronales",
    title:
      "Réduction d’impôt, crédit d’impôt et exonération de charges patronales"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/employe-de-maison-assistante-maternelle/article/recruter-un-e-assistant-e-maternel-le-les-obligations-a-respecter",
    title:
      "Recruter un(e) assistant(e) maternel(le) : les obligations à respecter"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/employe-de-maison-assistante-maternelle/article/les-aides-a-l-emploi-d-un-e-assistant-e-maternel-le",
    title: "Les aides à l’emploi d’un(e) assistant(e) maternel(le)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/employe-de-maison-assistante-maternelle/article/les-droits-et-obligations-des-salaries-du-particulier-employeur",
    title: "Les droits et obligations des salariés du particulier employeur"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/remuneration-et-participation-financiere/remuneration/article/la-garantie-en-cas-de-sauvegarde-de-redressement-ou-de-liquidation-judiciaire",
    title:
      "La garantie en cas de sauvegarde, de redressement ou de liquidation judiciaire"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/employe-de-maison-assistante-maternelle/article/la-formation-des-assistant-e-s-maternel-le-s",
    title: "La formation des assistant(e)s maternel(le)s"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/accompagnement-des-mutations-economiques/appui-aux-mutations-economiques/article/dispositif-local-d-accompagnement-dla",
    title: "Dispositif Local d’Accompagnement (DLA)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/developpement-de-l-emploi/creation-d-activite/article/projet-initiative-jeune-pij-creation-d-entreprise",
    title: "Projet initiative-jeune (PIJ) – création d’entreprise"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/developpement-de-l-emploi/creation-d-activite/article/accompagnement-des-personnes-sans-emploi-pour-la-creation-et-la-reprise-d-376101",
    title:
      "Nouvel accompagnement pour la création et la reprise d’entreprise (Nacre)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/indemnisation/article/la-protection-sociale-des-demandeurs-d-emploi",
    title: "La protection sociale des demandeurs d’emploi"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/indemnisation/article/interessement-a-la-reprise-d-activite-des-beneficiaires-de-l-allocation-de",
    title:
      "Intéressement à la reprise d’activité des bénéficiaires de l’allocation de solidarité spécifique (cumul des revenus avec l’allocation)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/indemnisation/article/le-cumul-de-l-allocation-d-aide-au-retour-a-l-emploi-avec-une-remuneration",
    title:
      "Le cumul de l’allocation d’aide au retour à l’emploi avec une rémunération"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/indemnisation/article/allocation-d-aide-au-retour-a-l-emploi-are",
    title: "Allocation d’aide au retour à l’emploi (ARE)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/accompagnement-des-tpe-pme/article/groupement-d-employeurs",
    title: "Groupement d’employeurs"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/developpement-de-l-emploi/creation-d-activite/article/le-temps-partiel-pour-creer-ou-reprendre-une-entreprise-ou-pour-participer-a-la",
    title:
      'Le temps partiel pour créér ou reprendre une entreprise ou pour participer à la direction d’une "jeune entreprise innovante"'
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/emploi-et-handicap/article/handicap-et-emploi-l-aide-a-l-exercice-d-une-activite-non-salariee",
    title:
      "Handicap et emploi : l’aide à l’exercice d’une activité non salariée"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/developpement-de-l-emploi/creation-d-activite/article/cumul-des-revenus-en-cas-de-creation-ou-de-reprise-d-entreprise",
    title: "Cumul des revenus en cas de création ou de reprise d’entreprise"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/developpement-de-l-emploi/creation-d-activite/article/les-immatriculations-et-declarations-obligatoires",
    title: "Les immatriculations et déclarations obligatoires"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/developpement-de-l-emploi/creation-d-activite/article/l-aide-aux-chomeurs-createurs-ou-repreneurs-d-une-entreprise-accre",
    title:
      "L’aide aux chômeurs créateurs ou repreneurs d’une entreprise (ACCRE)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/emploi-et-handicap/article/emploi-et-handicap-acceder-a-un-emploi-dans-la-fonction-publique",
    title: "Emploi et handicap : accéder à un emploi dans la fonction publique"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/emploi-et-handicap/article/emploi-et-handicap-travail-en-milieu-ordinaire",
    title: "Emploi et handicap : travail en milieu ordinaire"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/litiges-individuels-et-conflits-collectifs/article/le-conseil-de-prud-hommes",
    title: "Le conseil de prud’hommes"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/dialogue-social/representants-du-personnel/article/la-delegation-unique-du-personnel-dup",
    title: "La délégation unique du personnel (DUP)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/dialogue-social/representants-du-personnel/article/le-representant-de-la-section-syndicale-rss",
    title: "Le représentant de la section syndicale (RSS)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/dialogue-social/representants-du-personnel/article/les-delegues-du-personnel-missions-et-moyens-d-action",
    title: "Les délégués du personnel : missions et moyens d’action"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/dialogue-social/representants-du-personnel/article/les-delegues-du-personnel-elections",
    title: "Les délégués du personnel : élections"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/remuneration-et-participation-financiere/remuneration/article/le-cheque-emploi-service-universel-cesu-declaratif",
    title: 'Le chèque emploi-service universel (CESU) "déclaratif"'
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/remuneration-et-participation-financiere/remuneration/article/le-cheque-emploi-service-universel-cesu-prefinance",
    title: 'Le chèque emploi-service universel (CESU) "préfinancé"'
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/remuneration-et-participation-financiere/remuneration/article/la-reduction-de-charges-patronales-sur-les-bas-et-moyens-salaires",
    title: "La réduction de charges patronales sur les bas et moyens salaires"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/remuneration-et-participation-financiere/remuneration/article/la-remuneration-pendant-la-formation",
    title: "La rémunération pendant la formation"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/remuneration-et-participation-financiere/remuneration/article/la-remuneration-de-l-interimaire",
    title: "La rémuneration de l’intérimaire"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/remuneration-et-participation-financiere/remuneration/article/la-remuneration-du-salarie-en-contrat-a-duree-determinee",
    title: "La rémuneration du salarié en contrat à durée déterminée"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/remuneration-et-participation-financiere/remuneration/article/la-mensualisation",
    title: "La mensualisation"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/dialogue-social/egalite-professionnelle-et-salariale-femmes-hommes/article/l-egalite-de-remuneration",
    title: "L’égalité de rémunération entre les femmes et les hommes"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/lutte-contre-le-travail-illegal/article/conventions-nationales-de-lutte-contre-le-travail-illegal",
    title: "Conventions nationales de lutte contre le travail illégal"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/lutte-contre-le-travail-illegal/article/les-sanctions-liees-au-travail-illegal",
    title: "Les sanctions liées au travail illégal"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/lutte-contre-le-travail-illegal/article/qu-est-ce-que-le-travail-illegal",
    title: "Qu’est-ce que le travail illégal ?"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/mesures-jeunes/e2c",
    title: "Les Écoles de la deuxième chance (E2C)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/maternite-paternite-et-adoption/article/le-conge-parental-d-education",
    title: "Le congé parental d’éducation"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/maternite-paternite-et-adoption/article/le-conge-de-paternite-et-d-accueil-de-l-enfant",
    title: "Le congé de paternité et d’accueil de l’enfant"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/conges-et-absences/article/l-allocation-journaliere-d-accompagnement-d-une-personne-en-fin-de-vie",
    title:
      "L’allocation journalière d’accompagnement d’une personne en fin de vie"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/conges-et-absences/article/les-conges-et-absences-pour-enfant-malade",
    title: "Les congés et absences pour enfant malade"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/conges-et-absences/article/l-indemnisation-legale-des-absences-pour-maladie-ou-accident",
    title: "L’indemnisation légale des absences pour maladie ou accident"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/conges-et-absences/article/les-absences-liees-a-la-maladie-ou-a-l-accident-non-professionnel",
    title: "Les absences liées à la maladie ou à l’accident non professionnel"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/conges-et-absences/article/l-arret-de-travail-pour-accident-du-travail-ou-maladie-professionnelle",
    title:
      "L’arrêt de travail pour accident du travail ou maladie professionnelle"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/formation-professionnelle/entreprises-et-formation/article/panorama-des-autres-conges-de-formation",
    title: "Panorama des autres congés de formation"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/conges-et-absences/article/le-conge-sans-solde",
    title: "Le congé sans solde"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/conges-et-absences/article/les-conges-pour-evenements-familiaux-375531",
    title: "Les congés pour événements familiaux"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/conges-et-absences/article/les-jours-feries-et-les-ponts",
    title: "Les jours fériés et les ponts"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/temps-de-travail/temps-de-travail-transports-routiers/article/transports-routiers-marchandises-la-duree-du-travail-et-la-remuneration",
    title: "Transports routiers marchandises : durée du travail et rémunération"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/temps-de-travail/temps-de-travail-transports-routiers/article/transports-routiers-de-personnes-la-duree-du-travail-et-la-remuneration",
    title: "Transports routiers de personnes : durée du travail et rémunération"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/temps-de-travail/temps-de-travail-transports-routiers/article/le-travail-de-nuit-des-salaries-roulants-et-sedentaires-du-transport-routier-de",
    title:
      "Transports routiers de marchandises : travail de nuit des salariés roulants et sédentaires"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/temps-de-travail/temps-de-travail-transports-routiers/article/transports-routiers-temps-de-conduite-et-de-repos-conducteurs-de-vehicules-de",
    title:
      "Transports routiers : temps de conduite et de repos Conducteurs véhicules de plus de 3T5 ou plus de 9 places"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/temps-de-travail/temps-de-travail-transports-routiers/article/les-formations-obligatoires-des-conducteurs-routiers-de-personnes-et-de",
    title:
      "Formations obligatoires des conducteurs routiers de personnes et de marchandises"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/temps-de-travail/temps-de-travail-transports-routiers/article/transports-routiers-le-travail-de-nuit-des-salaries-roulants-et-sedentaires-du",
    title:
      "Transports routiers de personnes : travail de nuit des salariés roulants et sédentaires"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/temps-de-travail/temps-de-travail-transports-routiers/article/transports-routiers-de-personnes-temps-partiel-et-conducteur-en-periode",
    title:
      "Transports routiers de personnes : temps partiel et conducteur en période scolaire"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/temps-de-travail/temps-de-travail-transports-routiers/article/jours-feries-travailles-et-chomes-transports-routiers-de-marchandises-et-de",
    title:
      "Transports routiers de marchandises et de personnes : jours fériés travaillés et chômés :"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/temps-de-travail/article/la-journee-de-solidarite",
    title: "La journée de solidarité"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/temps-de-travail/article/les-conventions-de-forfait",
    title: "Les conventions de forfait"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/temps-de-travail/article/le-travail-de-nuit",
    title: "Le travail de nuit"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/temps-de-travail/article/les-heures-supplementaires-contreparties",
    title: "Les heures supplémentaires : contreparties"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/temps-de-travail/article/les-heures-supplementaires-definition-et-limites",
    title: "Les heures supplémentaires : définition et limites"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/temps-de-travail/article/la-duree-legale-du-travail",
    title: "La durée légale du travail"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/mesures-jeunes/epide",
    title: "EPIDE (Établissement pour l’insertion dans l’emploi)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/contrats-de-travail/article/le-contrat-de-travail-a-temps-partiel",
    title:
      "Le contrat de travail à temps partiel : contrat et statut du salarié"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/employe-de-maison-assistante-maternelle/article/les-organismes-de-services-a-la-personne",
    title: "Les organismes de services à la personne"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/contrats-de-travail/article/les-activites-d-adultes-relais",
    title: "Les activités d’adultes relais"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/article/le-cumul-d-emplois-100984",
    title: "Le cumul d’emplois"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/article/le-changement-de-la-situation-juridique-de-l-employeur",
    title: "Le changement de la situation juridique de l’employeur"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/article/la-periode-d-essai-100977",
    title: "La période d’essai"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/contrats-de-travail/article/le-travail-a-temps-partage",
    title: "Le travail à temps partagé"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/contrats-de-travail/article/le-contrat-vendanges",
    title: "Le contrat vendanges"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/contrats-de-travail/article/le-travail-saisonnier",
    title: "Le travail saisonnier"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/contrats-de-travail/article/le-contrat-de-travail-intermittent",
    title: "Le contrat de travail intermittent"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/contrats-de-travail/article/le-contrat-a-duree-determinee-a-objet-defini",
    title: "Le contrat à durée déterminée à objet défini"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/contrats-de-travail/article/le-contrat-a-duree-determinee-senior-cdd-senior",
    title: 'Le contrat à durée déterminée "Senior" (CDD Senior)'
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/contrats-de-travail/article/le-contrat-de-travail-a-duree-indeterminee-cdi",
    title: "Le contrat de travail à durée indéterminée (CDI)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/contrats-de-travail/article/le-contrat-a-duree-determinee-cdd",
    title: "Le contrat à durée déterminée (CDD)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/medaille-d-honneur-du-travail/article/la-medaille-d-honneur-du-travail",
    title: "La médaille d’honneur du travail"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/actualites/l-actualite-du-ministere/article/5-questions-reponses-sur-le-handicap-et-l-emploi",
    title: "5 questions-réponses sur le handicap et l’emploi"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/emploi-et-handicap/article/handicap-le-contrat-de-reeducation-professionnelle",
    title: "Handicap : le contrat de rééducation professionnelle"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/formation-professionnelle/entreprises-et-formation/article/la-formation-des-salaries-principes-generaux",
    title: "La formation des salariés : principes généraux"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/relations-au-travail/harcelement-discrimination/article/le-harcelement-sexuel",
    title: "Le harcèlement sexuel"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/relations-au-travail/harcelement-discrimination/article/le-harcelement-moral",
    title: "Le harcèlement moral"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/dialogue-social/egalite-professionnelle-et-salariale-femmes-hommes/article/l-egalite-professionnelle-femme-homme",
    title: "L’égalité professionnelle Femme-Homme"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/rupture-de-contrats/licenciement/article/le-licenciement-pour-motif-personnel-les-causes-possibles-et-les-sanctions",
    title:
      "Le licenciement pour motif personnel : les causes possibles et les sanctions applicables"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/rupture-de-contrats/licenciement/article/la-priorite-de-reembauche",
    title: "La priorité de réembauche"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/mesures-jeunes/garantiejeunes/article/garantie-jeunes-fiche-pratique",
    title: "Garantie jeunes : fiche pratique"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/rupture-de-contrats/licenciement/article/l-indemnite-legale-de-licenciement",
    title: "L’indemnité légale de licenciement"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/formation-professionnelle/se-former/personnes-en-situation-de-handicap/article/emploi-et-handicap-le-stage-de-reeducation-professionnelle",
    title: "Le stage de rééducation professionnelle"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/formation-professionnelle/se-former/demandeurs-d-emploi/article/la-protection-sociale-pendant-la-formation",
    title: "La protection sociale pendant la formation"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/formation-professionnelle/se-former/demandeurs-d-emploi/article/periodes-de-mise-en-situation-en-milieu-professionnel",
    title: "Les périodes de mise en situation en milieu professionnel - PMSMP"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/formation-professionnelle/se-former/demandeurs-d-emploi/article/la-preparation-operationnelle-a-l-emploi-collective-poec",
    title: "La préparation opérationnelle à l’emploi collective - POEC"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/formation-professionnelle/entreprises-et-formation/article/le-conge-individuel-de-formation-cif",
    title: "Le congé individuel de formation (CIF)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/formation-professionnelle/entreprises-et-formation/article/le-plan-de-formation",
    title: "Le plan de formation"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/relations-au-travail/harcelement-discrimination/article/la-protection-contre-les-discriminations",
    title: "La protection contre les discriminations"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/actualites/l-actualite-du-ministere/article/5-questions-reponses-sur-le-versement-du-salaire",
    title: "5 questions/réponses sur le versement du salaire"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/archives/archives-courantes/article/5-questions-reponses-sur-l-entree-en-apprentissage",
    title: "5 questions-réponses sur l’entrée en apprentissage"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/actualites/l-actualite-du-ministere/article/5-questions-reponses-sur-le-contrat-pro",
    title: '5 questions réponses sur le contrat "pro"'
  },
  {
    url:
      "http://travail-emploi.gouv.fr/actualites/l-actualite-du-ministere/article/5-questions-reponses-sur-la-sante-au-travail",
    title: "5 questions/réponses sur la santé au travail"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/relations-au-travail/pouvoir-de-direction/article/la-sanction-disciplinaire",
    title: "La sanction disciplinaire"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/archives/archives-courantes/article/focus-sur-le-cep",
    title: "Focus sur le CÉP"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/archives/archives-courantes/article/5-questions-reponses-sur-la-garantie-jeunes",
    title: "5 questions-réponses sur la Garantie jeunes"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/archives/archives-courantes/article/5-questions-reponses-sur-le-compte-personnel-d-activite",
    title: "5 questions réponses sur le Compte Personnel d’Activité"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/archives/archives-courantes/article/le-conge-de-proche-aidant",
    title: "5 questions sur le congé de proche aidant"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/mesures-seniors/article/l-aide-a-l-embauche-d-un-demandeur-d-emploi-de-45-ans-et-plus-en-contrat-de",
    title:
      "L’aide à l’embauche d’un demandeur d’emploi de 45 ans et plus en contrat de professionnalisation"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/archives/archives-courantes/article/5-questions-reponses-sur-les-conges-familiaux",
    title: '5 questions-réponses sur les congés "familiaux"'
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/detachement-des-salaries-et-lutte-contre-la-fraude-au-detachement/article/le-detachement-temporaire-en-france-d-un-salarie-d-une-entreprise-etrangere",
    title:
      "Le détachement temporaire en France d’un salarié d’une entreprise étrangère"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/archives/archives-courantes/article/5-questions-reponses-sur-les-stages-en-entreprise",
    title: "5 questions-réponses sur les stages en entreprise"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/litiges-individuels-et-conflits-collectifs/article/l-inspection-du-travail",
    title: "L’inspection du travail"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/formation-professionnelle/se-former/salaries/article/la-periode-de-professionnalisation-201166",
    title: "La période de professionnalisation"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/litiges-individuels-et-conflits-collectifs/article/la-greve",
    title: "La grève"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/article/l-aide-a-la-garde-d-enfants-pour-parents-isoles-agepi",
    title: "L’aide à la garde d’enfants pour parents isolés (AGEPI)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/rupture-de-contrats/demission/article/la-demission",
    title: "La démission"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/rupture-de-contrats/licenciement/article/le-conseiller-du-salarie",
    title: "Le conseiller du salarié"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/mesures-jeunes/article/fonds-pour-l-insertion-professionnelle-des-jeunes-fipj",
    title: "Fonds pour l’insertion professionnelle des jeunes (FIPJ)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/emploi/insertion-dans-l-emploi/insertion-par-l-activite-economique/article/groupements-d-employeurs-pour-l-insertion-et-la-qualification-geiq",
    title:
      "Groupements d’employeurs pour l’insertion et la qualification (GEIQ)"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/relations-au-travail/pouvoir-de-direction/article/les-limites-au-pouvoir-de-surveillance-de-l-employeur",
    title: "Les limites au pouvoir de surveillance de l’employeur"
  },
  {
    url:
      "http://travail-emploi.gouv.fr/droit-du-travail/rupture-de-contrats/demission/article/le-droit-aux-allocations-chomage-du-salarie-demissionnaire",
    title: "Le droit aux allocations chômage du salarié démissionnaire"
  }
];
