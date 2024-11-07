"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { useState } from "react";
import { css } from "../../../styled-system/css";

import { LocationSearchInput } from "../Location/LocationSearchInput";
import { searchEnterprises } from "../Enterprise/enterprises.service";
import { Enterprise } from "../Enterprise/types";
import { ApiGeoResult } from "../Location/searchCities";
import Tooltip from "@codegouvfr/react-dsfr/Tooltip";
import { CardTitleStyle, ButtonStyle } from "./style";
import Alert from "@codegouvfr/react-dsfr/Alert";

type Props = {
  navigationUrl?: string;
};

export const AgreementSearchByEnterprise = ({
  navigationUrl = "/outils/convention-collective",
}: Props) => {
  const [inputState, setInputState] = useState<"error" | undefined>();
  const [search, setSearch] = useState<string>();
  const [searched, setSearched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<ApiGeoResult | undefined>();
  const [enterprises, setEnterprises] = useState<Enterprise[]>();
  return (
    <>
      <p className={fr.cx("fr-h4", "fr-mt-2w", "fr-mb-0")}>
        Précisez votre entreprise
      </p>
      <form
        className={fr.cx("fr-grid-row", "fr-mt-2w", "fr-mb-0")}
        onSubmit={async (event) => {
          event.preventDefault();
          if (!search) return;
          setLoading(true);
          const result = await searchEnterprises({
            query: search,
            apiGeoResult: location,
          });
          setInputState(
            search.length > 1 && !result.length ? "error" : undefined
          );
          setLoading(false);
          setSearched(true);
          setEnterprises(result);
        }}
      >
        <Input
          className={fr.cx("fr-col-12", "fr-col-md-5", "fr-mb-0")}
          hintText="Ex : Café de la mairie ou 40123778000127"
          label={
            <>
              Nom de votre entreprise ou numéro Siren/Siret
              <Tooltip
                className={fr.cx("fr-p-0")}
                kind="click"
                title="Le numéro Siren est un numéro unique de 9 chiffres attribué à chaque entreprise (ex : 401237780)."
              />
            </>
          }
          state={inputState}
          stateRelatedMessage={
            <>
              Aucune entreprise n&apos;a été trouvée.
              <br />- Vérifiez l’orthographe des termes de recherche
            </>
          }
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
            "fr-mt-2w",
            "fr-mt-md-0",
            "fr-ml-md-3w",
            "fr-mb-0"
          )}
        />

        <Button
          type="submit"
          iconPosition="right"
          iconId="fr-icon-search-line"
          className={`${fr.cx("fr-ml-md-3w", "fr-mt-2w", "fr-mt-md-7w")} ${ButtonStyle}`}
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
          {loading && <p className={fr.cx("fr-h5")}>chargement en cours ...</p>}
          {inputState === "error" && (
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
                href: `${navigationUrl}/selection/${enterprise.siren}`,
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
        <p className={fr.cx("fr-text--bold", "fr-mt-5w", "fr-mb-1w")}>
          Votre recherche concerne les assistants maternels, employés de
          maison&nbsp;?
        </p>
        <Card
          border
          enlargeLink
          linkProps={{
            href: `/convention-collective/3239-particuliers-employeurs-et-emploi-a-domicile`,
          }}
          desc="Retrouvez les questions-réponses les plus fréquentes organisées par thème et élaborées par le Ministère du travail concernant cette convention collective"
          size="large"
          title="Particuliers employeurs et emploi à domicile"
          classes={{
            title: `${fr.cx("fr-h5")} ${CardTitleStyle}`,
            content: fr.cx("fr-px-2w", "fr-pt-1w", "fr-pb-8w"),
            desc: fr.cx("fr-mt-1w", "fr-mr-6w"),
            end: fr.cx("fr-mt-0", "fr-pt-1w", "fr-pb-2w"),
          }}
        />
      </div>
      <div className={fr.cx("fr-mt-2w")}>
        <Button
          linkProps={{ href: navigationUrl }}
          priority="secondary"
          className={ButtonStyle}
        >
          Précédent
        </Button>
      </div>
    </>
  );
};
