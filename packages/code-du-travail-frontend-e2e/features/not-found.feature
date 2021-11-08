#language: fr

@not-found
Fonctionnalité: Page non trouvée
  Pour pouvoir améliorer être redirigée en cas d'erreur de ma part
  En tant que visiteur
  Je veux pouvoir accéder à la page 404 lorsque je ne trouve pas la page souhaitée

Scénario:
  Soit un utilisateur sur la page "/banane"
  Alors je vois "ERREUR 404"
  Alors je vois "Oups, nous ne trouvons pas cette page"
  Alors je vois le lien "Revenir à la page d’accueil"