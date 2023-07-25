import { Textarea } from "@socialgouv/cdtn-ui";
import styled from "styled-components";

type QuestionnaireItemProps = {
  className?: string;
  title?: string;
  placeholder?: string;
  onChange: (text: string) => void;
};

export const QuestionnaireText = ({
  className,
  title,
  placeholder,
  onChange,
}: QuestionnaireItemProps): JSX.Element => {
  const maxCharacters = 200;
  return (
    <StyledContainer className={className}>
      {title && <b>{title}</b>}
      <StyledTextarea
        placeholder={placeholder}
        maxLength={maxCharacters}
        onChange={(event) => onChange(event.target.value)}
      />
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
  max-width: 100%;
`;

const MaxCharacterText = styled.span`
  margin: 12px 0;
  font-size: 14px;
`;
