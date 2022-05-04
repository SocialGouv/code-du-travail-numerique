import { theme, Toast } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { Enterprise } from "../../../../conventions/Search/api/enterprises.service";
import { Question } from "../../Question";

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
      <Question required={false} as="p">
        Vous avez sélectionné l&apos;entreprise&nbsp;:&nbsp;
      </Question>
      <Selected
        variant="secondary"
        onRemove={(event) => {
          event.preventDefault();
          onRemoveEnterprise();
        }}
      >
        {enterprise.simpleLabel}
      </Selected>
    </>
  );
};

export default SelectedEnterprise;

const Selected = styled(Toast)`
  margin-bottom: ${theme.spacings.small};
`;
