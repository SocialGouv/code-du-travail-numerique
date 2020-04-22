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
        title="Coronavirus : ce que changent les ordonnances en droit du travail"
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
