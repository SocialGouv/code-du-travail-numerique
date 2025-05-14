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
          d&apos;information à caractère personnel.
        </p>
        <p>
          Pour autant, nous enregistrons, de manière anonyme, les informations
          saisies dans la barre de recherche. Elles sont conservées pendant deux
          années pour analyser les usages, améliorer la précision des réponses
          apportées et améliorer le service et ainsi réaliser la mission
          d&apos;intérêt public telle que présentée dans la page{" "}
          <Link href="/a-propos">à propos</Link>.
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
          Un cookie est un fichier déposé sur votre terminal lors de la visite
          d&apos;un site. Il a pour but de collecter des informations relatives
          à votre navigation et de vous adresser des services adaptés à votre
          terminal (ordinateur, mobile ou tablette).
        </p>
        <p>
          Nous collectons donc des données par l&apos;intermédiaire de
          dispositifs appelés &quot;cookies&quot; permettant d&apos;établir des
          mesures statistiques.
        </p>

        <h3 className={fr.cx("fr-h5", "fr-mb-2w")}>Cookies utilisés</h3>
        <table className={fr.cx("fr-table", "fr-mb-4w")}>
          <thead>
            <tr>
              <th scope="col">Cookies</th>
              <th scope="col">Pays destinataires</th>
              <th scope="col">Base juridique</th>
              <th scope="col">Finalités</th>
              <th scope="col">Durée</th>
              <th scope="col">Garanties</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Matomo</td>
              <td>France (Auto-hébergèrent)</td>
              <td>Exemption de consentement</td>
              <td>Mesure d&apos;audience</td>
              <td>13 mois</td>
              <td>
                <Link
                  href="https://fr.matomo.org/privacy-policy/"
                  target="_blank"
                >
                  https://fr.matomo.org/privacy-policy/
                </Link>
              </td>
            </tr>
            <tr>
              <td>Google Tag Manager</td>
              <td>Etats-Unis</td>
              <td>Consentement</td>
              <td>
                Gestion de balises, publicité et suivi d&apos;interface
                utilisateur
              </td>
              <td>13 mois</td>
              <td>
                <Link
                  href="https://policies.google.com/privacy?hl=fr"
                  target="_blank"
                >
                  https://policies.google.com/privacy?hl=fr
                </Link>
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className={fr.cx("fr-h5", "fr-mb-2w")}>
          Cookies de mesure d&apos;audience (obligatoires)
        </h3>
        <ul className={fr.cx("fr-mb-4w")}>
          <li>Catégorie de cookie&nbsp;: Mesure d&apos;audience anonymisée</li>
          <li>Nom du cookie&nbsp;: Matomo</li>
          <li>Délai de conservation&nbsp;: 13 mois</li>
          <li>Finalités&nbsp;: Mesure d&apos;audience</li>
          <li>Éditeur&nbsp;: Matomo & Fabrique numérique</li>
          <li>Destination&nbsp;: France</li>
        </ul>

        <p>
          L&apos;accès aux informations contenues dans les cookies est limité
          aux seules personnes autorisées au sein de la Fabrique numérique. En
          outre, l&apos;éditeur peut utiliser certaines données pour des
          finalités qui lui sont propres.
        </p>
        <p>
          À tout moment, vous pouvez refuser l&apos;utilisation des cookies et
          désactiver le dépôt sur votre ordinateur en utilisant la fonction
          dédiée de votre navigateur (fonction disponible notamment sur
          Microsoft Internet Explorer 11, Google Chrome, Mozilla Firefox, Apple
          Safari et Opera).
        </p>
        <p>
          Pour l&apos;outil Matomo, vous pouvez décider de ne jamais être suivi,
          y compris anonymement&nbsp;:
        </p>

        <div className={fr.cx("fr-mb-2w")}>
          <TrackApproval />
        </div>

        <p>
          Pour aller plus loin, vous pouvez consulter les fiches proposées par
          la Commission Nationale de l&apos;Informatique et des Libertés
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
