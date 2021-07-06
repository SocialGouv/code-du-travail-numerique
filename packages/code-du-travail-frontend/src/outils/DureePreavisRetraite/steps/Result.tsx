import {
  Accordion,
  Alert,
  icons,
  IconStripe,
  theme,
} from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import PubliReferences from "../../common/PubliReferences";
import PubliSituation from "../../common/PubliSituation";
import { Highlight, SmallText } from "../../common/stepStyles";
import { FormContent, WizardStepProps } from "../../common/type/WizardType";
import { PublicodesContextInterface, usePublicodes } from "../../publicodes";
import DecryptedResult from "./component/DecryptedResult";
import ShowResult from "./component/ShowResult";

interface Props {
  content: FormContent;
  publicodesContext: PublicodesContextInterface;
}

const ResultDetail: React.FC<Props> = ({ content, publicodesContext }) => {
  const references = publicodesContext.getReferences();

  return (
    <>
      <PubliSituation situation={publicodesContext.situation} form={content} />
      <DecryptedResult nothing={""} />
      <PubliReferences references={references} />
    </>
  );
};

function ResultStep({ form }: WizardStepProps): JSX.Element {
  const publicodesContext = usePublicodes();

  return (
    <>
      <ShowResult publicodesContext={publicodesContext} />
      <Accordion
        items={[
          {
            body: (
              <ResultDetail
                content={form.getState().values}
                publicodesContext={publicodesContext}
              />
            ),
            title: <p>Comprendre le résultat</p>,
          },
        ]}
      />
      <Warning>
        <IconStripe centered icon={icons.Warning}>
          <WarningTitle>
            Attention il peut exister une durée plus favorable
          </WarningTitle>
        </IconStripe>
        <p>
          Un accord collectif d&apos;entreprise, le contrat de travail ou un
          usage peut prévoir une durée de préavis<sup>*</sup> ou encore une
          condition d&apos;ancienneté<sup>*</sup> plus favorable pour le
          salarié. Dans ce cas, c&apos;est cette durée plus favorable ou cette
          ancienneté qui s&apos;applique au salarié.
        </p>
        <p>
          <SmallText>
            <sup>*</sup>&nbsp;durée de préavis plus favorable pour le salarié =
            durée plus longue
            <br />
            <sup>*</sup>&nbsp;condition d&apos;ancienneté plus favorable pour le
            salarié = condition d&apos;ancienneté = condition d&apos;ancienneté
            moins restrictive et conduisant à une durée de préavis plus longue.
          </SmallText>
        </p>
      </Warning>
    </>
  );
}

const { fonts, spacings } = theme;

export const HighlightResult = styled(Highlight)`
  font-weight: bold;
  font-size: 1.5em;
`;

export const Notification = styled(SmallText)``;

export const Warning = styled(Alert)`
  margin-top: ${spacings.large};
`;

export const WarningTitle = styled.span`
  color: ${({ theme }) => theme.altText};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
`;

export { ResultStep };
