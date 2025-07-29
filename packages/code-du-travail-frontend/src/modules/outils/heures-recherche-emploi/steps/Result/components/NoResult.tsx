import React from "react";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
  idcc?: number;
  ccn?: {
    shortTitle?: string;
    title?: string;
  };
  legalRefs?: any[];
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className={fr.cx("fr-h5", "fr-mt-4w")}>{children}</h3>
);

const HighlightResult = ({ children }: { children: React.ReactNode }) => (
  <strong className={fr.cx("fr-text--lg")}>{children}</strong>
);

// Composant pour afficher les informations de recherche CC
const CCSearchInfo = ({
  ccn,
}: {
  ccn?: { shortTitle?: string; title?: string };
}) => {
  if (!ccn) return null;

  return (
    <div className={fr.cx("fr-callout", "fr-callout--blue-cumulus")}>
      <h4 className={fr.cx("fr-callout__title")}>Information</h4>
      <p className={fr.cx("fr-callout__text")}>
        Votre convention collective :{" "}
        <strong>{ccn.shortTitle || ccn.title}</strong>
      </p>
    </div>
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

// Fonction pour formater les références (simplifiée)
const formatRefs = (refs: any[]) => {
  if (!refs) return [];
  return refs.map((ref) => ({
    title: ref.ref || ref.title || "Référence",
    url: ref.refUrl || ref.url,
  }));
};

// Composant Disclaimer spécifique au NoResult
const NoResultDisclaimer = () => (
  <div className={fr.cx("fr-alert", "fr-alert--info")}>
    <h4 className={fr.cx("fr-alert__title")}>
      Attention il peut exister une durée plus favorable
    </h4>
    <p>
      Une convention collective, un accord d&apos;entreprise ou à défaut un
      usage dans la profession ou l&apos;entreprise peut prévoir que le salarié
      bénéficie d&apos;heures d&apos;absence autorisée pour rechercher un emploi
      pendant le préavis. Il peut s&apos;agir du préavis en cas de rupture de la
      période d&apos;essai, de démission ou de licenciement.
    </p>
  </div>
);

export const NoResult: React.FC<Props> = ({ idcc, ccn, legalRefs }) => {
  return (
    <>
      <SectionTitle>
        Nombre d&apos;heures d&apos;absence autorisée pour rechercher un emploi
      </SectionTitle>
      <p>
        <HighlightResult>Aucun résultat</HighlightResult>&nbsp;:&nbsp;la
        convention collective n&apos;a pas encore été traitée par nos services.
      </p>
      <CCSearchInfo ccn={ccn} />
      <p>
        Le code du travail ne prévoit pas le droit pour le salarié de
        s&apos;absenter pendant son préavis pour pouvoir rechercher un nouvel
        emploi. Il existe une exception dans les départements de la Moselle, du
        Bas-Rhin et du Haut-Rhin où le salarié, qui en fait la demande, a droit
        à un délai raisonnable pour rechercher un emploi pendant son préavis de
        licenciement.
      </p>
      <ShowDetails>
        <SectionTitle>Éléments saisis</SectionTitle>
        {recapSituation({
          ...(ccn && {
            "Convention collective": `${ccn.shortTitle || ccn.title} ${idcc ? `(IDCC ${idcc})` : ""}`,
          }),
        })}
        <PubliReferences references={legalRefs && formatRefs(legalRefs)} />
      </ShowDetails>
      <NoResultDisclaimer />
    </>
  );
};
