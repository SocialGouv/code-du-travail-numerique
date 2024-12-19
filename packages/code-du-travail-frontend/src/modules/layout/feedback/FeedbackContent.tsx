import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { FeedbackActionChoiceValue } from "./tracking";
import { useEffect, useState } from "react";

const MAX_LENGTH_SUGGESTION = 500;

type Props = {
  onSubmit: (data: FeedbackDataSent) => void;
  type: "positive" | "negative";
};

export type FeedbackDataSent = {
  suggestion?: string;
  categories?: FeedbackActionChoiceValue[];
};

export const FeedbackContent = (props: Props) => {
  const [firstCheckboxRef, setFirstCheckboxRef] =
    useState<HTMLInputElement | null>();
  const [textAreaRef, setTextAreaRef] = useState<HTMLTextAreaElement | null>();
  const [categories, setCategories] = useState<FeedbackActionChoiceValue[]>([]);
  const [suggestion, setSuggestion] = useState<string | undefined>(undefined);
  const [hasCheckBoxError, setHasCheckBoxError] = useState<boolean>(false);
  const [hasSuggestionError, setHasSuggestionError] = useState<boolean>(false);
  const [errorMessageCheckbox, setErrorMessageCheckbox] = useState<string>("");
  const [errorMessageSuggestion, setErrorMessageSuggestion] =
    useState<string>("");
  const [remainingCharacters, setRemainingCharacters] = useState<number>(
    MAX_LENGTH_SUGGESTION
  );

  const onInputSuggestion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.trim().length > MAX_LENGTH_SUGGESTION) {
      return;
    } else {
      setSuggestion(value);
      setRemainingCharacters(MAX_LENGTH_SUGGESTION - value.length);
    }
  };

  const onChangeCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategories((prev) => {
      if (e.target.checked) {
        return [...prev, e.target.value as FeedbackActionChoiceValue];
      }
      return prev.filter((category) => category !== e.target.value);
    });
  };
  const onLocalSubmit = () => {
    if (
      (!suggestion || suggestion.trim().length <= 0) &&
      categories.length === 0
    ) {
      setHasCheckBoxError(true);
      setHasSuggestionError(true);
      setErrorMessageCheckbox(
        "Veuillez sélectionner au moins une option ou faire une suggestion"
      );
      setErrorMessageSuggestion(
        props.type === "negative"
          ? "Veuillez renseigner au minimum ce champ ou sélectionner une option"
          : "Veuillez renseigner ce champ"
      );
    } else {
      setHasCheckBoxError(false);
      setHasSuggestionError(false);
      setErrorMessageCheckbox("");
      setErrorMessageSuggestion("");
      props.onSubmit({
        categories,
        suggestion,
      });
    }
  };
  const charactersCountThresholds = [
    400, 300, 200, 100, 50, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
  ];

  useEffect(() => {
    if (props.type === "negative") {
      firstCheckboxRef?.focus();
    } else {
      textAreaRef?.focus();
    }
  });

  return (
    <>
      <h2 className={fr.cx("fr-h5")}>Merci pour votre réponse.</h2>
      {props.type === "negative" && (
        <Checkbox
          legend="Pouvez-vous nous en dire plus ?"
          options={[
            {
              label: "Les informations ne sont pas claires",
              nativeInputProps: {
                name: "unclear",
                value: "unclear" as FeedbackActionChoiceValue,
                onChange: onChangeCategories,
                ref: setFirstCheckboxRef,
              },
            },
            {
              label:
                "Cette page ne correspond pas à ma recherche ou à ma situation.",
              nativeInputProps: {
                name: "unrelated",
                value: "unrelated" as FeedbackActionChoiceValue,
                onChange: onChangeCategories,
              },
            },
            {
              label: "Je ne suis pas satisfait de cette réglementation.",
              nativeInputProps: {
                name: "unsatisfied",
                value: "unsatisfied" as FeedbackActionChoiceValue,
                onChange: onChangeCategories,
              },
            },
            {
              label: "Les informations me semblent fausses.",
              nativeInputProps: {
                name: "wrong",
                value: "wrong" as FeedbackActionChoiceValue,
                onChange: onChangeCategories,
              },
            },
          ]}
          state={hasCheckBoxError ? "error" : "default"}
          stateRelatedMessage={errorMessageCheckbox}
        />
      )}
      <Input
        label="Faire une suggestion pour améliorer cette page"
        textArea
        nativeTextAreaProps={{
          onChange: onInputSuggestion,
          value: suggestion,
          ref: setTextAreaRef,
        }}
        state={hasSuggestionError ? "error" : "default"}
        stateRelatedMessage={errorMessageSuggestion}
      />
      <p
        className={fr.cx(
          remainingCharacters === 0 ? "fr-error-text" : "fr-info-text",
          "fr-mt-0",
          "fr-mb-3w"
        )}
        aria-live={
          charactersCountThresholds.indexOf(remainingCharacters) !== -1
            ? "polite"
            : "off"
        }
        aria-atomic
        data-testid="characterInfo"
      >
        {`${remainingCharacters} caractère${
          remainingCharacters > 1 ? "s" : ""
        } restant${remainingCharacters > 1 ? "s" : ""}`}
      </p>
      <Button type="button" priority="secondary" onClick={onLocalSubmit}>
        Envoyer
      </Button>
    </>
  );
};
