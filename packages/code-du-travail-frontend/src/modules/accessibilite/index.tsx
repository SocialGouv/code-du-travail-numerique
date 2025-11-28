import { Container } from "../layout/Container";
import Link from "../common/Link";

export const Accessibilite = () => {
  return (
    <Container>
      <h1>Déclaration d&apos;accessibilité</h1>
      <p>
        Le Ministère du travail, de l&apos;emploi et de l&apos;insertion
        s&apos;engage à rendre son site internet accessible conformément à
        l&apos;article 47 de la loi n° 2005-102 du 11 février 2005.
      </p>
      <p>
        À cette fin, il met en œuvre la stratégie et les actions
        suivantes&nbsp;:
      </p>
      <ul className="fr-mb-2w">
        <li>La réalisation d&apos;un audit de conformité le 9 juillet 2025</li>
        <li>La réalisation d&apos;un contre-audit en octobre 2025</li>
        <li>
          La mise en œuvre des recommandations pour atteindre l&apos;objectif de
          100%
        </li>
      </ul>

      <p>
        Cette déclaration d&apos;accessibilité s&apos;applique au site web :{" "}
        <Link href="https://code.travail.gouv.fr/">
          https://code.travail.gouv.fr/
        </Link>
      </p>

      <h2>État de conformité</h2>
      <p>
        Le site Internet code.travail.gouv.fr (« Code du travail numérique »)
        est en totale conformité avec le référentiel général d&apos;amélioration
        de l&apos;accessibilité.
      </p>

      <h2>Résultats des tests</h2>
      <p>
        L&apos;audit de conformité au RGAA 4.1.2 réalisé par la société Temesis
        et le contre audit réalisé en interne révèle que :
      </p>
      <p>
        <strong>100 % des critères RGAA sont respectés.</strong>
      </p>
      <p>Dans le détail :</p>
      <ul className="fr-mb-2w">
        <li>Nombre de critères conformes : 60</li>
        <li>Nombre de critères non conformes : 0</li>
        <li>Nombre de critères non applicables : 46</li>
      </ul>

      <h2>Contenus non accessibles</h2>
      <h3>Contenus non soumis à l&apos;obligation d&apos;accessibilité</h3>
      <ul className="fr-mb-2w">
        <li>
          Les fichiers disponibles dans des formats bureautiques publiés avant
          le 23 septembre 2018 ;
        </li>
        <li>
          Les contenus de tiers qui ne sont ni financés ni développés par
          l&apos;organisme concerné et qui ne sont pas sous son contrôle : cela
          concerne le niveau de titre de certains contenus venant des fiches du
          ministère de travail. Leur niveau de titre n&apos;est pas déclaré ou
          contient un saut de titre.
        </li>
      </ul>

      <h2>Établissement de cette déclaration d&apos;accessibilité</h2>
      <p>Cette déclaration a été établie le 24 octobre 2025.</p>

      <h3>Technologies utilisées pour la réalisation du site web</h3>
      <ul className="fr-mb-2w">
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
      </ul>

      <h3>Environnement de test</h3>
      <p>
        Les tests des pages web ont été effectués avec les combinaisons de
        navigateurs web et lecteurs d&apos;écran suivants :
      </p>
      <ul className="fr-mb-2w">
        <li>Windows, NVDA 2024.4.1, Firefox 140</li>
        <li>Windows, Jaws 2025, Firefox 140</li>
        <li>macOS, VoiceOver, Safari</li>
        <li>Android natif, TalkBack 15.1, Chrome</li>
        <li>iOS, VoiceOver, Safari</li>
      </ul>
      <p>Les outils suivants ont été utilisés lors de l&apos;évaluation :</p>
      <ul className="fr-mb-2w">
        <li>WCAG contrast checker</li>
        <li>HeadingsMap</li>
        <li>Web developer</li>
        <li>ARC Toolkit</li>
      </ul>

      <h3>
        Pages du site ayant fait l&apos;objet de la vérification de conformité
      </h3>
      <ul className="fr-mb-2w">
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
          Plan du site :{" "}
          <Link href="https://code.travail.gouv.fr/plan-du-site">
            https://code.travail.gouv.fr/plan-du-site
          </Link>
        </li>
        <li>
          Déclaration d&apos;accessibilité :{" "}
          <Link href="https://code.travail.gouv.fr/accessibilite">
            https://code.travail.gouv.fr/accessibilite
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
          <Link href="https://code.travail.gouv.fr/information/licenciement-pour-inaptitude-medicale">
            https://code.travail.gouv.fr/information/licenciement-pour-inaptitude-medicale
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
          <Link href="https://code.travail.gouv.fr/recherche?query=cong%C3%A9s+sans+solde">
            https://code.travail.gouv.fr/recherche?query=cong%C3%A9s+sans+solde
          </Link>
        </li>
        <li>
          Page modèle de courrier :{" "}
          <Link href="https://code.travail.gouv.fr/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-a-linitiative-du-salarie">
            https://code.travail.gouv.fr/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-a-linitiative-du-salarie
          </Link>
        </li>
        <li>
          Page contribution :{" "}
          <Link href="https://code.travail.gouv.fr/contribution/les-conges-pour-evenements-familiaux">
            https://code.travail.gouv.fr/contribution/les-conges-pour-evenements-familiaux
          </Link>
        </li>
        <li>
          Page glossaire :{" "}
          <Link href="https://code.travail.gouv.fr/glossaire">
            https://code.travail.gouv.fr/glossaire
          </Link>
        </li>
        <li>
          Page Ministère du travail :{" "}
          <Link href="https://code.travail.gouv.fr/fiche-ministere-travail/les-jours-feries-et-les-ponts">
            https://code.travail.gouv.fr/fiche-ministere-travail/les-jours-feries-et-les-ponts
          </Link>
        </li>
        <li>
          Page article du code du travail :{" "}
          <Link href="https://code.travail.gouv.fr/code-du-travail/d3133-1">
            https://code.travail.gouv.fr/code-du-travail/d3133-1
          </Link>
        </li>
        <li>
          Page convention collective :{" "}
          <Link href="https://code.travail.gouv.fr/convention-collective/2120-banque">
            https://code.travail.gouv.fr/convention-collective/2120-banque
          </Link>
        </li>
        <li>
          Page outil :{" "}
          <Link href="https://code.travail.gouv.fr/outils/indemnite-licenciement">
            https://code.travail.gouv.fr/outils/indemnite-licenciement
          </Link>
        </li>
        <li>
          Page outil :{" "}
          <Link href="https://code.travail.gouv.fr/outils/indemnite-rupture-conventionnelle">
            https://code.travail.gouv.fr/outils/indemnite-rupture-conventionnelle
          </Link>
        </li>
      </ul>

      <h2>Retour d&apos;information et contact</h2>
      <p>
        Si vous n&apos;arrivez pas à accéder à un contenu ou à un service, vous
        pouvez contacter le responsable du site web pour être orienté vers une
        alternative accessible ou obtenir le contenu sous une autre forme.
      </p>
      <p>
        Envoyer un e-mail à l&apos;adresse suivante :{" "}
        <Link
          href="mailto:codedutravailnumerique@travail.gouv.fr"
          title="Envoyer un mail à codedutravailnumerique@travail.gouv.fr"
        >
          codedutravailnumerique@travail.gouv.fr
        </Link>
      </p>

      <h2>Voies de recours</h2>
      <p>Cette procédure est à utiliser dans le cas suivant.</p>
      <p>
        Vous avez signalé au responsable du site web un défaut
        d&apos;accessibilité qui vous empêche d&apos;accéder à un contenu ou à
        un des services et vous n&apos;avez pas obtenu de réponse satisfaisante.
      </p>
      <ul className="fr-mb-2w">
        <li>
          <Link
            href="https://formulaire.defenseurdesdroits.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Écrire un message au Défenseur des droits
          </Link>
        </li>
        <li>
          <Link
            href="https://www.defenseurdesdroits.fr/saisir/delegues"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contacter le délégué du Défenseur des droits dans votre région
          </Link>
        </li>
        <li>
          Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) :
          <br />
          Défenseur des droits
          <br />
          Libre réponse 71120
          <br />
          75342 Paris CEDEX 07
        </li>
      </ul>

      <h2>En savoir plus sur l’accessibilité</h2>
      <p>
        Pour en savoir plus sur la politique d’accessibilité numérique de
        l’État&nbsp;: <br />
        <Link
          href="https://accessibilite.numerique.gouv.fr/"
          target="_blank"
          rel="noopener noreferrer"
          title="Lien vers le référentiel général d’amélioration de l’accessibilité"
        >
          https://accessibilite.numerique.gouv.fr
        </Link>
      </p>
    </Container>
  );
};
