#language: fr

@themes-navigation
Fonctionnalité: Navigation par thème
Pour naviguer dans les thèmes du code du travail
En tant que visiteur


Scénario:
Soit un utilisateur sur la page "/themes"

Alors je vois "Contenus par thème"
Alors je vois "Besoin de plus d’informations"

#

Quand je clique sur "Embauche et contrat de travail"

Alors je suis redirigé vers la page: "/themes/embauche-et-contrat-de-travail"

Alors je vois le thème "Embauche"
Alors je vois le thème "Contrat de travail"
Alors je ne vois pas le thème "Méthodes de recrutement"
Alors je vois "Contenu correspondant"

#

Quand je clique sur "Embauche"

Alors je suis redirigé vers la page: "/themes/embauche"

Alors je vois le thème "Embauche et contrat de travail"
Alors je ne vois pas le thème "Embauche"
Alors je ne vois pas le thème "Contrat de travail"
Alors je vois le thème "Méthodes de recrutement"
Alors je vois le thème "Période d’essai"
Alors je vois "Besoin de plus d’informations"

#

Quand je clique sur "Embauche et contrat de travail"

Alors je suis redirigé vers la page: "/themes/embauche-et-contrat-de-travail"

Alors je ne vois pas le thème "Embauche et contrat de travail"
Alors je vois le thème "Embauche"
Alors je vois le thème "Contrat de travail"
Alors je ne vois pas le thème "Méthodes de recrutement"
Alors je vois "Besoin de plus d’informations"
