"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { useEffect, useState } from "react";
import { css } from "../../../../styled-system/css";

import Spinner from "../../common/Spinner.svg";
import { LocationSearchInput } from "../../Location/LocationSearchInput";
import { searchEnterprises } from "../queries";
import { Enterprise } from "../types";
import { ApiGeoResult } from "../../Location/searchCities";
import { CardTitleStyle, ButtonStyle } from "../../convention-collective/style";

type Props = {
  widgetMode?: boolean;
  defaultSearch?: string;
  defaultLocation?: ApiGeoResult;
};

export const EnterpriseAgreementSearchInput = ({
  widgetMode = false,
  defaultSearch,
  defaultLocation,
}: Props) => {
  const [searchState, setSearchState] = useState<
    "noSearch" | "notFoundSearch" | "errorSearch" | "fullSearch" | "required"
  >("noSearch");
  const [search, setSearch] = useState<string | undefined>(defaultSearch);
  const [searched, setSearched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<ApiGeoResult | undefined>(
    defaultLocation
  );
  const [enterprises, setEnterprises] = useState<Enterprise[]>();
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
        search.length > 1 && !result.length ? "notFoundSearch" : "noSearch"
      );
      setEnterprises(result);
    } catch (e) {
      setSearchState("errorSearch");
      setEnterprises(undefined);
      setError(e);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };
  useEffect(() => {
    if (defaultSearch) {
      onSubmit();
    }
  }, [defaultSearch]);
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
              Ex : Café de la mairie ou 40123778000127
              <br />
              (présent sur la fiche de paie du salarié)
            </>
          }
          label={
            <>
              Nom&nbsp;de&nbsp;votre&nbsp;entreprise&nbsp;ou&nbsp;numéro&nbsp;Siren/Siret
            </>
          }
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
            "fr-col-xl-4",
            "fr-col-md-5",
            getInputState() === "error" ? "fr-mb-md-9v" : "fr-mb-md-0",
            searched && !enterprises?.length ? "fr-mb-md-7w" : "fr-mb-md-0",
            "fr-mt-2w",
            "fr-mt-md-0"
          )}
          classes={{ label: fr.cx("fr-mb-md-7v") }}
        />
        <div
          className={fr.cx(
            "fr-mt-2w",
            "fr-col-xl-2",
            getInputState() === "error" ? "fr-mb-9v" : "fr-mb-0"
          )}
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
              title="Vous ne trouvez pas votre entreprise ?"
              description={
                <>
                  <p>Il peut y avoir plusieurs explications à cela :</p>
                  <ul>
                    <li>
                      Votre entreprise a été enregistrée sous un autre nom ou un
                      autre code : si vous le pouvez, utilisez son numéro Siret.
                      Ce dernier doit être présent sur votre bulletin de paie.
                    </li>
                    <li>
                      Votre entreprise a un statut particulier : administration
                      ou établissements publics, associations, secteur agricole,
                      La Poste, La Croix Rouge etc. ;
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
              linkProps={{
                href: widgetMode
                  ? `/widgets/convention-collective/${enterprise.siren}${getQueries()}`
                  : `/outils/convention-collective/entreprise/${enterprise.siren}${getQueries()}`,
              }}
              desc={`Activité : ${enterprise.activitePrincipale}`}
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
          linkProps={{
            href: `/convention-collective/3239-particuliers-employeurs-et-emploi-a-domicile`,
            ...(widgetMode ? { target: "_blank" } : {}),
          }}
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
