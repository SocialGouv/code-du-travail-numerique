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

  return [];
};

export const EnterpriseAgreementSearchInput = ({
  onAgreementSelect,
  agreement,
  enterprise,
  defaultSearch,
  trackingActionName,
}: Props) => {
  const [search, setSearch] = useState(defaultSearch || "");
  const [enterprises, setEnterprises] = useState<any[]>([]);
  const [selectedAgreement, setSelectedAgreement] = useState(agreement);
  const [selectedEnterprise, setSelectedEnterprise] = useState(enterprise);

  const {
    emitEnterpriseAgreementSearchInputEvent,
    emitSelectEnterpriseEvent,
    emitSelectEnterpriseAgreementEvent,
  } = useEnterpriseAgreementSearchTracking();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    emitEnterpriseAgreementSearchInputEvent(trackingActionName, search);
    const result = searchEnterprises({ query: search });
    setEnterprises(result);
  };

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
    // Emit enterprise select event
    emitSelectEnterpriseEvent(trackingActionName, {
      label: ent.label,
      siren: ent.siren,
    });
    if (ent.conventions && ent.conventions.length === 1) {
      const agreement = ent.conventions[0];
      setSelectedAgreement(agreement);
      // Emit agreement select event
      emitSelectEnterpriseAgreementEvent(
        `idcc${ent.conventions[0].num}`,
        trackingActionName
      );
      if (onAgreementSelect) {
        onAgreementSelect(agreement, ent);
      }
    }
  };

  if (selectedAgreement && selectedEnterprise) {
    return (
      <div data-testid="selected-agreement">
        <p>Vous avez sélectionné la convention collective</p>
        <div>{`${selectedAgreement.shortTitle} IDCC ${selectedAgreement.id}`}</div>
      </div>
    );
  }

  return (
    <div data-testid="enterprise-agreement-search-input-mock">
      <label htmlFor="enterprise-search-input">
        Nom de votre entreprise ou numéro Siren/Siret (obligatoire)
      </label>
      <input
        type="text"
        id="enterprise-search-input"
        data-testid="enterprise-search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        data-testid="agreement-company-search-button"
        onClick={handleSearch}
        type="button"
      >
        Rechercher
      </button>
      {enterprises.length > 0 && (
        <div data-testid="enterprise-results">
          {enterprises.map((ent, index) => (
            <div key={index}>
              <a
                href="#"
                role="link"
                onClick={(e) => {
                  e.preventDefault();
                  handleEnterpriseClick(ent);
                }}
              >
                {ent.label}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
