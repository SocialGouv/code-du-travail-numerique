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

export default function Result(props: Props) {
  return (
    <>
      <SectionTitle hasSmallMarginTop>Indemnité</SectionTitle>
      <p>
        {props.resultMessage}{" "}
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
