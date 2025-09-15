"use client";

import React, { useState } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { useRouter } from "next/navigation";
import { useSearchTracking } from "src/modules/recherche/tracking";
import { useABTesting } from "../../config/MatomoAnalytics";
import { ABTestVariant } from "../../config/matomo/ABTestingConstant";
import Input from "@codegouvfr/react-dsfr/Input";

export const HomeSearch = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { emitSearchEvent } = useSearchTracking();

  const handleSearch = (searchTerm: string) => {
    emitSearchEvent(searchTerm.trim());
    router.push(`/recherche?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const { abTest } = useABTesting();

  const label =
    abTest.variant == ABTestVariant.NEUTRAL
      ? "Que cherchez-vous ?"
      : abTest.variant == ABTestVariant.NATURAL
        ? "Que souhaitez-vous savoir ?"
        : "Recherchez par mots-clés";

  const example =
    abTest.variant == ABTestVariant.NEUTRAL
      ? "Exemple : congés payés, Quelle durée du préavis pour un licenciement ?"
      : abTest.variant == ABTestVariant.NATURAL
        ? "par exemple : Comment sont comptés les congés pendant les arrêts maladies ?"
        : "par exemple : congés payés, durée de préavis";

  const colField =
    abTest.variant == ABTestVariant.NATURAL ? "fr-col-md-9" : "fr-col-md-8";
  const colButton =
    abTest.variant == ABTestVariant.NATURAL ? "fr-col-md-3" : "fr-col-md-4";

  return (
    <form
      className={fr.cx(
        "fr-grid-row",
        "fr-grid-row--gutters",
        "fr-grid-row--bottom"
      )}
      role="search"
      onSubmit={onSubmit}
    >
      <div className={fr.cx("fr-col-12", colField)}>
        <Input
          hintText={example}
          label={<>{label}</>}
          nativeInputProps={{
            type: "text",
            // @ts-ignore
            "data-testid": "search-input",
            "aria-labelledby": undefined,
            onChange: (e) => {
              setQuery(e.target.value);
            },
          }}
          className={`${fr.cx("fr-mb-0")}`}
          classes={{
            root: rootInputCss,
          }}
        />
      </div>
      <div className={fr.cx("fr-col-12", colButton)}>
        <Button
          iconId="fr-icon-search-line"
          iconPosition="right"
          priority="primary"
          nativeButtonProps={{
            "aria-label": "Lancer la recherche",
          }}
          className={buttonStyle}
          type="submit"
        >
          Rechercher
        </Button>
      </div>
    </form>
  );
};

const buttonStyle = css({
  mdDown: {
    width: "100%!",
    justifyContent: "center!",
  },
});

const rootInputCss = css({
  width: "100%",
});
