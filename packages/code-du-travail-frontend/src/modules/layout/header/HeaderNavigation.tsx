import { fr } from "@codegouvfr/react-dsfr";
import Link from "../../common/Link";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { useState } from "react";
import type { MainNavigationProps } from "@codegouvfr/react-dsfr/MainNavigation/MainNavigation";

type HeaderNavigationProps = {
  navigation?: (MainNavigationProps.Item.Link & { links?: MainNavigationProps.Item.Link[] })[];
};

export const HeaderNavigation = ({ navigation }: HeaderNavigationProps) => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const toggleMenu = (index: number) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <div
      className={fr.cx("fr-header__menu", "fr-modal")}
      id="header-menu-modal-fr-header"
      data-fr-js-modal="true"
      data-fr-js-header-modal="true"
    >
      <div className={fr.cx("fr-container")}>
        <button
          id="fr-header-mobile-overlay-button-close"
          className={fr.cx("fr-btn--close", "fr-btn")}
          aria-controls="header-menu-modal-fr-header"
          title="Fermer"
          data-fr-js-modal-button="true"
        >
          Fermer
        </button>

        <div className={fr.cx("fr-header__menu-links")}>
          <ul className={fr.cx("fr-btns-group")}></ul>
        </div>

        <nav
          id="fr-header-main-navigation"
          className={fr.cx("fr-nav")}
          role="navigation"
          aria-label="Menu principal"
          data-fr-js-navigation="true"
        >
          <ul className={fr.cx("fr-nav__list")}>
            {navigation?.map(({ text, linkProps, isActive, links }, i) => (
              <li
                key={i}
                className={fr.cx("fr-nav__item")}
                data-fr-js-navigation-item="true"
                style={{ position: "relative" }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Link
                    {...linkProps}
                    href={linkProps?.href ?? "#"}
                    className={cx(fr.cx("fr-nav__link"), isActive && "fr-nav__link--active")}
                    {...(isActive && { "aria-current": "page" })}
                  >
                    {text}
                  </Link>

                  {links && links.length > 0 && (
                    <button
                      onClick={() => toggleMenu(i)}
                      aria-expanded={openMenu === i}
                      aria-label={openMenu === i ? "Fermer le sous-menu" : "Ouvrir le sous-menu"}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        marginLeft: "0.25rem",
                        fontSize: "0.75rem",
                        lineHeight: 1,
                      }}
                    >
                      {openMenu === i ? "▲" : "▼"}
                    </button>
                  )}
                </div>

                {links && links.length > 0 && openMenu === i && (
                  <ul
                    className={fr.cx("fr-nav__sub-list")}
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      backgroundColor: "white",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      borderRadius: 0, // plus de coins arrondis
                      padding: 0,
                      minWidth: "220px",
                      zIndex: 1000,
                    }}
                  >
                    {links.map((sub, j) => (
                      <li
                        key={j}
                        className={fr.cx("fr-nav__sub-item")}
                        style={{
                          borderBottom: j < links.length - 1 ? "1px solid #e5e5e5" : "none", // séparateur gris clair
                        }}
                      >
                        <Link
                          {...sub.linkProps}
                          href={sub.linkProps?.href ?? "#"}
                          className={cx(
                            fr.cx("fr-nav__link"),
                            "block px-4 py-2 text-[#1a1a1a] text-[0.95rem] no-underline hover:bg-gray-100"
                          )}
                        >
                          {sub.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
