import { Container } from "../layout/Container";
import Link from "../common/Link";

export const Accessibilite = () => {
  return (
    <Container>
      <h1>Déclaration d&apos;accessibilité</h1>
      <p>
        Le Ministère du travail, de l’emploi et de l’insertion s’engage à rendre
        son service accessible conformément à l’article 47 de la loi n° 2005-102
        du 11 février 2005.
      </p>
      <p>
        À cette fin, il met en œuvre la stratégie et les actions
        suivantes&nbsp;:
        <ul>
          <li>
            La réalisation d’un audit de conformité le 19 mai de l’année 2021
          </li>
          <li>
            La réalisation d’un contre-audit d’ici la fin du premier semestre
            2024
          </li>
          <li>
            La mise en œuvre des recommandations pour maintenir l’objectif de
            75%
          </li>
        </ul>
      </p>
      <p>
        Cette déclaration d’accessibilité s’applique au site Internet
        code.travail.gouv.fr.
      </p>
      <h2>État de conformité</h2>
      <p>
        Le site Internet code.travail.gouv.fr est en conformité partielle avec
        le référentiel général d’amélioration de l’accessibilité (RGAA) «
        version 4.1 ».
      </p>
      <p>
        Nous tâchons de rendre dès la conception, ce site accessible à toutes et
        à tous.
      </p>
      <h3>Résultat des tests</h3>
      <p>L’audit de conformité réalisé par Alter Way révèle que :</p>
      <ul>
        <li>[75%] des critères du RGAA version 4.1 sont respectés</li>
      </ul>

      <h2>Non-conformité</h2>
      <ul>
        <li>
          Critère 5.7. Pour chaque tableau de données, la technique appropriée
          permettant d’associer chaque cellule avec ses en-têtes est-elle
          utilisée (hors cas particuliers)&nbsp;?
        </li>
        <li>
          Critère 7.1. Chaque script est-il, si nécessaire, compatible avec les
          technologies d’assistance&nbsp;?
        </li>
        <li>
          Critère 7.3. Chaque script est-il contrôlable par le clavier et par
          tout dispositif de pointage (hors cas particuliers)&nbsp;?
        </li>
        <li>
          Critère 7.5. Dans chaque page web, les messages de statut sont-ils
          correctement restitués par les technologies d’assistance&nbsp;?
        </li>
        <li>
          Critère 11.4. Dans chaque formulaire, chaque étiquette de champ et son
          champ associé sont-ils accolés (hors cas particuliers)&nbsp;?
        </li>
        <li>
          Critère 11.10. Dans chaque formulaire, le contrôle de saisie est-il
          utilisé de manière pertinente (hors cas particuliers) ?
        </li>
        <li>
          Critère 12.6. Les zones de regroupement de contenus présentes dans
          plusieurs pages web (zones d’en-tête, de navigation principale, de
          contenu principal, de pied de page et de moteur de recherche)
          peuvent-elles être atteintes ou évitées&nbsp;?
        </li>
        <li>
          Critère 12.8. Dans chaque page web, l’ordre de tabulation est-il
          cohérent&nbsp;?
        </li>
      </ul>
      <h2>Établissement de cette déclaration d’accessibilité</h2>
      <p>
        Cette déclaration a été établie le 12 avril 2021. Elle a été mise à jour
        le 20/10/2023.
      </p>
      <h3>
        Technologies utilisées pour la réalisation du Code du travail numérique
      </h3>
      <ul>
        <li>HTML5</li>
        <li>WAI-ARIA</li>
        <li>CSS</li>
        <li>JavaScript</li>
      </ul>
      <h3>Environnement de test</h3>
      <p>
        Les vérifications de restitution de contenus ont été réalisées sur la
        base de la combinaison fournie par la base de référence du RGAA 4.1,
        avec les versions suivantes&nbsp;:
      </p>
      <ul>
        <li>Firefox</li>
        <li>NVDA</li>
      </ul>
      <h3>Outils pour évaluer l’accessibilité</h3>
      <p>
        Les vérifications de restitution de contenus ont été réalisées sur la
        base de la combinaison fournie par la base de référence du RGAA 4.1,
        avec les versions suivantes&nbsp;:
      </p>
      <ul>
        <li>wave</li>
        <li>web developper toolbar</li>
        <li>headings maps</li>
        <li>wcag color contrast checker</li>
        <li>
          <Link
            href="https://validator.w3.org"
            rel="noopener noreferrer"
            target="_blank"
          >
            Validateur w3c
          </Link>
        </li>
      </ul>
      <h3>Pages du site ayant fait l’objet de la vérification de conformité</h3>
      <ol>
        <li>
          Page d&apos;accueil :{" "}
          <Link href="https://code.travail.gouv.fr/">
            https://code.travail.gouv.fr/
          </Link>
        </li>
        <li>
          Page mentions légales :{" "}
          <Link href="https://code.travail.gouv.fr/mentions-legales">
            https://code.travail.gouv.fr/mentions-legales
          </Link>
        </li>
        <li>
          Page droit du travail :{" "}
          <Link href="https://code.travail.gouv.fr/droit-du-travail">
            https://code.travail.gouv.fr/droit-du-travail
          </Link>
        </li>
        <li>
          Page boîte à outils :{" "}
          <Link href="https://code.travail.gouv.fr/outils">
            https://code.travail.gouv.fr/outils
          </Link>
        </li>
        <li>
          Page service-public :{" "}
          <Link href="https://code.travail.gouv.fr/fiche-service-public/arret-maladie-indemnites-journalieres-versees-au-salarie">
            https://code.travail.gouv.fr/fiche-service-public/arret-maladie-indemnites-journalieres-versees-au-salarie
          </Link>
        </li>
        <li>
          Page information :{" "}
          <Link href="https://code.travail.gouv.fr/information/covid-19-reagir-en-cas-de-contamination-dans-lentreprise-protocole-national">
            https://code.travail.gouv.fr/information/covid-19-reagir-en-cas-de-contamination-dans-lentreprise-protocole-national
          </Link>
        </li>
        <li>
          Page statistiques :{" "}
          <Link href="https://code.travail.gouv.fr/stats">
            https://code.travail.gouv.fr/stats
          </Link>
        </li>
        <li>
          Page thème :{" "}
          <Link href="https://code.travail.gouv.fr/themes/contrat-de-travail">
            https://code.travail.gouv.fr/themes/contrat-de-travail
          </Link>
        </li>
        <li>
          Page recherche :{" "}
          <Link href="https://code.travail.gouv.fr/recherche?q=cong%C3%A9s+pay%C3%A9s">
            https://code.travail.gouv.fr/recherche?q=cong%C3%A9s+pay%C3%A9s
          </Link>
        </li>
        <li>
          Page modèle de courrier :{" "}
          <Link href="https://code.travail.gouv.fr/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-a-linitiative-du-salarie">
            https://code.travail.gouv.fr/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-a-linitiative-du-salarie
          </Link>
        </li>
        <li>
          Page dossier :{" "}
          <Link href="https://code.travail.gouv.fr/dossiers/ministere-du-travail-notre-dossier-sur-le-coronavirus">
            https://code.travail.gouv.fr/dossiers/ministere-du-travail-notre-dossier-sur-le-coronavirus
          </Link>
        </li>
        <li>
          Page contribution :{" "}
          <Link href="https://code.travail.gouv.fr/contribution/les-conges-pour-evenements-familiaux">
            https://code.travail.gouv.fr/contribution/les-conges-pour-evenements-familiaux
          </Link>
        </li>
        <li>
          Page outil :{" "}
          <Link href="https://code.travail.gouv.fr/outils/indemnite-licenciement">
            https://code.travail.gouv.fr/outils/indemnite-licenciement
          </Link>
        </li>
        <li>
          Page glossaire :{" "}
          <Link href="https://code.travail.gouv.fr/glossaire">
            https://code.travail.gouv.fr/glossaire
          </Link>
        </li>
      </ol>
      <h2>Amélioration et contact</h2>
      <p>
        Si vous n’arrivez pas à accéder à un contenu ou à un service, vous
        pouvez contacter le responsable du site Internet code.travail.gouv.fr
        pour être orienté vers une alternative accessible ou obtenir le contenu
        sous une autre forme.
      </p>
      <p>
        E-mail&nbsp;:{" "}
        <a
          href="mailto:codedutravailnumérique@travail.gouv.fr"
          title="Envoyer un mail à codedutravailnumerique@travail.gouv.fr"
        >
          codedutravailnumerique@travail.gouv.fr
        </a>
      </p>
      <p>Nous essayons de répondre le plus rapidement possible.</p>
      <h2>Voies de recours</h2>
      <p>Cette procédure est à utiliser dans le cas suivant.</p>
      <p>
        Vous avez signalé au responsable du site internet un défaut
        d’accessibilité qui vous empêche d’accéder à un contenu ou à un des
        services du portail et vous n’avez pas obtenu de réponse satisfaisante.
      </p>
      <p>
        Vous pouvez&nbsp;:
        <ul>
          <li>
            <Link
              href="https://formulaire.defenseurdesdroits.fr/code/afficher.php?ETAPE=accueil_2016"
              target="_blank"
              rel="noopener noreferrer"
            >
              Écrire un message au Défenseur des droits
            </Link>
          </li>
          <li>
            <Link
              href="https://www.defenseurdesdroits.fr/carte-des-delegues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contacter le délégué du Défenseur des droits dans votre région
            </Link>
          </li>
          <li>
            Envoyer un courrier par la poste (gratuit, ne pas mettre de
            timbre)&nbsp;: <br />
            Défenseur des droits <br />
            Libre réponse 71120 <br />
            75342 Paris CEDEX 07
          </li>
        </ul>
      </p>
      <h2>En savoir plus sur l’accessibilité</h2>
      <p>
        Pour en savoir plus sur la politique d’accessibilité numérique de
        l’État&nbsp;: <br />
        <Link
          href="https://accessibilite.numerique.gouv.fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://accessibilite.numerique.gouv.fr
        </Link>
      </p>
    </Container>
  );
};
