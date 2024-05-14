import { Notification } from "@socialgouv/modeles-social";
import React from "react";
import { NoticeNote } from "../../../../common/NoticeNote";
import { Paragraph, theme } from "@socialgouv/cdtn-ui";

import { HighlightResult, SectionTitle } from "../../../../common/stepStyles";
import styled from "styled-components";
import { Html } from "next/document";

type Props = {
  maxResult: string;
  notifications?: Notification[];
  resultMessage: string;
};

function formatNumber(result: string) {
  const [integer, decimals] = result.split(".");
  const integer1 = integer.slice(0, integer.length - 3);
  const integer2 = integer.slice(integer.length - 3, integer.length);
  return (
    (integer1 ? `${integer1}&nbsp;` : "") +
    integer2 +
    (decimals ? `,${decimals}` : "")
  );
}

export default function Result({
  notifications = [],
  resultMessage,
  maxResult,
}: Props) {
  return (
    <DIV>
      <SectionTitle hasSmallMarginTop>Indemnité</SectionTitle>
      <Paragraph noMargin>
        {resultMessage}{" "}
        <HighlightResult>
          <span
            dangerouslySetInnerHTML={{
              __html: `${formatNumber(maxResult)}&nbsp;€`,
            }}
          />
        </HighlightResult>
        <NoticeNote
          numberOfElements={notifications.length}
          currentElement={0}
          isList
        />
      </Paragraph>
      {notifications.map((notification, index) => (
        <Paragraph
          fontSize="small"
          noMargin
          key={index}
          data-testid={`notification-${index}`}
        >
          <NoticeNote
            numberOfElements={notifications.length}
            currentElement={1 + index}
          />
          {notification.description}
        </Paragraph>
      ))}
    </DIV>
  );
}

export const StyledLink = styled.a`
  font-weight: normal;
`;
export const DIV = styled.div`
  margin-bottom: ${theme.spacings.small};
`;
