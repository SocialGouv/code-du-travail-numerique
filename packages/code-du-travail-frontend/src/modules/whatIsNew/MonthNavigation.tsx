"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import { parse, format } from "date-fns";
import { fr as frLocale } from "date-fns/locale";

type Props = {
  currentPeriod: string;
  periods: string[];
  position?: "top" | "bottom";
};

type MonthNavItem = {
  period: string;
  label: string;
  accessibleLabel: string;
};

type VisibleItem = MonthNavItem | { separator: true };

const wrapper = (position?: "top" | "bottom") =>
  css({
    marginBottom: position === "top" ? "2.5rem" : undefined,
    marginTop: position === "bottom" ? "2.5rem" : undefined,
    display: "flex",
    justifyContent: "center",
  });

const getMonthNav = (periods: string[]): MonthNavItem[] => {
  const orderedPeriods = periods
    .slice()
    .sort(
      (a, b) =>
        parse(a, "MM-yyyy", new Date()).getTime() -
        parse(b, "MM-yyyy", new Date()).getTime()
    )
    .reverse();

  return orderedPeriods.map((period) => {
    const date = parse(period, "MM-yyyy", new Date());
    return {
      period,
      label: format(date, "MM/yy"),
      accessibleLabel: format(date, "MMMM yyyy", { locale: frLocale }),
    };
  });
};

export function computeVisiblePeriods(
  MONTH_NAV: MonthNavItem[],
  currentIndex: number
): VisibleItem[] {
  const WINDOW_SIZE = 7;
  const total = MONTH_NAV.length;

  if (total <= WINDOW_SIZE) {
    return MONTH_NAV;
  }

  // 1) Calculer une fenêtre centrée autour du moi actif
  const half = Math.floor(WINDOW_SIZE / 2);

  let start = currentIndex - half;
  let end = currentIndex + half;

  // 2) Clamp si on dépasse le début
  if (start < 0) {
    end += -start;
    start = 0;
  }

  // 3) Clamp si on dépasse la fin
  if (end >= total) {
    const diff = end - (total - 1);
    start = Math.max(0, start - diff);
    end = total - 1;
  }

  const windowItems = MONTH_NAV.slice(start, end + 1);

  const result: VisibleItem[] = [];

  // 4) Ajouter le plus récent si la fenêtre ne le contient pas
  if (start > 0) {
    result.push(MONTH_NAV[0]);
    result.push({ separator: true });
  }

  // 5) Ajouter la fenêtre
  windowItems.forEach((item) => result.push(item));

  // 6) Ajouter le plus ancien si la fenêtre ne le contient pas
  if (end < total - 1) {
    result.push({ separator: true });
    result.push(MONTH_NAV[total - 1]);
  }

  return result;
}

