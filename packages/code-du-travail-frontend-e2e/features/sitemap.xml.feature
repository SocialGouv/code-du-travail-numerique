#language: fr

@sitemap
Fonctionnalité: Sitemap
  Pour pouvoir crawler le site
  En tant que robot
  Je pouvoir accdéder à la liste des url via un sitemap.xml

  Scénario:
    Soit un utilisateur sur la page "/sitemap.xml"
    Alors le status de la page est 200
    Alors je vois "<loc>https://code.travail.gouv.fr/</loc>"
