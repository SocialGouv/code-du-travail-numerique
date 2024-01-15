import { PropsWithChildren } from "react";
import { styled } from "@mui/system";
import { fr } from "@codegouvfr/react-dsfr"

type Props = PropsWithChildren<{
  level: 1 | 2 | 3 | 4 | 5 | 6;
}>;

export const Title = ({ children, level = 1 }: Props) => {
  return <StyledTitle as={`h${level}`}>{children}</StyledTitle>;
};

const StyledTitle = styled("h1")`
  color: ${fr.colors.decisions.text.label.blueEcume.default};
`;
