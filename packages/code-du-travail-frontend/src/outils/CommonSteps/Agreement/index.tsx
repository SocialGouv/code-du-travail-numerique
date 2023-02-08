import React from "react";
import { Paragraph } from "@socialgouv/cdtn-ui";
import { RadioQuestion } from "../../Components";
import { Route } from "./store";
import { AgreementSearch, EnterpriseSearch } from "./components";
import { Agreement } from "../../../conventions/Search/api/type";
import {
  AgreementSupportInfo,
  OnSelectAgreementFn,
} from "../../common/Agreement/types";
import { Enterprise } from "../../../conventions/Search/api/enterprises.service";
import { InlineError } from "../../common/ErrorField";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import ShowAlert from "../../common/Agreement/RouteSelection/ShowAlert";
import { AgreementSearchValue } from "./store";
import { SectionTitle } from "../../common/stepStyles";

type Props = {
  selectedRoute?: Route;
  onRouteChange: (Route) => void;
  onInitAgreementPage: () => void;
  supportedAgreements: AgreementSupportInfo[];
  selectedEnterprise?: Enterprise;
  selectedAgreement?: Agreement;
  onAgreementChange: OnSelectAgreementFn;
  onAgreementSearch: (value: AgreementSearchValue) => void;
  onEnterpriseSearch: (value: AgreementSearchValue) => void;
  simulator: PublicodesSimulator;
  error?: {
    route?: string;
    agreement?: string;
    enterprise?: string;
  };
};

function AgreementStep({
  selectedRoute,
  onRouteChange,
  supportedAgreements,
  selectedEnterprise,
  selectedAgreement,
  onAgreementChange,
  error,
  simulator,
  onInitAgreementPage,
  onEnterpriseSearch,
  onAgreementSearch,
}: Props): JSX.Element {
  React.useEffect(() => {
    onInitAgreementPage();
  }, [onInitAgreementPage]);

  const [is3239, setIs3239] = React.useState("");

  return (
    <>
      <RadioQuestion
        questions={[
          {
            label: "Je sais quelle est ma convention collective (je la saisis)",
            value: Route.agreement,
            id: "route-agreement",
          },
          {
            label:
              "Je ne sais pas quelle est ma convention collective (je la recherche)",
            value: Route.enterprise,
            id: "route-enterprise",
          },
          {
            label:
              "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)",
            value: Route.none,
            id: "route-none",
          },
        ]}
        name="route"
        label=" Quel est le nom de la convention collective applicable&nbsp;?"
        selectedOption={selectedRoute}
        onChangeSelectedOption={onRouteChange}
        error={error?.route}
        showRequired
        tooltip={{
          content: (
            <p>
              Vous pouvez trouver le nom de votre convention collective sur
              votre <strong>bulletin de paie</strong>.
            </p>
          ),
        }}
      />
      {selectedRoute === Route.none && <ShowAlert route="not-selected" />}

      {selectedRoute === Route.agreement && (
        <>
          <AgreementSearch
            supportedAgreements={supportedAgreements}
            selectedAgreement={selectedAgreement}
            onSelectAgreement={onAgreementChange}
            onUserAction={(action, value: AgreementSearchValue) =>
              onAgreementSearch(value)
            }
            alertAgreementNotSupported={undefined}
            simulator={simulator}
          />
          {error?.agreement && <InlineError>{error.agreement}</InlineError>}
        </>
      )}
      {selectedRoute === Route.enterprise && (
        <>
          <RadioQuestion
            questions={[
              {
                label: "Oui",
                value: "Oui",
                id: "oui-3239",
              },
              {
                label: "Non",
                value: "Non",
                id: "non-3239",
              },
            ]}
            name="oui-non"
            label="Êtes-vous particulier employeur ou salarié d’un particulier employeur (assistant maternel, employé de maison)&nbsp;?"
            selectedOption={is3239}
            onChangeSelectedOption={(v) => {
              setIs3239(v as string);
              if (v === "Oui") {
                onAgreementChange({
                  url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000044594539",
                  id: "KALICONT000044594539",
                  num: 3239,
                  shortTitle: "Particuliers employeurs et emploi à domicile",
                  slug: "3239-particuliers-employeurs-et-emploi-a-domicile",
                  title: "Particuliers employeurs et emploi à domicile",
                });
              } else {
                onAgreementChange(null);
              }
            }}
            showRequired
            tooltip={{
              content: (
                <p>
                  Sont des salariés du particulier employeur : les personnes
                  travaillant au domicile privé d'un particulier (garde
                  d’enfants ou d’une personne dépendante, ménage, travaux de
                  jardinage, soutien scolaire...) et les assistants maternels
                  (qui accueillent des enfants à leur domicile).
                </p>
              ),
            }}
          />
          {is3239 === "Non" && (
            <EnterpriseSearch
              supportedAgreements={supportedAgreements}
              selectedAgreement={selectedAgreement}
              selectedEnterprise={selectedEnterprise}
              onSelectAgreement={onAgreementChange}
              onUserAction={(action, value: AgreementSearchValue) =>
                onEnterpriseSearch(value)
              }
              simulator={simulator}
              isDisabled={selectedAgreement?.num === 3239}
            />
          )}
          {selectedAgreement?.num === 3239 && (
            <>
              <SectionTitle>Votre convention collective est :</SectionTitle>
              <Paragraph noMargin fontWeight="600" fontSize="default">
                Particulier employeur et emploi à domicile
              </Paragraph>
            </>
          )}
          {error?.enterprise && <InlineError>{error.enterprise}</InlineError>}
        </>
      )}
    </>
  );
}

export default AgreementStep;
