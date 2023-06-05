import React from "react";
import {
  InputCheckbox,
  Paragraph,
  icons,
  Alert,
  theme,
} from "@socialgouv/cdtn-ui";
import { Agreement } from "../../../../conventions/Search/api/type";
import styled from "styled-components";
import { SectionTitle } from "../../../common/stepStyles";
import { Enterprise } from "../../../../conventions/Search/api/enterprises.service";
import { OnSelectAgreementFn } from "../../../common/Agreement/types";
import { push as matopush } from "@socialgouv/matomo-next";
import {
  MatomoActionEvent,
  MatomoBaseEvent,
  MatomoSearchAgreementCategory,
} from "../../../../lib";

type Props = {
  selectedAgreement?: Agreement;
  selectedEnterprise?: Enterprise;
  onAgreementChange: OnSelectAgreementFn;
  eventViewStep: MatomoActionEvent;
};

export function NoEnterprise({
  selectedAgreement,
  selectedEnterprise,
  onAgreementChange,
  eventViewStep,
}: Props): JSX.Element {
  const [isInputVisible, setIsInputVisible] = React.useState(false);

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onAgreementChange(
      selectedAgreement?.num === 3239
        ? null
        : {
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000044594539",
            id: "KALICONT000044594539",
            num: 3239,
            shortTitle: "Particuliers employeurs et emploi à domicile",
            slug: "3239-particuliers-employeurs-et-emploi-a-domicile",
            title: "Particuliers employeurs et emploi à domicile",
          }
    );
    // TODO: okk
    // matopush([
    //   MatomoBaseEvent.OUTIL,
    //   eventViewStep,
    //   MatomoSearchAgreementCategory.NO_ENTERPRISE,
    // ]);
  };

  return (
    <>
      {!selectedEnterprise && (
        <RowWrapper>
          <InputWrapper>
            <InputCheckbox
              label={
                <span>
                  <strong>Je n&apos;ai pas d&apos;entreprise</strong> (ma
                  recherche concerne les assistants maternels, employés de
                  maison, etc.)
                </span>
              }
              name="salarieParticulierEmployeur"
              id="salarieParticulierEmployeur"
              onChange={onCheckboxChange}
              checked={selectedAgreement?.num === 3239}
            />
          </InputWrapper>
          <ButtonClicker
            onClick={() => setIsInputVisible(!isInputVisible)}
            type="button"
          >
            <icons.HelpCircle size="20" aria-label="?" />
          </ButtonClicker>
        </RowWrapper>
      )}
      {isInputVisible && (
        <AlertWithMargin>
          <p>
            Cochez cette case si votre recherche concerne des salariés du
            particulier employeur : les personnes travaillant au domicile privé
            d&apos;un particulier (garde d’enfants ou d’une personne dépendante,
            ménage, travaux de jardinage, soutien scolaire...) ou les assistants
            maternels (qui accueillent des enfants à leur domicile).
          </p>
        </AlertWithMargin>
      )}
      {selectedAgreement?.num === 3239 && (
        <>
          <SectionTitle>Votre convention collective est :</SectionTitle>
          <Paragraph noMargin fontWeight="600" fontSize="default">
            Particulier employeur et emploi à domicile
          </Paragraph>
          <StyledParagraph>
            Cliquez sur Suivant pour poursuivre la simulation.
          </StyledParagraph>
        </>
      )}
    </>
  );
}

const { spacings } = theme;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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

const StyledParagraph = styled(Paragraph)`
  margin-top: ${theme.spacings.large};
`;

const AlertWithMargin = styled(Alert)`
  margin-top: ${spacings.base};
`;
