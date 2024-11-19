"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { useState } from "react";
import { css } from "../../../../styled-system/css";

import Spinner from "../../common/Spinner.svg";
import { LocationSearchInput } from "../../Location/LocationSearchInput";
import { searchEnterprises } from "../queries";
import { Enterprise } from "../types";
import { ApiGeoResult } from "../../Location/searchCities";
import { CardTitleStyle, ButtonStyle } from "../../convention-collective/style";
import Alert from "@codegouvfr/react-dsfr/Alert";

type Props = {
  widgetMode?: boolean;
};

export const EnterpriseAgreementSearchInput = ({
  widgetMode = false,
}: Props) => {
  const [searchState, setSearchState] = useState<
    "noSearch" | "notFoundSearch" | "errorSearch" | "fullSearch"
  >("noSearch");
  const [search, setSearch] = useState<string>();
  const [searched, setSearched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<ApiGeoResult | undefined>();
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
      case "errorSearch":
        return <>{error}</>;
    }
  };
  const getInputState = () => {
    switch (searchState) {
      case "errorSearch":
      case "notFoundSearch":
        return "error";
    }
  };
  return (
    <>
      <p className={fr.cx("fr-h4", "fr-mt-2w", "fr-mb-0")}>
        Précisez votre entreprise
      </p>
      <form
        className={fr.cx(
          "fr-grid-row",
          "fr-grid-row--top",
          "fr-mt-2w",
          "fr-mb-0"
        )}
        onSubmit={async (event) => {
          event.preventDefault();
          if (!search) {
            setSearchState("noSearch");
            return;
          }
          setLoading(true);
          try {
            const result = await searchEnterprises({
              query: search,
              apiGeoResult: location,
            });
            setSearchState(!result.length ? "errorSearch" : "fullSearch");
            setSearchState(
              search.length > 1 && !result.length
                ? "notFoundSearch"
                : "noSearch"
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
        }}
      >
        <Input
          className={fr.cx("fr-col-12", "fr-col-md-5", "fr-mb-0")}
          hintText={
            <>
              Ex : Café de la mairie ou 40123778000127
              <br />
              (présent sur la fiche de paie du salarié)
            </>
          }
          label={<>Nom de votre entreprise ou numéro Siren/Siret</>}
          state={getInputState()}
          stateRelatedMessage={getStateMessage()}
          nativeInputProps={{
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
          className={fr.cx(
            "fr-col-12",
            "fr-col-md-3",
            "fr-ml-md-3w",
            searched && !enterprises?.length ? "fr-mb-7w" : "fr-mb-0",
            "fr-mt-2w",
            "fr-mt-md-0"
          )}
          classes={{ label: fr.cx("fr-mb-md-7v") }}
        />

        <Button
          type="submit"
          iconPosition="right"
          iconId="fr-icon-search-line"
          className={`${fr.cx("fr-ml-md-3w", "fr-mt-2w", "fr-mt-md-19v", searched && !enterprises?.length ? "fr-mb-7w" : "fr-mb-0")} ${ButtonStyle}`}
        >
          Rechercher
        </Button>
      </form>

      <div>
        <div className={fr.cx("fr-mt-2w")}>
          {!!enterprises?.length && !loading && (
            <p className={fr.cx("fr-h5")}>
              {enterprises.length} entreprises trouvées
            </p>
          )}
          {loading && (
            <div className={fr.cx("fr-grid-row")}>
              <p className={fr.cx("fr-h5", "fr-mb-0")}>Chargement en cours</p>
              <div className={`${fr.cx("fr-ml-1w")} ${SpinnerBlock}`}>
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
                href: `/${widgetMode ? "widgets" : "outils"}/convention-collective/selection/${enterprise.siren}`,
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
