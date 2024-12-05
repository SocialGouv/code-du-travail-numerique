"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";

import { ButtonStyle } from "../../convention-collective/style";
import { EnterpriseAgreementSearchInput } from "./EnterpriseAgreementSearchInput";
import { useSearchParams } from "next/navigation";

type Props = {
  widgetMode?: boolean;
};

export const EnterpriseAgreementSearch = ({ widgetMode = false }: Props) => {
  const searchParams = useSearchParams();
  const defaultSearch = searchParams?.get("q") ?? undefined;
  const cp = searchParams?.get("cp");
  const defaultLocation = cp ? JSON.parse(atob(cp)) : undefined;
  return (
    <>
      <EnterpriseAgreementSearchInput
        widgetMode={widgetMode}
        defaultSearch={defaultSearch}
        defaultLocation={defaultLocation}
      />
      {!widgetMode && (
        <div className={fr.cx("fr-mt-2w")}>
          <Button
            linkProps={{ href: "/outils/convention-collective" }}
            priority="secondary"
            className={ButtonStyle}
          >
            Précédent
          </Button>
        </div>
      )}
    </>
  );
};
