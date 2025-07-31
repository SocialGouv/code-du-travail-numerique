import { BlueBlock } from "../../common/BlueBlock";
import DismissalProcessIcon from "./component/DismissalProcessIcon.svg";
import { fr } from "@codegouvfr/react-dsfr";
import { QuestionnaireWrapper } from "./questionnaire/QuestionnaireWrapper";
import React from "react";

type Props = {
  widgetMode?: boolean;
};

export const DismissalProcess = ({ widgetMode = false }: Props) => {
  return (
    <>
      <BlueBlock
        id="dismissal-process"
        title="Quelle est votre situation ?"
        titleLevel="h2"
        picto={DismissalProcessIcon}
      >
        <p className={fr.cx("fr-ml-md-15v", "fr-mt-4w")}>
          Vous souhaitez obtenir des informations concernant une procédure de
          licenciement&nbsp;? Afin de vous apporter une réponse adaptée,
          veuillez tout d&apos;abord préciser votre situation.
        </p>
        <QuestionnaireWrapper
          name="dismissalProcess"
          slug="procedure-licenciement"
          widgetMode={widgetMode}
          className={fr.cx("fr-ml-md-7w")}
        />
      </BlueBlock>
    </>
  );
};
