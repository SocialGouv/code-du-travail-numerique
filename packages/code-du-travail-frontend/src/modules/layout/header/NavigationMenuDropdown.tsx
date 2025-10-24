import { fr } from "@codegouvfr/react-dsfr";
import { useState } from "react";
import Link from "../../common/Link";
import type { NavigationMenu } from "./HeaderDsfr";

type NavigationMenuDropdownProps = {
  item: NavigationMenu;
  index: number;
  currentPath: string;
};

export const NavigationMenuDropdown = ({
  item,
  index,
  currentPath,
}: NavigationMenuDropdownProps) => {
  const { isActive = false, text, menuLinks } = item;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li className={fr.cx("fr-nav__item")} data-fr-js-navigation-item="true">
      <button
        className={fr.cx("fr-nav__btn")}
        aria-expanded={isExpanded}
        aria-haspopup="menu"
        aria-controls={`fr-header-menu-${index}`}
        onClick={handleToggle}
        {...(isActive && { ["aria-current"]: "true" })}
      >
        {text}
      </button>
      <div
        className={fr.cx("fr-collapse", "fr-menu")}
        id={`fr-header-menu-${index}`}
      >
        <ul className={fr.cx("fr-menu__list")}>
          {menuLinks.map((menuItem, menuIndex) => {
            const isLinkActive = currentPath === menuItem.linkProps.href;
            return (
              <li key={menuIndex}>
                <Link
                  className={fr.cx("fr-nav__link")}
                  href={menuItem.linkProps.href}
                  target={menuItem.linkProps.target}
                  rel={menuItem.linkProps.rel}
                  {...(isLinkActive && { ["aria-current"]: "page" })}
                >
                  {menuItem.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
};
