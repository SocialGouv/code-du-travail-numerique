"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { ReactNode, useEffect, useState } from "react";
import { css } from "@styled-system/css";

import Spinner from "../../common/Spinner.svg";
import { LocationSearchInput } from "../../Location/LocationSearchInput";
import { searchEnterprises } from "../queries";
import { Enterprise, EnterpriseAgreement } from "../types";
import { ApiGeoResult } from "../../Location/searchCities";
import { CardTitleStyle, ButtonStyle } from "../../convention-collective/style";
import { EnterpriseAgreementSelectionForm } from "./EnterpriseAgreementSelectionForm";
import { useLocalStorageForAgreement } from "../../common/useLocalStorage";
import { EnterpriseAgreementSelectionDetail } from "./EnterpriseAgreementSelectionDetail";
import { getEnterpriseAgreements } from "./utils";

type Props = {
  widgetMode?: boolean;
  onAgreementSelect?: (agreement: EnterpriseAgreement) => void;
  selectedAgreementAlert?: (
    agreement?: EnterpriseAgreement
  ) => NonNullable<ReactNode> | undefined;
  defaultSearch?: string;
  defaultLocation?: ApiGeoResult;
};

export const EnterpriseAgreementSearchInput = ({
  widgetMode = false,
  defaultSearch,
  defaultLocation,
  onAgreementSelect,
  selectedAgreementAlert,
}: Props) => {
  const [agreement, setAgreement] = useLocalStorageForAgreement();
  if (onAgreementSelect && agreement) {
    onAgreementSelect(agreement);
  }
  const [selectedAgreement, setSelectedAgreement] = useState<
    EnterpriseAgreement | undefined
  >();
  const [searchState, setSearchState] = useState<
    "noSearch" | "notFoundSearch" | "errorSearch" | "fullSearch" | "required"
  >("noSearch");
  const [search, setSearch] = useState<string | undefined>(defaultSearch);
  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<ApiGeoResult | undefined>(
    defaultLocation
  );
  const [enterprises, setEnterprises] = useState<Enterprise[]>();
  const [selectedEnterprise, setSelectedEnterprise] = useState<Enterprise>();
  const [error, setError] = useState("");
  const getStateMessage = () => {
    switch (searchState) {
      case "notFoundSearch":
        return (
          <>
            Aucune entreprise n&apos;a été trouvée.
            <br />
            Vérifiez l’orthographe des termes de recherche
          </>
        );
      case "required":
        return <>Le nom de l&apos;entreprise doit être renseigné</>;
      case "errorSearch":
        return <>{error}</>;
    }
  };
  const getStateMargin = () => {
    switch (searchState) {
      case "notFoundSearch":
        return "fr-mb-14v";
      case "errorSearch":
      case "required":
        return "fr-mb-9v";
    }
    return "fr-mb-0";
  };
  const getInputState = () => {
    switch (searchState) {
      case "errorSearch":
      case "notFoundSearch":
      case "required":
        return "error";
    }
  };
  const getQueries = () => {
    const jsonString = JSON.stringify(location);
    const base64String = btoa(jsonString);
    return search
      ? `?q=${encodeURIComponent(search)}${
          jsonString ? `&cp=${base64String}` : ""
        }`
      : "";
  };
  const onSubmit = async () => {
    if (!search) {
      setSearchState("required");
      return;
    }
    setLoading(true);
    try {
      const result = await searchEnterprises({
        query: search,
        codesPostaux: location?.codesPostaux,
      });
      setSearchState(!result.length ? "errorSearch" : "fullSearch");
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
    if (selectedEnterprise?.conventions?.length === 1) {
      const [agreement] = getEnterpriseAgreements(
        selectedEnterprise.conventions
      );
      setSelectedAgreement(agreement);
    }
  }, [selectedEnterprise]);
  if (
    onAgreementSelect &&
    selectedAgreement &&
    (selectedEnterprise?.conventions?.length ?? 0) < 2
  ) {
    return (
      <>
        {selectedEnterprise && (
          <EnterpriseAgreementSelectionDetail enterprise={selectedEnterprise} />
        )}

        <p className={fr.cx("fr-h4", "fr-mt-2w", "fr-mb-0")}>
          Vous avez sélectionné la convention collective
        </p>
        <div
          className={fr.cx(
            "fr-my-2w",
            "fr-grid-row",
            "fr-grid-row--middle",
            "fr-grid-row--gutters"
          )}
        >
          <Card
            title={`${selectedAgreement.shortTitle} IDCC${selectedAgreement.id}`}
            size="small"
            className={fr.cx("fr-col-10")}
            classes={{
              content: fr.cx("fr-py-1w"),
              start: fr.cx("fr-m-0"),
              end: fr.cx("fr-p-0", "fr-m-0"),
            }}
          />
          <div className={fr.cx("fr-col")}>
            <Button
              iconId="fr-icon-arrow-go-back-fill"
              priority="secondary"
              onClick={() => {
                setSelectedAgreement(undefined);
                if (
                  selectedEnterprise?.conventions.length &&
                  selectedEnterprise?.conventions.length < 2
                ) {
                  setSelectedEnterprise(undefined);
                }
              }}
            >
              Modifier
            </Button>
          </div>
        </div>

        {selectedAgreement && selectedAgreementAlert?.(selectedAgreement) && (
          <Alert
            className={fr.cx("fr-mt-2w")}
            title="Nous n’avons pas de réponse pour cette convention collective"
            description={selectedAgreementAlert(selectedAgreement)}
            severity="warning"
          />
        )}
      </>
    );
  } else if (onAgreementSelect && selectedEnterprise) {
    return (
      <EnterpriseAgreementSelectionForm
        enterprise={selectedEnterprise}
        goBack={() => setSelectedEnterprise(undefined)}
        onAgreementSelect={(agreement) => {
          if (onAgreementSelect) onAgreementSelect(agreement);
          setSelectedAgreement(agreement);
          setAgreement(agreement);
        }}
      />
    );
  }
  return (
    <>
      <h2 className={fr.cx("fr-h4", "fr-mt-2w", "fr-mb-0")}>
        Précisez votre entreprise
      </h2>
      <form
        className={fr.cx(
          "fr-grid-row",
          "fr-grid-row--top",
          "fr-grid-row--gutters",
          "fr-grid-row--bottom",
          "fr-mt-2w",
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
          label={<>Nom de votre entreprise ou numéro Siren/Siret</>}
          state={getInputState()}
          stateRelatedMessage={getStateMessage()}
          nativeInputProps={{
            value: search,
            onChange: (event) => {
              setSearch(event.target.value);
            },
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
        <LocationSearchInput
          onLocationChange={setLocation}
          defaultValue={location}
          className={fr.cx(
            "fr-col-12",
            "fr-col-xl",
            "fr-col-md",
            getStateMargin(),
            "fr-mt-2w",
            "fr-mt-md-0"
          )}
        />
        <div
          className={`${fr.cx("fr-col-xl", getStateMargin())} ${ButtonContainer}`}
        >
          <Button
            type="submit"
            iconPosition="right"
            iconId="fr-icon-search-line"
            className={`${ButtonStyle}`}
          >
            Rechercher
          </Button>
        </div>
      </form>

      <div>
        <div className={fr.cx("fr-mt-2w")}>
          {!!enterprises?.length && !loading && (
            <p className={fr.cx("fr-h5")}>
              {enterprises.length}
              {enterprises.length > 1
                ? " entreprises trouvées"
                : " entreprise trouvée"}
            </p>
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
            <Alert
              title={<>Vous ne trouvez pas votre entreprise&nbsp;?</>}
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
                    <li>Votre entreprise n’a pas de convention collective.</li>
                  </ul>
                </>
              }
              severity="info"
            />
          )}
        </div>
        {!!enterprises?.length &&
          !loading &&
          enterprises?.map((enterprise) => (
            <Card
              key={enterprise.label}
              className={fr.cx("fr-mt-2w")}
              border
              enlargeLink
              linkProps={
                !onAgreementSelect
                  ? {
                      href: widgetMode
                        ? `/widgets/convention-collective/entreprise/${enterprise.siren}${getQueries()}`
                        : `/outils/convention-collective/entreprise/${enterprise.siren}${getQueries()}`,
                    }
                  : {
                      href: "",
                      onClick: () => {
                        setSelectedEnterprise(enterprise);
                      },
                    }
              }
              desc={
                enterprise.activitePrincipale ? (
                  <>Activité&nbsp;: {enterprise.activitePrincipale}</>
                ) : undefined
              }
              end={<Badge>{`${enterprise.matching} établissements`}</Badge>}
              size="large"
              title={enterprise.label}
              classes={{
                title: `${fr.cx("fr-h5")} ${CardTitleStyle}`,
                content: fr.cx("fr-px-2w", "fr-pt-1w", "fr-pb-8w"),
                desc: fr.cx("fr-mt-1w", "fr-mr-6w"),
                end: fr.cx("fr-mt-0", "fr-pt-1w", "fr-pb-2w"),
              }}
            />
          ))}
      </div>
      <div>
        <p
          className={fr.cx(
            "fr-text--bold",
            !loading ? "fr-mt-5w" : "fr-mt-2w",
            "fr-mb-1w"
          )}
        >
          Votre recherche concerne les assistants maternels, employés de
          maison&nbsp;?
        </p>
        <Card
          border
          enlargeLink
          linkProps={
            !onAgreementSelect
              ? {
                  href: `/convention-collective/3239-particuliers-employeurs-et-emploi-a-domicile`,
                  ...(widgetMode ? { target: "_blank" } : {}),
                }
              : {
                  href: "",
                  onClick: () => {
                    const assMatAgreement = {
                      contributions: true,
                      num: 3239,
                      id: "3239",
                      shortTitle:
                        "Particuliers employeurs et emploi à domicile",
                      slug: "3239-particuliers-employeurs-et-emploi-a-domicile",
                      title: "Particuliers employeurs et emploi à domicile",
                      url: "/3239-particuliers-employeurs-et-emploi-a-domicile",
                    };
                    setSelectedAgreement(assMatAgreement);
                    setAgreement(assMatAgreement);
                    onAgreementSelect(assMatAgreement);
                  },
                }
          }
          title="Particuliers employeurs et emploi à domicile"
          desc="Retrouvez les questions-réponses les plus fréquentes organisées par thème et élaborées par le Ministère du travail concernant cette convention collective"
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
