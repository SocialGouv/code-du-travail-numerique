import { createGlobalStyle } from "styled-components";
import { theme } from "@socialgouv/react-ui";

const { box, breakpoints, spacings } = theme;

const BURGER_BREAKPOINT = `${theme.breakpoints.intTablet + 1}px`;

export const BurgerStyles = createGlobalStyle`
/* Position and sizing of burger button */
.bm-burger-button {
  @media (min-width: ${BURGER_BREAKPOINT}) {
    display: none;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 3.2rem;
    height: 3.2rem;
  }
  position: relative;
  z-index: auto !important;
  width: 5.4rem;
  height: 5.4rem;
  color: ${({ theme }) => theme.secondary};
  &:hover, &:focus-within {
    opacity: 0.6;
  }
}

/* Position and sizing of clickable cross button */
.bm-cross-button {
  @media (min-width: ${BURGER_BREAKPOINT}) {
    display: none;
  }
  @media (max-width: ${breakpoints.mobile}) {
    top: ${spacings.base} !important;
    right: ${spacings.base} !important;
  }
}

/* Color/shape of close button cross */
.bm-cross {
  width: 2.4rem;
  height: 2.4rem;
  color: ${({ theme }) => theme.secondary};
}

/*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
.bm-menu-wrap {
  @media (min-width: ${BURGER_BREAKPOINT}) {
    position: relative !important;
    z-index: auto !important;
    width: auto !important;
    height: 100% !important;
    transform: none !important;
  }
  @media (max-width: ${breakpoints.tablet}) {
    width: 30rem !important;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100% !important;
    height: auto !important;
    padding: ${spacings.small};
  }
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  opacity: 0.95;
}

/* General sidebar styles */
.bm-menu {
  @media (min-width: ${BURGER_BREAKPOINT}) {
    height: 100%;
    padding: 0;
    background: none;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100% !important;
    height: auto !important;
    border-radius: ${box.borderRadius};
    box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};
  }
  padding: ${spacings.larger} 0 ${spacings.base} 0;
  overflow: visible !important;
  background: ${({ theme }) => theme.bgPrimary};
}

/* Wrapper for item list */
.bm-item-list {
  @media (min-width: ${BURGER_BREAKPOINT}) {
    display: flex;
  }
  @media (max-width: ${breakpoints.mobile}) {
    height: auto !important;
  }
}

/* Styling of overlay */
.bm-overlay {
  @media (min-width: ${BURGER_BREAKPOINT}) {
    display: none;
  }
  top: 0;
  left: 0;
  display: block;
  background: rgba(0, 0, 0, 0.3);
}
`;
