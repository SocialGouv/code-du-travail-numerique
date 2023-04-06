import React from "react";
import { RadioQuestion } from "../../Components";
import { AgreementSearch, EnterpriseSearch } from "./components";
import { Paragraph, theme } from "@socialgouv/cdtn-ui";
import { Agreement } from "../../../conventions/Search/api/type";
import { Toast, Button } from "@socialgouv/cdtn-ui";
import {
  AgreementSupportInfo,
  OnSelectAgreementFn,
} from "../../common/Agreement/types";
import { Enterprise } from "../../../conventions/Search/api/enterprises.service";
import { InlineError } from "../../common/ErrorField";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import ShowAlert from "../../common/Agreement/RouteSelection/ShowAlert";
import { AgreementSearchValue } from "./store";
import { Question } from "../../common/Question";
import { SelectedAgreement } from "./components/AgreementSearch";
import styled from "styled-components";
import { AgreementRoute } from "../../common/type/WizardType";

type Props = {
  selectedRoute?: AgreementRoute;
  onRouteChange: (AgreementRoute) => void;
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

  const [isCCSelected, setIsCcSelected] = React.useState(false);

  return (
    <>
      <RadioQuestion
        questions={[
          {
            label: "Je sais quelle est ma convention collective (je la saisis)",
            value: "agreement" as AgreementRoute,
            id: "route-agreement",
          },
          {
            label:
              "Je ne sais pas quelle est ma convention collective (je la recherche)",
            value: "enterprise" as AgreementRoute,
            id: "route-enterprise",
          },
          {
            label:
              "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)",
            value: "not-selected" as AgreementRoute,
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
      {selectedRoute === "not-selected" && <ShowAlert route="not-selected" />}

      {selectedRoute === "agreement" && (
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
      {selectedRoute === "enterprise" && (
        <>
          {isCCSelected ? (
            <>
              <Question required={false} as="p">
                Vous avez sélectionné la convention collective&nbsp;:&nbsp;
              </Question>
              <SelectedAgreement
                variant="secondary"
                onRemove={(event) => {
                  event.preventDefault();
                  onAgreementChange(null);
                  setIsCcSelected(false);
                }}
              >
                {selectedAgreement?.shortTitle}
              </SelectedAgreement>
              <StyledParagraph>
                Cliquez sur Suivant pour poursuivre la simulation.
              </StyledParagraph>
            </>
          ) : (
            <>
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
              {error?.enterprise && (
                <InlineError>{error.enterprise}</InlineError>
              )}
            </>
          )}
          {!selectedAgreement && (
            <Toast>
              Vous êtes particuliers employeurs ou salarié du particulier
              employeur (assistant maternel, employé de maison) ?
              <br />
              Sélectionnez{" "}
              <Button
                variant="link"
                onClick={(e) => {
                  e.preventDefault();
                  onAgreementChange({
                    url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000044594539",
                    id: "KALICONT000044594539",
                    num: 3239,
                    shortTitle: "Particuliers employeurs et emploi à domicile",
                    slug: "3239-particuliers-employeurs-et-emploi-a-domicile",
                    title: "Particuliers employeurs et emploi à domicile",
                  });
                  setIsCcSelected(true);
                }}
              >
                votre convention collective ici
              </Button>
            </Toast>
          )}
        </>
      )}
    </>
  );
}

export default AgreementStep;

const StyledParagraph = styled(Paragraph)`
  margin-top: ${theme.spacings.large};
`;
