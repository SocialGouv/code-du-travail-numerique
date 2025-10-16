import { fr } from "@codegouvfr/react-dsfr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import Link from "../../common/Link";
import type { NavigationLink } from "./HeaderDsfr";

type NavigationLinkItemProps = {
  item: NavigationLink;
};

export const NavigationLinkItem = ({ item }: NavigationLinkItemProps) => {
  const { isActive = false, linkProps, text } = item;

  return (
    <li className={fr.cx("fr-nav__item")} data-fr-js-navigation-item="true">
      <Link
        className={cx(fr.cx("fr-nav__link"), linkProps?.className)}
        {...(linkProps as {})}
        href={linkProps?.href ?? ""}
        {...(isActive && { ["aria-current"]: "page" })}
      >
        {text}
      </Link>
    </li>
  );
};
