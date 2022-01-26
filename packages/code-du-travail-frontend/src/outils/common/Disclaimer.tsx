import {
  Alert,
  icons,
  IconStripe,
  Paragraph,
  theme,
} from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

type Props = {
  title: string;
  children: React.ReactNode;
};

const Disclaimer = ({ title, children }: Props): JSX.Element => (
  <Warning>
    <IconStripe centered icon={icons.Warning}>
      <WarningTitle>{title}</WarningTitle>
    </IconStripe>
    {children}
  </Warning>
);
const { fonts, spacings } = theme;

const Warning = styled(Alert)`
  margin-top: ${spacings.large};
`;

const WarningTitle = styled(Paragraph)`
  color: ${({ theme }) => theme.altText};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  margin: 0;
`;
export default Disclaimer;
