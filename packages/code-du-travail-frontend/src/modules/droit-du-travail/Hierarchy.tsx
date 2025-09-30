"use client";

import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import ExpandableCard from "./ExpandableCard";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { css } from "@styled-system/css";

const modal13Matieres = createModal({
  id: "modal-13-matieres",
  isOpenedByDefault: false,
});

const modal4Matieres = createModal({
  id: "modal-4-matieres",
  isOpenedByDefault: false,
});

const Hierarchy = () => {
  const ref13Matieres = React.useRef<HTMLButtonElement | null>(null);
  const ref4Matieres = React.useRef<HTMLButtonElement | null>(null);
  useIsModalOpen(modal13Matieres, {
    onConceal: () => {
      ref13Matieres?.current?.focus();
    },
  });
  useIsModalOpen(modal4Matieres, {
    onConceal: () => {
      ref4Matieres?.current?.focus();
    },
  });

  return (
    <div className={fr.cx("fr-grid-row", "fr-grid-row--center")}>
      <div
        className={fr.cx(
          "fr-col-12",
          "fr-col-md-10",
          "fr-col-lg-8",
          "fr-mb-8w"
        )}
      >
        <h2>Existe-t-il une hiérarchie entre les textes ?</h2>
        <p className={fr.cx("fr-text--lg", "fr-mb-3w")}>
          Le principe général en droit du travail est le suivant&nbsp;:
          lorsqu&apos;il existe plusieurs textes sur un même sujet, c&apos;est
          le texte le plus favorable au salarié qui s&apos;applique. Ce principe
          continue a s&apos;appliquer en droit du travail mais il connaît
          quelques exceptions.
        </p>
        <p className={fr.cx("fr-text--lg", "fr-text--bold")}>
          Pour vous aider à comprendre, vous trouverez ci-dessous un schèma
          récapitulant la hiérarchie des textes entre eux.
        </p>

        <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
          <div className={fr.cx("fr-col-12")}>
            <ExpandableCard
              title="Les textes internationaux et européens"
              iconSrc="/static/assets/icons/droit-du-travail/texte-internationaux.svg"
              showBottomTab={true}
            >
              <p>
                Les textes nationaux doivent être conformes aux textes
                internationaux et européens.
              </p>
            </ExpandableCard>
          </div>

          <div className={fr.cx("fr-col-12")}>
            <ExpandableCard
              title="La Constitution"
              iconSrc="/static/assets/icons/droit-du-travail/constitution-francaise.svg"
              showBottomTab={true}
            >
              <p>
                Tous les textes nationaux doivent être conformes à la
                Constitution française ainsi qu&apos;au bloc de
                constitutionnalité.
              </p>
            </ExpandableCard>
          </div>

          <div className={fr.cx("fr-col-12")}>
            <ExpandableCard
              title="Lois, ordonnances et décrets (Code du travail)"
              iconSrc="/static/assets/icons/droit-du-travail/lois.svg"
              showBottomTab={true}
            >
              <h4 className={fr.cx("fr-text--lg", "fr-mb-2w")}>
                Hiérarchie entre le Code du travail et les conventions et
                accords collectifs
              </h4>
              <p>
                Il n&apos;y a pas de règle de hiérarchie unique pour tous les
                articles du Code du travail. Il existe 3 hiérarchies
                possibles&nbsp;:
              </p>

              <ul>
                <li>
                  <p>
                    <strong>
                      Les conventions et accords collectifs doivent respecter le
                      Code du travail
                    </strong>
                  </p>
                  <p>
                    Il existe des règles dans le Code du travail que les
                    conventions et accords collectifs doivent respecter. Les
                    conventions et accords collectifs peuvent toutefois prévoir
                    des mesures plus avantageuses pour le salarié. Dans ce cas,
                    c&apos;est le texte le plus avantageux pour le salarié qui
                    s&apos;applique.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>
                      Les conventions et accords collectifs peuvent prévoir des
                      mesures différentes que celles posées par le Code du
                      travail
                    </strong>
                  </p>
                  <p>
                    Il existe d&apos;autres règles dans le Code du travail qui
                    permettent aux conventions et accords collectifs, sous
                    certaines conditions, de prévoir des règles différentes de
                    celles de la loi. Dans ce cas, c&apos;est l&apos;accord
                    collectif ou la convention collective qui s&apos;applique
                    même s&apos;il est plus défavorable pour le salarié que la
                    loi.
                  </p>
                  <p>
                    <strong>
                      Exemple : le taux de majoration des heures
                      supplémentaires. Un accord collectif peut prévoir dans une
                      certaine limite un taux inférieur à 25% (règle prévue par
                      le Code du travail).
                    </strong>
                  </p>
                </li>
                <li>
                  <p>
                    <strong>
                      En l&apos;absence de convention ou d&apos;accord collectif
                      sur le sujet, le Code du travail s&apos;applique
                    </strong>
                  </p>
                  <p>
                    Il existe également des règles dans le Code du travail qui
                    s&apos;appliquent par défaut, c&apos;est-à-dire uniquement
                    lorsqu&apos;il n&apos;y a pas de convention ou d&apos;accord
                    collectif sur le sujet. S&apos;il existe une convention ou
                    un accord collectif sur le sujet alors la loi ne
                    s&apos;applique pas.
                  </p>
                  <p>
                    <strong>
                      Exemple : le taux de majoration des heures
                      supplémentaires. En l&apos;absence d&apos;accord collectif
                      sur le taux de majoration des heures supplémentaires
                      s&apos;applique le code du travail (25% de majoration pour
                      les 8 premières heures et 50% pour les suivantes).
                    </strong>
                  </p>
                </li>
              </ul>
              <p>
                Il existe des règles dans le Code du travail que les conventions
                et accords collectifs doivent respecter. Les conventions et
                accords collectifs peuvent toutefois prévoir des mesures plus
                avantageuses pour le salarié. Dans ce cas, c&apos;est le texte
                le plus avantageux pour le salarié qui s&apos;applique.
              </p>

              <div className={fr.cx("fr-alert", "fr-alert--info", "fr-my-3w")}>
                <h4 className={fr.cx("fr-alert__title")}>
                  Attention à certaines règles du Code du travail
                </h4>
                <p>
                  Il existe des règles du Code du travail auxquelles tous les
                  textes situés en bas ne peuvent pas déroger même si les textes
                  sont plus avantageux pour le salarié. La loi interdit toute
                  dérogation possible. Les textes situés en bas doivent purement
                  et simplement respecter ces règles.
                </p>
                <p>
                  <strong>
                    Exemple&nbsp;: la règle selon laquelle le Conseil des
                    prud&apos;hommes est le seul compétent pour les contentieux
                    liés au travail.
                  </strong>
                </p>
              </div>
            </ExpandableCard>
          </div>

          <div className={fr.cx("fr-col-12")}>
            <ExpandableCard
              title="Les conventions et accords collectifs"
              iconSrc="/static/assets/icons/droit-du-travail/conventions-collectives.svg"
              id="hierarchie"
              showBottomTab={true}
            >
              <p>
                La règle qui détermine quel est le texte applicable est
                différente en fonction du niveau des textes comparés.
              </p>
              <h4 className={fr.cx("fr-text--lg", "fr-mb-2w")}>
                Hiérarchie entre convention collective de branche et accord
                d&apos;entreprise
              </h4>
              <p>
                Le principe est que l&apos;accord d&apos;entreprise
                s&apos;applique en priorité par rapport à l&apos;accord ou la
                convention collective de branche. Cela signifie que même si
                l&apos;accord d&apos;entreprise prévoit des règles différentes,
                voire plus désavantageuses, que la convention collective de
                branche, ce sera lui qui s&apos;appliqura au salarié et non la
                convention collective de branche.
              </p>

              <div className={fr.cx("fr-alert", "fr-alert--info", "fr-my-3w")}>
                <p>
                  Ce principe ne s&apos;applique pas dans{" "}
                  <button
                    className={`${fr.cx("fr-link")} ${buttonStyle}`}
                    onClick={(e) => {
                      e.preventDefault();
                      modal13Matieres.open();
                    }}
                    ref={ref13Matieres}
                  >
                    13 matières où la loi reconnaît la primauté à la convention
                    collective de branche
                  </button>{" "}
                  et{" "}
                  <button
                    className={`${fr.cx("fr-link")} ${buttonStyle}`}
                    onClick={(e) => {
                      e.preventDefault();
                      modal4Matieres.open();
                    }}
                    ref={ref4Matieres}
                  >
                    4 matières où la branche elle-même peut reconnaître sa
                    primauté
                  </button>{" "}
                  , sauf si l&apos;accord d&apos;entreprise a des garanties au
                  moins équivalentes.
                </p>
              </div>

              <p>
                Ces règles sont les mêmes pour la hiérarchie entre convention
                collective de branche et accord de groupe ou accord
                d&apos;établissement.
              </p>

              <h4 className={fr.cx("fr-text--lg", "fr-mb-2w")}>
                Hiérarchie entre accord de groupe et accord d&apos;entreprise
              </h4>
              <p>
                L&apos;accord de groupe s&apos;applique en priorité par rapport
                à l&apos;accord d&apos;entreprise ou l&apos;accord
                d&apos;établissement si l&apos;accord de groupe l&apos;indique
                dans son accord. Si rien n&apos;est indiqué dans l&apos;accord
                de groupe alors l&apos;accord le plus avantageux pour le salarié
                s&apos;applique.
              </p>

              <h4 className={fr.cx("fr-text--lg", "fr-mb-2w")}>
                Hiérarchie entre accord d&apos;entreprise et accord
                d&apos;établissement
              </h4>
              <p>
                L&apos;accord d&apos;entreprise s&apos;applique en priorité par
                rapport à l&apos;accord d&apos;établissement si l&apos;accord
                d&apos;entreprise l&apos;indique dans son accord. Si rien
                n&apos;est indiqué dans l&apos;accord d&apos;entreprise alors
                l&apos;accord le plus avantageux pour le salarié
                s&apos;applique.
              </p>
            </ExpandableCard>
          </div>

          <div className={fr.cx("fr-col-12")}>
            <ExpandableCard
              title="Les usages et les engagements unilatéraux"
              iconSrc="/static/assets/icons/droit-du-travail/usage-unilateraux.svg"
              showBottomTab={true}
            >
              <p>
                Les usages et les engagements unilatéraux doivent respecter les
                textes situés en haut. Ils peuvent être plus avantageux pour le
                salarié. Dans ce cas, ce sont les textes les plus avantageux qui
                s&apos;appliquent.
              </p>
            </ExpandableCard>
          </div>

          <div className={fr.cx("fr-col-12")}>
            <ExpandableCard
              title="Le règlement intérieur de l'entreprise"
              iconSrc="/static/assets/icons/droit-du-travail/reglement-interieur-entreprise.svg"
              showBottomTab={true}
            >
              <p>
                Le règlement intérieur doit respecter les textes situés en haut.
                Il peut être plus avantageux pour le salarié. Dans ce cas,
                c&apos;est le texte le plus avantageux pour le salarié qui
                s&apos;applique.
              </p>
            </ExpandableCard>
          </div>

          <div className={fr.cx("fr-col-12")}>
            <ExpandableCard
              title="Le contrat de travail"
              iconSrc="/static/assets/icons/droit-du-travail/contrat-travail.svg"
            >
              <p>
                Le contrat de travail doit respecter les textes situés en haut.
                Il peut prévoir des mesures plus avantageuses pour le salarié.
                Dans ce cas, c&apos;est le contrat de travail qui
                s&apos;applique.
              </p>
            </ExpandableCard>
          </div>
        </div>
      </div>

      <modal13Matieres.Component
        title="13 matières où la loi reconnaît la primauté à la convention collective de branche"
        size="large"
      >
        <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
          <div className={fr.cx("fr-col-12")}>
            <ul>
              <li>
                Salaires <strong>minima</strong>
              </li>
              <li>Classifications</li>
              <li>Mutualisation des fonds de financement du paritarisme</li>
              <li>Mutualisation des fonds de la formation professionnelle</li>
              <li>Protection sociale complémentaire</li>
              <li>Durée du travail (certaines mesures seulement)</li>
              <li>
                CDD et contrats de travail temporaire (durée totale,
                renouvellement, délai de carence et délai de transmission des
                contrats)
              </li>
              <li>CDI de chantier</li>
              <li>Egalité professionnelle</li>
              <li>
                Conditions et durées de renouvellement de la période
                d&apos;essai
              </li>
              <li>
                Transfert des contrats de travail en cas de changement de
                prestataire
              </li>
              <li>
                2 cas de mise à disposition d&apos;un salarié temporaire auprès
                d&apos;une entreprise utilisatrice
              </li>
              <li>
                Rémunération minimale du salarié porté et montant de
                l&apos;indemnité d&apos;apport d&apos;affaire
              </li>
            </ul>
          </div>
        </div>
      </modal13Matieres.Component>

      <modal4Matieres.Component
        title="4 matières où la branche peut reconnaître sa primauté"
        size="large"
      >
        <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
          <div className={fr.cx("fr-col-12")}>
            <ul>
              <li>
                La prévention des effets de l&apos;exposition aux facteurs de
                risques professionnels
              </li>
              <li>
                L&apos;insertion professionnelle et le maintien dans
                l&apos;emploi des travailleurs handicapés
              </li>
              <li>
                Seuil de désignation, nombre et valorisation des parcours
                syndicaux des délégués syndicaux
              </li>
              <li>Les primes pour travaux dangereux ou insalubres</li>
            </ul>
          </div>
        </div>
      </modal4Matieres.Component>
    </div>
  );
};

const buttonStyle = css({
  textDecoration: "underline !important",
});

export default Hierarchy;
