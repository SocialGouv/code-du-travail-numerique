import { fr } from "@codegouvfr/react-dsfr";
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
    <div className={fr.cx("fr-mb-2w")}>
      <h2>Indemnité</h2>
      <p className={fr.cx("fr-mb-1w")}>
        {resultMessage}
        <br />
        <strong className={fr.cx("fr-h2", "fr-mt-3v")}>
          <span
            dangerouslySetInnerHTML={{
              __html: formatToEuro(parseFloat(maxResult)),
            }}
          />
          <NoticeNote
            numberOfElements={notifications.length}
            currentElement={0}
            isList
          />
        </strong>
      </p>
      {notifications.map((notification, index) => (
        <div key={index}>
          <small data-testid={`notification-${index}`}>
            <NoticeNote
              numberOfElements={notifications.length}
              currentElement={1 + index}
            />
            {notification.description}
          </small>
          <br />
        </div>
      ))}
    </div>
  );
}
