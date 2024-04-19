import { Notification } from "@socialgouv/modeles-social";
import React from "react";
import { NoticeNote } from "../../../../common/NoticeNote";
import { Paragraph, theme } from "@socialgouv/cdtn-ui";

import { HighlightResult, SectionTitle } from "../../../../common/stepStyles";
import styled from "styled-components";

type Props = {
  maxResult: string;
  notifications?: Notification[];
  resultMessage: string;
};

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
        <HighlightResult>{maxResult.replace(".", ",")}&nbsp;€.</HighlightResult>
        <NoticeNote
          numberOfElements={notifications.length}
          currentElement={0}
          isList
        />
      </Paragraph>
      {notifications.map((notification, index) => (
        <Paragraph fontSize="small" noMargin key={index}>
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
