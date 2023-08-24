import React from "react";
import {
  Alert,
  icons,
  InputCheckbox,
  Paragraph,
  Text,
  theme,
} from "@socialgouv/cdtn-ui";
import styled from "styled-components";
import { Question } from "../../../common/Question";

type Props = {
  onCheckboxChange: (v: boolean) => void;
  isCheckboxChecked: boolean;
  setIsCheckboxChecked: (v: boolean) => void;
  isQuestionnaire?: boolean;
};

export function NoEnterprise({
  onCheckboxChange,
  isCheckboxChecked,
  setIsCheckboxChecked,
  isQuestionnaire,
}: Props): JSX.Element {
  const [isInputVisible, setIsInputVisible] = React.useState(false);

  return (
    <>
      <RowWrapper>
        <InputCheckbox
          label={
            <span>
              <StrongItem>Je n&apos;ai pas d&apos;entreprise</StrongItem> (ma
              recherche concerne les assistants maternels, employés
              de&nbsp;maison)
            </span>
          }
          name="salarieParticulierEmployeur"
          id="salarieParticulierEmployeur"
          onChange={() => {
            setIsCheckboxChecked(!isCheckboxChecked);
            onCheckboxChange(!isCheckboxChecked);
          }}
          checked={isCheckboxChecked}
          tabIndex={1}
        />
        <ButtonClicker
          onClick={() => setIsInputVisible(!isInputVisible)}
          type="button"
        >
          <icons.HelpCircle size="20" aria-label="?" />
        </ButtonClicker>
      </RowWrapper>
      {isInputVisible && (
        <AlertWithMargin>
          <p>
            Cochez cette case si votre recherche concerne les salariés du
            particulier employeur : les personnes travaillant au domicile privé
            d&apos;un particulier (garde d’enfants ou d’une personne dépendante,
            ménage, travaux de jardinage, soutien scolaire...) ou les assistants
            maternels (qui accueillent des enfants à leur domicile).
          </p>
        </AlertWithMargin>
      )}
      {isCheckboxChecked && (
        <StyledDiv>
          <Question required={false} as="p">
            Votre convention collective est&nbsp;:
          </Question>
          <Text fontSize="default" fontWeight="600" variant="secondary">
            Particulier employeur et emploi à domicile
          </Text>
          {!isQuestionnaire && (
            <StyledParagraph>
              Cliquez sur Suivant pour poursuivre la simulation.
            </StyledParagraph>
          )}
        </StyledDiv>
      )}
    </>
  );
}

const { spacings } = theme;

const StrongItem = styled.strong`
  font-weight: 600;
  font-size: ${theme.fonts.sizes.default};
  color: ${theme.colors.paragraph};
`;

const RowWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: start;
`;

const ButtonClicker = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
  margin-top: 0.4rem;
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

const StyledDiv = styled.div`
  margin-top: ${spacings.larger};
`;
