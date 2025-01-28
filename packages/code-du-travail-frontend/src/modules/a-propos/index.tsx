import { Container } from "../layout/Container";
import Link from "../common/Link";
import { fr } from "@codegouvfr/react-dsfr";

export const About = () => {
  return (
    <Container>
      <h1>À propos</h1>
      <p className={fr.cx("fr-mb-4w", "fr-text--lead")}>
        Apprenez-en plus sur notre histoire, notre équipe et nos méthodes
      </p>

      <h2>Qu’est-ce que le Code du travail numérique&nbsp;?</h2>
      <p>
        Le Code du travail numérique est un service public en ligne et gratuit
        vous permettant d’obtenir des réponses personnalisées sur le droit de
        travail.
      </p>
      <p>
        L’ouverture officielle du site a eu lieu le 1<sup>er</sup> janvier 2020.
      </p>
      <h3>Pourquoi le Code du travail numérique&nbsp;?</h3>
      <p>
        Aujourd’hui, seul un public expert maîtrise la complexité du droit du
        travail et de ses différentes sources (code du travail, conventions
        collectives, accords d’entreprises, etc.). La technicité du sujet le
        rend également peu accessible pour les salariés et les employeurs. Or,
        le droit est d’autant plus facilement appliqué et respecté qu’il est
        connu et compris.
      </p>
      <p>
        La décision de créer le Code du travail numérique a donc été prise et
        inscrite dans{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.legifrance.gouv.fr/affichTexteArticle.do;jsessionid=F175675A5AF37BD5745391E7C64C2FAB.tplgfr41s_3?cidTexte=JORFTEXT000035607388&idArticle=LEGIARTI000036762196&dateTexte=20191129&categorieLien=id#LEGIARTI000036762196"
        >
          les ordonnances sur le renforcement du dialogue social de 2017.
        </Link>
      </p>
      <h3>À qui ce service s’adresse-t-il&nbsp;?</h3>
      <p>
        Le Code du travail numérique s’adresse à tous les salariés et employeurs
        de droit privé relevant du code du travail. Les fonctionnaires et les
        indépendants ne sont par exemple pas concernés. Plus d’informations à ce
        sujet dans notre{" "}
        <Link
          href="/droit-du-travail"
          title="Qu'est ce que le droit du travail ?"
        >
          page d’introduction au droit du travail.
        </Link>
      </p>
      <h3>Que peut-on trouver sur le site&nbsp;?</h3>
      <p>
        Le Code du travail numérique rassemble différents contenus sur le droit
        du travail ainsi que des réponses personnalisées selon votre situation.
      </p>
      <p>Plus précisément, vous retrouverez sur le site&nbsp;:</p>
      <ul>
        <li>
          des réponses génériques sur le droit du travail dans un langage
          accessible&nbsp;;
        </li>
        <li>
          des réponses personnalisées selon votre convention collective&nbsp;;
        </li>
        <li>
          des simulateurs permettant d’estimer des durées de préavis, des
          montants d’indemnités…&nbsp;;
        </li>
        <li>des modèles de courrier.</li>
      </ul>
      <h2>Qui sommes-nous&nbsp;?</h2>
      <h3>Notre équipe</h3>
      <p>
        Nous sommes une équipe pluridisciplinaire d’une dizaine de personnes
        composée de développeurs web, designers d’interface et d’expérience,
        juristes, inspecteurs du travail, spécialistes de la donnée… L’ensemble
        des agents du ministère du Travail contribue également au produit en
        rédigeant des contenus et en assurant la validité juridique des
        réponses.
      </p>
      <p>
        Le Code du travail numérique est un service public initié par{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://travail-emploi.gouv.fr/"
        >
          le ministère du Travail
        </Link>
        , conçu et développé au sein de{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.fabrique.social.gouv.fr/"
        >
          la fabrique des Ministères sociaux
        </Link>{" "}
        en partenariat avec la communauté{" "}
        <Link
          title="le site beta.gouv"
          target="_blank"
          rel="noopener noreferrer"
          href="https://beta.gouv.fr/"
        >
          beta.gouv.fr
        </Link>
        .
      </p>
      <h3>Nos méthodes</h3>
      <p>
        Le service est développé en lien étroit avec les utilisateurs
        (employeurs et salariés) et les praticiens du droit du travail (services
        du ministère du Travail en région, conseillers du salarié, maisons
        d’accès au droit, professeurs en droit du travail...).
      </p>
      <p>
        Le site sur lequel vous naviguez est en évolution continue et s’enrichit
        régulièrement de nouveaux contenus et de nouvelles fonctionnalités. Nous
        vous invitons à{" "}
        <Link
          target="_blank"
          title="contactez nous par courriel"
          href="mailto:codedutravailnumerique@travail.gouv.fr"
        >
          nous contacter
        </Link>{" "}
        si vous souhaitez nous faire part d’une proposition
        d’amélioration&nbsp;!
      </p>
    </Container>
  );
};
