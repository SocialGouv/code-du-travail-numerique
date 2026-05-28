"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { useEnterpriseAgreementSearch } from "./useEnterpriseAgreementSearch";
import { EnterpriseSearchFormAndResults } from "./EnterpriseSearchFormAndResults";
import { EnterpriseEtablissementCard } from "./EnterpriseEtablissementCard";
import { ApiGeoResult } from "./searchCities";
import { ListWithArrow } from "../../common/ListWithArrow";
import { css } from "@styled-system/css";
import React from "react";
import Link from "../../common/Link";

const MAX_ETABLISSEMENTS = 5;

type Props = {
  widgetMode?: boolean;
  defaultSearch?: string;
  defaultLocation?: ApiGeoResult;
  trackingActionName: string;
  level: 2 | 3;
};

export const EnterpriseAgreementSearchInput = ({
  widgetMode = false,
  defaultSearch,
  defaultLocation,
  trackingActionName,
  level,
}: Props) => {
  const {
    search,
    setSearch,
    location,
    setLocation,
    enterprises,
    loading,
    searchState,
    error,
    onSubmit,
    resultRef,
    getStateMargin,
    getInputState,
    getQueries,
    tracking,
  } = useEnterpriseAgreementSearch({
    defaultSearch,
    defaultLocation,
    trackingActionName,
  });

  return (
    <EnterpriseSearchFormAndResults
      search={search}
      setSearch={setSearch}
      location={location}
      setLocation={setLocation}
      enterprises={enterprises}
      loading={loading}
      searchState={searchState}
      error={error}
      onSubmit={onSubmit}
      resultRef={resultRef}
      getStateMargin={getStateMargin}
      getInputState={getInputState}
      level={level}
      buildAssistantsMaternielsLinkProps={() => ({
        href: `/convention-collective/3239-particuliers-employeurs-et-emploi-a-domicile`,
        ...(widgetMode ? { target: "_blank" } : {}),
        onClick: () => tracking.emitNoEnterpriseClickEvent(),
      })}
      buildEnterpriseEnd={(enterprise) => {
        const etablissements = enterprise.matchingEtablissements;
        if (!etablissements)
          return <Badge severity="info" noIcon>{`0 établissements`}</Badge>;
        if (etablissements?.length > MAX_ETABLISSEMENTS) {
          return (
            <div>
              <Badge
                severity="info"
                noIcon
              >{`${enterprise.matching} établissements`}</Badge>
              <span
                className={`${fr.cx("fr-icon-warning-fill", "fr-ml-2v", "fr-mr-2v")} ${css(
                  {
                    color: "var(--text-default-warning)",
                  }
                )}`}
              />
              <span className={fr.cx("fr-text--md")}>
                Sélectionnez une ville ou saisissez le code SIRET (13 chiffres)
                pour affiner les établissements.
              </span>
            </div>
          );
        }
        return (
          <>
            <Badge
              severity="info"
              noIcon
            >{`${enterprise.matching} établissements`}</Badge>
            <div className={fr.cx("fr-mt-2w")}>
              <ListWithArrow
                withSeparators
                small
                items={etablissements.map((etablissement) => (
                  <Link
                    className={fr.cx("fr-link")}
                    key={etablissement.siret}
                    onClick={() =>
                      tracking.emitSelectEnterpriseEvent(trackingActionName, {
                        label: enterprise.label,
                        siren: etablissement.siret,
                      })
                    }
                    href={`/${widgetMode ? "widgets" : "outils"}/convention-collective/entreprise/${etablissement.siret}${getQueries()}`}
                  >
                    {etablissement.address} - SIRET: {etablissement.siret}
                  </Link>
                ))}
              />
            </div>
          </>
        );
      }}
    />
  );
};
