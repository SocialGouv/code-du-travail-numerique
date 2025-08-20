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
      <p className={fr.cx("fr-mb-0")}>Ce site est hébergé par OVH SAS&nbsp;:</p>
      <address>
        2 rue Kellermann <br />
        56100 Roubaix <br />
        France
      </address>
      <p>
        <strong>
          Le code du logiciel est libre, et peut donc être vérifié et amélioré
          par toutes et tous à l&apos;adresse suivante&nbsp;:
          <br />
          <a
            href="https://github.com/SocialGouv/code-du-travail-numerique"
            target="_blank"
          >
            https://github.com/SocialGouv/code-du-travail-numerique
          </a>
        </strong>
      </p>
    </div>

    <h2>Traitement des données personnelles</h2>
    <p>
      Les informations relatives au traitement des données à caractère personnel
      figurent dans la Politique de protection des données à caractère personnel
      accessible à partir de la page d’accueil du site.
    </p>
  </Container>
);
