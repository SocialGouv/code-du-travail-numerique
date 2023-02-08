import React from "react";
import {
  InputCheckbox,
  Paragraph,
  icons,
  Alert,
  theme,
} from "@socialgouv/cdtn-ui";
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
import styled from "styled-components";

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

  const [isInputVisible, setIsInputVisible] = React.useState(false);

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
          <RowWrapper>
            <InputWrapper>
              <InputCheckbox
                label={
                  <span>
                    <strong>
                      Je suis particulier employeur ou salarié du particulier
                      employeur
                    </strong>{" "}
                    (assistant maternel, employé maison)
                  </span>
                }
                name="salarieParticulierEmployeur"
                id="salarieParticulierEmployeur"
                onChange={() => {
                  onAgreementChange(
                    selectedAgreement?.num === 3239
                      ? null
                      : {
                          url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000044594539",
                          id: "KALICONT000044594539",
                          num: 3239,
                          shortTitle:
                            "Particuliers employeurs et emploi à domicile",
                          slug: "3239-particuliers-employeurs-et-emploi-a-domicile",
                          title: "Particuliers employeurs et emploi à domicile",
                        }
                  );
                }}
                checked={selectedAgreement?.num === 3239}
              />
            </InputWrapper>
            <ButtonClicker onClick={() => setIsInputVisible(!isInputVisible)}>
              <icons.HelpCircle size="20" aria-label="?" />
            </ButtonClicker>
          </RowWrapper>
          {isInputVisible && (
            <AlertWithMargin>
              <p>
                Sont des salariés du particulier employeur : les personnes
                travaillant au domicile privé d&apos;un particulier (garde
                d’enfants ou d’une personne dépendante, ménage, travaux de
                jardinage, soutien scolaire...) et les assistants maternels (qui
                accueillent des enfants à leur domicile).
              </p>
            </AlertWithMargin>
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

const { spacings } = theme;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-basis: max-content;
  justify-content: center;
  align-items: center;
`;

const ButtonClicker = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.secondary};
`;

const AlertWithMargin = styled(Alert)`
  margin-top: ${spacings.base};
`;
