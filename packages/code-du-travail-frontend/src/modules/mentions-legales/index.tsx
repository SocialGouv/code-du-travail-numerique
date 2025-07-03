import { fr } from "@codegouvfr/react-dsfr";
import { Container } from "../layout/Container";
import Link from "../common/Link";

export const MentionsLegales = () => (
  <Container>
    <h1 id="mentions-legales" className={fr.cx("fr-mt-0")}>
      Mentions légales
    </h1>

    <h2>Éditeur du site</h2>
    <div className={fr.cx("fr-mb-3w")}>
      <p className={fr.cx("fr-mb-0")}>
        Le site est édité par la Direction générale du Travail, au sein du
        Ministère du Travail, de la Santé, des Solidarités et des Familles
        située&nbsp;:
      </p>
      <address>
        14 avenue Duquesne
        <br />
        75007 PARIS
        <br />
        Tél.&nbsp;: 01 40 56 60 00
      </address>
    </div>

    <h2>Directeur de la publication</h2>
    <p>Pierre RAMAIN, Directeur Général du Travail</p>

    <h2>Hébergement</h2>
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
          par toutes et tous à l&apos;adresse suivante&nbsp;:
          <a href="https://github.com/SocialGouv/code-du-travail-numerique">
            https://github.com/SocialGouv/code-du-travail-numerique
          </a>
          .
        </strong>
      </p>
    </div>

    <h2>Accessibilité</h2>
    <p>
      La conformité aux normes d&apos;accessibilité numérique est un objectif
      ultérieur mais nous tâchons de rendre dès la conception, ce site
      accessible à toutes et à tous.
    </p>

    <h3>Signaler un dysfonctionnement</h3>
    <p>
      Si vous rencontrez un défaut d&apos;accessibilité vous empêchant
      d&apos;accéder à un contenu ou une fonctionnalité du site,{" "}
      <a
        title="Merci de nous en faire part en envoyant un mail à codedutravailnumerique@travail.gouv.fr"
        href="mailto:codedutravailnumerique@travail.gouv.fr"
      >
        merci de nous en faire part.
      </a>
    </p>
    <p>
      Si vous n&apos;obtenez pas de réponse rapide de notre part, vous êtes en
      droit de faire parvenir vos doléances ou une demande de saisine au
      Défenseur des droits.
    </p>

    <h3>En savoir plus</h3>
    <p>
      Pour en savoir plus sur la politique d&apos;accessibilité numérique de
      l&apos;État&nbsp;:{" "}
      <Link
        href="https://www.modernisation.gouv.fr/accessibilite"
        target="_blank"
      >
        https://www.modernisation.gouv.fr/accessibilite
      </Link>
    </p>

    <h2>Sécurité</h2>
    <p>
      Le site est protégé par un certificat électronique, matérialisé pour la
      grande majorité des navigateurs par un cadenas. Cette protection participe
      à la confidentialité des échanges.
    </p>
  </Container>
);
