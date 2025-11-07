import React, { useState, useEffect } from "react";
import { useAgreementSearchTracking } from "../../tracking";
import { Agreement } from "src/modules/outils/indemnite-depart/types";

type Props = {
  onSearch?: (query: string, value?: Agreement[]) => void;
  onAgreementSelect?: (agreement?: Agreement) => void;
  lineAsLink?: boolean;
  selectedAgreementAlert?: (
    agreement?: Agreement
  ) => React.ReactNode | undefined;
  defaultAgreement?: Agreement;
  trackingActionName: string;
  level: 2 | 3;
  emitSearchQueryEvent?: (query: string) => void;
  mockSearchAgreement?: (query: string) => Agreement[];
};

const searchAgreement = (query: string): Agreement[] => {
  switch (query) {
    case "16":
      return [
        {
          url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
          id: "KALICONT000005635624",
          num: 16,
          shortTitle:
            "Transports routiers et activités auxiliaires du transport",
          slug: "16-transports-routiers-et-activites-auxiliaires-du-transport",
          title: "Transports routiers et activités auxiliaires du transport",
          contributions: true,
        },
      ];
    case "1351":
      return [
        {
          url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635405",
          id: "KALICONT000005635405",
          num: 1351,
          shortTitle: "Entreprises de prévention et de sécurité",
          slug: "1351-entreprises-de-prevention-et-de-securite",
          title: "Entreprises de prévention et de sécurité",
          contributions: true,
        },
      ];
    case "3239":
      return [
        {
          url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000044594539",
          id: "KALICONT000044594539",
          num: 3239,
          shortTitle: "Particuliers employeurs et emploi à domicile",
          slug: "3239-particuliers-employeurs-et-emploi-a-domicile",
          title: "Particuliers employeurs et emploi à domicile",
          contributions: true,
        },
      ];
    default:
      return [];
  }
};

export const AgreementSearchInput = ({
  onSearch,
  onAgreementSelect,
  lineAsLink,
  selectedAgreementAlert,
  defaultAgreement,
  trackingActionName,
  level,
  emitSearchQueryEvent,
  mockSearchAgreement = searchAgreement,
}: Props) => {
  const [selectedAgreement, setSelectedAgreement] = useState<
    Agreement | undefined
  >(defaultAgreement);
  const [searchState, setSearchState] = useState<
    "noSearch" | "lowSearch" | "notFoundSearch" | "errorSearch" | "fullSearch"
  >("noSearch");
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Agreement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { emitAgreementSearchInputEvent } = useAgreementSearchTracking();

  const getStateMessage = () => {
    switch (searchState) {
      case "lowSearch":
        return (
          <>
            Indiquez au moins 3 caractères afin d&apos;affiner votre recherche
          </>
        );
      case "notFoundSearch":
        return (
          <>
            Aucune convention collective n&apos;a été trouvée.
            <br />
            Vérifiez l&apos;orthographe de votre recherche ou le chiffre IDCC
            présent sur votre bulletin de paie
          </>
        );
      case "errorSearch":
        return <>{error}</>;
    }
  };

  const getInputState = () => {
    switch (searchState) {
      case "lowSearch":
        return "info";
      case "errorSearch":
      case "notFoundSearch":
        return "error";
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setLoading(true);

    try {
      if (!query) {
        setSearchState("noSearch");
        setSearchResults([]);
        return;
      }

      emitAgreementSearchInputEvent(query, trackingActionName);
      emitSearchQueryEvent?.(query);

      const results = mockSearchAgreement(query);
      setSearchResults(results);

      if (query.length <= 2) {
        setSearchState("lowSearch");
      } else if (!results.length && query.length > 2) {
        setSearchState("notFoundSearch");
      } else {
        setSearchState("fullSearch");
      }

      if (onSearch) onSearch(query, results);
    } catch (e) {
      setSearchState("errorSearch");
      setError("Une erreur s'est produite lors de la recherche");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAgreementSelect = (agreement: Agreement | undefined) => {
    setSelectedAgreement(agreement);
    if (onAgreementSelect) onAgreementSelect(agreement);
  };

  useEffect(() => {
    if (defaultAgreement) {
      setSelectedAgreement(defaultAgreement);
    }
  }, [defaultAgreement]);

  if (selectedAgreement && selectedAgreementAlert?.(selectedAgreement)) {
    return (
      <div data-testid="selected-agreement">
        <p>Vous avez sélectionné la convention collective</p>
        <div>{`${selectedAgreement.shortTitle} (IDCC ${selectedAgreement.num})`}</div>
      </div>
    );
  }

  return (
    <div data-testid="agreement-search-input-mock">
      {React.createElement(
        `h${level}`,
        {
          className: "fr-h4 fr-mt-2w fr-mb-0",
        },
        "Précisez et sélectionnez votre convention collective"
      )}
      <div className="fr-mt-2w">
        <div className="fr-col-12">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="agreement-search-input">
              Nom de la convention collective ou son numéro
              d&apos;identification IDCC (4&nbsp;chiffres)
              <span className="fr-hint-text">
                Ex : transport routier ou 1486
              </span>
            </label>
            <input
              className={`fr-input ${getInputState() === "error" ? "fr-input--error" : ""} ${getInputState() === "info" ? "fr-input--info" : ""}`}
              type="text"
              id="agreement-search-input"
              data-testid="AgreementSearchAutocomplete"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              aria-describedby={
                searchState !== "noSearch"
                  ? "agreement-search-input-error"
                  : undefined
              }
            />
            {searchState !== "noSearch" && (
              <p
                className={`fr-${
                  searchState === "lowSearch" ? "hint-text" : "error-text"
                }`}
                id="agreement-search-input-error"
              >
                {getStateMessage()}
              </p>
            )}
          </div>

          {loading && (
            <div className="fr-mt-2w">
              <p className="fr-h5 fr-mb-0">Chargement en cours...</p>
            </div>
          )}

          {searchResults.length > 0 && !loading && (
            <div className="fr-mt-2w">
              <ul className="fr-mb-0 fr-pl-0" style={{ listStyle: "none" }}>
                {searchResults.map((agreement, index) => (
                  <li key={index} className="fr-mb-2w">
                    <div
                      className="fr-card fr-card--sm fr-card--border fr-card--shadow"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleAgreementSelect(agreement)}
                      data-testid={`agreement-option-${index}`}
                    >
                      <div className="fr-card__body">
                        <div className="fr-card__content fr-pt-1w fr-pb-1w fr-px-2w">
                          <h3 className="fr-h5 fr-mb-1w">
                            {agreement.shortTitle} (IDCC {agreement.num})
                          </h3>
                          <p className="fr-mb-0 fr-text--sm fr-text-mention--grey">
                            {lineAsLink ? (
                              <a
                                href={`/${agreement.slug}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                Voir la convention
                              </a>
                            ) : (
                              "Cliquez pour sélectionner"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedAgreement && selectedAgreementAlert?.(selectedAgreement) && (
            <div className="fr-mt-2w">
              <div className="fr-alert fr-alert--warning">
                <h3 className="fr-alert__title">
                  Nous n&apos;avons pas de réponse pour cette convention
                  collective
                </h3>
                <p>{selectedAgreementAlert(selectedAgreement)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
