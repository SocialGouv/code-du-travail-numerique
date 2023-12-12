import { Textarea, theme } from "@socialgouv/cdtn-ui";
import styled from "styled-components";

type QuestionnaireItemProps = {
  className?: string;
  title?: string;
  placeholder?: string;
  onChange: (text: string) => void;
  dataTestId?: string;
};

export const QuestionnaireText = ({
  className,
  title,
  placeholder,
  onChange,
  dataTestId,
}: QuestionnaireItemProps): JSX.Element => {
  const maxCharacters = 200;
  return (
    <StyledContainer className={className}>
      {title && <strong>{title}</strong>}
      <StyledTextarea
        placeholder={placeholder}
        maxLength={maxCharacters}
        onChange={(event) => onChange(event.target.value)}
        data-testid={dataTestId}
      />
      <MaxCharacterText>{maxCharacters} caractères maximum</MaxCharacterText>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${theme.spacings.xmedium} ${theme.spacings.large};
`;

const StyledTextarea = styled(Textarea)`
  width: 420px;
  max-width: 100%;
`;

const MaxCharacterText = styled.p`
  margin: 12px 0;
  font-size: 14px;
`;
