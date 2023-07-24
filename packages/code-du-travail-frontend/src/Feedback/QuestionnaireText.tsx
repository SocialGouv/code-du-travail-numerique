import { Textarea } from "@socialgouv/cdtn-ui";
import styled from "styled-components";

type QuestionnaireItemProps = {
  className?: string;
  title?: string;
  placeholder?: string;
};

export const QuestionnaireText = ({
  className,
  title,
  placeholder,
}: QuestionnaireItemProps): JSX.Element => {
  const maxCharacters = 200;
  return (
    <StyledContainer className={className}>
      {title && <b>{title}</b>}
      <StyledTextarea placeholder={placeholder} maxLength={maxCharacters} />
      <MaxCharacterText>{maxCharacters} caractères maximum</MaxCharacterText>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTextarea = styled(Textarea)`
  width: 420px;
`;

const MaxCharacterText = styled.span`
  margin: 12px 0;
  font-size: 14px;
`;
