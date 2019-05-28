import styled from "styled-components";
import { theme } from "@cdt/ui";

const { box, fonts, colors, spacing } = theme;

export const Input = styled.input`
  padding: 0;
  font-size: 1rem;
  text-align: center;
  line-height: inherit;
  width: ${props => `${parseFloat(props.size, 10)}em` || "auto"};
  border-radius: ${box.borderRadius};
  border: 1px solid ${colors.elementBorder};
  padding: ${spacing.small} ${spacing.tiny};
  border-color: ${props =>
    props.invalid ? colors.dangerBackground : colors.elementBorder};
`;

export const Label = styled.label`
  padding: 0;
  text-align: center;
  font-size: 1.24rem;
  margin-right: 2em;
  display: flex;
  align-items: center;
`;

export const RadioContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: ${props => (props.direction === "row" ? "row" : "column")};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const QuestionLabel = styled.label`
  font-size: 1.1rem;
  display: block;
  margin-top: ${spacing.interComponent};
  margin-bottom: ${spacing.small};
`;

export const QuestionParagraphe = styled.p`
  font-size: 1.1rem;
  display: block;
  margin-top: ${spacing.interComponent};
  margin-bottom: ${spacing.small};
`;

export const SectionTitle = styled.h2`
  font-size: ${fonts.sizeH3};
  margin-top: ${spacing.large};
  margin-bottom: ${spacing.interComponent};
`;
