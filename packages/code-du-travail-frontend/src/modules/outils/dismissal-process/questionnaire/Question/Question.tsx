import React, { useContext } from "react";
import { DossierLicenciementContext, useStore } from "../store";
import { ShowInfo } from "./ShowInfo";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import Tooltip from "@codegouvfr/react-dsfr/Tooltip";
import { css } from "@styled-system/css";

type QuestionProps = {
  widgetMode: boolean;
};

export const Question = ({ widgetMode }: QuestionProps) => {
  const store = useContext(DossierLicenciementContext);
  const answer = useStore(store, (state) => state.answer);
  const currentQuestion = useStore(store, (state) => state.currentQuestion);
  const lastResponse = useStore(store, (state) => state.lastResponse);

  return lastResponse?.slug ? (
    <ShowInfo slug={lastResponse.slug} widgetMode={widgetMode}></ShowInfo>
  ) : (
    <RadioButtons
      hintText={currentQuestion?.info}
      legend={currentQuestion?.text}
      name="radio"
      classes={{
        inputGroup: labelClass,
      }}
      options={
        currentQuestion?.responses.map((response, index) => ({
          label: (
            <span>
              {response.text}
              {response.description ? ` (${response.description})` : ""}
              {response.info && <Tooltip title={response.info} kind="click" />}
            </span>
          ),
          nativeInputProps: {
            value: response.slug,
            checked: false,
            onChange: () => {
              answer(index);
            },
          },
        })) ?? []
      }
    />
  );
};

const labelClass = css({
  "& .fr-label": {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flexDirection: "row!",
  },
  "& span": {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  "& button": {
    minHeight: "1.5rem!",
    maxHeight: "1.5rem!",
    maxWidth: "1.5rem!",
  },
});
