import { Notification } from "@socialgouv/modeles-social";
import React from "react";
import { NoticeNote } from "../../../../common/NoticeNote";
import {
  HighlightResult,
  SectionTitle,
  SmallText,
} from "../../../../common/stepStyles";

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
      description:
        "Depuis le 11 mars 2023 les périodes d’absence pour congé paternité ne sont plus retirées de l’ancienneté du salarié. Si le salarié a pris un congé paternité avant cette date, il peut être décompté de son ancienneté et de ce fait, donner lieu à un montant d’indemnité moins favorable que celui de notre simulateur.",
    } as Notification,
  ].concat(notifications);
  return (
    <>
      <SectionTitle hasSmallMarginTop>Indemnité</SectionTitle>
      <p>
        {resultMessage}{" "}
        <HighlightResult>{maxResult.replace(".", ",")}&nbsp;€.</HighlightResult>
        <NoticeNote
          numberOfElements={notifs.length}
          currentElement={0}
          isList
        />
      </p>
      <p>
        Ce montant est exonéré d’impôt sur le revenu et de cotisations sociales
        sous certaines conditions (en savoir plus sur l’exonération de l’
        <a
          href="/fiche-service-public/indemnite-de-licenciement-du-salarie-en-cdi"
          target="_blank"
        >
          indemnité de licenciement
        </a>
        )
      </p>
      <SmallText>
        {notifs.map((notification, index) => (
          <span key={index}>
            <NoticeNote
              numberOfElements={notifs.length}
              currentElement={1 + index}
            />
            {notification.description}
          </span>
        ))}
      </SmallText>
    </>
  );
}
