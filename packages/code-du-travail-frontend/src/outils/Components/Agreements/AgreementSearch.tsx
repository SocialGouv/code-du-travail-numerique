import {
  Paragraph,
  Section as SectionUi,
  theme,
  Toast,
} from "@socialgouv/cdtn-ui";
import styled from "styled-components";

import { Agreement } from "../../types";
import { TrackingProps } from "../../ConventionCollective/types";
import { Question } from "../../common/Question";
import { AgreementSupportInfo } from "../../common/Agreement/types";
import ShowAlert from "../../common/Agreement/components/ShowAlert";
import { SearchAgreementInput } from "../../common/Agreement/AgreementSearch/AgreementInput/SearchAgreementInput";
import { PublicodesSimulator } from "@socialgouv/modeles-social";

export type Props = {
  supportedAgreements: AgreementSupportInfo[];
  selectedAgreement?: Agreement;
  onSelectAgreement: (agreement: Agreement | null) => void;
  alertAgreementNotSupported?: (string) => JSX.Element;
  simulator: PublicodesSimulator | "QUESTIONNAIRE";
  searchResultOverride?: (query: string, results: Agreement[]) => Agreement[];
} & TrackingProps;

const AgreementSearch = ({
  supportedAgreements,
  selectedAgreement,
  onSelectAgreement,
  onUserAction,
  alertAgreementNotSupported,
  simulator,
  searchResultOverride,
}: Props): JSX.Element => {
  if (selectedAgreement) {
    return (
      <>
        <Question required={false}>
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
        onSelectAgreement={onSelectAgreement}
        searchResultOverride={searchResultOverride}
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
const SelectedAgreement = styled(Toast)`
  margin-bottom: ${spacings.base};
`;

export default AgreementSearch;
