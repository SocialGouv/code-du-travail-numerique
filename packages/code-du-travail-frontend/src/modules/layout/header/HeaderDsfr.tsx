import { fr } from "@codegouvfr/react-dsfr";
import type { MainNavigationProps } from "@codegouvfr/react-dsfr/src/MainNavigation";
import { HeaderBrand } from "./HeaderBrand";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderNavigation } from "./HeaderNavigation";

type Props = {
  navigation?: MainNavigationProps.Item.Link[];
  onSearchSubmit: (data: string) => void;
};

export const HeaderDsfr = ({ navigation, onSearchSubmit }: Props) => {
  return (
    <header role="banner" id="fr-header" className={fr.cx("fr-header")}>
      <div className={fr.cx("fr-header__body")}>
        <div className={fr.cx("fr-container")}>
          <div className={fr.cx("fr-header__body-row")}>
            <HeaderBrand />
            <HeaderSearch onSearchSubmit={onSearchSubmit} />
          </div>
        </div>
      </div>
      <HeaderNavigation navigation={navigation} />
    </header>
  );
};
