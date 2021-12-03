import { Button, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

type Props = {
  icon: React.ReactNode;
  iconTitle: string;
  handleClick: () => void;
};

export const InfoButtonIcon = ({
  icon,
  iconTitle,
  handleClick,
}: Props): JSX.Element => (
  <DisclosureIconButton
    title={iconTitle}
    aria-label={iconTitle}
    variant="navLink"
    size="small"
    type="button"
    onClick={handleClick}
  >
    {icon}
  </DisclosureIconButton>
);

const { fonts, spacings } = theme;

const DisclosureIconButton = styled(Button)`
  display: inline-block;
  font-weight: 700;
  font-size: ${fonts.sizes.small};
  color: ${({ theme }) => theme.secondary};
  margin-left: ${spacings.xsmall};
  padding: 0.5rem;
  height: 2rem;
  width: 2rem;
  position: relative;
`;
