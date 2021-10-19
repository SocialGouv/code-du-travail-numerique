#language: fr

@ccn-search-idcc
Fonctionnalité: Recherche de convention collective par idcc
  En tant que visiteur
  Si je connais ma convention collective
  Je veux pouvoir consulter la page de ma convention collective

Scénario:
  Soit un utilisateur sur la page "/outils/convention-collective"

  Quand je clique sur "Je la saisis"
  Quand je renseigne "boulangerie" dans le champ "Nom de la convention collective ou son numéro d’identification IDCC"
  Quand j'attend que le texte "Boulangerie" apparaisse
  Alors le lien "Boulangerie-pâtisserie (entreprises artisanales)" pointe sur "/convention-collective/843-boulangerie-patisserie-entreprises-artisanales"
  Alors le lien "Activités industrielles de boulangerie et pâtisserie" pointe sur "/convention-collective/1747-activites-industrielles-de-boulangerie-et-patisserie"

  Quand je scroll à "Précisez et sélectionnez votre convention collective"
  Quand je renseigne "2247" dans le champ "Nom de la convention collective ou son numéro d’identification IDCC"
  Quand j'attend que le texte "Entreprises" apparaisse
  Alors le lien "Entreprises de courtage d'assurances et/ou de réassurances" pointe sur "/convention-collective/2247-entreprises-de-courtage-dassurances-et-ou-de-reassurances"

