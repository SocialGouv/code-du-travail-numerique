import Link from "../common/Link";
import Button from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";
import { BreadcrumbListJsonLd } from "../seo/jsonld";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import React from "react";
import { Container } from "../layout/Container";

export const ReglesEntreprise = () => (
  <>
    <div className={fr.cx("fr-container")}>
      <BreadcrumbListJsonLd
        currentPageLabel={
          "Code du travail, convention, accord: quelles règles s'appliquent dans votre entreprise ?"
        }
        items={[]}
      />
      <Breadcrumb
        currentPageLabel={
          "Code du travail, convention, accord: quelles règles s'appliquent dans votre entreprise ?"
        }
        homeLinkProps={{
          href: "/",
        }}
        segments={[]}
        className={fr.cx("fr-mb-2w", "fr-mt-2w")}
      />
    </div>
    <Container>
      <h1>
        Code du travail, convention, accord&nbsp;: quelles règles
        s&apos;appliquent dans votre entreprise&nbsp;?
      </h1>
      <p className={fr.cx("fr-mt-6w")}>
        Le Code du travail fixe le cadre légal général. Néanmoins, pour
        s&apos;adapter au plus près des réalités de terrain et des spécificités
        de chaque secteur d&apos;activité, ce cadre est complété et aménagé par
        deux types de textes issus des discussions entre les partenaires
        sociaux&nbsp;: la convention collective et l&apos;accord
        d&apos;entreprise.
      </p>
      <h2 id="convention-collective">La Convention Collective</h2>
      <p>
        La convention collective est un texte conclu entre les organisations
        patronales et les syndicats de salariés d’un même secteur d’activité,
        pour adapter les règles générales du Code du travail aux particularités
        de ce secteur (“la branche”).
      </p>
      <p>
        Elle est le socle social commun à toutes les entreprises d’une même
        filière et s’applique à l&apos;ensemble des salariés (CDI, CDD).
      </p>
      <p>
        Savez-vous à quelle branche vous appartenez&nbsp;?{" "}
        <Link href={"/outils/convention-collective"}>
          Cliquez ici pour trouver votre convention collective
        </Link>
      </p>
      <h2 id="accord-entreprise">L&apos;accord d&apos;entreprise</h2>
      <p>
        L&apos;accord d&apos;entreprise est un texte négocié au sein même
        d&apos;une entreprise entre l&apos;employeur et les délégués syndicaux
        ou, selon la taille de l&apos;entreprise, les élus du personnel (Comité
        Social et Économique - CSE). Il s&apos;applique uniquement aux salariés
        de l&apos;entreprise.
      </p>
      <p>
        Savez-vous si votre entreprise a signé un accord d’entreprise&nbsp;?{" "}
        <Link href={"/outils/convention-collective"}>
          Cliquez ici pour vérifier si des accords existent pour votre
          établissement
        </Link>
      </p>
      <h2>A quoi servent ces textes&nbsp;?</h2>
      <p>
        Ils traitent principalement des conditions d&apos;emploi et de travail
        et peuvent par exemple&nbsp;:
      </p>
      <ul>
        <li>Fixer un salaire minimal plus élevé que le SMIC</li>
        <li>Prévoir des primes spécifiques</li>
        <li>
          Aménager la durée du préavis en cas de démission ou de licenciement
        </li>
        <li>Prévoir des congés supplémentaires</li>
        <li>Garantir certaines protections en cas de licenciement etc.</li>
        <li>
          Aménager le temps de travail (ex&nbsp;: instaurer la semaine de 4
          jours)
        </li>
        <li>Mettre en place le télétravail et le droit à la déconnexion</li>
      </ul>
      <div className={fr.cx("fr-highlight", "fr-mt-4w", "fr-mb-4w")}>
        <p>
          Impact concret pour vous&nbsp;: depuis les dernières réformes, un
          accord d&apos;entreprise peut prévoir des règles différentes de celles
          de la convention collective, y compris lorsqu&apos;elles sont moins
          favorables au salarié. Connaître sa convention collective et les
          accords en vigueur dans son entreprise permet de savoir concrètement
          quelles règles s&apos;appliquent à sa situation.
        </p>
        <Button
          linkProps={{
            href: "/outils/convention-collective",
          }}
          iconId="ri-search-line"
          iconPosition="left"
          priority="primary"
        >
          Identifier les règles applicables dans votre entreprise
        </Button>
      </div>
    </Container>
  </>
);
