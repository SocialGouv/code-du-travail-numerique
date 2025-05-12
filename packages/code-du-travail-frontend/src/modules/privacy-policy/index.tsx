import { fr } from "@codegouvfr/react-dsfr";
import { TrackApproval } from "./TrackApproval";
import Link from "../common/Link";

export const PrivacyPolicy = () => {
  return (
    <div className={fr.cx("fr-grid-row", "fr-grid-row--center")}>
      <div
        className={fr.cx(
          "fr-my-4w",
          "fr-col-12",
          "fr-my-md-12w",
          "fr-col-md-6"
        )}
      >
        <h1 id="politique-confidentialite" className={fr.cx("fr-mt-0")}>
          Politique de confidentialité
        </h1>

        <h2 className={fr.cx("fr-h3")}>
          Traitement des données à caractère personnel
        </h2>
        <p>
          Le Code du travail numérique ne vous demande ni ne stocke
          d’information nominative.
        </p>
        <p>
          Pour autant, nous enregistrons les informations saisies dans la barre
          de recherche. Elles sont conservées pendant deux années pour analyser
          les usages, améliorer la précision des réponses apportées et améliorer
          le service et ainsi réaliser la mission d’intérêt public telle que
          présentée dans la page <Link href="/a-propos">à propos</Link>.
        </p>
        <p>
          Nous nous engageons à ne jamais céder ces informations à des tiers.
        </p>
        <p>
          Vous avez un droit d’accès, de rectification et de suppression de vos
          données. Pour l’exercer, faites-nous parvenir une demande en précisant
          la date et l’heure précise de la requête et tout élément permettant
          d’attester que vous êtes bien l’auteur du message - ces éléments sont
          indispensables pour nous permettre de retrouver votre recherche - par
          voie électronique à l’adresse suivante&nbsp;:{" "}
          <Link
            title="Envoyer un mail à codedutravailnumerique@travail.gouv.fr"
            href="mailto:codedutravailnumerique@travail.gouv.fr"
          >
            codedutravailnumerique@travail.gouv.fr
          </Link>
          .
        </p>
        <p>ou par voie postale&nbsp;:</p>
        <address className={fr.cx("fr-mb-6v")}>
          Direction des systèmes d’information
          <br />
          Ministère des affaires sociales et de la santé
          <br />
          14 avenue Duquesne
          <br />
          75007 PARIS
        </address>
        <p>
          Vous êtes également en droit de saisir la Commission Nationale de
          l’Informatique et des Libertés pour toute réclamation à{" "}
          <Link
            title="Utiliser l’adresse suivante pour adresser une réclamation (plainte) à la CNIL"
            target="_blank"
            href="https://www.cnil.fr/fr/cnil-direct/question/844"
          >
            l’adresse suivante
          </Link>
          .
        </p>
        <h2 className={fr.cx("fr-h3")}>Hébergement</h2>
        <ul className={fr.cx("fr-mb-6v")}>
          <li>Partenaire&nbsp;: OVH</li>
          <li>Pays destinataire&nbsp;: France</li>
          <li>Traitement réalisé&nbsp;: Hébergement</li>
          <li>
            Garantie&nbsp;:{" "}
            <Link
              href="https://us.ovhcloud.com/legal/data-processing-agreement"
              target="_blank"
            >
              https://us.ovhcloud.com/legal/data-processing-agreement
            </Link>
          </li>
        </ul>
        <h2 className={fr.cx("fr-h3")}>Cookies</h2>
        <p>
          Un cookie est un petit fichier déposé sur votre appareil (ordinateur,
          smartphone ou tablette) lorsque vous visitez un site web. Il permet de
          collecter des informations sur votre navigation et de vous proposer
          des services adaptés à votre utilisation.
        </p>
        <p>
          Nous collectons donc des données par l&apos;intermédiaire de
          dispositifs appelés &quot;cookies&quot; permettant d&apos;établir des
          mesures statistiques et de suivre l&apos;efficacité de nos campagnes
          publicitaires.
        </p>
        <h3 className={fr.cx("fr-h5", "fr-mb-2w")}>
          Cookies de mesure d&apos;audience (obligatoires)
        </h3>
        <ul className={fr.cx("fr-mb-4w")}>
          <li>Catégorie de cookie&nbsp;: Mesure d&apos;audience anonymisée</li>
          <li>Nom du cookie&nbsp;: Matomo</li>
          <li>Délai de conservation&nbsp;: 13 mois</li>
          <li>Finalités&nbsp;: Mesure d’audience</li>
          <li>Éditeur&nbsp;: Matomo & Fabrique numérique</li>
          <li>Destination&nbsp;: France</li>
        </ul>
        <h3 className={fr.cx("fr-h5", "fr-mb-2w")}>
          Cookies de suivi des campagnes publicitaires (SEA)
        </h3>
        <ul className={fr.cx("fr-mb-6v")}>
          <li>Catégorie de cookie&nbsp;: Suivi des campagnes publicitaires</li>
          <li>Nom du cookie&nbsp;: Google Tag Manager</li>
          <li>Délai de conservation&nbsp;: 13 mois</li>
          <li>
            Finalités&nbsp;: Suivi des campagnes publicitaires sur les moteurs
            de recherche
          </li>
          <li>Éditeur&nbsp;: Google</li>
          <li>Destination&nbsp;: États-Unis (avec garanties appropriées)</li>
        </ul>
        <p>
          L’accès aux informations contenues dans les cookies est limité aux
          seules personnes autorisées au sein de la Fabrique numérique. En
          outre, l’éditeur peut utiliser certaines données pour des finalités
          qui lui sont propres.
        </p>
        <p>
          À tout moment, vous pouvez refuser l&apos;utilisation des cookies de
          suivi des campagnes publicitaires et désactiver leur dépôt sur votre
          ordinateur en utilisant la fonction dédiée de votre navigateur
          (fonction disponible notamment sur Microsoft Internet Explorer 11,
          Google Chrome, Mozilla Firefox, Apple Safari et Opera).
        </p>
        <p>
          Pour l’outil Matomo, vous pouvez décider de ne jamais être suivi, y
          compris anonymement&nbsp;:
        </p>
        <div className={fr.cx("fr-mb-2w")}>
          <TrackApproval />
        </div>
        <p>
          Pour aller plus loin, vous pouvez consulter les fiches proposées par
          la Commission Nationale de l’Informatique et des Libertés
          (CNIL)&nbsp;:
        </p>
        <ul className={fr.cx("fr-mb-6v")}>
          <li>
            <Link
              target="_blank"
              href="https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi"
            >
              Cookies et traceurs : que dit la loi ?
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser"
            >
              Cookies : les outils pour les maîtriser
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
