import { Notification } from "@socialgouv/modeles-social";
import React from "react";
import { formatToEuro } from "src/common/formatToEuro";

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
        <small>
          {notifications.length > 0 && (
            <ul>
              {notifications.map((notification, index) => (
                <li key={index} data-testid={`notification-${index}`}>
                  {notification.description}
                </li>
              ))}
            </ul>
          )}
        </small>
      </p>
    </div>
  );
}
