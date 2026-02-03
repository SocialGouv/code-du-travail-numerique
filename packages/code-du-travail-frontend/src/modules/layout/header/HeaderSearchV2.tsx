import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { HeaderAgreementButton } from "./HeaderAgreementButton";

type HeaderSearchProps = {
  onSearchClick: () => void;
  onAgreementClick: () => void;
  isSearchOpen?: boolean;
  isAgreementOpen?: boolean;
};

export const HeaderSearchV2 = ({
  onSearchClick,
  onAgreementClick,
  isSearchOpen,
  isAgreementOpen,
}: HeaderSearchProps) => {
  return (
    <div
      className={`${fr.cx(
        "fr-header__tools",
        "fr-hidden",
        "fr-unhidden-lg"
      )} ${toolsStyle}`}
    >
      <div className={toolsRow}>
        <Button
          id="fr-header-search-button-desktop"
          title="Rechercher"
          aria-controls="search-modal"
          aria-expanded={isSearchOpen}
          onClick={onSearchClick}
          iconId="fr-icon-search-line"
          iconPosition="right"
          className={buttonStyle}
          type="button"
        >
          Rechercher
        </Button>
        <HeaderAgreementButton
          id="fr-header-agreement-button-desktop"
          isOpen={!!isAgreementOpen}
          onClick={onAgreementClick}
        />
      </div>
    </div>
  );
};

const toolsStyle = css({
  display: "flex",
  alignItems: "center",
  flexWrap: "nowrap",
  width: "100%",
  justifyContent: "flex-end",
});

const toolsRow = css({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  flexWrap: "nowrap",
});

const buttonStyle = css({
  height: "48px",
});