export const MonthNavigation = ({
  currentPeriod,
  position,
  periods,
}: Props) => {
  const activeMonthRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (position === "top" && activeMonthRef.current) {
      activeMonthRef.current.focus();
    }
  }, [currentPeriod, position]);

  const MONTH_NAV = getMonthNav(periods);

  if (MONTH_NAV.length === 0) {
    return null;
  }

  const idx = MONTH_NAV.findIndex((m) => m.period === currentPeriod);
  const currentIndex = idx === -1 ? 0 : idx;

  const mostRecent = MONTH_NAV[0];
  const oldest = MONTH_NAV[MONTH_NAV.length - 1];

  const visibleItems = computeVisiblePeriods(MONTH_NAV, currentIndex);

  let mobileItems: MonthNavItem[] = [];

  if (currentIndex === 0) {
    mobileItems = [MONTH_NAV[0], MONTH_NAV[1], MONTH_NAV[2]].filter(Boolean);
  } else if (currentIndex === MONTH_NAV.length - 1) {
    mobileItems = [
      MONTH_NAV[currentIndex - 2],
      MONTH_NAV[currentIndex - 1],
      MONTH_NAV[currentIndex],
    ].filter(Boolean);
  } else {
    mobileItems = [
      MONTH_NAV[currentIndex + 1],
      MONTH_NAV[currentIndex],
      MONTH_NAV[currentIndex - 1],
    ].filter(Boolean);
  }

  mobileItems = mobileItems.sort(
    (a, b) =>
      MONTH_NAV.findIndex((m) => m.period === a.period) -
      MONTH_NAV.findIndex((m) => m.period === b.period)
  );

  return (
    <nav
      aria-label="Navigation entre les mois"
      className={`${fr.cx("fr-pagination")} ${wrapper(position)}`}
      role="navigation"
    >
      <ul className={fr.cx("fr-pagination__list")}>
        <li>
          {currentPeriod !== mostRecent.period ? (
            <Link
              href={`/quoi-de-neuf/${mostRecent.period}`}
              title={`Aller à ${mostRecent.accessibleLabel}`}
              className={fr.cx(
                "fr-pagination__link",
                "fr-pagination__link--first",
                "fr-mx-0"
              )}
            >
              Plus récent
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={fr.cx(
                "fr-pagination__link",
                "fr-pagination__link--first",
                "fr-label--disabled",
                "fr-mx-0"
              )}
            >
              Plus récent
            </span>
          )}
        </li>

        <li>
          {currentIndex > 0 ? (
            <Link
              href={`/quoi-de-neuf/${MONTH_NAV[currentIndex - 1].period}`}
              title={`Aller à ${MONTH_NAV[currentIndex - 1].accessibleLabel}`}
              className={fr.cx(
                "fr-pagination__link",
                "fr-pagination__link--prev",
                "fr-pagination__link--lg-label",
                "fr-mx-0"
              )}
            >
              <span className={fr.cx("fr-hidden", "fr-unhidden-lg")}>
                Mois suivant
              </span>
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={fr.cx(
                "fr-pagination__link",
                "fr-pagination__link--prev",
                "fr-pagination__link--lg-label",
                "fr-label--disabled",
                "fr-mx-0"
              )}
            >
              <span className={fr.cx("fr-hidden", "fr-unhidden-lg")}>
                Mois suivant
              </span>
            </span>
          )}
        </li>

        {visibleItems.map((item, idx) => {
          if ("separator" in item) {
            return (
              <li
                key={`sep-${idx}`}
                className={fr.cx("fr-hidden", "fr-unhidden-lg")}
              >
                <span
                  aria-hidden="true"
                  className={fr.cx("fr-pagination__link")}
                >
                  …
                </span>
              </li>
            );
          }

          const isActive = item.period === currentPeriod;
          if (mobileItems.find((i) => i.period === item.period)) {
            return (
              <li key={`mob-${item.period}`}>
                <Link
                  href={`/quoi-de-neuf/${item.period}`}
                  title={`Aller à ${item.accessibleLabel}`}
                  aria-current={isActive ? "page" : undefined}
                  className={fr.cx("fr-pagination__link", "fr-px-1v")}
                  ref={isActive && position === "top" ? activeMonthRef : null}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          return (
            <li
              key={`desk-${item.period}`}
              className={fr.cx("fr-hidden", "fr-unhidden-lg")}
            >
              <Link
                href={`/quoi-de-neuf/${item.period}`}
                title={`Aller à ${item.accessibleLabel}`}
                aria-current={isActive ? "page" : undefined}
                className={fr.cx("fr-pagination__link")}
                ref={isActive && position === "top" ? activeMonthRef : null}
              >
                {item.label}
              </Link>
            </li>
          );
        })}

        <li>
          {currentIndex < MONTH_NAV.length - 1 ? (
            <Link
              href={`/quoi-de-neuf/${MONTH_NAV[currentIndex + 1].period}`}
              title={`Aller à ${MONTH_NAV[currentIndex + 1].accessibleLabel}`}
              className={fr.cx(
                "fr-pagination__link",
                "fr-pagination__link--next",
                "fr-pagination__link--lg-label",
                "fr-mx-0"
              )}
            >
              <span className={fr.cx("fr-hidden", "fr-unhidden-lg")}>
                Mois précédent
              </span>
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={fr.cx(
                "fr-pagination__link",
                "fr-pagination__link--next",
                "fr-pagination__link--lg-label",
                "fr-label--disabled",
                "fr-mx-0"
              )}
            >
              <span className={fr.cx("fr-hidden", "fr-unhidden-lg")}>
                Mois précédent
              </span>
            </span>
          )}
        </li>

        <li>
          {currentPeriod !== oldest.period ? (
            <Link
              href={`/quoi-de-neuf/${oldest.period}`}
              title={`Aller à ${oldest.accessibleLabel}`}
              className={fr.cx(
                "fr-pagination__link",
                "fr-pagination__link--last",
                "fr-mx-0"
              )}
            >
              Plus ancien
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={fr.cx(
                "fr-pagination__link",
                "fr-pagination__link--last",
                "fr-label--disabled",
                "fr-mx-0"
              )}
            >
              Plus ancien
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
};
