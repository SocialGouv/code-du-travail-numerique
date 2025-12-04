"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import { getPeriods } from "./queries";
import { parse, format } from "date-fns";
import { fr as frLocale } from "date-fns/locale";

type Props = {
  currentPeriod: string;
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

const getMonthNav = (): MonthNavItem[] => {
  const periods = getPeriods().slice().reverse();

  return periods.map((period) => {
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
  const total = MONTH_NAV.length;
  const lastIndex = total - 1;
  const WINDOW_SIZE = 7;

  if (total <= WINDOW_SIZE) return MONTH_NAV;

  let start = currentIndex - 3;
  let end = currentIndex + 3;

  if (start < 0) {
    end += -start;
    start = 0;
  }
  if (end > lastIndex) {
    const overshoot = end - lastIndex;
    start = Math.max(0, start - overshoot);
    end = lastIndex;
  }

  if (end - start + 1 < WINDOW_SIZE) {
    const missing = WINDOW_SIZE - (end - start + 1);
    start = Math.max(0, start - missing);
  }

  const windowItems = MONTH_NAV.slice(start, start + WINDOW_SIZE);

  const mostRecent = MONTH_NAV[0];
  const oldest = MONTH_NAV[lastIndex];

  const result: VisibleItem[] = [];

  if (!windowItems.find((m) => m.period === mostRecent.period)) {
    result.push(mostRecent);
    result.push({ separator: true });
  }

  windowItems.forEach((m) => result.push(m));

  if (!windowItems.find((m) => m.period === oldest.period)) {
    result.push({ separator: true });
    result.push(oldest);
  }

  return result;
}

export const MonthNavigation = ({ currentPeriod, position }: Props) => {
  const MONTH_NAV = getMonthNav();
  const currentIndex = MONTH_NAV.findIndex((m) => m.period === currentPeriod);
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

  const activeMonthRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (position === "top" && activeMonthRef.current) {
      activeMonthRef.current.focus();
    }
  }, [currentPeriod, position]);

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
              className={fr.cx("fr-pagination__link", "fr-pagination__link--first", "fr-mx-0")}
            >
              Plus récent
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={fr.cx(
                "fr-pagination__link",
                "fr-pagination__link--first",
                "fr-label--disabled", "fr-mx-0"
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
              className={fr.cx(
                "fr-pagination__link",
                "fr-pagination__link--prev",
                "fr-pagination__link--lg-label"
              )}
            >
              <span className={fr.cx("fr-hidden", "fr-unhidden-lg")}>Mois suivant</span>
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={fr.cx(
                "fr-pagination__link",
                "fr-pagination__link--prev",
                "fr-pagination__link--lg-label",
                "fr-label--disabled"
              )}
            >
              <span className={fr.cx("fr-hidden", "fr-unhidden-lg")}>Mois suivant</span>
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
                <span aria-hidden="true" className={fr.cx("fr-pagination__link")}>…</span>
              </li>
            );
          }

          const isActive = item.period === currentPeriod;
          if (mobileItems.find(i => i.period === item.period)) {
            return (
              <li key={`mob-${item.period}`} className={fr.cx("fr-unhidden", "fr-hidden-lg")}>
                <Link
                  href={`/quoi-de-neuf/${item.period}`}
                  aria-current={isActive ? "page" : undefined}
                  className={fr.cx("fr-pagination__link", "fr-py-0", "fr-px-1v")}
                  ref={isActive && position === "top" ? activeMonthRef : null}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          return (
            <li key={`desk-${item.period}`} className={fr.cx("fr-hidden", "fr-unhidden-lg")}>
              <Link
                href={`/quoi-de-neuf/${item.period}`}
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
              className={fr.cx(
                "fr-pagination__link",
                "fr-pagination__link--next",
                "fr-pagination__link--lg-label"
              )}
            >
              <span className={fr.cx("fr-hidden", "fr-unhidden-lg")}>Mois précédent</span>
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={fr.cx(
                "fr-pagination__link",
                "fr-pagination__link--next",
                "fr-pagination__link--lg-label",
                "fr-label--disabled"
              )}
            >
              <span className={fr.cx("fr-hidden", "fr-unhidden-lg")}>Mois précédent</span>
            </span>
          )}
        </li>

        <li>
          {currentPeriod !== oldest.period ? (
            <Link
              href={`/quoi-de-neuf/${oldest.period}`}
              className={fr.cx("fr-pagination__link", "fr-pagination__link--last", "fr-mx-0")}
            >
              Plus ancien
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={fr.cx(
                "fr-pagination__link",
                "fr-pagination__link--last",
                "fr-label--disabled", "fr-mx-0"
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
