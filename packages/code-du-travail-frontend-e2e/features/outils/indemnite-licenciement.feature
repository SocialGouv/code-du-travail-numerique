#language: fr

@indemnite-licenciement-outil
Fonctionnalité: Outil - Indemnité de licenciement
  Pour pouvoir calculer mon indemnité de licenciement
  En tant que visiteur
  Je veux pouvoir utiliser le calculateur d'indemnité de licenciement

  Scénario:
    Soit un utilisateur sur la page "/outils/indemnite-licenciement"

    Alors je vois "Étapes"
    Alors je vois "Indemnité de licenciement"
    Alors je vois "permet d’estimer le montant de l’indemnité légale de licenciement d’un salarié"

    Quand je clique sur "Commencer"


    Alors je vois "Quel est le type du contrat de travail"
    Quand je clique sur "Suivant"
    Alors je vois "Vous devez répondre à cette question"
    Alors je vois que bouton "Suivant" est désactivé
    Quand je choisis "(CDD)"
    Alors je vois "pas dûe pour les CDD"
    Alors le lien "indemnité de précarité" pointe sur "precarite"
    Quand je choisis "(CDI)"
    Alors je ne vois pas "pas dûe pour les CDD"

    Alors je vois "Le licenciement est-il dû à une faute grave (ou lourde)"
    Quand je choisis "#fauteGrave-oui"
    Alors je vois "pas dûe en cas de faute grave"
    Quand je choisis "#fauteGrave-non"
    Alors je ne vois pas "pas dûe en cas de faute grave"

    Alors je vois "Le licenciement est-il dû à une inaptitude"
    Quand je choisis "#inaptitude-non"

    Quand je clique sur "Suivant"


    Alors je vois "Dates d’entrée et de sortie de l’entreprise"

    Quand je clique sur "Suivant"
    Alors je vois que bouton "Suivant" est désactivé
    Alors je vois "La date est invalide"

    Quand je renseigne "01/01/2000" dans le champ "la date d’entrée"
    Alors je ne vois pas "La date est invalide"

    Quand je renseigne "01/01/1990" dans le champ "la date de notification"
    Alors je vois "La date de notification doit se situer après la date d’entrée"
    Quand je renseigne "01/01/2022" dans le champ "la date de notification"
    Alors je ne vois pas "La date de notification doit se situer après la date d’entrée"

    Quand je renseigne "01/01/2000" dans le champ "la date de sortie"
    Alors je vois "La date de notification doit se situer avant la date de sortie"
    Quand je renseigne "01/01/2022" dans le champ "la date de sortie"
    Alors je ne vois pas "La date de notification doit se situer avant la date de sortie"


    Alors je vois "Période d’absence prolongée"

    Quand je choisis "Oui"
    Alors je vois "ne sont pas des périodes à renseigner ci-après"
    Alors je vois "Quels sont le motif et la durée de ces absences"
    Alors je ne vois pas "Supprimer"
    Alors je vois "1" fois le "label" "Motif"
    Alors je vois "1" fois le "label" "Durée (en mois)"

    Quand je clique sur "Ajouter une absence"
    Alors je vois "2" fois le "label" "Motif"

    Quand je clique sur "Supprimer"
    Alors je vois "1" fois le "label" "Motif"

    Quand je scroll à "Période d’absence prolongée"
    Quand je choisis "Non"
    Alors je ne vois pas "Quels sont le motif et la durée de ces absences"

    Quand je clique sur "Suivant"

    Alors je vois "périodes d'alternance à temps plein et à temps partiel"
    Quand je choisis "#hasTempsPartiel-oui"
    Alors je vois "Le calcul de l’indemnité de licenciement dans le cas d’une alternance de temps plein et de temps partiel est actuellement en cours de développement."
    Quand je clique sur "Suivant"
    Alors je vois "périodes d'alternance à temps plein et à temps partiel"

    Quand je choisis "#hasTempsPartiel-non"
    Alors je vois "Le salaire mensuel brut a-t-il été le même durant les 12 derniers mois précédant la notification du licenciement"
    Quand je choisis "#hasSameSalaire-oui"
    Quand je renseigne "1000" dans le champ "salaire"

    Quand je clique sur "Suivant"

    Alors je vois "Indemnité légale"
    Alors je vois "6 500,00"
    Alors je vois "Imprimer le résultat"
