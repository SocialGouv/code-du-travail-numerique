import { fr } from "@codegouvfr/react-dsfr";
import { Container } from "../layout/Container";
import Link from "../common/Link";

export const MentionsLegales = () => (
  <Container>
    <h1 id="mentions-legales" className={fr.cx("fr-mt-0")}>
      Mentions légales
    </h1>

    <h2>Éditeur</h2>
    <div className={fr.cx("fr-mb-3w")}>
      <p className={fr.cx("fr-mb-0")}>
        Le site est édité par la{" "}
        <Link target="_blank" href="https://www.fabrique.social.gouv.fr/">
          fabrique des Ministères sociaux
        </Link>{" "}
        située&nbsp;:
      </p>
      <address>
        Tour High Line
        <br />
        8 Rue François Ory
        <br />
        92120 Montrouge
      </address>
    </div>

    <h2>Directeur de la publication</h2>
    <p>Pierre RAMAIN, Directeur Général du Travail</p>

    <h2>Hébergement du site</h2>
    <div className={fr.cx("fr-mb-3w")}>
      <p>
        Ce site est hébergé par OVH SAS&nbsp;: <br />
        2 rue Kellermann <br />
        56100 Roubaix <br />
        France
      </p>
      <p>
        <strong>
          Le code du logiciel est libre, et peut donc être vérifié et amélioré
          par toutes et tous à l’adresse suivante:{" "}
          <a href="https://github.com/SocialGouv/code-du-travail-numerique">
            https://github.com/SocialGouv/code-du-travail-numerique
          </a>
          .
        </strong>
      </p>
    </div>

    <h2>Accessibilité</h2>
    <p>
      La conformité aux normes d’accessibilité numérique est un objectif
      ultérieur mais nous tâchons de rendre dès la conception, ce site
      accessible à toutes et à tous.
    </p>

    <h3>Signaler un dysfonctionnement</h3>
    <p>
      Si vous rencontrez un défaut d’accessibilité vous empêchant d’accéder à un
      contenu ou une fonctionnalité du site,{" "}
      <a
        title="Merci de nous en faire part en envoyant un mail à codedutravailnumerique@travail.gouv.fr"
        href="mailto:codedutravailnumerique@travail.gouv.fr"
      >
        merci de nous en faire part.
      </a>
    </p>
    <p>
      Si vous n’obtenez pas de réponse rapide de notre part, vous êtes en droit
      de faire parvenir vos doléances ou une demande de saisine au Défenseur des
      droits.
    </p>

    <h3>En savoir plus</h3>
    <p>
      Pour en savoir plus sur la politique d’accessibilité numérique de
      l’État&nbsp;:{" "}
      <a href="https://accessibilite.numerique.gouv.fr/" target="_blank">
        https://accessibilite.numerique.gouv.fr
      </a>
    </p>

    <h2>Sécurité</h2>
    <p>
      Le site est protégé par un certificat électronique, matérialisé pour la
      grande majorité des navigateurs par un cadenas. Cette protection participe
      à la confidentialité des échanges.
    </p>
  </Container>
);
