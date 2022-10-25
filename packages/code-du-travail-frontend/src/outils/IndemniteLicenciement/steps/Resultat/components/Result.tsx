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
};

export default function Result(props: Props) {
  return (
    <>
      <SectionTitle>Indemnité</SectionTitle>
      <p>
        À partir des éléments que vous avez saisis, l’indemnité de licenciement
        est estimée à&nbsp;:&nbsp;
        <HighlightResult>{`${props.maxResult.replace(
          ".",
          ","
        )} € brut.`}</HighlightResult>
        {props.notifications && props.notifications.length > 0 && (
          <NoticeNote
            numberOfElements={props.notifications.length}
            currentElement={0}
            isList
          />
        )}
      </p>
      {props.notifications && props.notifications.length > 0 && (
        <SmallText>
          {props.notifications.map((notification, index) => (
            <>
              <NoticeNote
                numberOfElements={props.notifications!.length}
                currentElement={1 + index}
              />
              {notification.description}
            </>
          ))}
        </SmallText>
      )}
    </>
  );
}
