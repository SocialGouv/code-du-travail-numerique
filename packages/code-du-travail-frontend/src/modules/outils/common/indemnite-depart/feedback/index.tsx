import { Introduction } from "./introduction";
import { useState } from "react";
import { Questionnaire } from "./Questionnaire";
import { QuestionnaireAdvanced } from "./QuestionnaireAdvanced";
import { QuestionnaireEnd } from "./QuestionnaireEnd";
import { EVENT_CATEGORY } from "./tracking";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";

type Props = {
  category: EVENT_CATEGORY;
};

export const Feedback = ({ category }: Props): JSX.Element => {
  const [status, setStatus] = useState<
    "questionnaire" | "questionnaireAdvanced" | "questionnaireEnd"
  >();
  const [position, setPosition] = useState(0);
  const [bodyPosition, setBodyPosition] = useState(0);
  return (
    <div className={`${fr.cx("fr-m-4v")} ${block}`}>
      {!status && (
        <div className={fr.cx("fr-p-3w")}>
          <Introduction
            onClick={() => {
              setStatus("questionnaire");
            }}
          />
        </div>
      )}
      {status && (
        <div
          className={fr.cx("fr-p-3w")}
          ref={(el) => {
            if (!el) return;

            setPosition(el.getBoundingClientRect().top);
            setBodyPosition(document.body.getBoundingClientRect().top);
          }}
        >
          {status === "questionnaire" && (
            <Questionnaire
              onClick={() => {
                setStatus("questionnaireAdvanced");
              }}
              category={category}
            />
          )}
          {status === "questionnaireAdvanced" && (
            <QuestionnaireAdvanced
              onClick={() => {
                setStatus("questionnaireEnd");
                window.scrollTo(0, position - bodyPosition - 220);
              }}
              category={category}
            />
          )}
          {status === "questionnaireEnd" && <QuestionnaireEnd />}
        </div>
      )}
    </div>
  );
};

const block = css({
  border: "1px solid",
  borderColor: "var(--border-default-blue-france)",
  width: "fit-content!",
  justifySelf: "flex-end",
});
