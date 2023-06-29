import React from "react";
import {
  InputCheckbox,
  Paragraph,
  icons,
  Alert,
  theme,
  Text,
} from "@socialgouv/cdtn-ui";
import styled from "styled-components";
import { Question } from "../../../common/Question";

type Props = {
  isHidden?: boolean;
  onCheckboxChange: (v: boolean) => void;
  isCheckboxChecked: boolean;
  setIsCheckboxChecked: (v: boolean) => void;
};

export function NoEnterprise({
  onCheckboxChange,
  isHidden,
  isCheckboxChecked,
  setIsCheckboxChecked,
}: Props): JSX.Element {
  const [isInputVisible, setIsInputVisible] = React.useState(false);

  return (
    <>
      {!isHidden && (
        <>
          <RowWrapper>
            <InputWrapper>
              <InputCheckbox
                label={
                  <span>
                    <StrongItem>Je n&apos;ai pas d&apos;entreprise</StrongItem>{" "}
                    (ma recherche concerne les assistants maternels, employés de
                    maison)
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
          {isInputVisible && (
            <AlertWithMargin>
              <p>
                Cochez cette case si votre recherche concerne les salariés du
                particulier employeur : les personnes travaillant au domicile
                privé d&apos;un particulier (garde d’enfants ou d’une personne
                dépendante, ménage, travaux de jardinage, soutien scolaire...)
                ou les assistants maternels (qui accueillent des enfants à leur
                domicile).
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
              <StyledParagraph>
                Cliquez sur Suivant pour poursuivre la simulation.
              </StyledParagraph>
            </StyledDiv>
          )}
        </>
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

const StyledDiv = styled.div`
  margin-top: ${spacings.larger};
`;
