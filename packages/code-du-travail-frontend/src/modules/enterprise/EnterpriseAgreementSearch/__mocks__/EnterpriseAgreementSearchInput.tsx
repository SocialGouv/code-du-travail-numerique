import React, { useState, useEffect } from "react";
import { useEnterpriseAgreementSearchTracking } from "../tracking";
import { SearchParams } from "../../queries";
import { Enterprise } from "../../types";

type Props = {
  widgetMode?: boolean;
  onAgreementSelect?: (agreement?: any, enterprise?: any) => void;
  selectedAgreementAlert?: (agreement?: any) => React.ReactNode | undefined;
  defaultSearch?: string;
  defaultLocation?: any;
  enterprise?: any;
  agreement?: any;
  trackingActionName: string;
  level: 2 | 3;
  isInSimulator?: boolean;
  canContinueSimulationIfNoAgreement?: boolean;
  onBackToPersonalize?: () => void;
};

const searchEnterprises = (searchParams: SearchParams): Enterprise[] => {
  const query = searchParams.query.toLowerCase();

  if (query.includes("carrefour")) {
    return [
      {
        activitePrincipale: "47.11F - Hypermarchés",
        etablissements: 208,
        highlightLabel: "CARREFOUR HYPERMARCHES",
        label: "CARREFOUR HYPERMARCHES",
        simpleLabel: "CARREFOUR HYPERMARCHES",
        matching: 208,
        siren: "451321335",
        address:
          "ZAE SAINT GUENAULT 1 RUE JEAN MERMOZ 91000 EVRY-COURCOURONNES",
        firstMatchingEtablissement: {
          siret: "45132133500023",
          address:
            "ZAE SAINT GUENAULT 1 RUE JEAN MERMOZ 91000 EVRY-COURCOURONNES",
        },
        complements: {
          liste_idcc: ["2216", "1486"],
        },
        conventions: [
          {
            id: "2216",
            contributions: true,
            num: 2216,
            shortTitle:
              "Commerce de détail et de gros à prédominance alimentaire",
            title:
              "Convention collective nationale du commerce de détail et de gros à prédominance alimentaire du 12 juillet 2001.  Etendue par arrêté du 26 juillet 2002 JORF 6 août 2002.",
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635085",
            slug: "2216-commerce-de-detail-et-de-gros-a-predominance-alimentaire",
          },
          {
            id: "1486",
            contributions: true,
            num: 1486,
            shortTitle:
              "Bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseils",
            title:
              "Bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseils",
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635173",
            slug: "1486-bureaux-detudes-techniques-cabinets-dingenieurs-conseils-et-societes-de",
          },
        ],
      },
      {
        label: "CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)",
        siren: "345130488",
        address: "ZI ROUTE DE PARIS 14120 MONDEVILLE",
        highlightLabel: "CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)",
        simpleLabel: "CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)",
        etablissements: 1,
        matching: 1,
        complements: {
          liste_idcc: ["2216"],
        },
        conventions: [
          {
            id: "2216",
            contributions: true,
            num: 2216,
            shortTitle:
              "Commerce de détail et de gros à prédominance alimentaire",
            title:
              "Convention collective nationale du commerce de détail et de gros à prédominance alimentaire du 12 juillet 2001.  Etendue par arrêté du 26 juillet 2002 JORF 6 août 2002.",
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635085",
            slug: "2216-commerce-de-detail-et-de-gros-a-predominance-alimentaire",
          },
        ],
      },
    ];
  }

  if (query.includes("bricomanie")) {
    return [
      {
        activitePrincipale:
          "47.52Z - Commerce de détail de quincaillerie, peintures et verres en magasins spécialisés",
        etablissements: 85,
        highlightLabel: "BRICOMANIE",
        label: "BRICOMANIE",
        simpleLabel: "BRICOMANIE",
        matching: 85,
        siren: "123456789",
        address: "123 AVENUE DU BRICOLAGE 75000 PARIS",
        firstMatchingEtablissement: {
          siret: "12345678900123",
          address: "123 AVENUE DU BRICOLAGE 75000 PARIS",
        },
        complements: {
          liste_idcc: [],
        },
        conventions: [],
      },
    ];
  }

  if (query.includes("bnp")) {
    return [
      {
        activitePrincipale: "Autres intermédiations monétaires",
        etablissements: 2032,
        highlightLabel: "BNP PARIBAS (HELLO BANK!)",
        label: "BNP PARIBAS (HELLO BANK!)",
        simpleLabel: "BNP PARIBAS (HELLO BANK!)",
        matching: 2032,
        siren: "662042449",
        address: "16 BOULEVARD DES ITALIENS 75009 PARIS",
        firstMatchingEtablissement: {
          siret: "66204244908280",
          address:
            "ANGLE DE RUE 19 RUE DES LAVANDIERES 55 RUE DE RIVOLI 75001 PARIS",
        },
        conventions: [
          {
            id: "2120",
            contributions: true,
            num: 2120,
            shortTitle: "Banque",
            title:
              "Convention collective nationale de la banque du 10 janvier 2000.  Etendue par arrêté du 17 novembre 2004 JORF 11 décembre 2004.",
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635780",
            slug: "2120-banque",
          },
          {
            id: "9999",
            num: 9999,
            shortTitle: "___Sans convention collective___",
            title: "___Sans convention collective___",
            contributions: false,
          },
          {
            id: "2931",
            contributions: false,
            num: 2931,
            shortTitle: "Activités de marchés financiers",
            title:
              "Convention collective nationale des activités de marchés financiers du 11 juin 2010",
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000025496787",
            slug: "2931-activites-de-marches-financiers",
          },
        ],
        complements: {
          liste_idcc: [],
        },
      },
    ];
  }

  return [];
};

