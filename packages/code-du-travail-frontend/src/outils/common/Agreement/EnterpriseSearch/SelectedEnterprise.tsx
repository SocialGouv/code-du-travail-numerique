import { theme, Toast } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { Enterprise } from "../../../../conventions/Search/api/enterprises.service";
import { SectionTitle } from "../../stepStyles";

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
      <SectionTitle>
        Vous avez sélectionné l&apos;entreprise&nbsp;:&nbsp;
      </SectionTitle>
      <ToastStyled
        variant="secondary"
        onRemove={(event) => {
          event.preventDefault();
          onRemoveEnterprise();
        }}
      >
        {enterprise.simpleLabel}
      </ToastStyled>
    </>
  );
};

const { spacings } = theme;

const ToastStyled = styled(Toast)`
  width: 100%;
  margin-bottom: ${spacings.medium};
`;

export default SelectedEnterprise;
