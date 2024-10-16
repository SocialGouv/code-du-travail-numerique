import { fr } from "@codegouvfr/react-dsfr";
import { Highlight } from "@codegouvfr/react-dsfr/Highlight";
import { ContainerSimulator } from "../layout/ContainerSimulator";
import { ElasticAgreement } from "@socialgouv/cdtn-types";
import Link from "next/link";
import { css } from "../../../styled-system/css";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import Button from "@codegouvfr/react-dsfr/Button";
import { ListWithArrow } from "../common/ListWithArrow";

type Agreement = Pick<ElasticAgreement, "shortTitle" | "slug">;

type Props = {
  agreements: Agreement[];
};

type AgreementsPerLetter = {
  [letter: string]: Agreement[];
};

const removeAccents = (text: string) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const Agreements = ({ agreements }: Props) => {
  const firstLettersAgreements = agreements.reduce<AgreementsPerLetter>(
    (agreementPerletter, agreement) => {
      const { shortTitle } = agreement;
      const firstLetter = removeAccents(shortTitle[0]);
      if (!agreementPerletter[firstLetter]) {
        return {
          ...agreementPerletter,
          [firstLetter]: [agreement],
        };
      }
      return {
        ...agreementPerletter,
        [firstLetter]: [...agreementPerletter[firstLetter], agreement],
      };
    },
    {}
  );
  return (
    <ContainerSimulator
      title="Votre convention collective"
      description=""
      relatedItems={[]}
      segments={[{ label: "Simulateurs", linkProps: { href: "/outils" } }]}
    >
      <h1 id="convention-collective" className={fr.cx("fr-mt-0", "fr-mb-3w")}>
        Votre convention collective
      </h1>
      <div className={`${fr.cx("fr-p-3w", "fr-mb-6w")} ${block}`}>
        <h2>Trouver sa convention collective</h2>
        <Highlight size="lg" className={fr.cx("fr-mb-12v")}>
          <span>
            La convention collective est un texte conclu au niveau d&apos;une
            branche d&apos;actrivité (Ex: Transports routiers). Elle adapte les
            règles du Code du travail sur des points précis, en fonction des
            situations particulières de la branche (primes, congés, salaires
            minima, préavis, prévoyance...)
          </span>
          <br />
          <br />
          <span className={fr.cx("fr-text--bold")}>
            Vous pouvez retrouver le nom de votre convention collective sur
            votre bulletin de paie ou sur votre contrat de travail.
          </span>
        </Highlight>
        <div
          className={fr.cx(
            "fr-grid-row",
            "fr-grid-row--center",
            "fr-mt-2w",
            "fr-mb-3w"
          )}
        >
          <Link
            href="/outils/convention-collective/convention"
            className={`${fr.cx("fr-icon-arrow-right-line", "fr-link--icon-right", "fr-col-3", "fr-mr-6w")}`}
          >
            Je connais ma convention collective je la saisie
          </Link>
          <Link
            href="/outils/convention-collective/entreprise"
            className={`${fr.cx("fr-icon-arrow-right-line", "fr-link--icon-right", "fr-col-3")}`}
          >
            Je cherche mon entreprise pour trouver ma convention collective
          </Link>
        </div>
      </div>
      <div className={fr.cx("fr-mb-6w")}>
        <h2>Les conventions collectives traitées</h2>
        <p className={fr.cx("fr-mb-6w")}>
          Les conventions collectives présentées sont les plus représentatives
          en terme de nombres de salariés.
        </p>
        <ul className={`${ul} ${fr.cx("fr-pl-0", "fr-m-0")}`}>
          {Object.keys(firstLettersAgreements).map((letter, index) => (
            <>
              {index !== 0 ? (
                <li className={fr.cx("fr-h3", "fr-px-1w", "fr-mb-0")}>-</li>
              ) : (
                <></>
              )}
              <li key={letter} className={"fr-mb-0"}>
                <Link href={`#${letter}`} className={fr.cx("fr-h3")}>
                  {letter}
                </Link>
              </li>
            </>
          ))}
        </ul>
      </div>
      <div>
        {Object.entries(firstLettersAgreements).map(([letter, agreements]) => (
          <>
            <div id={letter} className={fr.cx("fr-h3")}>
              {letter}
            </div>
            <ListWithArrow
              items={agreements.map(({ shortTitle, slug }) => {
                return (
                  <Link
                    key={slug}
                    href={`/${getRouteBySource(SOURCES.CCN)}/${slug}`}
                  >
                    {shortTitle}
                  </Link>
                );
              })}
            />
          </>
        ))}
      </div>
    </ContainerSimulator>
  );
};

const block = css({
  background: "var(--background-alt-blue-cumulus)",
});

const ul = css({
  listStyle: "none!",
  display: "flex",
  flexDirection: "row",
});
