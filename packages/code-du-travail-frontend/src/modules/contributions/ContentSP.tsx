import { FicheServicePublic } from "../fiche-service-public/builder";

export const ContentSP = ({ raw, titleLevel }) => {
  return (
    <>
      {raw && (
        <div>
          <FicheServicePublic
            data={JSON.parse(raw).children}
            headingLevel={titleLevel}
          />
        </div>
      )}
    </>
  );
};
