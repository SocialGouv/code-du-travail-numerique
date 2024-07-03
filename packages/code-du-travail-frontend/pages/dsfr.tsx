import Link from "next/link";
import { useRouter } from "next/router";
import { withDsfrWrapper } from "../src/dsfr/AppDsfr";

function Hello() {
  const router = useRouter();
  return (
    <>
      <section>
        <h1>Bienvenue sur la page statique</h1>
        <Link href="/">Accueil with link</Link>
        <button onClick={() => router.push("/")}>Accueil with router</button>
        <br />
        <a href="/">Accueil without router</a>
      </section>
      <section>
        <div className="fr-container">
          <div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-pb-8w">
            <div className="fr-col-12 fr-col-md-6 fr-pt-4w">
              <h1>
                Vous rencontrez une situation difficile&nbsp;?
                <span className="fr-text--lead d-block fr-mt-3w">
                  Avec Mon soutien psy, bénéficiez de 8 séances par an chez un
                  ou une psychologue
                </span>
              </h1>
              <p className="fr-text--xl fr-text--bold fr-mt-5w">
                Les séances sont remboursées&nbsp;:
              </p>
              <ul className="no-bullet list-brown-cafe-creme-main-arrow">
                <li className="fr-li--icon-left fr-fi-arrow-right-line">
                  &nbsp;par l’Assurance Maladie
                </li>
                <li className="fr-li--icon-left fr-fi-arrow-right-line">
                  &nbsp;et votre mutuelle ou complémentaire santé
                </li>
              </ul>
            </div>
            <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-4"></div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container--fluid fr-bg--light fr-py-10w">
          <div className="fr-container">
            <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
              <div className="fr-col-12 fr-col-md-6">
                <h2>Pourquoi consulter&nbsp;?</h2>
                <ul>
                  <li>
                    Vous avez du <strong>mal à dormir</strong>&nbsp;?
                  </li>
                  <li>
                    Vous vous sentez <strong>dépassé</strong>&nbsp;?
                  </li>
                  <li>
                    Vous êtes dans une <strong>relation toxique</strong>&nbsp;?
                  </li>
                  <li>
                    Vous avez des <strong>difficultés</strong> à échanger avec
                    votre entourage&nbsp;?
                  </li>
                  <li>
                    Vous avez besoin d’une personne à qui parler,{" "}
                    <strong>sans jugement</strong>.
                  </li>
                </ul>
                <p>
                  Quelle que soit votre situation,{" "}
                  <Link href="/annuaire">
                    trouvez des psychologues à votre écoute
                  </Link>
                  .
                </p>
              </div>
              <div className="fr-col-12 fr-col-md-6">
                <h2 className="fr-h5">Mon soutien psy c’est&nbsp;:</h2>
                <ul className="no-bullet list-blue-france-arrow">
                  <li className="fr-li--icon-left fr-fi-arrow-right-line">
                    &nbsp;Un annuaire de{" "}
                    <strong>psychologues partenaires expérimentés</strong>{" "}
                    sélectionnés sur leur expérience professionnelle.
                  </li>
                  <li className="fr-li--icon-left fr-fi-arrow-right-line">
                    &nbsp;Un parcours de soins{" "}
                    <strong>pris en charge par l’Assurance Maladie</strong>.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="fr-container fr-callout fr-callout--pink-tuile fr-my-6w">
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
            <div className="fr-col-12 fr-col-md-5">
              <p>
                Le dispositif ne concerne pas les <strong>urgences</strong> et
                les personnes présentant un <strong>risque suicidaire</strong>.
              </p>
            </div>
            <div className="fr-col-12 fr-col-md-2 align-center">
              <span
                className="fr-fi-arrow-right-line fr-fi--lg"
                aria-hidden="true"
              />
            </div>

            <div className="fr-col-12 fr-col-md-5">
              <p>
                Si je suis en détresse et/ou j’ai des pensées suicidaires, je
                contacte sans attendre le{" "}
                <strong>
                  <a href="tel:3114">3114</a>
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container--fluid fr-bg--tilleul fr-py-10w">
          <div className="fr-container">
            <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
              <div className="fr-col-12 fr-col-offset-md-2 fr-col-md-8">
                <h2>Comment ça marche&nbsp;?</h2>
              </div>
              <div className="fr-col-12 fr-col-offset-md-2 fr-col-md-8">
                <div className="fr-card fr-card--no-arrow fr-bg--tilleul-light">
                  <div className="fr-card__body">
                    <div className="fr-card__content">
                      <h3 className="fr-card__title fr-text--dark-blue">
                        1. Rencontrez un médecin
                      </h3>
                      <p className="fr-card__desc fr-text--md">
                        Le médecin échange avec vous pour s’assurer que Mon
                        soutien psy est adapté à votre situation. Vous pouvez
                        consulter différents types de médecins (généraliste,
                        gynécologue, médecin scolaire, protection maternelle et
                        infantile, etc.)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fr-col-12 fr-col-offset-md-2 fr-col-md-8">
                <div className="fr-card fr-card--no-arrow fr-bg--tilleul-light">
                  <div className="fr-card__body">
                    <div className="fr-card__content">
                      <h3 className="fr-card__title fr-text--dark-blue">
                        2. Prenez rendez-vous avec un psychologue partenaire
                      </h3>
                      <p className="fr-card__desc fr-text--md">
                        Commencez vos 8 séances par an en présentiel ou à
                        distance. La première séance doit obligatoirement être
                        en présentiel.
                      </p>
                      <div className="align-center">
                        <button
                          className="fr-btn"
                          onClick={() => router.push("/annuaire")}
                        >
                          Annuaire Mon soutien psy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fr-col-12 fr-col-offset-md-2 fr-col-md-4">
                <div className="fr-card fr-card--no-arrow fr-bg--tilleul-light">
                  <div className="fr-card__body">
                    <div className="fr-card__content">
                      <h3 className="fr-card__title fr-text--dark-blue">
                        3. Faites vous rembourser
                      </h3>
                      <p className="fr-card__desc fr-text--md">
                        L’Assurance Maladie et votre mutuelle vous remboursent.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fr-col-12 fr-col-md-4">
                <div className="fr-card fr-card--no-arrow fr-bg--tilleul-light">
                  <div className="fr-card__body">
                    <div className="fr-card__content">
                      <h3 className="fr-card__title fr-text--dark-blue">
                        3. Ou n’avancez aucun frais
                      </h3>
                      <p className="fr-card__desc fr-text--md">
                        Si vous êtes éligible au tiers payant obligatoire. (Voir
                        conditions <Link href="#combien-ca-coute"></Link>)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container--fluid fr-py-10w">
          <div className="fr-container">
            <div className="fr-grid-row fr-grid-row--gutters">
              <div className="fr-col-12">
                <h2 id="combien-ca-coute">Combien ça coûte&nbsp;?</h2>
              </div>
              <div className="fr-col-12 fr-col-md-6 fr-p-4w">
                <h3 className="fr-text--dark-blue">
                  Tarifs des séances des psychologues partenaires
                </h3>
                <ul className="no-bullet list-blue-france-arrow">
                  <li className="fr-li--icon-left fr-fi-arrow-right-line">
                    &nbsp;<strong>Première séance (évaluation)</strong>&nbsp;:
                    40 €
                  </li>
                  <li className="fr-li--icon-left fr-fi-arrow-right-line">
                    &nbsp;<strong>Les séances de suivi</strong>&nbsp;: 30 €
                  </li>
                </ul>
                <h3 className="fr-text--dark-blue">Prise en charge</h3>
                <ul className="no-bullet list-blue-france-arrow">
                  <li className="fr-li--icon-left fr-fi-arrow-right-line">
                    &nbsp;60 % par l’Assurance Maladie
                  </li>
                  <li className="fr-li--icon-left fr-fi-arrow-right-line">
                    &nbsp;40 % par la complémentaire santé ou la mutuelle
                  </li>
                </ul>
                <h4 className="fr-text--dark-blue fr-h6 fr-mb-1w fr-mt-3w">
                  Comment s’effectuent les remboursements&nbsp;?
                </h4>
                <p className="fr-text--dark-blue">
                  Envoyez votre feuille de soins et le courrier d’adressage de
                  votre médecin à votre organisme d’Assurance Maladie (après
                  chaque séance ou à la fin de plusieurs séances).
                </p>
              </div>
              <div className="fr-col-12 fr-col-md-6 fr-bg--tilleul-light fr-p-4w">
                <h3 className="fr-text--dark-blue">
                  Qui peut bénéficier du Tiers payant obligatoire&nbsp;?
                </h3>
                <h4 className="fr-h6">
                  Les personnes qui ont une souffrance en lien avec&nbsp;:
                </h4>
                <ul className="no-bullet list-green-bourgeonn-arrow">
                  <li className="fr-li--icon-left fr-fi-check-line">
                    &nbsp;Une Affection Longue Durée (ALD)
                  </li>
                  <li className="fr-li--icon-left fr-fi-check-line">
                    &nbsp;Une grossesse (à partir du 6ème mois)
                  </li>
                  <li className="fr-li--icon-left fr-fi-check-line">
                    &nbsp;Un accident du travail ou une maladie professionnelle
                    (AT-MP)
                  </li>
                </ul>
                <h4 className="fr-h6">Mais aussi…</h4>
                <ul className="no-bullet list-green-bourgeonn-arrow">
                  <li className="fr-li--icon-left fr-fi-check-line">
                    &nbsp;Les bénéficiaires de la Complémentaire Santé Solidaire
                    (CSS)
                  </li>
                  <li className="fr-li--icon-left fr-fi-check-line">
                    &nbsp;Les bénéficiaires de l’Aide Médicale de l’État (AME)
                  </li>
                </ul>
                <p className="fr-text--dark-blue">
                  Êtes-vous éligible à une aide&nbsp;?{" "}
                  <Link href="https://www.ameli.fr/assure/droits-demarches/difficultes-acces-droits-soins/complementaire-sante/simulateur-de-droits">
                    Simulateur Prestations sociales
                  </Link>{" "}
                  et{" "}
                  <Link href="https://www.mesdroitssociaux.gouv.fr/accueil/">
                    Droits sociaux
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container--fluid fr-py-5w fr-bg--light">
          <div className="fr-container">
            <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--align-center">
              <div className="fr-col-12 fr-col-md-4 align-center">
                <div className="fr-h2 fr-mb-2w"></div>
                <p className="fr-mb-1w fr-text--dark-blue fr-h4">
                  Pour tout le monde
                </p>
                <p className="fr-mb-1w">À partir de 3 ans </p>
              </div>
              <div className="fr-col-12 fr-col-md-4 align-center">
                <div className="fr-h2 fr-mb-2w"></div>
                <p className="fr-mb-1w fr-text--dark-blue fr-h4">Remboursé</p>
                <p className="fr-mb-1w">Pris en charge ou sans frais </p>
              </div>
              <div className="fr-col-12 fr-col-md-4 align-center">
                <div className="fr-h2 fr-mb-2w"></div>
                <p className="fr-mb-1w fr-text--dark-blue fr-h4">
                  En présentiel et en distanciel
                </p>
                <p className="fr-mb-1w">En fonction des psychologues</p>
                <p className="fr-text--sm">
                  Première séance obligatoirement en présentiel
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="fr-container fr-py-10w">
          <div className="fr-grid-row fr-grid-row--center fr-index-box">
            <div className="fr-col-12 fr-col-md-8 fr-pt-4w">
              <h2>Mon soutien psy pour les moins de 18 ans</h2>
              <ul className="no-bullet list-brown-cafe-creme-main-arrow">
                <li className="fr-li--icon-left fr-fi-check-line">
                  &nbsp;À partir de <strong>3 ans</strong>.
                </li>
                <li className="fr-li--icon-left fr-fi-check-line">
                  &nbsp;<strong>Accord parental</strong> obligatoire.
                </li>
                <li className="fr-li--icon-left fr-fi-check-line">
                  &nbsp;Des psychologues qui reçoivent aussi les enfants et les
                  adolescents.
                </li>
              </ul>
              <button
                className="fr-btn fr-mt-2w"
                onClick={() => router.push("/annuaire")}
              >
                Annuaire Mon soutien psy
              </button>
            </div>
            <div className="fr-col-12 fr-col-md-4 align-center"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default withDsfrWrapper(Hello);
