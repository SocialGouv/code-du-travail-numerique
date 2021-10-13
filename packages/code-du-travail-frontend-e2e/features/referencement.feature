#language: fr

@referencement
Fonctionnalité: Tests des balises permettant de référencer l'application
  Pour pouvoir améliorer le référencement
  En tant que visiteur
  Je veux pouvoir voir la balise canonique

Scénario:
  Soit un utilisateur sur la page d'accueil
  Alors je vois le lien self canonique

  Soit un utilisateur sur la page "/contribution/quelle-peut-etre-la-duree-maximale-dun-cdd"
  Alors je vois le lien self canonique

