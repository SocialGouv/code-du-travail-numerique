#language: fr

@indemnite-precarite-outil
Fonctionnalité: Outil - Indemnité de précarité
  Pour pouvoir calculer mon indemnité de précarite
  En tant que visiteur
  Je veux pouvoir utiliser le calculateur d'indemnité de précarite

Scénario:
  Soit un utilisateur sur la page "/outils/indemnite-precarite"

  Alors je vois "Étapes"
  Alors je vois "Indemnité de précarité"
  Alors je vois "permet d’estimer le montant de l’indemnité de fin de contrat ou de fin de mission"

  Quand je clique sur "Commencer"

  Alors je vois "Quel est le nom de la convention collective applicable ?"
  Quand je clique sur "Suivant"
  Alors je vois "Vous devez répondre à cette question"
  Quand je choisis "Je sais quelle est ma convention collective"
  Alors je vois "Précisez et sélectionnez votre convention collective"
  Quand je renseigne "843" dans le champ "Nom de la convention collective ou son numéro d’identification IDCC"
  Alors j'attends que le texte "Boulangerie" apparaisse
  Quand je clique sur "Boulangerie"
  Alors je vois "Cliquez sur Suivant pour poursuivre la simulation."
  Quand je clique sur "Suivant"

  Alors je vois "Quel est le type du contrat de travail"
  Quand je clique sur "Suivant"
  Alors je vois "Vous devez répondre à cette question"
  Alors je vois que bouton "Suivant" est désactivé
  Quand je choisis "(Contrat d’intérim)"
  Alors je vois "S’agit-il d’un contrat de mission-formation"
  Quand je choisis "#cttFormation-non"
  Quand je choisis "#ruptureContratFauteGrave-non"
  Quand je choisis "#propositionCDIFinContrat-non"
  Quand je choisis "#refusSouplesse-non"
  Quand je clique sur "Suivant"

  Alors je vois "Comment souhaitez-vous indiquer la rémunération perçue pendant le contrat de travail"
  Quand je choisis "montant total"
  Quand je renseigne "2000" dans le champ "Quelle est la rémunération totale brute perçue durant le contrat de travail"
  Quand je clique sur "Suivant"

  Alors je vois "La prime de précarité est estimée à"
  Alors je vois "200"

