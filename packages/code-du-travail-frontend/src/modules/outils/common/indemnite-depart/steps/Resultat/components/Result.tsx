import { Notification } from "@socialgouv/modeles-social";
import React from "react";
import { formatToEuro } from "src/common/formatToEuro";
import { NoticeNote } from "src/modules/outils/common/components/NoticeNote";

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
    <div>
      <h2>Indemnité</h2>
      <p>
        {resultMessage}{" "}
        <strong>
          <span
            dangerouslySetInnerHTML={{
              __html: formatToEuro(parseFloat(maxResult)),
            }}
          />
        </strong>
        <NoticeNote
          numberOfElements={notifications.length}
          currentElement={0}
          isList
        />
      </p>
      {notifications.map((notification, index) => (
        <small key={index} data-testid={`notification-${index}`}>
          <NoticeNote
            numberOfElements={notifications.length}
            currentElement={1 + index}
          />
          {notification.description}
        </small>
      ))}
    </div>
  );
}
