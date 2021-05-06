import { Alert, Button, icons, theme } from "@socialgouv/cdtn-ui";
import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  children: React.ReactNode;
};

export function InfoBulle({ children, title }: Props): JSX.Element {
  const [isNoticeVisible, setIsNoticeVisible] = useState(false);

  return (
    <>
      <InfoButton
        title={title}
        aria-label={title}
        variant="navLink"
        size="small"
        type="button"
        onClick={() => setIsNoticeVisible(!isNoticeVisible)}
      >
        <icons.HelpCircle size="20" aria-label="?" />
      </InfoButton>
      {isNoticeVisible && (
        <AlertWithMargin size="small" variant="secondary">
          {children}
        </AlertWithMargin>
      )}
    </>
  );
}

const InfoButton = styled(Button)`
  display: inline-block;
  font-weight: 700;
  font-size: ${theme.fonts.sizes.small};
  color: ${({ theme }) => theme.secondary};
  margin-left: ${theme.spacings.xsmall};
  padding: 0.5rem;
  height: 2rem;
  width: 2rem;
  position: relative;
  bottom: -0.5rem;
`;
const AlertWithMargin = styled(Alert)`
  margin-top: ${theme.spacings.base};
`;
