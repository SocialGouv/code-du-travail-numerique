#language: fr

@ccn-search-enterprise
Fonctionnalité: Recherche de convention collective par entreprise
  En tant que visiteur
  Si je ne connais pas ma convention collective
  Je veux pouvoir consulter la page de ma convention collective

Scénario:
  Soit un utilisateur sur la page "/outils/convention-collective"

  Quand je clique sur "Je la recherche"
  Quand je renseigne "carrefour" dans le champ "Nom de votre entreprise ou numéro Siret (obligatoire)"
  Quand j'attends que le texte "CARREFOUR HYPERMARCHES" apparaisse
  Quand je clique sur "CARREFOUR HYPERMARCHES"
  Alors je vois "2 conventions collectives trouvées pour « CARREFOUR HYPERMARCHES »"
  Alors le lien "Commerce de détail et de gros à prédominance alimentaire IDCC2216" pointe sur "/convention-collective/2216-commerce-de-detail-et-de-gros-a-predominance-alimentaire"

  Quand je clique sur "Précédent"
  Quand je renseigne "82161143100015" dans le champ "Nom de votre entreprise ou numéro Siret (obligatoire)"
  Quand j'attends que le texte "CODEURS" apparaisse
  Quand je clique sur "CODEURS EN LIBERTE"
  Alors je vois "1 convention collective trouvée pour « CODEURS EN LIBERTE »"
  Alors le lien "Bureaux d'études techniques" pointe sur "/convention-collective/1486-bureaux-detudes-techniques-cabinets-dingenieurs-conseils-et-societes-de"

  Quand je clique sur "Précédent"
  Quand je renseigne "fnac" dans le champ "Nom de votre entreprise ou numéro Siret (obligatoire)"
  Quand je renseigne "75001" dans le champ "Code postal ou ville"
  Quand j'attends que le texte "FNAC PARIS" apparaisse
  Quand je clique sur "FNAC PARIS"
  Alors je vois "2 conventions collectives trouvées pour « FNAC PARIS »"
  Alors le lien "Commerces et services de l'audiovisuel, de l'électronique et de l'équipement ménager IDCC1686" pointe sur "/convention-collective/1686-commerces-et-services-de-laudiovisuel-de-lelectronique-et-de-lequipemen"

