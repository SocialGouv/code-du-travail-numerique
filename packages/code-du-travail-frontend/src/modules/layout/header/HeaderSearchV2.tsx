import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";

type HeaderSearchProps = {
  onSearchClick: () => void;
  isSearchOpen?: boolean;
};

export const HeaderSearchV2 = ({
  onSearchClick,
  isSearchOpen,
}: HeaderSearchProps) => {
  return (
    <div
      className={`${fr.cx(
        "fr-header__tools",
        "fr-hidden",
        "fr-unhidden-lg"
      )} ${toolsStyle}`}
    >
      <Button
        id="fr-header-search-button-desktop"
        aria-controls="search-modal"
        aria-expanded={isSearchOpen}
        aria-haspopup="dialog"
        onClick={onSearchClick}
        iconId="fr-icon-search-line"
        iconPosition="right"
        className={buttonStyle}
        type="button"
      >
        Rechercher
      </Button>
    </div>
  );
};

const toolsStyle = css({
  display: "flex",
  alignItems: "center",
  flexWrap: "nowrap",
  justifyContent: "flex-end",
  flexShrink: 0,
});

const buttonStyle = css({
  height: "48px",
});
