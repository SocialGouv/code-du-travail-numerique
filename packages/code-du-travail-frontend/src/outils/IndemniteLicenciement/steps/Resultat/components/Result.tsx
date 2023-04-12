import { Notification } from "@socialgouv/modeles-social";
import React from "react";
import { NoticeNote } from "../../../../common/NoticeNote";
import { Paragraph, theme } from "@socialgouv/cdtn-ui";

import {
  HighlightResult,
  SectionTitle,
  SmallText,
} from "../../../../common/stepStyles";
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
  const notifs = [
    {
      dottedName: "congé paternité",
      description: (
        <span>
          Ce montant est exonéré d’impôt sur le revenu et de cotisations
          sociales sous certaines conditions,{" "}
          <StyledLink
            href="/fiche-service-public/indemnite-de-licenciement-du-salarie-en-cdi"
            target="_blank"
          >
            en savoir plus
          </StyledLink>
        </span>
      ),
    } as Notification,
  ].concat(notifications);
  return (
    <DIV>
      <SectionTitle hasSmallMarginTop>Indemnité</SectionTitle>
      <Paragraph noMargin>
        {resultMessage}{" "}
        <HighlightResult>{maxResult.replace(".", ",")}&nbsp;€.</HighlightResult>
        <NoticeNote
          numberOfElements={notifs.length}
          currentElement={0}
          isList
        />
      </Paragraph>
      <Paragraph fontSize="small" noMargin>
        {notifs.map((notification, index) => (
          <span key={index}>
            <NoticeNote
              numberOfElements={notifs.length}
              currentElement={1 + index}
            />
            {notification.description}{" "}
          </span>
        ))}
      </Paragraph>
    </DIV>
  );
}

export const StyledLink = styled.a`
  font-weight: normal;
`;
export const DIV = styled.div`
  margin-bottom: ${theme.spacings.small};
`;
