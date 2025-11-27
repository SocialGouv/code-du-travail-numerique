import { groupByThemes } from "../groupByThemes";
import { ContributionElasticDocument } from "@socialgouv/cdtn-types";

describe("GroupByThemes", () => {
  const data: Pick<
    ContributionElasticDocument,
    "description" | "breadcrumbs" | "slug" | "title" | "source"
  >[] = [
    {
      description:
        "La période d’essai peut être renouvelée une seule fois et uniquement pour les salariés en CDI , si les 3 conditions suivantes sont remplies : La convention ...",
      breadcrumbs: [
        {
          label: "Embauche et contrat de travail",
          position: 0,
          slug: "/themes/embauche-et-contrat-de-travail",
        },
        {
          label: "Embauche",
          position: 1,
          slug: "/themes/embauche",
        },
        {
          label: "Période d’essai",
          position: 3,
          slug: "/themes/periode-dessai",
        },
      ],
      slug: "la-periode-dessai-peut-elle-etre-renouvelee",
      source: "contributions",
      title: "Renouvellement de la période d'essai",
    },
    {
      description:
        "Une convention collective peut prévoir des primes que l'employeur doit verser aux salariés. Elle précise alors leurs conditions d'attribution et montant.",
      breadcrumbs: [
        {
          label: "Salaire et Rémunération",
          position: 1,
          slug: "/themes/salaire-et-remuneration",
        },
        {
          label: "Primes et avantages",
          position: 2,
          slug: "/themes/primes-et-avantages",
        },
      ],
      slug: "quelles-sont-les-primes-prevues-par-la-convention-collective",
      source: "contributions",
      title: "Primes prévues par la convention collective",
    },
    {
      description:
        "L’employeur et le salarié doivent respecter le préavis. Si une des deux parties ne respecte pas le préavis, l'autre a droit au paiement d'une indemnité. ",
      breadcrumbs: [
        {
          label: "Départ de l’entreprise",
          position: 7,
          slug: "/themes/depart-de-lentreprise",
        },
      ],
      slug: "quelles-sont-les-consequences-du-non-respect-du-preavis-par-le-salarie-ou-lemployeur",
      source: "contributions",
      title:
        "Non respect du préavis de démission ou de licenciement : conséquences",
    },
    {
      description:
        "Le recours à un contrat d'extra (CDD d'usage) est encadré par certaines règles et permet à un employeur d’embaucher un salarié pour l'exécution d'une tâche précise et..",
      breadcrumbs: [
        {
          label: "Embauche et contrat de travail",
          position: 0,
          slug: "/themes/embauche-et-contrat-de-travail",
        },
        {
          label: "Contrat de travail",
          position: 2,
          slug: "/themes/contrat-de-travail",
        },
        {
          label: "CDD",
          position: 2,
          slug: "/themes/cdd",
        },
      ],
      slug: "embauche-en-contrat-dextra-cdd-dusage",
      source: "contributions",
      title: "CDD d'usage",
    },
    {
      description:
        'Le salarié a droit à une indemnité de fin de contrat (dite " prime de précarité " ) lorsque le CDD arrive à son terme. Toutefois, dans certains ...',
      breadcrumbs: [
        {
          label: "Départ de l’entreprise",
          position: 7,
          slug: "/themes/depart-de-lentreprise",
        },
        {
          label: "Fin d’un CDD - CTT",
          position: 2,
          slug: "/themes/fin-dun-cdd-ctt",
        },
      ],
      slug: "dans-le-cadre-dun-cdd-quel-est-le-montant-de-lindemnite-de-fin-de-contrat",
      source: "contributions",
      title: "Indemnité de fin de CDD (prime de précarité)",
    },
    {
      description:
        "Un salarié du secteur privé peut être embauché en contrat de chantier ou d'opération. Le contrat de chantier ou d'opération est conclu pour une durée ...",
      breadcrumbs: [
        {
          label: "Embauche et contrat de travail",
          position: 0,
          slug: "/themes/embauche-et-contrat-de-travail",
        },
        {
          label: "Contrat de travail",
          position: 2,
          slug: "/themes/contrat-de-travail",
        },
        {
          label: "CDI",
          position: 1,
          slug: "/themes/cdi",
        },
      ],
      slug: "lentreprise-peut-elle-embaucher-dans-le-cadre-dun-cdi-de-chantier-ou-doperation",
      source: "contributions",
      title: "CDI de chantier (CDIC)",
    },
    {
      description:
        "Le décès de l’employeur a des conséquences différentes sur le contrat de travail, selon que l’employeur est une entreprise individuelle ou un employeur ...",
      breadcrumbs: [
        {
          label: "Départ de l’entreprise",
          position: 7,
          slug: "/themes/depart-de-lentreprise",
        },
        {
          label: "Autres départs",
          position: 6,
          slug: "/themes/autres-departs",
        },
      ],
      slug: "quelles-sont-les-consequences-du-deces-de-lemployeur-sur-le-contrat-de-travail",
      source: "contributions",
      title: "Décès de l'employeur : conséquences",
    },
    {
      description:
        "Lorsqu'un employeur licencie un salarié, celui-ci doit en principe effectuer un préavis. Cependant, il existe des exceptions. Qu'est-ce qu'un préavis de ...",
      breadcrumbs: [
        {
          label: "Départ de l’entreprise",
          position: 7,
          slug: "/themes/depart-de-lentreprise",
        },
        {
          label: "Licenciement : droits des salariés et procédures",
          position: 4,
          slug: "/themes/licenciement-droits-des-salaries-et-procedures",
        },
      ],
      slug: "quelle-est-la-duree-de-preavis-en-cas-de-licenciement",
      source: "contributions",
      title: "Durée du préavis de licenciement",
    },
    {
      description:
        "Le contrat de travail à durée déterminée (CDD) doit être établi par écrit et comporter un certain nombre de mentions obligatoires. Sur la durée du contrat, ...",
      breadcrumbs: [
        {
          label: "Embauche et contrat de travail",
          position: 0,
          slug: "/themes/embauche-et-contrat-de-travail",
        },
        {
          label: "Contrat de travail",
          position: 2,
          slug: "/themes/contrat-de-travail",
        },
        {
          label: "CDD",
          position: 2,
          slug: "/themes/cdd",
        },
      ],
      slug: "quelle-peut-etre-la-duree-maximale-dun-cdd",
      source: "contributions",
      title: "Durée maximale d'un CDD",
    },
    {
      description:
        "La rupture conventionnelle individuelle est un mode de rupture spécifique du contrat de travail qui repose sur une volonté commune du salarié et de ...",
      breadcrumbs: [
        {
          label: "Départ de l’entreprise",
          position: 7,
          slug: "/themes/depart-de-lentreprise",
        },
        {
          label: "Rupture conventionnelle",
          position: 3,
          slug: "/themes/rupture-conventionnelle",
        },
        {
          label: "Rupture conventionnelle individuelle",
          position: 1,
          slug: "/themes/rupture-conventionnelle-individuelle",
        },
      ],
      slug: "quest-ce-quune-rupture-conventionnelle",
      source: "contributions",
      title:
        "Rupture conventionnelle particuliers employeurs (assistants maternels et autres salariés)",
    },
    {
      description:
        "Les conditions de cumul d'emplois diffèrent selon qu'il s'agit d'un cumul d'activités salariées, ou d'un cumul avec une activité non-salariée ou pour la création... ",
      breadcrumbs: [
        {
          label: "Temps de travail",
          position: 2,
          slug: "/themes/temps-de-travail",
        },
        {
          label: "Temps partiel",
          position: 2,
          slug: "/themes/temps-partiel",
        },
      ],
      slug: "quelles-sont-les-conditions-de-cumul-demplois",
      source: "contributions",
      title: "Cumul d'emplois : les conditions",
    },
    {
      description:
        "Quand un poste se libère ou est créé dans l'entreprise, l'employeur doit parfois donner une priorité à certains de ses salariés avant d'embaucher une ...",
      breadcrumbs: [
        {
          label: "Embauche et contrat de travail",
          position: 0,
          slug: "/themes/embauche-et-contrat-de-travail",
        },
        {
          label: "Embauche",
          position: 1,
          slug: "/themes/embauche",
        },
        {
          label: "Formalités d’embauche",
          position: 2,
          slug: "/themes/formalites-dembauche",
        },
      ],
      slug: "si-un-poste-se-libere-ou-est-cree-dans-lentreprise-lemployeur-doit-il-en-informer-les-salaries-ou-le-leur-proposer-en-priorite",
      source: "contributions",
      title: "Priorité d'embauche : obligations",
    },
    {
      description:
        "Le nombre de renouvellements du contrat de travail dépend du type de contrat. En principe, un CDD, quel que soit son motif, ne peut avoir ni pour ...",
      breadcrumbs: [
        {
          label: "Embauche et contrat de travail",
          position: 0,
          slug: "/themes/embauche-et-contrat-de-travail",
        },
        {
          label: "Contrat de travail",
          position: 2,
          slug: "/themes/contrat-de-travail",
        },
      ],
      slug: "combien-de-fois-le-contrat-de-travail-peut-il-etre-renouvele",
      source: "contributions",
      title:
        "Renouvellement du contrat de travail (CDD, intérim, apprentissage)",
    },
    {
      description:
        "Lorsqu’un salarié est en arrêt maladie, son contrat de travail est suspendu. Lors de la suspension du contrat de travail pour cause de maladie, les règles ...",
      breadcrumbs: [
        {
          label: "Santé, sécurité et conditions de travail",
          position: 5,
          slug: "/themes/sante-securite-et-conditions-de-travail",
        },
        {
          label: "Santé au travail",
          position: 3,
          slug: "/themes/sante-au-travail",
        },
        {
          label: "Maladie",
          position: 1,
          slug: "/themes/maladie",
        },
      ],
      slug: "en-cas-de-maladie-le-salarie-a-t-il-droit-a-une-garantie-demploi",
      source: "contributions",
      title: "Garantie d'emploi en cas d'arrêt maladie ",
    },
    {
      description:
        "En cas de perte de marché, les contrats de travail sont transférés à la nouvelle entreprise uniquement dans les cas suivants...",
      breadcrumbs: [
        {
          label: "Embauche et contrat de travail",
          position: 0,
          slug: "/themes/embauche-et-contrat-de-travail",
        },
        {
          label: "Contrat de travail",
          position: 2,
          slug: "/themes/contrat-de-travail",
        },
      ],
      slug: "en-cas-de-perte-de-marche-par-lemployeur-quelles-sont-les-conditions-dun-transfert-des-contrats-de-travail",
      source: "contributions",
      title: "Transfert des contrats de travail",
    },
    {
      description:
        "Une salariée en activité et du secteur privé bénéficie d'un congé de maternité qui comporte une période avant l'accouchement (dit \"congé prénatal\")...",
      breadcrumbs: [
        {
          label: "Congés et repos",
          position: 3,
          slug: "/themes/conges-et-repos",
        },
        {
          label: "Congés",
          position: 1,
          slug: "/themes/conges",
        },
        {
          label: "Congés liés à la naissance et à l’enfance",
          position: 2,
          slug: "/themes/conges-lies-a-la-naissance-et-a-lenfance",
        },
      ],
      slug: "quelle-est-la-duree-du-conge-de-maternite",
      source: "contributions",
      title: "Durée du congé maternité",
    },
    {
      description: "",
      breadcrumbs: [
        {
          label: "Salaire et Rémunération",
          position: 1,
          slug: "/themes/salaire-et-remuneration",
        },
        {
          label: "Primes et avantages",
          position: 2,
          slug: "/themes/primes-et-avantages",
        },
      ],
      slug: "quelles-sont-les-conditions-dattribution-de-la-prime-pour-travaux-dangereux-et-de-la-prime-pour-travaux-insalubres",
      source: "contributions",
      title: "Prime pour travaux dangereux et insalubres",
    },
    {
      description:
        "Vous décidez de prendre votre retraite ou votre employeur vous met d'office à la retraite ? Vous pouvez percevoir une indemnité de départ en retraite si ...",
      breadcrumbs: [
        {
          label: "Départ de l’entreprise",
          position: 7,
          slug: "/themes/depart-de-lentreprise",
        },
        {
          label: "Retraite",
          position: 5,
          slug: "/themes/retraite",
        },
      ],
      slug: "a-quelles-indemnites-peut-pretendre-un-salarie-qui-part-a-la-retraite",
      source: "contributions",
      title: "Indemnités départ à la retraite",
    },
    {
      description:
        "La durée maximale de la période d’essai varie selon le type de contrat de travail et la catégorie professionnelle dont relève le salarié.",
      breadcrumbs: [
        {
          label: "Embauche et contrat de travail",
          position: 0,
          slug: "/themes/embauche-et-contrat-de-travail",
        },
        {
          label: "Embauche",
          position: 1,
          slug: "/themes/embauche",
        },
        {
          label: "Période d’essai",
          position: 3,
          slug: "/themes/periode-dessai",
        },
      ],
      slug: "quelle-est-la-duree-maximale-de-la-periode-dessai-sans-et-avec-renouvellement",
      source: "contributions",
      title: "Durée de la période d'essai : CDD et CDI",
    },
    {
      description:
        "Découvrez vos droits et obligations en cas de maladie avant ou pendant vos congés payés : report, indemnisation et règles spécifiques selon votre convention collective",
      breadcrumbs: [
        {
          label: "Congés et repos",
          position: 3,
          slug: "/themes/conges-et-repos",
        },
        {
          label: "Congés",
          position: 1,
          slug: "/themes/conges",
        },
        {
          label: "Congés payés",
          position: 0,
          slug: "/themes/conges-payes",
        },
      ],
      slug: "si-le-salarie-est-malade-pendant-ses-conges-quelles-en-sont-les-consequences",
      source: "contributions",
      title: "Arrêt maladie pendant les congés",
    },
    {
      description:
        "Lorsque le salarié est en arrêt de travail pour maladie alors qu'il exécute sa période de préavis (démission ou licenciement), les conséquences sur sa ...",
      breadcrumbs: [
        {
          label: "Départ de l’entreprise",
          position: 7,
          slug: "/themes/depart-de-lentreprise",
        },
      ],
      slug: "arret-maladie-pendant-le-preavis-quelles-consequences",
      source: "contributions",
      title: "Arrêt maladie pendant le préavis",
    },
    {
      description:
        "Le code du travail prévoit des conditions du maintien de salaire différentes, selon que le salarié soit en arrêt maladie non professionnelle, en arrêt ...",
      breadcrumbs: [
        {
          label: "Santé, sécurité et conditions de travail",
          position: 5,
          slug: "/themes/sante-securite-et-conditions-de-travail",
        },
        {
          label: "Santé au travail",
          position: 3,
          slug: "/themes/sante-au-travail",
        },
        {
          label: "Maladie",
          position: 1,
          slug: "/themes/maladie",
        },
      ],
      slug: "en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire",
      source: "contributions",
      title: "Maintien de salaire en cas d'arrêt maladie",
    },
    {
      description:
        "En principe, le préavis de démission doit être exécuté en totalité par l’employeur et le salarié, y compris si le salarié a retrouvé un emploi. Toutefois, ...",
      breadcrumbs: [
        {
          label: "Départ de l’entreprise",
          position: 7,
          slug: "/themes/depart-de-lentreprise",
        },
        {
          label: "Démission",
          position: 1,
          slug: "/themes/demission",
        },
      ],
      slug: "le-preavis-de-demission-doit-il-etre-execute-en-totalite-y-compris-si-le-salarie-a-retrouve-un-emploi",
      source: "contributions",
      title: "Respect du préavis de démission",
    },
    {
      description:
        "À l'expiration d'un contrat de mission (intérim), un délai de carence s'applique obligatoirement afin de pourvoir  le poste du salarié dont le contrat a pris fin ...",
      breadcrumbs: [
        {
          label: "Départ de l’entreprise",
          position: 7,
          slug: "/themes/depart-de-lentreprise",
        },
        {
          label: "Fin d’un CDD - CTT",
          position: 2,
          slug: "/themes/fin-dun-cdd-ctt",
        },
      ],
      slug: "faut-il-respecter-un-delai-de-carence-entre-deux-contrats-de-mission-interim",
      source: "contributions",
      title: "Contrat d'intérim : délai de carence",
    },
    {
      description:
        "La règle varie selon qu'il s'agit d'un arrêt maladie ou d'un accident du travail ou d'une maladie professionnelle.",
      breadcrumbs: [
        {
          label: "Embauche et contrat de travail",
          position: 0,
          slug: "/themes/embauche-et-contrat-de-travail",
        },
        {
          label: "Embauche",
          position: 1,
          slug: "/themes/embauche",
        },
        {
          label: "Période d’essai",
          position: 3,
          slug: "/themes/periode-dessai",
        },
      ],
      slug: "arret-maladie-pendant-la-periode-dessai-quelles-sont-les-regles",
      source: "contributions",
      title: "Arrêt maladie pendant la période d'essai",
    },
    {
      description:
        "En cas de mise à la retraite, le salarié effectue un préavis. Sa durée est celle prévue en cas de licenciement. Elle dépend de l’ancienneté du salarié dans ...",
      breadcrumbs: [
        {
          label: "Départ de l’entreprise",
          position: 7,
          slug: "/themes/depart-de-lentreprise",
        },
        {
          label: "Retraite",
          position: 5,
          slug: "/themes/retraite",
        },
        {
          label: "Mise à la retraite",
          position: 1,
          slug: "/themes/mise-a-la-retraite",
        },
      ],
      slug: "quelle-est-la-duree-de-preavis-en-cas-de-mise-a-la-retraite",
      source: "contributions",
      title: "Durée du préavis de mise à la retraite",
    },
    {
      description:
        "Le Code du travail prévoit le contenu obligatoire du contrat de travail uniquement pour certains contrats (CDD, contrat d’apprentissage, etc.). Cependant, ...",
      breadcrumbs: [
        {
          label: "Embauche et contrat de travail",
          position: 0,
          slug: "/themes/embauche-et-contrat-de-travail",
        },
        {
          label: "Contrat de travail",
          position: 2,
          slug: "/themes/contrat-de-travail",
        },
      ],
      slug: "quelles-informations-doivent-figurer-dans-le-contrat-de-travail-ou-la-lettre-dengagement",
      source: "contributions",
      title: "Contrat de travail : les mentions obligatoires",
    },
    {
      description:
        "La clause de non-concurrence est une clause insérée par votre employeur dans votre contrat de travail. Elle vise à limiter votre liberté d'exercer, après ...",
      breadcrumbs: [
        {
          label: "Embauche et contrat de travail",
          position: 0,
          slug: "/themes/embauche-et-contrat-de-travail",
        },
        {
          label: "Contrat de travail",
          position: 2,
          slug: "/themes/contrat-de-travail",
        },
      ],
      slug: "quelles-sont-les-conditions-de-la-clause-de-non-concurrence",
      source: "contributions",
      title: "Clause de non concurrence",
    },
    {
      description:
        "En principe, le préavis de licenciement doit être exécuté en totalité par l’employeur et le salarié, y compris si le salarié a retrouvé un emploi. ...",
      breadcrumbs: [
        {
          label: "Départ de l’entreprise",
          position: 7,
          slug: "/themes/depart-de-lentreprise",
        },
        {
          label: "Licenciement : droits des salariés et procédures",
          position: 4,
          slug: "/themes/licenciement-droits-des-salaries-et-procedures",
        },
      ],
      slug: "le-preavis-de-licenciement-doit-il-etre-execute-en-totalite-y-compris-si-le-salarie-a-retrouve-un-emploi",
      source: "contributions",
      title: "Respect du préavis de licenciement",
    },
    {
      description:
        "Le Code du travail ne prévoit pas d’autorisation d’absences pour rechercher un emploi en cours de préavis. Cependant certaines conventions collectives peuvent en accorder",
      breadcrumbs: [
        {
          label: "Départ de l’entreprise",
          position: 7,
          slug: "/themes/depart-de-lentreprise",
        },
      ],
      slug: "le-salarie-peut-il-sabsenter-pour-rechercher-un-emploi-pendant-son-preavis",
      source: "contributions",
      title: "Heures pour recherche d'emploi pendant le préavis",
    },
    {
      description:
        "L’ancienneté s’entend comme le temps écoulé depuis la date d'entrée en fonction du salarié, en vertu de son contrat de travail en cours. Elle est ainsi ...",
      breadcrumbs: [
        {
          label: "Salaire et Rémunération",
          position: 1,
          slug: "/themes/salaire-et-remuneration",
        },
        {
          label: "Bulletin de salaire et cotisations sociales",
          position: 5,
          slug: "/themes/bulletin-de-salaire-et-cotisations-sociales",
        },
      ],
      slug: "comment-determiner-lanciennete-du-salarie",
      source: "contributions",
      title: "Calcul de l'ancienneté",
    },
    {
      description:
        "À la fin de chaque mission, le salarié doit percevoir, en complément de son salaire, une indemnité de fin de mission, plus souvent appelée prime de précarité.",
      breadcrumbs: [
        {
          label: "Départ de l’entreprise",
          position: 7,
          slug: "/themes/depart-de-lentreprise",
        },
        {
          label: "Fin d’un CDD - CTT",
          position: 2,
          slug: "/themes/fin-dun-cdd-ctt",
        },
      ],
      slug: "dans-le-cadre-dun-contrat-de-mission-interim-quel-est-le-montant-de-lindemnite-de-fin-de-contrat",
      source: "contributions",
      title: "Indemnité de fin contrat d'intérim (prime de précarité)",
    },
    {
      description:
        "L'employeur et le salarié peuvent s’accorder librement sur le montant du salaire, mais dans le respect des montants minimums prévus par la loi et les accords collectifs.",
      breadcrumbs: [
        {
          label: "Salaire et Rémunération",
          position: 1,
          slug: "/themes/salaire-et-remuneration",
        },
      ],
      slug: "quel-est-le-salaire-minimum",
      source: "contributions",
      title: "Quel est le salaire minimum ?",
    },
    {
      description:
        "Lorsqu'une salariée part en congé maternité, elle a droit à des indemnités journalières de sécurité sociale et un maintien de salaire en fonction de sa convention....",
      breadcrumbs: [
        {
          label: "Congés et repos",
          position: 3,
          slug: "/themes/conges-et-repos",
        },
        {
          label: "Congés",
          position: 1,
          slug: "/themes/conges",
        },
        {
          label: "Congés liés à la naissance et à l’enfance",
          position: 2,
          slug: "/themes/conges-lies-a-la-naissance-et-a-lenfance",
        },
      ],
      slug: "quelles-sont-les-conditions-dindemnisation-pendant-le-conge-de-maternite",
      source: "contributions",
      title: "Indemnités du congé maternité",
    },
    {
      description:
        "En cas de départ à la retraite, le salarié effectue un préavis. Sa durée est celle prévue en cas de licenciement. Elle dépend de l’ancienneté du salarié ...",
      breadcrumbs: [
        {
          label: "Départ de l’entreprise",
          position: 7,
          slug: "/themes/depart-de-lentreprise",
        },
        {
          label: "Retraite",
          position: 5,
          slug: "/themes/retraite",
        },
        {
          label: "Départ volontaire à la retraite",
          position: 2,
          slug: "/themes/depart-volontaire-a-la-retraite",
        },
      ],
      slug: "quelle-est-la-duree-de-preavis-en-cas-de-depart-a-la-retraite",
      source: "contributions",
      title: "Durée du préavis de départ à la retraite",
    },
    {
      description:
        "Le code du travail ne prévoit pas de prime d’ancienneté. Son versement peut être prévu par certaines conventions collectives.",
      breadcrumbs: [
        {
          label: "Salaire et Rémunération",
          position: 1,
          slug: "/themes/salaire-et-remuneration",
        },
        {
          label: "Primes et avantages",
          position: 2,
          slug: "/themes/primes-et-avantages",
        },
      ],
      slug: "quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
      source: "contributions",
      title: "Prime d'ancienneté",
    },
    {
      description:
        "En principe, chaque salarié bénéficie d’un repos hebdomadaire qui est donné le dimanche. Mais la loi prévoit des dérogations à ce principe.",
      breadcrumbs: [
        {
          label: "Congés et repos",
          position: 3,
          slug: "/themes/conges-et-repos",
        },
        {
          label: "Dimanches, jours fériés et ponts",
          position: 4,
          slug: "/themes/dimanches-jours-feries-et-ponts",
        },
      ],
      slug: "travail-du-dimanche-quelle-contrepartie",
      source: "contributions",
      title: "Travailler le dimanche : contrepartie ",
    },
    {
      description:
        "Afin de connaître la durée du préavis de démission, il convient de distinguer le cas général et le cas du contrat de mission..",
      breadcrumbs: [
        {
          label: "Départ de l’entreprise",
          position: 7,
          slug: "/themes/depart-de-lentreprise",
        },
        {
          label: "Démission",
          position: 1,
          slug: "/themes/demission",
        },
      ],
      slug: "quelle-est-la-duree-du-preavis-en-cas-de-demission",
      source: "contributions",
      title: "Durée du préavis de démission",
    },
    {
      description:
        "1. Cas général Lorsqu'un CDD prend fin, il n'est pas possible d'avoir recours à un nouveau CDD sur le même poste, avec le même salarié ou un autre ...",
      breadcrumbs: [
        {
          label: "Départ de l’entreprise",
          position: 7,
          slug: "/themes/depart-de-lentreprise",
        },
        {
          label: "Fin d’un CDD - CTT",
          position: 2,
          slug: "/themes/fin-dun-cdd-ctt",
        },
      ],
      slug: "faut-il-respecter-un-delai-de-carence-entre-deux-cdd-si-oui-quelle-est-sa-duree",
      source: "contributions",
      title: "Délai de carence entre deux CDD",
    },
    {
      description:
        "Certaines fêtes constituent des jours fériés qui peuvent être chômés ou travaillés et rémunérés à des conditions qui varient selon les jours concernés.",
      breadcrumbs: [
        {
          label: "Congés et repos",
          position: 3,
          slug: "/themes/conges-et-repos",
        },
        {
          label: "Dimanches, jours fériés et ponts",
          position: 4,
          slug: "/themes/dimanches-jours-feries-et-ponts",
        },
      ],
      slug: "jours-feries-et-ponts-dans-le-secteur-prive",
      source: "contributions",
      title: "Travailler un jour férié : contrepartie",
    },
    {
      description:
        "Le Code du travail prévoit que le salarié bénéficie de congés à l’occasion de certains événements familiaux. Ils n’entrainent aucune diminution de la rémunération.",
      breadcrumbs: [
        {
          label: "Congés et repos",
          position: 3,
          slug: "/themes/conges-et-repos",
        },
        {
          label: "Congés",
          position: 1,
          slug: "/themes/conges",
        },
        {
          label: "Congés pour événement familial",
          position: 3,
          slug: "/themes/conges-pour-evenement-familial",
        },
      ],
      slug: "les-conges-pour-evenements-familiaux",
      source: "contributions",
      title: "Congés pour évènements familiaux (décès, mariage, naissance...)",
    },
    {
      description:
        "Le contrat de travail peut être verbal (donc non écrit), sauf si le Code du travail prévoit l’obligation d’un contrat de travail écrit et signé. Cette ...",
      breadcrumbs: [
        {
          label: "Embauche et contrat de travail",
          position: 0,
          slug: "/themes/embauche-et-contrat-de-travail",
        },
        {
          label: "Contrat de travail",
          position: 2,
          slug: "/themes/contrat-de-travail",
        },
      ],
      slug: "est-il-obligatoire-davoir-un-contrat-de-travail-ecrit-et-signe",
      source: "contributions",
      title:
        "Est-il obligatoire d'avoir un contrat de travail écrit et signé ?",
    },
    {
      description:
        "La durée du contrat de mission (intérim) prévue par le Code du travail s’applique , sauf si une convention ou un accord collectif fixe cette durée...",
      breadcrumbs: [
        {
          label: "Embauche et contrat de travail",
          position: 0,
          slug: "/themes/embauche-et-contrat-de-travail",
        },
        {
          label: "Contrat de travail",
          position: 2,
          slug: "/themes/contrat-de-travail",
        },
        {
          label: "Intérim",
          position: 3,
          slug: "/themes/interim",
        },
      ],
      slug: "quelle-est-la-duree-maximale-du-contrat-de-mission-interim",
      source: "contributions",
      title: "Durée contrat de mission (intérim)",
    },
  ];

  it("groupe par thème le contenu en se basant sur le breadcrumbs", async () => {
    const result = groupByThemes(data);
    expect(result).toMatchSnapshot();
  });
});
