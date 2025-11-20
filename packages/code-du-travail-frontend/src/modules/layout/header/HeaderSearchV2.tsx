import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";

type HeaderSearchProps = {
  onSearchClick: () => void;
};

export const HeaderSearchV2 = ({ onSearchClick }: HeaderSearchProps) => {
  return (
    <div className={fr.cx("fr-header__tools")}>
      <Button
        title="Rechercher"
        onClick={onSearchClick}
        iconId="fr-icon-search-line"
        iconPosition="right"
        className={buttonStyle}
      >
        Rechercher
      </Button>
    </div>
  );
};

const buttonStyle = css({
  height: "60px",
});
