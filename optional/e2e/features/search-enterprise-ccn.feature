#language: fr

@ccn-search-enterprise
Fonctionnalité: Recherche de convention collective par entreprise
  En tant que visiteur
  Si je ne connais pas ma convention collective
  Je veux pouvoir consulter la page de ma convention collective

Scénario:
  Soit un utilisateur sur la page "/outils/convention-collective"

  Quand je clique sur "Je la recherche"
  Quand je renseigne "michelin" dans le champ "Nom de votre entreprise ou numéro Siret (obligatoire)"
  Quand j'attend que le texte "MANUF FRANC" apparaisse
  Quand je clique sur "MANUF FRANC"
  Alors je vois "1 convention collective trouvée pour « MANUF FRANC PNEUMATIQ MICHELIN »"
  Alors le lien "Caoutchouc" pointe sur "/convention-collective/45-caoutchouc"

  Quand je clique sur "Fermer"
  Quand je renseigne "82161143100015" dans le champ "Nom de votre entreprise ou numéro Siret (obligatoire)"
  Quand j'attend que le texte "CODEURS" apparaisse
  Quand je clique sur "CODEURS EN LIBERTE"
  Alors je vois "1 convention collective trouvée pour « CODEURS EN LIBERTE »"
  Alors le lien "Bureaux d'études techniques" pointe sur "/convention-collective/1486-bureaux-detudes-techniques-cabinets-dingenieurs-conseils-et-societes-de"