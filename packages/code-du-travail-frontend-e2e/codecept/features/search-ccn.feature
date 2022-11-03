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
  Quand j'attends que le texte "Boulangerie" apparaisse
  Alors je vois le bouton "Boulangerie-pâtisserie (entreprises artisanales)"
  Alors je vois le bouton "Activités industrielles de boulangerie et pâtisserie"

  Quand je scroll à "Précisez et sélectionnez votre convention collective"
  Quand je renseigne "2247" dans le champ "Nom de la convention collective ou son numéro d’identification IDCC"
  Quand j'attends que le texte "Entreprises" apparaisse
  Alors je vois le bouton "Entreprises de courtage d'assurances et/ou de réassurances"
