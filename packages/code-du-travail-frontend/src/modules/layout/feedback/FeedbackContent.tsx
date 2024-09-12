import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { Notice } from "@codegouvfr/react-dsfr/Notice";
import { css } from "../../../../styled-system/css";
import { MatomoFeedbackEventCategory } from "../../tracking";
import { useState } from "react";

type Props = {
  onSubmit: (data: FeedbackDataSent) => void;
  type: "positive" | "negative";
};

export type FeedbackDataSent = {
  suggestion?: string;
  categories?: MatomoFeedbackEventCategory[];
};

const MAX_LENGTH = 150;

export const FeedbackContent = (props: Props) => {
  const [categories, setCategories] = useState<MatomoFeedbackEventCategory[]>(
    []
  );
  const [suggestion, setSuggestion] = useState<string | undefined>(undefined);

  const onChangeCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategories((prev) => {
      if (e.target.checked) {
        return [...prev, e.target.value as MatomoFeedbackEventCategory];
      }
      return prev.filter((category) => category !== e.target.value);
    });
  };

  const onChangeSuggestion = (value: string) => {
    if (value.trim().length > MAX_LENGTH) {
      return;
    } else {
      setSuggestion(value);
    }
  };

  const onLocalSubmit = () => {
    if (
      (!suggestion || suggestion.trim().length <= 0) &&
      categories.length === 0
    ) {
      alert("Veuillez renseigner au minimum un champ");
      return;
    }
    props.onSubmit({
      categories,
      suggestion,
    });
  };

  return (
    <div className={container}>
      <h2 className={fr.cx("fr-h5")}>Merci pour votre réponse.</h2>
      {props.type === "negative" && (
        <Checkbox
          legend="Pouvez-vous nous en dire plus ?"
          options={[
            {
              label: "Les informations ne sont pas claires",
              nativeInputProps: {
                name: "checkboxes-1",
                value: "unclear" as MatomoFeedbackEventCategory,
                onChange: onChangeCategories,
              },
            },
            {
              label:
                "Cette page ne correspond pas à ma recherche ou à ma situation.",
              nativeInputProps: {
                name: "checkboxes-2",
                value: "unrelated" as MatomoFeedbackEventCategory,
                onChange: onChangeCategories,
              },
            },
            {
              label: "Je ne suis pas satisfait de cette réglementation.",
              nativeInputProps: {
                name: "checkboxes-3",
                value: "unsatisfied" as MatomoFeedbackEventCategory,
                onChange: onChangeCategories,
              },
            },
            {
              label: "Les informations me semblent fausses.",
              nativeInputProps: {
                name: "checkboxes-4",
                value: "wrong" as MatomoFeedbackEventCategory,
                onChange: onChangeCategories,
              },
            },
          ]}
        />
      )}
      <Input
        hintText="Une idée, une suggestion"
        label="Faire une suggestion pour améliorer cette page"
        textArea={true}
        nativeTextAreaProps={{
          onChange: (e) => onChangeSuggestion(e.target.value),
          value: suggestion,
        }}
      />
      <p className={fr.cx("fr-info-text", "fr-mt-0", "fr-mb-3w")}>
        {`${MAX_LENGTH} caractères maximum`}
      </p>
      <Button type="button" priority="secondary" onClick={onLocalSubmit}>
        Envoyer
      </Button>
    </div>
  );
};

const container = css({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});