export const EnterpriseAgreementSearchInput = ({
  widgetMode = false,
  defaultSearch,
  defaultLocation,
  onAgreementSelect,
  selectedAgreementAlert,
  trackingActionName,
  enterprise,
  agreement,
  level,
  isInSimulator,
  canContinueSimulationIfNoAgreement,
  onBackToPersonalize,
}: Props) => {
  const [selectedAgreement, setSelectedAgreement] = useState<any>(agreement);
  const [searchState, setSearchState] = useState<
    "noSearch" | "notFoundSearch" | "errorSearch" | "fullSearch" | "required"
  >("noSearch");
  const {
    emitEnterpriseAgreementSearchInputEvent,
    emitSelectEnterpriseEvent,
    emitNoEnterpriseClickEvent,
    emitSelectEnterpriseAgreementEvent,
    emitNoEnterpriseSelectEvent,
  } = useEnterpriseAgreementSearchTracking();

  const [search, setSearch] = useState<string | undefined>(defaultSearch);
  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<any>(defaultLocation);
  const [enterprises, setEnterprises] = useState<Enterprise[]>();
  const [selectedEnterprise, setSelectedEnterprise] = useState<any>(enterprise);
  const [error, setError] = useState("");

  const getStateMessage = () => {
    switch (searchState) {
      case "notFoundSearch":
        return (
          <>
            Aucune entreprise n&apos;a été trouvée.
            <br />
            Vérifiez l&apos;orthographe des termes de recherche
          </>
        );
      case "required":
        return <>Le nom de l&apos;entreprise doit être renseigné</>;
      case "errorSearch":
        return <>{error}</>;
    }
  };

  const onSubmit = async () => {
    if (!search) {
      setSearchState("required");
      return;
    }
    emitEnterpriseAgreementSearchInputEvent(
      trackingActionName,
      search,
      location
    );
    setLoading(true);
    try {
      const result = searchEnterprises({
        query: search,
        codesPostaux: location?.codesPostaux,
      });
      setSearchState(
        search.length > 0 && !result.length ? "notFoundSearch" : "noSearch"
      );
      setEnterprises(result);
    } catch (e) {
      setSearchState("errorSearch");
      setEnterprises(undefined);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (defaultSearch) {
      onSubmit();
    }
  }, [defaultSearch]);

  useEffect(() => {
    if (agreement) {
      setSelectedAgreement(agreement);
    }
  }, [agreement]);

  useEffect(() => {
    if (enterprise) {
      setSelectedEnterprise(enterprise);
    }
  }, [enterprise]);

  const handleEnterpriseClick = (ent: any) => {
    setSelectedEnterprise(ent);
    if (ent.conventions && ent.conventions.length === 1) {
      const agreement = ent.conventions[0];
      setSelectedAgreement(agreement);
      emitSelectEnterpriseEvent(trackingActionName, {
        label: ent.label,
        siren: ent.siren,
      });
      emitSelectEnterpriseAgreementEvent(
        `idcc${ent.conventions[0].num}`,
        trackingActionName
      );
      if (onAgreementSelect) {
        onAgreementSelect(agreement, ent);
      }
    } else if (!ent.conventions || ent.conventions.length === 0) {
      if (onAgreementSelect) {
        onAgreementSelect(undefined, ent);
      }
    }
  };

  const handleChildminderClick = () => {
    const assMatAgreement = {
      contributions: true,
      num: 3239,
      id: "3239",
      shortTitle: "Particuliers employeurs et emploi à domicile",
      slug: "3239-particuliers-employeurs-et-emploi-a-domicile",
      title: "Particuliers employeurs et emploi à domicile",
      url: "/3239-particuliers-employeurs-et-emploi-a-domicile",
    };
    setSelectedAgreement(assMatAgreement);
    emitNoEnterpriseSelectEvent();
    if (onAgreementSelect) {
      onAgreementSelect(assMatAgreement);
    }
  };

  const handleAgreementSelect = (agreementToSelect: any) => {
    setSelectedAgreement(agreementToSelect);
    emitSelectEnterpriseAgreementEvent(
      `idcc${agreementToSelect.num}`,
      trackingActionName
    );
    if (onAgreementSelect) {
      onAgreementSelect(agreementToSelect, selectedEnterprise);
    }
  };

  if (onAgreementSelect && selectedAgreement) {
    return (
      <div data-testid="selected-agreement">
        {selectedEnterprise && (
          <div data-testid="enterprise-detail">
            <h2>Votre entreprise</h2>
            <p>{selectedEnterprise.label}</p>
          </div>
        )}
        <p>Vous avez sélectionné la convention collective</p>
        <div>{`${selectedAgreement.shortTitle} IDCC ${selectedAgreement.id}`}</div>
      </div>
    );
  }

  if (
    selectedEnterprise &&
    selectedEnterprise.conventions &&
    selectedEnterprise.conventions.length > 1
  ) {
    return (
      <div data-testid="enterprise-conventions-list">
        <p>
          Votre entreprise a plusieurs conventions collectives. Veuillez
          sélectionner celle qui correspond à votre situation :
        </p>
        <div>
          {selectedEnterprise.conventions.map((conv: any, index: number) => (
            <div key={conv.id || index} style={{ marginBottom: "0.5rem" }}>
              <a
                href="#"
                role="link"
                data-testid={`agreement-option-${conv.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleAgreementSelect(conv);
                }}
              >
                {conv.shortTitle} IDCC {conv.num}
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div data-testid="enterprise-agreement-search-input-mock">
      <h2 className="fr-h4 fr-my-2w">Précisez votre entreprise</h2>
      <label htmlFor="enterprise-search-input">
        Nom de votre entreprise ou numéro Siren/Siret (obligatoire)
      </label>
      <input
        type="text"
        id="enterprise-search-input"
        data-testid="enterprise-search-input"
        value={search || ""}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
        type="text"
        id="locationSearchAutocomplete"
        data-testid="locationSearchAutocomplete"
        placeholder="Code postal (optionnel)"
      />
      <button
        data-testid="agreement-company-search-button"
        onClick={onSubmit}
        type="button"
      >
        Rechercher
      </button>
      <div style={{ marginTop: "1rem" }}>
        <a
          href="#"
          role="link"
          onClick={(e) => {
            e.preventDefault();
            handleChildminderClick();
          }}
        >
          Particuliers employeurs et emploi à domicile
        </a>
      </div>
      {!!enterprises?.length &&
        !loading &&
        enterprises?.map((enterprise, index) => (
          <div key={index}>
            <a
              href="#"
              role="link"
              onClick={(e) => {
                e.preventDefault();
                handleEnterpriseClick(enterprise);
              }}
            >
              {enterprise.label}
            </a>
          </div>
        ))}
    </div>
  );
};
