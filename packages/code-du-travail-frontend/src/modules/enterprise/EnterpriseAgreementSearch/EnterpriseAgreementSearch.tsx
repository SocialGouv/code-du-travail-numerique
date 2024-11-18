import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";

import { ButtonStyle } from "../../convention-collective/style";
import { EnterpriseAgreementSearchInput } from "./EnterpriseAgreementSearchInput";

type Props = {
  widgetMode?: boolean;
};

export const EnterpriseAgreementSearch = ({ widgetMode = false }: Props) => {
  return (
    <>
      <EnterpriseAgreementSearchInput
        widgetMode={widgetMode}
      ></EnterpriseAgreementSearchInput>
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
