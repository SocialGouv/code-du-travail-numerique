import { Paragraph, Toast } from "@socialgouv/cdtn-ui";
import React from "react";

import { Enterprise } from "../../../../conventions/Search/api/enterprises.service";

type Props = {
  enterprise: Enterprise;
  onRemoveEnterprise: () => void;
};

const SelectedEnterprise = ({
  enterprise,
  onRemoveEnterprise,
}: Props): JSX.Element => {
  return (
    <>
      <Paragraph fontWeight="600" fontSize="default">
        Vous avez sélectionné l&apos;entreprise&nbsp;:&nbsp;
      </Paragraph>
      <Toast
        variant="secondary"
        onRemove={(event) => {
          event.preventDefault();
          onRemoveEnterprise();
        }}
      >
        {enterprise.simpleLabel}
      </Toast>
    </>
  );
};

export default SelectedEnterprise;
