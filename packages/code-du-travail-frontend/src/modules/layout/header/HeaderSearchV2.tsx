import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";

type HeaderSearchProps = {
  onSearchClick: () => void;
};

export const HeaderSearchV2 = ({ onSearchClick }: HeaderSearchProps) => {
  return (
    <div className={fr.cx("fr-header__tools", "fr-hidden", "fr-unhidden-lg")}>
      <Button
        id="fr-header-search-button-desktop"
        title="Rechercher"
        aria-controls="search-modal"
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

const buttonStyle = css({
  height: "48px",
});
