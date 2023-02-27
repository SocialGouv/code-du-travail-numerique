import { formatIdcc } from "@socialgouv/modeles-social";
import { Paragraph } from "@socialgouv/cdtn-ui";
import React, { ForwardedRef, useEffect } from "react";
import styled from "styled-components";
import { Agreement } from "../../../../../conventions/Search/api/type";
import { ResultItem } from "../../components/ResultList";

type AgreementItemProps = {
  agreement: Agreement;
  isFirst: boolean;
  isSelected: boolean;
  onClick: (agreement: Agreement) => void;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export const AgreementLink = React.forwardRef<
  HTMLButtonElement,
  AgreementItemProps
>(function _AgreementLink(
  { agreement, isFirst, isSelected, onClick }: AgreementItemProps,
  ref: ForwardedRef<HTMLButtonElement>
): JSX.Element {
  const { num, shortTitle } = agreement;

  const clickHandler = () => {
    onClick(agreement);
  };
  useEffect(() => {
    if (isSelected) {
      // @ts-ignore
      ref?.current?.focus();
    }
  }, []);
  return (
    <ResultItem
      ref={ref}
      isFirst={isFirst}
      onClick={clickHandler}
      aria-selected={isSelected}
    >
      {shortTitle} <IDCC>(IDCC {formatIdcc(num)})</IDCC>
      {agreement.highlight && agreement.highlight.searchInfo && (
        <Paragraph variant="altText" noMargin>
          {agreement.highlight.searchInfo}
        </Paragraph>
      )}
    </ResultItem>
  );
});

const IDCC = styled.span`
  font-weight: normal;
`;
