import { fr } from "@codegouvfr/react-dsfr";
import { Notification } from "@socialgouv/modeles-social";
import React from "react";
import { NoticeNote } from "src/modules/outils/common/components/NoticeNote";
import { formatToEuro } from "src/modules/outils/common/utils/formatCurrency";

type Props = {
  title: string;
  maxResult: string;
  notifications?: Notification[];
  resultMessage: string;
};

export default function Result({
  notifications = [],
  resultMessage,
  maxResult,
  title,
}: Props) {
  return (
    <div className={fr.cx("fr-mb-2w")}>
      <h3 className={fr.cx("fr-h2")}>{title}</h3>
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
          <p data-testid={`notification-${index}`}>
            <NoticeNote
              numberOfElements={notifications.length}
              currentElement={1 + index}
            />
            {notification.description}
          </p>
        </div>
      ))}
    </div>
  );
}
