import { FicheServicePublic } from "../fiche-service-public/builder";

export const ContentSP = ({ raw, titleLevel }) => {
  try {
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
  } catch (error) {
    console.error("Error parsing contribution content:", error);
    return <div>Une erreur est survenue lors du chargement du contenu.</div>;
  }
};
