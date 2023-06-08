import React from "react";
import {
  InputCheckbox,
  Paragraph,
  icons,
  Alert,
  theme,
} from "@socialgouv/cdtn-ui";
import styled from "styled-components";
import { SectionTitle } from "../../../common/stepStyles";
import { Enterprise } from "../../../../conventions/Search/api/enterprises.service";

type Props = {
  selectedEnterprise?: Enterprise;
  onCheckboxChange: (v: boolean) => void;
  isCheckboxChecked: boolean;
  setIsCheckboxChecked: (v: boolean) => void;
};

export function NoEnterprise({
  onCheckboxChange,
  selectedEnterprise,
  isCheckboxChecked,
  setIsCheckboxChecked,
}: Props): JSX.Element {
  const [isInputVisible, setIsInputVisible] = React.useState(false);

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
              onChange={() => {
                setIsCheckboxChecked(!isCheckboxChecked);
                onCheckboxChange(!isCheckboxChecked);
              }}
              checked={isCheckboxChecked}
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
      {isCheckboxChecked && (
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
