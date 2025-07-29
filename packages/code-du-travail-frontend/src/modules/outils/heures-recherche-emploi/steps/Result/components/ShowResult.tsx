import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import {
  PublicodesInstance,
  PublicodesSimulator,
} from "@socialgouv/modeles-social";

// Fonction utilitaire pour calculer le nombre d'éléments
const calculateNumberOfElements = (...args: any[]): number =>
  args.filter((item) => item !== null && item !== undefined).length;

type Props = {
  situation: any; // Situation du calcul (équivalent à l'ancien code)
  typeRupture?: string; // Type de rupture pour détecter la rupture conventionnelle
  ccn?: {
    selected?: {
      shortTitle?: string;
      title?: string;
    };
  };
  idcc?: number;
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className={fr.cx("fr-h5", "fr-mt-4w")}>{children}</h3>
);

const HighlightResult = ({ children }: { children: React.ReactNode }) => (
  <strong className={fr.cx("fr-text--lg")}>{children}</strong>
);

const SmallText = ({ children }: { children: React.ReactNode }) => (
  <div className={fr.cx("fr-text--sm", "fr-mt-1w")}>{children}</div>
);

const NoticeNote = ({
  isList = false,
  numberOfElements = 1,
  currentElement = 1,
}: {
  isList?: boolean;
  numberOfElements?: number;
  currentElement?: number;
}) => {
  if (isList && numberOfElements > 1) {
    return (
      <span className={fr.cx("fr-text--xs")}>[{numberOfElements} notes] </span>
    );
  }
  if (numberOfElements > 1) {
    return <span className={fr.cx("fr-text--xs")}>[{currentElement}] </span>;
  }
  return null;
};

// Composant pour gérer la rupture conventionnelle
const ResultRuptureConventionnel = () => (
  <>
    <SectionTitle>
      Nombre d&apos;heures d&apos;absence autorisée pour rechercher un emploi
    </SectionTitle>
    <p>
      Il n&apos;y a pas d&apos;heures d&apos;absence autorisée pour rechercher
      un emploi dans le cas d&apos;une rupture conventionnelle
    </p>
  </>
);

// Composant pour gérer les résultats avec durée
const Duration = ({ situation }: { situation: any }) => {
  if (!situation.answer) {
    return (
      <p>
        D&apos;après les éléments saisis, dans votre situation, la convention
        collective ne prévoit pas d&apos;heures d&apos;absence autorisée pour
        rechercher un emploi.
      </p>
    );
  }

  const wording = /rupture en cours de période d'essai/i.test(
    situation.typeRupture
  )
    ? "D'après les éléments saisis, durant son préavis (ou délai de prévenance), le salarié peut s'absenter pour rechercher un emploi pendant"
    : "D'après les éléments saisis, durant son préavis, le salarié peut s'absenter pour rechercher un emploi pendant";

  const note = situation?.note;

  return (
    <>
      <p>
        {wording}&nbsp;:
        <br />
        <HighlightResult>{situation.answer}</HighlightResult>
        &nbsp;
        <NoticeNote
          isList
          numberOfElements={
            Array.isArray(note) ? note.length : calculateNumberOfElements(note)
          }
        />
        .
        {note && !Array.isArray(note) && (
          <SmallText>
            <NoticeNote
              numberOfElements={calculateNumberOfElements(note)}
              currentElement={calculateNumberOfElements(note)}
            />
            {note}
          </SmallText>
        )}
        {note &&
          Array.isArray(note) &&
          note.map((text, index) => (
            <SmallText key={index}>
              <NoticeNote
                numberOfElements={note.length}
                currentElement={index + 1}
              />
              {text}
            </SmallText>
          ))}
      </p>
      {situation.answer2 && (
        <>
          <SectionTitle>
            Rémunération pendant les heures d&apos;absence autorisée
          </SectionTitle>
          <p>{situation.answer2}</p>
        </>
      )}
      {situation.answer3 && (
        <>
          <SectionTitle>Conditions d&apos;utilisation</SectionTitle>
          <p>{situation.answer3}</p>
        </>
      )}
    </>
  );
};

// Composant pour afficher les détails
const ShowDetails = ({ children }: { children: React.ReactNode }) => (
  <details className={fr.cx("fr-accordion")}>
    <summary className={fr.cx("fr-accordion__btn")}>Voir les détails</summary>
    <div className={fr.cx("fr-collapse")}>
      <div className={fr.cx("fr-p-2w")}>{children}</div>
    </div>
  </details>
);

// Fonction pour créer le récapitulatif de situation
const recapSituation = (data: Record<string, string>) => (
  <div className={fr.cx("fr-table", "fr-table--no-scroll")}>
    <div className={fr.cx("fr-table__wrapper")}>
      <div className={fr.cx("fr-table__container")}>
        <div className={fr.cx("fr-table__content")}>
          <table>
            <tbody>
              {Object.entries(data).map(([key, value]) => (
                <tr key={key}>
                  <td>
                    <strong>{key}</strong>
                  </td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

// Composant pour afficher les références publiques
const PubliReferences = ({ references }: { references?: any[] }) => {
  if (!references || references.length === 0) return null;

  return (
    <div className={fr.cx("fr-mt-3w")}>
      <h4>Références juridiques</h4>
      <ul>
        {references.map((ref, index) => (
          <li key={index}>
            {ref.url ? (
              <a href={ref.url} target="_blank" rel="noopener noreferrer">
                {ref.title}
              </a>
            ) : (
              ref.title
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Fonction pour formater les références
const formatRefs = (refs: any) => {
  if (!refs) return [];
  if (Array.isArray(refs)) {
    return refs.map((ref) => ({
      title: ref.ref || ref.title || "Référence",
      url: ref.refUrl || ref.url,
    }));
  }
  return [];
};

export const ShowResult = ({ situation, typeRupture, ccn, idcc }: Props) => {
  // Cas spécial : rupture conventionnelle
  if (typeRupture === "Rupture conventionnelle") {
    return <ResultRuptureConventionnel />;
  }

  // Préparer les références
  const refs: any[] =
    situation.ref && situation.refUrl
      ? [
          {
            ref: situation.ref,
            refUrl: situation.refUrl,
          },
        ]
      : (situation.refs ?? []);

  return (
    <>
      <SectionTitle>
        Nombre d&apos;heures d&apos;absence autorisée pour rechercher un emploi
      </SectionTitle>
      <Duration situation={situation} />
      <ShowDetails>
        <SectionTitle>Éléments saisis</SectionTitle>
        {recapSituation({
          ...(ccn?.selected && {
            "Convention collective": `${ccn.selected.shortTitle || ccn.selected.title} ${idcc ? `(IDCC ${idcc})` : ""}`,
          }),
          "Type de rupture du contrat de travail": typeRupture || "",
          ...situation.criteria,
        })}
        <PubliReferences references={formatRefs(refs)} />
      </ShowDetails>
    </>
  );
};
