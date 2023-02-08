import {
  Paragraph,
  Section as SectionUi,
  theme,
  Toast,
} from "@socialgouv/cdtn-ui";
import styled from "styled-components";

import { Agreement } from "../../../../conventions/Search/api/type";
import { TrackingProps } from "../../../ConventionCollective/types";
import { Question } from "../../../common/Question";
import { AgreementSupportInfo } from "../../../common/Agreement/types";
import ShowAlert from "../../../common/Agreement/components/ShowAlert";
import { SearchAgreementInput } from "../../../common/Agreement/AgreementSearch/AgreementInput/SearchAgreementInput";
import { renderResults } from "../../../common/Agreement/AgreementSearch/AgreementSearchResult";
import { PublicodesSimulator } from "@socialgouv/modeles-social";

export type Props = {
  supportedAgreements: AgreementSupportInfo[];
  selectedAgreement?: Agreement;
  onSelectAgreement: (agreement: Agreement | null) => void;
  alertAgreementNotSupported?: (string) => JSX.Element;
  simulator: PublicodesSimulator;
} & TrackingProps;

const AgreementSearch = ({
  supportedAgreements,
  selectedAgreement,
  onSelectAgreement,
  onUserAction,
  alertAgreementNotSupported,
  simulator,
}: Props): JSX.Element => {
  if (selectedAgreement) {
    return (
      <>
        <Question required={false} as="p">
          Vous avez sélectionné la convention collective&nbsp;:&nbsp;
        </Question>
        <SelectedAgreement
          variant="secondary"
          onRemove={(event) => {
            event.preventDefault();
            onSelectAgreement(null);
          }}
        >
          {selectedAgreement.shortTitle}
        </SelectedAgreement>
        <ShowAlert
          currentAgreement={selectedAgreement}
          supportedAgreements={supportedAgreements}
          alertAgreementNotSupported={alertAgreementNotSupported}
          simulator={simulator}
        />
      </>
    );
  }
  return (
    <Section>
      <Paragraph noMargin fontWeight="600" fontSize="default">
        Précisez et sélectionnez votre convention collective
      </Paragraph>
      <SearchAgreementInput
        onUserAction={onUserAction}
        renderResults={renderResults({
          onSelectAgreement,
          onUserAction,
        })}
      />
    </Section>
  );
};

const { spacings } = theme;

const Section = styled(SectionUi)`
  padding-top: 0;
  label {
    font-weight: 400;
  }
`;
export const SelectedAgreement = styled(Toast)`
  margin-bottom: ${spacings.base};
`;

export default AgreementSearch;
