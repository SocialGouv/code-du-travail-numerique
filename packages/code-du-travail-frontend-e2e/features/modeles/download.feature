#language: fr

@modeles.download
Fonctionnalité: Modèle de lettre
  Pour télécharger un modèle de lettre
  En tant que visiteur

  Scénario:
    Soit un utilisateur sur la page "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-a-linitiative-du-salarie"

    Alors je vois "Objet : Rupture de la période d’essai"
    Alors je vois "Télécharger le modèle"

    Quand je télécharge en cliquant sur "Télécharger le modèle"
    Quand j'attends 3 secondes
    Alors j'ai téléchargé le fichier "rupture_periode_d-essai_salarie.docx"




