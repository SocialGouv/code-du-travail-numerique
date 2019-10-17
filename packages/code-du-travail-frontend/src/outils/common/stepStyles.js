import styled from "styled-components";
import { theme } from "@socialgouv/react-ui";

const { box, fonts, colors, spacing } = theme;

export const Input = styled.input`
  width: ${props => (props.size ? `${parseFloat(props.size, 10)}em` : "auto")};
  padding: ${spacing.small} ${spacing.tiny};
  font-size: 1rem;
  line-height: inherit;
  text-align: ${props => (props.type === "number" ? "right" : "left")};
  border: ${box.border};
  border-color: ${props =>
    props.invalid ? colors.dangerBackground : colors.lightGrey};
  border-radius: ${box.borderRadius};
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    appearance: none;
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  margin-right: 2em;
  padding: 0;
  font-size: 1.15rem;
`;

export const RadioContainer = styled.div`
  display: flex;
  flex-direction: ${props => (props.direction === "row" ? "row" : "column")};
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: ${spacing.interComponent};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const QuestionLabel = styled.label`
  display: block;
  margin-top: ${spacing.interComponent};
  margin-bottom: ${spacing.small};
  font-size: 1.25rem;
`;

export const QuestionParagraphe = styled.p`
  display: block;
  margin-top: ${spacing.interComponent};
  margin-bottom: ${spacing.small};
  font-size: 1.25rem;
`;

export const SectionTitle = styled.h2`
  margin-top: ${spacing.large};
  margin-bottom: ${spacing.interComponent};
  font-size: ${fonts.sizeH3};
`;

export const Highlight = styled.strong`
  color: ${colors.blueDark};
  font-weight: 700;
  font-size: ${fonts.sizeH4};
`;

export const SmallText = styled.span`
  color: ${colors.darkText};
  font-style: italic;
`;

export const InlineError = styled.span`
  color: ${colors.lightText};
  font-weight: 600;
  font-size: ${fonts.sizeSmall};
`;
export const BlockError = styled.div`
  color: ${colors.lightText};
  font-weight: 600;
  font-size: ${fonts.sizeSmall};
`;

export const Summary = styled.summary`
  margin-bottom: ${spacing.base};
`;
