"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { createElement, ReactNode, RefObject } from "react";
import { css } from "@styled-system/css";

import Spinner from "../../common/Spinner.svg";
import { LocationSearchInput } from "./LocationSearchInput";
import { Enterprise } from "../types";
import { CardTitleStyle } from "../../convention-collective/style";
import { EnterpriseCard, CardProps } from "./EnterpriseCard";
import { ApiGeoResult } from "./searchCities";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";

type Props = {
  // State from hook
  search: string | undefined;
  setSearch: (value: string) => void;
  location: ApiGeoResult | undefined;
  setLocation: (value: ApiGeoResult | undefined) => void;
  enterprises: Enterprise[] | undefined;
  loading: boolean;
  searchState:
    | "noSearch"
    | "notFoundSearch"
    | "errorSearch"
    | "fullSearch"
    | "required";
  error: string;
  onSubmit: () => Promise<void>;
  resultRef: RefObject<HTMLHeadingElement | null>;
  getStateMargin: () => string;
  getInputState: () => "error" | undefined;
  level: 2 | 3;
  buildEnterpriseLinkProps?: (enterprise: Enterprise) => CardProps["linkProps"];
  buildAssistantsMaternielsLinkProps: () => CardProps["linkProps"];
  buildEnterpriseEnd?: (enterprise: Enterprise) => ReactNode;
  renderAfterEnterpriseCard?: (enterprise: Enterprise) => ReactNode;
};

