#language: fr

@simulateur-embauche-outil
Fonctionnalité: Outil - Salaire brut/net
  Pour pouvoir calculer son salaire net
  En tant que visiteur
  Je veux pouvoir utiliser le simulateur de mon-entreprise "revenus pour salarié"

  Scénario:
    Soit un utilisateur sur la page "/outils/simulateur-embauche"

    Alors je vois "Calculer le salaire brut/net"

    Quand je regarde dans l'iframe "#simulateurEmbauche"
    Alors je vois "Coût total"
