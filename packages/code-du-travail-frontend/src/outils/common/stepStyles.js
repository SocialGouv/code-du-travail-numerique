import styled from "styled-components";
import { theme } from "@cdt/ui";

const { box, fonts, colors, spacing } = theme;

export const Input = styled.input`
  padding: 0;
  font-size: 1rem;
  text-align: ${props => (props.type === "number" ? "right" : "left")};
  line-height: inherit;
  width: ${props => (props.size ? `${parseFloat(props.size, 10)}em` : "auto")};
  border-radius: ${box.borderRadius};
  border: 1px solid ${colors.elementBorder};
  padding: ${spacing.small} ${spacing.tiny};
  border-color: ${props =>
    props.invalid ? colors.dangerBackground : colors.elementBorder};
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
`;

export const Label = styled.label`
  padding: 0;
  font-size: 1.15rem;
  margin-right: 2em;
  display: flex;
  align-items: center;
`;

export const RadioContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: ${props => (props.direction === "row" ? "row" : "column")};
  margin-bottom: ${spacing.interComponent};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const QuestionLabel = styled.label`
  font-size: 1.25rem;
  display: block;
  margin-top: ${spacing.interComponent};
  margin-bottom: ${spacing.small};
`;

export const QuestionParagraphe = styled.p`
  font-size: 1.25rem;
  display: block;
  margin-top: ${spacing.interComponent};
  margin-bottom: ${spacing.small};
`;

export const SectionTitle = styled.h2`
  font-size: ${fonts.sizeH3};
  margin-top: ${spacing.large};
  margin-bottom: ${spacing.interComponent};
`;

export const Highlight = styled.strong`
  font-size: ${fonts.sizeH4};
  font-weight: 700;
  color: ${colors.blue};
`;

export const SmallText = styled.span`
  color: ${colors.darkText};
  font-style: italic;
`;

export const InlineError = styled.span`
  color: ${colors.darkerGrey};
  font-weight: 600;
  font-size: ${fonts.sizeSmall};
`;
export const BlockError = styled.div`
  color: ${colors.darkerGrey};
  font-weight: 600;
  font-size: ${fonts.sizeSmall};
`;

export const Summary = styled.summary`
  margin-bottom: ${spacing.base};
`;