export const EnterpriseSearchFormAndResults = ({
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
  level,
  buildEnterpriseLinkProps,
  buildAssistantsMaternielsLinkProps,
  buildEnterpriseEnd,
  renderAfterEnterpriseCard,
}: Props) => {
  const TitleTag = `h${level}` as "h2" | "h3";

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
  return (
    <>
      {createElement(
        `h${level}`,
        {
          className: fr.cx("fr-h4", "fr-my-2w"),
        },
        "Précisez votre entreprise"
      )}
      <form
        className={fr.cx(
          "fr-grid-row",
          "fr-grid-row--gutters",
          "fr-grid-row--bottom",
          "fr-mb-0"
        )}
        onSubmit={async (event) => {
          event.preventDefault();
          await onSubmit();
        }}
      >
        <Input
          className={fr.cx(
            "fr-col-12",
            "fr-col-xl-6",
            "fr-col-md-7",
            "fr-mb-0"
          )}
          hintText={
            <>
              Ex&nbsp;: Café de la mairie ou 40123778000127 (présent sur la
              fiche de paie du salarié)
            </>
          }
          label={
            <>Nom de votre entreprise ou numéro Siren/Siret (obligatoire)</>
          }
          state={getInputState()}
          stateRelatedMessage={getStateMessage()}
          nativeInputProps={{
            value: search ?? "",
            onChange: (event) => {
              setSearch(event.target.value);
            },
            // @ts-ignore
            "data-testid": "enterprise-search-input",
          }}
          classes={{
            label: css({
              "& > button": {
                padding: "0!",
                minHeight: "0!",
                height: "20px!",
                width: "24px!",
                marginLeft: "3px!",
              },
            }),
          }}
        />
        <div
          className={`${fr.cx("fr-col-12", "fr-col-md", "fr-mt-2w", "fr-mt-md-0")} ${getStateMargin()}`}
        >
          <LocationSearchInput
            onLocationChange={setLocation}
            defaultValue={location}
          />
        </div>
        <div
          className={`${fr.cx("fr-col-xl")} ${getStateMargin()} ${ButtonContainer}`}
        >
          <Button
            type="submit"
            iconPosition="right"
            iconId="fr-icon-search-line"
            data-testid="agreement-company-search-button"
          >
            Rechercher
          </Button>
        </div>
      </form>

      <div>
        <div className={fr.cx("fr-mt-2w")}>
          {enterprises && enterprises.length > 0 && !loading && (
            <TitleTag
              className={fr.cx("fr-h5")}
              tabIndex={-1}
              ref={resultRef}
              data-testid="result-title"
            >
              {enterprises.length}
              {enterprises.length > 1
                ? " entreprises trouvées"
                : " entreprise trouvée"}
            </TitleTag>
          )}
          {loading && (
            <div className={fr.cx("fr-grid-row")}>
              <p className={fr.cx("fr-h5", "fr-mb-0")}>Chargement en cours</p>
              <div
                className={`${fr.cx("fr-ml-1w", "fr-mt-1w")} ${SpinnerBlock}`}
              >
                <Image priority src={Spinner} alt="Chargement en cours" />
              </div>
            </div>
          )}
          {searchState === "notFoundSearch" && (
            <AccessibleAlert
              title="Vous ne trouvez pas votre entreprise&nbsp;?"
              titleAs={`h${level + 1}` as "h3" | "h4"}
              description={
                <>
                  <p>Il peut y avoir plusieurs explications à cela&nbsp;:</p>
                  <ul>
                    <li>
                      Votre entreprise a été enregistrée sous un autre nom ou un
                      autre code&nbsp;: si vous le pouvez, utilisez son numéro
                      Siret. Ce dernier doit être présent sur votre bulletin de
                      paie.
                    </li>
                    <li>
                      Votre entreprise a un statut particulier&nbsp;:
                      administration ou établissements publics, associations,
                      secteur agricole, La Poste, La Croix Rouge etc.
                    </li>
                    <li>
                      Votre entreprise n&apos;a pas de convention collective.
                    </li>
                  </ul>
                </>
              }
              severity="info"
            />
          )}
        </div>
        {!!enterprises?.length &&
          !loading &&
          enterprises?.map((enterprise, index) => (
            <div key={enterprise.label + index}>
              <EnterpriseCard
                className={fr.cx("fr-mt-2w")}
                titleAs={`h${level + 1}` as "h3" | "h4"}
                border
                enlargeLink={buildEnterpriseLinkProps !== undefined}
                linkProps={
                  buildEnterpriseLinkProps &&
                  buildEnterpriseLinkProps(enterprise)
                }
                desc={
                  enterprise.activitePrincipale ? (
                    <>Activité&nbsp;: {enterprise.activitePrincipale}</>
                  ) : undefined
                }
                end={
                  buildEnterpriseEnd ? (
                    buildEnterpriseEnd(enterprise)
                  ) : (
                    <Badge>{`${enterprise.matching} établissements`}</Badge>
                  )
                }
                size="large"
                title={enterprise.label}
                classes={{
                  title: `${fr.cx("fr-h5")} ${CardTitleStyle}`,
                  content: fr.cx("fr-px-2w", "fr-pt-2w", "fr-pb-2w"),
                  desc: fr.cx("fr-mt-1w", "fr-mr-6w"),
                  end: fr.cx("fr-mt-0", "fr-pt-1w", "fr-pb-2w"),
                }}
              />
              {renderAfterEnterpriseCard?.(enterprise)}
            </div>
          ))}
      </div>
      <div>
        <div
          role="heading"
          aria-level={level}
          className={fr.cx(
            "fr-text--bold",
            !loading ? "fr-mt-5w" : "fr-mt-2w",
            "fr-mb-1w"
          )}
        >
          Votre recherche concerne les assistants maternels, employés de
          maison&nbsp;?
        </div>
        <EnterpriseCard
          border
          enlargeLink
          titleAs={`h${level + 1}` as "h3" | "h4"}
          linkProps={buildAssistantsMaternielsLinkProps()}
          title="Particuliers employeurs et emploi à domicile"
          desc="Retrouvez les questions-réponses les plus fréquentes organisées par thème et élaborées par le Ministère du travail concernant cette convention collective."
          size="small"
          classes={{
            title: CardSmallTitleStyle,
            content: fr.cx("fr-px-2w", "fr-pt-1w", "fr-pb-3w"),
            desc: fr.cx("fr-mt-1w", "fr-mr-6w"),
            end: fr.cx("fr-mt-0", "fr-pt-1w", "fr-pb-2w"),
          }}
        />
      </div>
    </>
  );
};

const CardSmallTitleStyle = css({
  fontSize: "initial !important",
  "& > a": {
    _after: {
      top: "calc(50% - 8px)",
    },
  },
});

const SpinnerBlock = css({
  height: "100%",
  alignContent: "center",
  marginTop: "0.5rem",
});

const ButtonContainer = css({
  md: {
    maxW: "164px",
  },
});
