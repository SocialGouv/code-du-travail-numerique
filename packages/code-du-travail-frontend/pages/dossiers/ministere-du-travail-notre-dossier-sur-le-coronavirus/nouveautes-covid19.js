import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import {
  Accordion,
  Button,
  icons,
  MoreContent,
  theme,
  Wrapper,
} from "@socialgouv/react-ui";
import Answer from "../../../src/common/Answer";
import { Layout } from "../../../src/layout/Layout";
import Metas from "../../../src/common/Metas";
import ReferencesJuridiques from "../../../src/common/ReferencesJuridiques";
import TYPE_REFERENCE from "../../../src/common/ReferencesJuridiques/typeReference";

const Fiche = ({ pageUrl, ogImage }) => {
  const { asPath } = useRouter();
  const anchor = asPath.split("#")[1];

  const titledSections = [
    {
      anchor: "conges",
      content: (
        <>
          <Figure>
            <img
              src="/static/assets/img/infographies/conges-payes.jpg"
              alt="Infographie schématisant les changements concernant les congés payés. Une version textuelle est disponible en dessous."
            />
            <DownloadWrapper>
              <Button
                as="a"
                className="no-after"
                href="/static/assets/pdf/infographies/conges-payes.pdf"
                narrow
                variant="navLink"
                download
              >
                Télécharger l‘infographie (pdf - 2.3MB)
                <Download />
              </Button>
            </DownloadWrapper>
            <Figcaption>
              <MoreContent noLeftPadding title="Voir en détail">
                <Wrapper variant="dark">
                  <p>
                    Le régime applicable aux congés payés continue de
                    s’appliquer normalement. Toutefois, l’ordonnance du{" "}
                    <a
                      href="https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041755940"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      25 mars 2020
                    </a>{" "}
                    permet à l’employeur d’imposer aux salariés la prise de 6
                    jours de congés :
                  </p>
                  <Ul>
                    <Li>
                      Pour faire face aux conséquences économiques, financières
                      et sociales de la propagation du covid-19.
                    </Li>
                    <Li>
                      Et si l’entreprise conclut un accord collectif dans les
                      conditions prévues par{" "}
                      <a
                        href="https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041755940"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        l’ordonnance du 25 mars 2020
                      </a>
                      . En l’absence d’accord d’entreprise, l’accord de branche
                      sur ce thème, s’il existe, s’applique.
                    </Li>
                  </Ul>
                  <p>
                    En effet, depuis le 26 mars 2020, l’entreprise peut négocier
                    un accord collectif qui prévoit :
                  </p>
                  <Ol>
                    <Li>
                      <strong>
                        Le nombre de jours de congés payés concernés :
                      </strong>{" "}
                      il peut s’agir de 6 jours de congés payés acquis maximum.
                    </Li>
                    <Li>
                      <strong>Les congés payés concernés :</strong> l’employeur
                      peut imposer des jours de congés et/ ou modifier les jours
                      de congés déjà posés.
                    </Li>
                    <Li>
                      <strong>
                        La possibilité de fractionner les congés sans l’accord
                        du salarié.
                      </strong>
                    </Li>
                    <Li>
                      <strong>La période de prise des congés payés :</strong>{" "}
                      l’employeur peut choisir des dates avant l’ouverture de la
                      période au cours de laquelle les congés payés sont
                      normalement pris, et jusqu’au 31 décembre 2020 maximum.
                    </Li>
                    <Li>
                      <strong>Le délai de prévenance de l’employeur :</strong>{" "}
                      ce délai ne peut pas être inférieur à un jour franc.
                    </Li>
                    <Li>
                      <strong>
                        Le cas des salariés en couple dans l’entreprise :
                      </strong>{" "}
                      l’employeur n’a pas l’obligation d’accorder un congé
                      simultané au conjoint ou partenaire lié par un PACS du
                      salarié travaillant dans la même entreprise. Si l’accord
                      ne prévoit rien,{" "}
                      <Link href="/code-du-travail/l3141-14?q=L3141-14%20du%20code%20du%20travail">
                        <a>l’article L3141-14 du code du travail</a>
                      </Link>{" "}
                      s’applique, c’est-à-dire que les conjoints et les
                      partenaires liés par un PACS travaillant dans une même
                      entreprise ont droit à un congé simultané.
                    </Li>
                  </Ol>
                  <p>
                    Si un tel accord collectif est conclu, il prime sur les
                    autres dispositions concernant les congés payés (accord
                    collectif, etc.) qui lui seraient contraires.
                  </p>
                  <p>
                    <Strong>Important :</Strong> si aucun accord collectif n’est
                    conclu (que ce soit au niveau de l’entreprise ou de la
                    branche), l’employeur ne peut pas appliquer{" "}
                    <a
                      href="https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041755940"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      l’ordonnance du 25 mars 2020
                    </a>
                    . Il ne peut pas imposer la prise de 6 jours de congés payés
                    dans ces conditions.
                  </p>
                </Wrapper>
              </MoreContent>
            </Figcaption>
          </Figure>
          <ReferencesJuridiques
            accordionDisplay={1}
            references={[
              {
                id: "conges-1",
                title:
                  "Ordonnance n° 2020-323 du 25 mars 2020 portant mesures d’urgence en matière de congés payés, de durée du travail et de jours de repos, article 1",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041755940",
              },
              {
                id: "conges-2",
                title:
                  "Rapport au Président de la République relatif à l’ordonnance n° 2020-323 du 25 mars 2020 portant mesures d’urgence en matière de congés payés, de durée du travail et de jours de repos",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041755934 ",
              },
            ]}
          />
        </>
      ),
      title: "Congés payés : imposer ou modifier les congés payés",
    },
    {
      anchor: "jours-repos",
      content: (
        <>
          <Figure>
            <img
              src="/static/assets/img/infographies/jours-repos.jpg"
              alt="Infographie schématisant les changements concernant les jours RTT, jours repos forfait jours et compte épargne-temps. Une version textuelle est disponible en dessous."
            />
            <DownloadWrapper>
              <Button
                as="a"
                className="no-after"
                href="/static/assets/pdf/infographies/jours-repos.pdf"
                narrow
                variant="navLink"
                download
              >
                Télécharger l‘infographie (pdf - 1.9MB)
                <Download />
              </Button>
            </DownloadWrapper>
            <Figcaption>
              <MoreContent noLeftPadding title="Voir en détail">
                <Wrapper variant="dark">
                  <p>
                    Le régime applicable aux jours de réduction de temps de
                    travail (JRTT), jours de repos dans le cadre d’un
                    aménagement du temps de travail ou d’un forfait et le compte
                    épargne-temps continue de s’appliquer normalement.
                    Toutefois,{" "}
                    <a
                      href="https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041755940"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      l’ordonnance du 25 mars 2020
                    </a>{" "}
                    permet à l’employeur :
                  </p>
                  <Ul>
                    <Li>
                      D’imposer aux salariés la prise de 10 jours de repos
                      maximum, qu’il s’agisse de JRTT, de jours de repos dans le
                      cadre d’un aménagement du temps de travail ou d’un forfait
                      ou du compte épargne-temps.
                    </Li>
                    <Li>
                      Si l’intérêt de l’entreprise le justifie en raison des
                      difficultés économiques liées à la propagation du
                      covid-19.
                    </Li>
                  </Ul>
                  <p>
                    Dans ce cas, depuis le 26 mars 2020, l’employeur peut
                    prendre une décision unilatérale qui précise :
                  </p>
                  <Ol>
                    <Li>
                      <strong>Le nombre de jours de repos concernés :</strong>{" "}
                      concernant le CET, l’ordonnance vise «les droits affectés
                      sur le compte épargne-temps». L’employeur peut convertir
                      les sommes affectées au CET en jours de repos.
                    </Li>
                    <Li>
                      <strong>Les jours de repos concernés :</strong>{" "}
                      l’employeur peut imposer les dates et/ ou modifier les
                      dates déjà posées.
                    </Li>
                    <Li>
                      <strong>La période de prise des jours de repos :</strong>{" "}
                      cette période peut s’étendre jusqu’au 31 décembre 2020
                      maximum.
                    </Li>
                    <Li>
                      <strong>Le délai de prévenance de l’employeur :</strong>{" "}
                      ce délai ne peut pas être inférieur à un jour franc.
                    </Li>
                  </Ol>
                  <p>
                    Si l’employeur prend une telle décision, cette dernière
                    prime sur les autres stipulations conventionnelles
                    concernant les JRTT, jours de repos dans le cadre d’un
                    aménagement du temps de travail ou d’un forfait ou le compte
                    épargne-temps (accord collectif, etc.) qui lui seraient
                    contraires.
                  </p>
                  <p>
                    <Strong>Important: </Strong> Ce dispositif est mis en place
                    par décision unilatérale de l’employeur. S’il ne prend pas
                    de décision dans les conditions prévues par{" "}
                    <a
                      href="https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041755940"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      l’ordonnance du 25 mars 2020
                    </a>
                    , il applique le régime habituel prévu par accord.
                  </p>
                  <p>
                    Enfin, l’employeur doit en informer le CSE (comité social et
                    économique), par tout moyen, dès qu’il prend sa décision. Le
                    CSE rend son avis dans le délai d’un mois à compter de cette
                    information. Cet avis peut intervenir après que l’employeur
                    a appliqué sa décision.
                  </p>
                </Wrapper>
              </MoreContent>
            </Figcaption>
          </Figure>
          <ReferencesJuridiques
            references={[
              {
                id: "jours-repos-1",
                title:
                  "Ordonnance n° 2020-323 du 25 mars 2020 portant mesures d’urgence en matière de congés payés, de durée du travail et de jours de repos, articles 2 à 5",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041755940",
              },
              {
                id: "jours-repos-2",
                title:
                  "Rapport au Président de la République relatif à l’ordonnance n° 2020-323 du 25 mars 2020 portant mesures d’urgence en matière de congés payés, de durée du travail et de jours de repos",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041755934",
              },
              {
                id: "jours-repos-3",
                title:
                  "Ordonnance n° 2020-389 du 1er avril 2020 portant mesures d’urgence relatives aux instances représentatives du personnel, article 7",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041776922",
              },
              {
                id: "jours-repos-4",
                title:
                  "Rapport au Président de la République relatif à l’ordonnance n° 2020-389 du 1er avril 2020 portant mesures d’urgence relatives aux instances représentatives du personnel",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041776914",
              },
            ]}
          />
        </>
      ),
      title:
        "RTT, jours de repos forfait jours, compte épargne-temps : imposer des jours",
    },
    {
      anchor: "durees-maximales-travail",
      content: (
        <>
          <p>
            <a
              href="https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041755940"
              target="_blank"
              rel="noopener noreferrer"
            >
              L’ordonnance du 25 mars 2020
            </a>{" "}
            aménage les durées maximales de travail prévues par le code du
            travail jusqu’au 31 décembre 2020.
          </p>
          <p>
            <Strong>Important  :</Strong> cette mesure ne s’applique qu’aux
            secteurs d’activités particulièrement nécessaires à la sécurité de
            la Nation et à la continuité de la vie économique et sociale, qui
            seront fixés par décret. En conséquence, pour toutes les autres
            entreprises, les durées prévues par le code du travail et les
            possibilités de dérogation de droit commun continuent à s’appliquer.
            (Dès publication du décret, ce paragraphe sera complété.)
          </p>
          <p>Les durées du temps concernées sont les suivantes :</p>
          <Ol>
            <Li>
              <strong>Durée quotidienne maximale de travail :</strong> 12 heures
              maximum par jour.
            </Li>
            <Li>
              <strong>Durée du repos quotidien :</strong> 9 heures consécutives
              (au lieu de 11 heures) par jour, à condition que le salarié
              bénéficie d’un repos compensateur égal à la durée du repos
              supprimée. (Exemple : si le temps de repos est de 10 heures, le
              salarié a droit à 1 heure de repos compensateur. Si le temps de
              repos est de 9 heures, le salarié a droit à 2 heures de repos
              compensateur.)
            </Li>
            <Li>
              <strong>Durée hebdomadaire maximale :</strong>
              <Ul>
                <Li>
                  <strong>Durée quotidienne maximale de travail :</strong> 12
                  heures maximum par jour, à condition que le salarié puisse
                  bénéficier d’un repos compensateur égal au dépassement de la
                  durée maximale de 8 heures (appliquée habituellement).
                </Li>
                <Li>
                  <strong>Durée hebdomadaire de travail :</strong> 44 heures
                  maximum par semaine, sur une période de 12 semaines
                  consécutives.
                </Li>
              </Ul>
            </Li>
            <Li>
              <strong>Pour le travailleur de nuit :</strong>
              <Ul>
                <Li>
                  <strong>60 heures maximum par semaine.</strong>
                </Li>
                <Li>
                  <strong>
                    48 heures maximum par semaine, sur une période de 12
                    semaines consécutives.
                  </strong>{" "}
                  Pour les exploitations, entreprises, établissements et
                  employeurs mentionnés aux 1° à 4° de{" "}
                  <a
                    href="https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006071367&idArticle=LEGIARTI000006585193&dateTexte=&categorieLien=cid"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    l’article L. 722-1
                  </a>{" "}
                  et aux 2°, 3° et 6° de{" "}
                  <a
                    href="https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000024026821&cidTexte=LEGITEXT000006071367"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    l’article L. 722-20 du code rural et de la pêche maritime
                  </a>{" "}
                  et ayant une activité de production agricole, la durée
                  hebdomadaire de travail peut être portée jusqu’à 48 heures sur
                  une période de 12 mois.
                </Li>
              </Ul>
            </Li>
            <Li>
              <strong>Repos dominical :</strong> les entreprises peuvent
              attribuer le repos hebdomadaire par roulement. Elles ne sont pas
              obligées de fixer le dimanche comme jour de repos hebdomadaire.
              Cette possibilité de dérogation au repos dominical sera encadrée
              par un décret spécifique.
            </Li>
          </Ol>
          <p>
            L’employeur qui décide d’appliquer l’une de ces mesures doit en
            informer la Direccte et, s’il existe, le CSE (comité social et
            économique), par tout moyen, dès qu’il prend sa décision. Le CSE
            rend son avis dans le délai d’un mois à compter de cette
            information. Cet avis peut intervenir après que l’employeur a
            appliqué sa décision.
          </p>
          <ReferencesJuridiques
            accordionDisplay={1}
            references={[
              {
                id: "durees-maximales-travail-1",
                title:
                  "Ordonnance n° 2020-323 du 25 mars 2020 portant mesures d’urgence en matière de congés payés, de durée du travail et de jours de repos, articles 6 et 7",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041755940",
              },
              {
                id: "durees-maximales-travail-2",
                title:
                  "Rapport au Président de la République relatif à l’ordonnance n° 2020-323 du 25 mars 2020 portant mesures d’urgence en matière de congés payés, de durée du travail et de jours de repos",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041755934",
              },
            ]}
          />
        </>
      ),
      title: "Durées maximales de travail, repos quotidien et dominical",
    },
    {
      anchor: "rupture-conventionnelle",
      content: (
        <>
          <p>
            Pendant l’état d’urgence sanitaire, il est toujours possible de
            signer des ruptures conventionnelles. Pour rappel, après signature
            de la convention de rupture, les étapes suivantes s’appliquent :
          </p>
          <Ul>
            <Li>
              L’employeur et le salarié disposent d’un délai de 15 jours pour se
              rétracter.
            </Li>
            <Li>
              Ensuite, l’employeur envoie la convention de rupture à l’autorité
              administrative compétente, qui dispose d’un délai de 15 jours pour
              l’homologuer. En l’absence de réponse à la fin de ce délai, la
              convention de rupture est homologuée.
            </Li>
          </Ul>
          <p>
            La mise en place de l’état d’urgence sanitaire n’a aucun effet sur
            le délai de rétractation de 15 jours entre le salarié et
            l’employeur. Celui-ci continue de s’appliquer normalement. Il n’est
            pas suspendu ni prolongé.
          </p>

          <p>
            Concernant le délai d’homologation par l’autorité administrative, il
            s’applique différemment selon la date de dépôt de la demande
            d’homologation :
          </p>
          <Ul>
            <Li>
              Avant le 12 mars 2020 :
              <Ul>
                <Li>
                  Si le délai d’homologation avait pris fin avant le 12 mars
                  (dépôt du dossier avant le 20 février), la rupture
                  conventionnelle a produit ses effets. Le contrat de travail
                  est donc rompu.
                </Li>
                <Li>
                  Si le délai d’homologation était encore en cours le 12 mars
                  (dépôt du dossier après le 20 février), il a été suspendu. Il
                  reprend son cours à compter du 26 avril. (Exemple : le 12
                  mars, le délai s’était écoulé sur 12 jours. Il a été suspendu.
                  Il reprend à partir du 26 avril pour les 3 jours restants. Il
                  se termine donc le 29 avril.)
                </Li>
              </Ul>
            </Li>
            <Li>
              Du 12 mars et le 25 avril 2020 : si l’employeur a envoyé la
              rupture conventionnelle à l’autorité administrative pendant cette
              période, le délai d’homologation était suspendu. Il reprend à
              compter du 26 avril, pour une durée de 15 jours.
            </Li>

            <Li>
              Après le 26 avril 2020 : le délai de 15 jours s’applique
              normalement. Il n’est pas suspendu.
            </Li>
          </Ul>
          <ReferencesJuridiques
            accordionDisplay={1}
            references={[
              {
                id: "rupture-conventionnelle-1",
                title:
                  "Ordonnance n° 2020-427 du 15 avril 2020 portant diverses dispositions en matière de délais pour faire face à l’épidémie de covid-19, article 2",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041800899",
              },
              {
                id: "rupture-conventionnelle-2",
                title:
                  "Rapport au Président de la République relatif à l’ordonnance n° 2020-427 du 15 avril 2020 portant diverses dispositions en matière de délais pour faire face à l’épidémie de covid-19",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041800867",
              },
              {
                id: "rupture-conventionnelle-3",
                title:
                  "Décret n° 2020-471 du 24 avril 2020 portant dérogation au principe de suspension des délais pendant la période d’état d’urgence sanitaire liée à l’épidémie de covid-19 dans le domaine du travail et de l’emploi",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041820235",
              },
              {
                id: "l1237-13",
                title: "Article L. 1237-13 du code du travail",
                type: TYPE_REFERENCE.codeDuTravail,
              },
              {
                id: "l1237-14",
                title: "Article L. 1237-14 du code du travail",
                type: TYPE_REFERENCE.codeDuTravail,
              },
            ]}
          />
        </>
      ),
      title: "Rupture conventionnelle",
    },
    {
      anchor: "visite-medicale",

      content: (
        <>
          <p>
            Les visites médicales normalement prévues entre le 12 mars 2020 et
            le 31 août 2020 peuvent être reportées ou annulées dans les
            conditions détaillées ci-dessous.
          </p>
          <p>
            <strong>1. Conditions de report des visites médicales</strong>
          </p>
          <p>
            Sauf exception, le médecin du travail peut reporter, jusqu’au 31
            décembre 2020, la date des visites et examens médicaux suivants :
          </p>
          <Ul>
            <Li>
              La visite d’information et de prévention initiale (article
              R4624-10 du code du travail).
            </Li>
            <Li>
              Le renouvellement de la visite d’information et de prévention
              (article R4624-16 du code du travail).
            </Li>
            <Li>
              Le renouvellement de l’examen médical d’aptitude et la visite
              intermédiaire (article R4624-28 du code du travail).
            </Li>
          </Ul>
          <p>
            Le report de la visite d’information et de prévention initiale
            n’empêche pas l’embauche des salariés.
          </p>
          <p>
            Les exceptions pour lesquelles aucun report n’est possible sont les
            suivantes :
          </p>
          <Ul>
            <Li>
              La visite d’information et de prévention initiale pour les
              travailleurs handicapés, les travailleurs âgés de moins de 18 ans,
              les travailleurs titulaires d’une pension d’invalidité, les femmes
              enceintes, venant d’accoucher ou allaitantes, les travailleurs de
              nuit (articles R4624-17 à R4624-20 du code du travail) et les
              travailleurs exposés à des champs électromagnétiques affectés à
              des postes pour lesquels les valeurs limites d’exposition
              dépassent les limites prévues par la loi (article R4353-3 du code
              du travail).
            </Li>
            <Li>
              L’examen médical d’aptitude initial prévu à l’article R4624-24 du
              code du travail pour les salariés bénéficiant d’un suivi
              individuel renforcé (exposition à l’amiante, au plomb ou aux
              agents cancérogènes, risque de chute de hauteur, etc.).
            </Li>
            <Li>
              Le renouvellement de l’examen médical d’aptitude pour les
              travailleurs exposés à des rayons ionisants classés en catégorie A
              (article R4451-57 et article R4451-82 du code du travail).
            </Li>
          </Ul>
          <p>
            Enfin, dans tous les cas où le report de la visite médicale est
            possible, le médecin du travail peut toujours décider de la
            maintenir à sa date normale, s’il l’estime indispensable. Il prend
            sa décision au regard des informations sur l’état de santé du
            salarié, les risques liés à son poste de travail ou à ses conditions
            de travail. Pour les salariés en CDD, le médecin du travail tient
            compte des visites et examens du salarié au cours des 12 derniers
            mois.
          </p>
          <p>
            <strong>2. Cas particulier de la visite de préreprise</strong>
          </p>
          <p>
            Le médecin du travail n’est pas obligé d’organiser la visite de
            préreprise, lorsque la reprise du travail doit intervenir avant le
            31 août 2020. Toutefois, il peut toujours décider de la maintenir,
            s’il l’estime indispensable. Il prend sa décision au regard des
            informations sur l’état de santé du salarié, les risques liés à son
            poste de travail ou à ses conditions de travail. Pour les salariés
            en CDD, le médecin du travail tient compte des visites et examens du
            salarié au cours des 12 derniers mois.
          </p>
          <p>
            <strong>3. Cas particulier de la visite de reprise</strong>
          </p>
          <p>Les conditions de la visite de reprise sont modifiées.</p>
          <p>
            Pour les salariés suivants, le médecin du travail organise l’examen
            médical avant la reprise effective du travail :
          </p>
          <Ul>
            <Li> Les femmes enceintes, venant d’accoucher ou allaitantes.</Li>
            <Li> Les salariés handicapés.</Li>
            <Li> Les salariés titulaires d’une pension d’invalidité.</Li>
            <Li> Les travailleurs de nuit.</Li>
            <Li> Les travailleurs âgés de moins de 18 ans.</Li>
          </Ul>
          <p>
            Pour les autres salariés, le médecin du travail peut reporter
            l’examen après la reprise du travail en respectant les délais
            suivants :
          </p>
          <Ul>
            <Li>
              1 mois suivant la reprise du travail, pour les travailleurs
              faisant l’objet du suivi individuel renforcé en application de
              l’article R4624-22 du code du travail (exposition à l’amiante, au
              plomb ou aux agents cancérogènes, risque de chute de hauteur,
              etc.).
            </Li>
            <Li>
              3 mois suivant la reprise du travail, pour les autres salariés.
            </Li>
          </Ul>
          <p>
            Lorsque le report de la visite médicale est possible, le médecin du
            travail peut toujours décider de la maintenir à sa date normale,
            s’il l’estime indispensable. Il prend sa décision au regard des
            informations sur l’état de santé du salarié, les risques liés à son
            poste de travail ou à ses conditions de travail. Pour les salariés
            en CDD, le médecin du travail tient compte des visites et examens du
            salarié au cours des 12 derniers mois.
          </p>
          <p>
            <strong>4. Information de l’employeur et du salarié</strong>
          </p>
          <p>
            Si le médecin du travail décide de reporter la visite médicale, le
            service de santé au travail en informe l’employeur et le salarié, en
            leur communiquant la date à laquelle la visite est reprogrammée.
            S’il ne dispose pas des coordonnées du salarié, il invite
            l’employeur à communiquer à ce dernier ces informations.
          </p>
          <p>
            Si la visite de préreprise n’est pas organisée, le service de santé
            au travail en informe l’employeur ou le salarié qui l’a demandée.
          </p>
          <ReferencesJuridiques
            accordionDisplay={1}
            references={[
              {
                id: "visite-medicale-1",
                title:
                  "Ordonnance n° 2020-386 du 1er avril 2020 adaptant les conditions d’exercice des missions des services de santé au travail à l’urgence sanitaire et modifiant le régime des demandes préalables d’autorisation d’activité partielle, articles 3 et 5",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041776887",
              },
              {
                id: "visite-medicale-2",
                title:
                  "Rapport au Président de la République relatif à l’ordonnance n° 2020-386 du 1er avril 2020 adaptant les conditions d’exercice des missions des services de santé au travail à l’urgence sanitaire et modifiant le régime des demandes préalables d’autorisation d’activité partielle",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041776882",
              },
              {
                id: "visite-medicale-3",
                title:
                  "Décret n° 2020-410 du 8 avril 2020 adaptant temporairement les délais de réalisation des visites et examens médicaux par les services de santé au travail à l’urgence sanitaire",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041789669",
              },
            ]}
          />
        </>
      ),
      title: "Report ou annulation de visites médicales",
    },
    {
      anchor: "chomage-partiel",
      content: (
        <>
          <p>
            Face à l’ampleur de la crise sanitaire liée au COVID-19, le
            Gouvernement a décidé de transformer structurellement le dispositif
            d’activité partielle. Ainsi, les conditions pour bénéficier de
            l’activité partielle, les procédures de demande et les modalités de
            calcul ont été modifiées.
          </p>
          <p>
            Voir les{" "}
            <Link href="/fiche-ministere-travail/activite-partielle-chomage-partiel">
              <a>questions-réponses dédiées à l’activité partielle</a>
            </Link>
            .
          </p>
        </>
      ),
      title:
        "Transformation du dispositif d’activité partielle (chômage partiel)",
    },
    {
      anchor: "interessement-participation",
      content: (
        <>
          <p>
            <a
              href="https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041755930"
              target="_blank"
              rel="noopener noreferrer"
            >
              L’ordonnance du 25 mars 2020
            </a>{" "}
            ouvre la possibilité aux entreprises de reporter jusqu’au 31
            décembre 2020 le versement des sommes dues aux salariés au titre des
            dispositifs d’intéressement et de participation qui devait
            intervenir au cours du 1er semestre (notamment ceux qui devaient
            intervenir avant le 1er juin, pour les entreprises dont l’exercice
            est calé sur l’année civile).
          </p>
          <p>En conséquence :</p>
          <Ol>
            <Li>
              <strong>Les versements</strong> (sur le compte bancaire du
              bénéficiaire ou sur son compte individuel au sein d’un plan)
              auront lieu, au plus tard, le 31 décembre 2020.
            </Li>
            <Li>
              <strong>Les intérêts de retard pour versement tardif</strong> ne
              se déclencheront que si les sommes attribuées au titre de
              l’intéressement et de la participation sont versées au-delà du 31
              décembre 2020.
            </Li>
          </Ol>
          <ReferencesJuridiques
            accordionDisplay={1}
            references={[
              {
                id: "interessement-participation-1",
                title:
                  "Ordonnance n° 2020-322 du 25 mars 2020 adaptant temporairement les conditions et modalités d’attribution de l’indemnité complémentaire prévue à l’article L. 1226-1 du code du travail et modifiant, à titre exceptionnel, les dates limites et les modalités de versement des sommes versées au titre de l’intéressement et de la participation, article 2",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041755930",
              },
              {
                id: "interessement-participation-2",
                title:
                  "Rapport au Président de la République relatif à l’ordonnance n° 2020-322 du 25 mars 2020 adaptant temporairement les conditions et modalités d’attribution de l’indemnité complémentaire et modifiant, à titre exceptionnel, les dates limites et les modalités de versement des sommes versées au titre de l’intéressement et de la participation",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041755922",
              },
            ]}
          />
        </>
      ),
      title: " Intéressement et participation : report des versements",
    },
    {
      anchor: "prime-exceptionnelle",
      content: (
        <>
          <p>
            Les conditions de la prime exceptionnelle de pouvoir d’achat
            (également appelée « prime Macron ») ont été assouplies par
            l’ordonnance du 1er avril 2020.
          </p>
          <p>
            Ainsi, depuis le 2 avril 2020, toutes les entreprises peuvent verser
            la prime de pouvoir d’achat. Elles n’ont plus l’obligation de
            disposer d’un accord d’intéressement.
          </p>
          <p>
            En outre, la date limite de versement de la prime a été reportée au
            31 août 2020. (Auparavant, cette date était fixée au 30 juin 2020.)
          </p>
          <p>
            La prime de pouvoir d’achat est exonérée de cotisations et
            contributions sociales et d’impôt sur le revenu jusqu’à :
          </p>
          <Ul>
            <Li>
              <strong>1000€</strong>, en l’absence d’accord d’intéressement
              applicable dans l’entreprise.
            </Li>
            <Li>
              <strong>2000€</strong>, si l’entreprise applique un accord
              d’intéressement. Dans ce cas, la possibilité de conclure un accord
              d’intéressement est repoussée jusqu’au 31 août 2020. L’accord peut
              avoir une durée comprise entre 1 et 3 ans.
            </Li>
            <Li>
              <strong>2000€</strong> pour les associations et fondations (avec
              ou sans accord d’intéressement).
            </Li>
          </Ul>
          <p>
            Enfin, il est toujours possible de moduler le montant de la prime
            entre les salariés selon les critères suivants : la rémunération, le
            niveau de classification, la durée de présence effective pendant
            l’année écoulée et la durée de travail prévue au contrat de travail.
            L’ordonnance du 1er avril 2020 a ajouté un critère supplémentaire :
            les conditions de travail liées à l’épidémie de covid-19.
          </p>
          <ReferencesJuridiques
            references={[
              {
                id: "prime-exceptionnelle-1",
                title:
                  "Ordonnance n° 2020-385 du 1er avril 2020 modifiant la date limite et les conditions de versement de la prime exceptionnelle de pouvoir d’achat",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041776879",
              },
              {
                id: "prime-exceptionnelle-2",
                title:
                  "Rapport au Président de la République relatif à l’ordonnance n° 2020-385 du 1er avril 2020 modifiant la date limite et les conditions de versement de la prime exceptionnelle de pouvoir d’achat",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041776873",
              },
              {
                id: "prime-exceptionnelle-3",
                title:
                  "Ordonnance n° 2020-460 du 22 avril 2020 portant diverses mesures prises pour faire face à l’épidémie de covid-19, article 19",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041814597",
              },
            ]}
          />
        </>
      ),
      title: "Prime exceptionnelle de pouvoir d’achat",
    },
    {
      anchor: "assistant-maternel",
      content: (
        <>
          <p>
            Le nombre d’enfants maximum que peut accueillir un assistant
            maternel est modifié du 26 mars 2020 jusqu’à une date fixée par
            arrêté du ministre chargé de la famille et, au plus tard, jusqu’au
            31 juillet 2020.
          </p>
          <p>
            À condition de respecter les conditions de sécurité suffisantes,
            l’assistant maternel est autorisé à accueillir en cette qualité
            jusqu’à 6 enfants simultanément, étant précisé que :
          </p>
          <Ol>
            <Li>
              <strong>Ce nombre est diminué</strong> du nombre d’enfants de
              moins de 3 ans de l’assistant maternel présents à son domicile.
            </Li>
            <Li>
              <strong>Le nombre de mineurs de tous âges</strong> placés sous la
              responsabilité exclusive de l’assistant maternel présents
              simultanément à son domicile ne peut pas dépasser 8.
            </Li>
          </Ol>
          <p>
            L’assistant maternel qui accueille dans ce cadre simultanément un
            nombre d’enfants supérieur au nombre précisé par son agrément en
            informe sous 48 heures le président du conseil départemental. Il
            indique :
          </p>
          <Ol>
            <Li>
              <strong>
                Le nombre de mineurs qu’il accueille en qualité d’assistant
                maternel.
              </strong>
            </Li>
            <Li>
              <strong>
                Les noms, adresses et numéros de téléphone de leurs
                représentants légaux
              </strong>
            </Li>
            <Li>
              <strong>
                Le nombre et l’âge des autres mineurs présents à son domicile
                qui sont placés sous sa responsabilité exclusive.
              </strong>
            </Li>
          </Ol>
          <p>
            À partir du 26 mars 2020 et jusqu’au 31 décembre 2020, les
            établissements et services accueillant des enfants de moins de 6 ans
            (premier alinéa de l’article{" "}
            <a
              href="https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006072665&idArticle=LEGIARTI000006687615&dateTexte=&categorieLien=cid"
              target="_blank"
              rel="noopener noreferrer"
            >
              L. 2324-1 du code de la santé publique
            </a>
            ) qui assurent l’accueil des enfants des personnels indispensables à
            la gestion de la crise sanitaire liée à l’épidémie de covid-19
            communiquent leurs disponibilités d’accueil sur un site internet mis
            à disposition par la Caisse nationale des allocations familiales
            (CAF). Ce site internet offre aux assistants maternels la
            possibilité de renseigner leurs nom, coordonnées et disponibilités.
          </p>
          <ReferencesJuridiques
            accordionDisplay={1}
            references={[
              {
                id: "assistant-maternel-1",
                title:
                  "Ordonnance n° 2020-310 du 25 mars 2020 portant dispositions temporaires relatives aux assistants maternels et aux disponibilités d’accueil des jeunes enfants",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041755748",
              },
              {
                id: "assistant-maternel-2",
                title:
                  "Rapport au Président de la République relatif à l’ordonnance n° 2020-310 du 25 mars 2020 portant dispositions temporaires relatives aux assistants maternels et aux disponibilités d’accueil des jeunes enfants",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041755745",
              },
            ]}
          />
        </>
      ),
      title:
        "Assistant(e) maternel(le) : augmentation du nombre d’enfants maximum",
    },
    {
      anchor: "chomage",
      content: (
        <>
          <p>
            Le droit à l’indemnisation chômage est prolongé dans certaines
            conditions.
          </p>
          <p>
            Voir les{" "}
            <a
              href="https://www.pole-emploi.fr/actualites/allongement-exceptionnel-de-lind.html"
              rel="noopener noreferrer"
              target="_blank"
            >
              questions-réponses en ligne sur le site de Pôle Emploi
            </a>
          </p>
        </>
      ),
      title: "Chômage : indemnisation prolongée",
    },
    {
      anchor: "delais-cse",
      content: (
        <>
          <p>
            Afin de favoriser la reprise rapide de l’activité économique dans
            des conditions protectrices pour les salariés, une ordonnance et
            deux décrets du 2 mai 2020 ont adaptés la durée des délais d’envoi
            de l’ordre du jour, de consultation et d’expertise du CSE pour
            certaines réunions. Du 3 mai au 23 août 2020, l’entreprise
            appliquera les délais définis par ces textes et non les délais fixés
            par le code du travail, par un accord collectif ou un accord conclu
            avec le CSE.
          </p>
          <p>
            <strong>
              1. Réunions pour lesquelles les conditions de fonctionnement sont
              adaptées
            </strong>
          </p>
          <p>
            Les délais sont adaptés pour les réunions{" "}
            <strong>
              dont les délais d’envoi de l’ordre du jour ou de consultation
              commencent entre le 3 mai et 23 août 2020
            </strong>{" "}
            et qui ont pour objet :
          </p>
          <Ul>
            <Li>
              <strong>L’information ou la consultation</strong> du CSE, du CSE
              central ou du CSE d’établissement.
            </Li>
            <Li>
              Sur les{" "}
              <strong>
                décisions de l’employeur qui ont pour objectif de faire face aux
                conséquences économiques, financières et sociales de la
                propagation de l’épidémie de covid-19
              </strong>
              .
            </Li>
          </Ul>
          <p>
            Il est précisé que si des procédures de consultation ainsi visées
            sont en cours le 3 mai 2020, elles peuvent être adaptées. En effet,
            si les délais de consultation du CSE, CSE central ou CSE
            d’établissement ont commencé avant le 3 mai et ne sont pas encore
            terminés à cette date, l’employeur peut :
          </p>
          <Ul>
            <Li>Mettre fin la procédure en cours et ;</Li>
            <Li>
              Engager, à compter de cette même date, une nouvelle procédure de
              consultation avec application des nouveaux délais d’envoi de
              l’ordre du jour, de consultation et d’expertise.
            </Li>
          </Ul>
          <p>
            Enfin, ces délais ne s’appliquent pas pour les autres réunions du
            CSE et notamment celles des procédures suivantes :
          </p>
          <Ul>
            <Li>
              Le licenciement économique de 10 salariés ou plus dans une même
              période de 30 jours.
            </Li>
            <Li>L’accord de performance collective.</Li>
            <Li>
              Les 3 consultations annuelles récurrentes (orientations
              stratégiques de l’entreprise, situation économique et financière
              de l’entreprise, politique sociale de l’entreprise, les conditions
              de travail et l’emploi).
            </Li>
          </Ul>
          <p>
            Pour toutes ces réunions et procédures, l’employeur applique les
            délais habituels d’envoi de l’ordre du jour, de consultation et
            d’expertise.
          </p>
          <p>
            <strong>2. Délai d’envoi de l’ordre du jour</strong>
          </p>
          <p>
            Pour les réunions pour lesquelles les conditions de fonctionnement
            sont adaptées, le délai d’envoi de l’ordre du jour est égal à :
          </p>
          <Ul>
            <Li>
              <strong>CSE et CSE d’établissement : 2 jours calendaires</strong>{" "}
              (au lieu de 3 jours).
            </Li>
            <Li>
              <strong>CSE central : 3 jours calendaires</strong> (au lieu de 8
              jours).
            </Li>
          </Ul>
          <p>
            <strong>3. Délai de consultation du CSE</strong>
          </p>
          <p>
            En cas de consultation du <strong>CSE</strong> dans les conditions
            visées ci-dessus, le délai de consultation est égal à :
          </p>
          <Ul>
            <Li>
              <strong>
                En l’absence de recours à un expert : 8 jours calendaires
              </strong>{" "}
              (au lieu d’un mois).
            </Li>
            <Li>
              <strong>Avec recours à un expert : 11 jours calendaires</strong>{" "}
              (au lieu de 2 mois).
            </Li>
          </Ul>
          <p>
            Ces délais s’appliquent aussi au CSE d’établissement, si l’employeur
            ne consulte pas en même temps le CSE central.
          </p>
          <p>
            En cas de consultation du <strong>CSE central</strong> et d’au moins
            un CSE d’établissement, le délai de consultation s’applique au CSE
            central. Dans ce cas, et dans le cas de la consultation du CSE
            central uniquement, le délai de consultation est égal à :
          </p>
          <Ul>
            <li>
              <strong>
                En l’absence de recours à un expert : 8 jours calendaires
              </strong>{" "}
              (au lieu d’un mois) ;
            </li>
            <li>
              <strong>Avec recours à un expert : 12 jours calendaires</strong>{" "}
              (au lieu de 1 ou 2 mois).
            </li>
          </Ul>
          <p>
            L’avis du ou des CSE d’établissement est transmis au CSE central{" "}
            <strong>
              au moins 1 jour calendaire avant la fin du délai de consultation
              du CSE central
            </strong>{" "}
            (au lieu de 7 jours).
          </p>
          <p>
            Dans tous les cas, si à l’issue de ces délais de consultation, le
            comité n’exprime pas son avis, il est réputé avoir donné un avis
            négatif. La procédure de consultation prend fin.
          </p>
          <p>
            <strong>4. Délais d’expertise</strong>
          </p>
          <p>
            Si pendant la procédure de consultation pour les réunions visées
            ci-dessous, le CSE (ou CSE d’établissement ou CSE central) a recours
            à un expert, les échanges entre ce dernier et l’employeur respectent
            les délais suivants :
          </p>
          <Ul>
            <Li>
              Délai dont dispose l’expert, à compter de sa désignation, pour
              demander à l’employeur toutes les informations complémentaires
              qu’il juge nécessaires à la réalisation de sa mission : 24 heures.
            </Li>
            <Li>Délai de réponse de l’employeur : 24 heures.</Li>
          </Ul>
          <p>
            En outre, l’expert notifie à l’employeur le coût prévisionnel,
            l’étendue et la durée d’expertise dans un délai de :
          </p>
          <Ul>
            <Li>48 heures à compter de sa désignation, ou ;</Li>
            <Li>
              Si une demande d’information a été adressée à l’employeur, 24
              heures à compter de sa réponse.
            </Li>
          </Ul>
          <p>
            L’expert doit remettre son rapport au CSE (ou CSE d’établissement ou
            CSE central) au minimum 24 heures avant la fin du délai de
            consultation du comité.
          </p>
          <p>
            Enfin, si l’employeur décide de saisir le juge, il dispose d’un
            délai de 48 heures à compter de :
          </p>
          <Ul>
            <Li>
              La délibération du CSE décidant le recours à l’expertise s’il
              entend contester la nécessité de l’expertise.
            </Li>
            <Li>
              La désignation de l’expert par le CSE s’il entend contester le
              choix de l’expert.
            </Li>
            <Li>
              La notification à l’employeur du cahier des charges et des
              informations par l’expert, s’il entend contester le coût
              prévisionnel, l’étendue ou la durée de l’expertise.
            </Li>
            <Li>
              La notification à l’employeur du coût final de l’expertise s’il
              entend contester ce coût.
            </Li>
          </Ul>
          <ReferencesJuridiques
            accordionDisplay={1}
            references={[
              {
                id: "delais-cse-1",
                title:
                  "Rapport au Président de la République relatif à l’ordonnance n° 2020-507 du 2 mai 2020 adaptant temporairement les délais applicables pour la consultation et l’information du comité social et économique afin de faire face à l’épidémie de covid-19",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041842254",
              },
              {
                id: "delais-cse-2",
                title:
                  "Ordonnance n° 2020-507 du 2 mai 2020 adaptant temporairement les délais applicables pour la consultation et l’information du comité social et économique afin de faire face à l’épidémie de covid-19",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041842261",
              },
              {
                id: "delais-cse-3",
                title:
                  "Décret n° 2020-508 du 2 mai 2020 adaptant temporairement les délais relatifs à la consultation et l’information du comité social et économique afin de faire face aux conséquences de la propagation de l’épidémie de covid-19",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041842264",
              },
              {
                id: "delais-cse-4",
                title:
                  "Décret n° 2020-509 du 2 mai 2020 fixant les modalités d’application des dispositions du I de l’article 9 de l’ordonnance n° 2020-460 du 22 avril 2020 modifiée portant diverses mesures prises pour faire face à l’épidémie de covid-19",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041842280",
              },
              {
                id: "delais-cse-5",
                title:
                  "Ordonnance n° 2020-460 du 22 avril 2020 portant diverses mesures prises pour faire face à l’épidémie de covid-19, article 9",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041814597",
              },
              {
                id: "l2315-30",
                title: "Article L. 2315-30 du code du travail",
                type: TYPE_REFERENCE.codeDuTravail,
              },
              {
                id: "l2316-17",
                title: "Article L. 2316-17 du code du travail",
                type: TYPE_REFERENCE.codeDuTravail,
              },
              {
                id: "l2315-86",
                title: "Article L. 2315-86 du code du travail",
                type: TYPE_REFERENCE.codeDuTravail,
              },
              {
                id: "r2312-6",
                title: "Article R. 2312-6 du code du travail",
                type: TYPE_REFERENCE.codeDuTravail,
                url: "",
              },
              {
                id: "r2315-45",
                title: "Article R. 2315-45 du code du travail",
                type: TYPE_REFERENCE.codeDuTravail,
                url: "",
              },
              {
                id: "r2315-46",
                title: "Article R. 2315-46 du code du travail",
                type: TYPE_REFERENCE.codeDuTravail,
                url: "",
              },
              {
                id: "r2315-47",
                title: "Article R. 2315-47 du code du travail",
                type: TYPE_REFERENCE.codeDuTravail,
                url: "",
              },
              {
                id: "r2315-49",
                title: "Article R. 2315-49 du code du travail",
                type: TYPE_REFERENCE.codeDuTravail,
                url: "/code-du-travail/r2315-49",
              },
            ]}
          />
        </>
      ),
      title: "Délais du CSE (ordre du jour, consultation, expertise)",
    },
    {
      anchor: "accord-collectif",
      content: (
        <>
          <p>
            L’ordonnance du 15 avril 2020 réduit plusieurs délais en matière de
            négociation et de signature des accords collectifs dont l’objet est
            exclusivement de faire face aux conséquences économiques,
            financières et sociales de la propagation de l’épidémie de covid-19
            ainsi qu’aux conséquences des mesures prises pour limiter cette
            propagation.
          </p>
          <p>
            <strong>
              1. Accords collectifs d’entreprise négociés avec des délégués
              syndicaux
            </strong>
          </p>
          <p>
            Concernant les accords collectifs d’entreprise négociés avec des
            délégués syndicaux, l’ordonnance modifie les délais prévus par
            l’article L. 2232-12 du code du travail. Il est rappelé que
            lorsqu’un accord a été signé par l’employeur et par des
            organisations syndicales représentatives ayant recueilli entre 30 %
            et 50 % des suffrages exprimés en faveur d’organisations
            représentatives au premier tour des élections du CSE, ces
            organisations syndicales signataires disposent d’un{" "}
            <strong>délai d’un mois</strong>à compter de la signature de
            l’accord pour indiquer qu’elles souhaitent une consultation des
            salariés pour valider l’accord. Au terme de ce délai, l’employeur
            peut demander l’organisation de cette consultation, en l’absence
            d’opposition de l’ensemble de ces organisations. Si, à l’issue d’un{" "}
            <strong>délai de 8 jours</strong> à compter de cette demande ou de
            l’initiative de l’employeur, les éventuelles signatures d’autres
            organisations syndicales représentatives n’ont pas permis
            d’atteindre le taux de 50 %, la consultation des salariés est
            organisée.
          </p>
          <p>
            Or, pour les délais qui n’ont pas commencé à courir le 16 avril 2020
            et jusqu’au terme du mois suivant la fin de l’état d’urgence
            sanitaire, les délais, pour les accords dont l’objet est
            exclusivement de faire face aux conséquences économiques,
            financières et sociales de la propagation de l’épidémie de covid-19
            ainsi qu’aux conséquences des mesures prises pour limiter cette
            propagation, sont ainsi réduits:
          </p>
          <Ul>
            <Li>Le délai d’un mois est réduit à 8 jours.</Li>
            <Li>Le délai de 8 jours est réduit à 5 jours.</Li>
          </Ul>
          <p>
            <strong>
              2. Accords collectifs négociés dans une entreprise sans délégué
              syndical
            </strong>
          </p>
          <p>
            Pour rappel, dans les entreprises sans délégué syndical dont
            l’effectif habituel est soit inférieur à 11 salariés, soit compris
            entre 11 et 20 salariés en cas d’absence de membre élu de la
            délégation du personnel du CSE, l’employeur peut proposer un projet
            d’accord ou un avenant de révision aux salariés. Il doit ensuite
            consulter les salariés dans un{" "}
            <strong>délai minimum de 15 jours</strong>.
          </p>
          <p>
            Or, pour les délais qui n’ont pas commencé à courir le 16 avril 2020
            et jusqu’au terme du mois suivant la fin de l’état d’urgence
            sanitaire, le délai de 15 jours est{" "}
            <strong>réduit à 5 jours</strong>, pour les accords dont l’objet est
            exclusivement de faire face aux conséquences économiques,
            financières et sociales de la propagation de l’épidémie de covid-19
            ainsi qu’aux conséquences des mesures prises pour limiter cette
            propagation.
          </p>
          <p>
            En outre, dans les entreprises sans délégué syndical dont l’effectif
            habituel est au moins égal à 50 salariés, l’employeur peut négocier
            un accord collectif ou un avenant de révision avec un ou des membres
            titulaires du CSE (mandatés ou non par un syndicat). Les membres du
            CSE qui acceptent de négocier en informe l’employeur dans un{" "}
            <strong>délai d’un mois</strong> suivant sa proposition.
          </p>
          <p>
            Or, pour les délais qui n’ont pas commencé à courir le 16 avril 2020
            et jusqu’au terme du mois suivant la fin de l’état d’urgence
            sanitaire, le délai d’un mois est <strong>réduit à 8 jours</strong>,
            pour les accords dont l’objet est exclusivement de faire face aux
            conséquences économiques, financières et sociales de la propagation
            de l’épidémie de covid-19 ainsi qu’aux conséquences des mesures
            prises pour limiter cette propagation.
          </p>
          <ReferencesJuridiques
            accordionDisplay={1}
            references={[
              {
                id: "accord-collectif-1",
                title:
                  "Ordonnance n° 2020-428 du 15 avril 2020 portant diverses dispositions sociales pour faire face à l’épidémie de covid-19, article 8",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041800927",
              },
              {
                id: "accord-collectif-2",
                title:
                  "Rapport au Président de la République relatif à l’ordonnance n° 2020-428 du 15 avril 2020 portant diverses dispositions sociales pour faire face à l’épidémie de covid-19",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041800918",
              },
              {
                id: "l2232-12",
                title: "Article L. 2232-12 du code du travail",
                type: TYPE_REFERENCE.codeDuTravail,
              },
              {
                id: "l2232-21",
                title: "Article L. 2232-21 du code du travail",
                type: TYPE_REFERENCE.codeDuTravail,
              },
              {
                id: "l2232-25-1",
                title: "Article L. 2232-25-1 du code du travail",
                type: TYPE_REFERENCE.codeDuTravail,
              },
            ]}
          />
        </>
      ),
      title: "Accord collectif d’entreprise",
    },
    {
      anchor: "services-de-sante",
      content: (
        <>
          <p>
            <strong>
              Intervention des services de santé au travail dans l’entreprise
            </strong>
          </p>
          <p>
            Les services de santé au travail, tout en maintenant leur activité
            au service des entreprises, peuvent reporter ou aménager leurs
            interventions dans ou auprès de l’entreprise, lorsque ces
            interventions ne sont pas en rapport avec l’épidémie de covid-19.
            Toutefois, le médecin du travail peut toujours intervenir dans
            l’entreprise, s’il estime que l’urgence ou la gravité des risques
            pour la santé des salariés justifie une intervention sans délai.
          </p>
          <p>
            <strong>
              Contribution des services de santé au travail à la lutte contre la
              propagation du covid-19
            </strong>
          </p>
          <p>
            Au plus tard jusqu’au 31 août 2020, les services de santé au travail
            participent à la lutte contre la propagation du covid-19, notamment
            par :
          </p>
          <Ol>
            <Li>
              La diffusion, à l’attention des employeurs et des salariés, de
              messages de prévention contre le risque de contagion.
            </Li>
            <Li>
              L’appui aux entreprises dans la définition et la mise en œuvre des
              mesures de prévention adéquates contre ce risque.
            </Li>
            <Li>
              L’accompagnement des entreprises amenées, par l’effet de la crise
              sanitaire, à accroître ou adapter leur activité.
            </Li>
          </Ol>
          <ReferencesJuridiques
            accordionDisplay={1}
            references={[
              {
                id: "services-de-sante-1",
                title:
                  "Ordonnance n° 2020-386 du 1er avril 2020 adaptant les conditions d’exercice des missions des services de santé au travail à l’urgence sanitaire et modifiant le régime des demandes préalables d’autorisation d’activité partielle, article 1 et 4",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041776887",
              },
              {
                id: "services-de-sante-2",
                title:
                  "Rapport au Président de la République relatif à l’ordonnance n° 2020-386 du 1er avril 2020 adaptant les conditions d’exercice des missions des services de santé au travail à l’urgence sanitaire et modifiant le régime des demandes préalables d’autorisation d’activité partielle",
                type: TYPE_REFERENCE.external,
                url:
                  "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041776882",
              },
            ]}
          />
        </>
      ),
      title: "Services de santé au travail",
    },
  ].map(({ anchor, content, title }) => ({
    id: anchor,
    title: <h2>{title}</h2>,
    body: content,
  }));

  return (
    <Layout currentPage={asPath}>
      <Metas
        url={pageUrl}
        title="Coronavirus : ce que changent les ordonnances en droit du travail - Ministère du travail"
        description="Coronavirus : aménagement des règles pour le chômage partiel, les congés payés, RTT, l’indemnisation chômage, les durées maximales de travail, la garde d’enfant pour l’assistant(e) maternel(le)."
        image={ogImage}
      />
      <StyledAnswer
        breadcrumbs={[
          {
            label: "Dossier Coronavirus-Covid 19",
            slug: `/dossiers/ministere-du-travail-notre-dossier-sur-le-coronavirus`,
          },
        ]}
        date="10/04/2020"
        dateLabel="Mise à jour le"
        title="Nouveautés Covid-19"
      >
        <p>
          Le Gouvernement a décidé de prendre plusieurs mesures afin
          d’accompagner les entreprises et les salariés pour faire face aux
          conséquences de la crise du coronavirus, notamment pendant la période
          de l’état d’urgence sanitaire. Nous vous decryptons ici les
          différentes mesures organisées par thème.
        </p>
        <Accordion preExpanded={[anchor]} items={titledSections} />
      </StyledAnswer>
    </Layout>
  );
};

export default Fiche;

const { breakpoints, spacings } = theme;

const StyledAnswer = styled(Answer)`
  img {
    max-width: 100%;
    height: auto;
  }
`;

const Figure = styled.figure`
  margin: 0;
`;
const Figcaption = styled.figcaption`
  margin-top: ${spacings.base};
`;

const Ol = styled.ol`
  padding-left: ${spacings.larger};
`;
const Ul = styled.ul`
  padding-left: ${spacings.larger};
`;

const Li = styled.li`
  & + & {
    margin-top: ${spacings.base};
    @media (max-width: ${breakpoints.mobile}) {
      margin-top: ${spacings.small};
    }
  }
`;

const Strong = styled.strong`
  color: ${({ theme }) => theme.primary};
`;

const DownloadWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Download = styled(icons.Download)`
  width: 2.2rem;
  margin-left: ${spacings.xsmall};
`;
