"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { getPeriods } from "./queries";
import { parse, format } from "date-fns";
import { fr as frLocale } from "date-fns/locale";

type Props = {
    currentPeriod: string;
    position?: "top" | "bottom";
};

const wrapper = (position?: "top" | "bottom") =>
    css({
        marginBottom: position === "top" ? "2.5rem" : undefined,
        marginTop: position === "bottom" ? "2.5rem" : undefined,
        display: "flex",
        justifyContent: "center",
    });

const navBar = css({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    fontSize: "0.875rem",
});

// Transforme les periods en objets affichables
const getMonthNav = () => {
    const periods = getPeriods();

    return periods.map((period) => {
        const date = parse(period, "MM-yyyy", new Date());

        return {
            period,
            label: format(date, "MM/yy"),
            accessibleLabel: format(date, "MMMM yyyy", { locale: frLocale }),
        };
    });
};

/**
 * Pagination "effet loupe"
 * - 7 éléments minimum dans la fenêtre centrale
 * - centrée autour du mois sélectionné
 * - ellipses + mois extrêmes si hors fenêtre
 */
export function computeVisiblePeriods(MONTH_NAV: any[], currentIndex: number) {
    const total = MONTH_NAV.length;
    const lastIndex = total - 1;
    const WINDOW_SIZE = 7;

    // Si la liste contient moins de 7 mois → tout afficher
    if (total <= WINDOW_SIZE) return MONTH_NAV;

    // Calcul initial de la fenêtre centrée
    let start = currentIndex - 3;
    let end = currentIndex + 3;

    // Ajustement si dépassements
    if (start < 0) {
        end += -start;
        start = 0;
    }
    if (end > lastIndex) {
        const overshoot = end - lastIndex;
        start = Math.max(0, start - overshoot);
        end = lastIndex;
    }

    // S'assurer qu'on a bien 7 éléments
    if (end - start + 1 < WINDOW_SIZE) {
        const missing = WINDOW_SIZE - (end - start + 1);
        start = Math.max(0, start - missing);
    }

    const windowItems = MONTH_NAV.slice(start, start + WINDOW_SIZE);

    const result: any[] = [];
    const mostRecent = MONTH_NAV[0];
    const oldest = MONTH_NAV[lastIndex];

    // ---- Gauche ----
    if (!windowItems.find((m) => m.period === mostRecent.period)) {
        result.push(mostRecent);
        result.push({ separator: true });
    }

    // ---- Fenêtre ----
    windowItems.forEach((m) => result.push(m));

    // ---- Droite ----
    if (!windowItems.find((m) => m.period === oldest.period)) {
        result.push({ separator: true });
        result.push(oldest);
    }

    return result;
}

export const MonthNavigation = ({ currentPeriod, position }: Props) => {

    const MONTH_NAV = getMonthNav();
    const mostRecent = MONTH_NAV[0];
    const oldest = MONTH_NAV[MONTH_NAV.length - 1];

    const currentIndex = MONTH_NAV.findIndex(
        (m) => m.period === currentPeriod
    );

    const prev = MONTH_NAV[currentIndex - 1];
    const next = MONTH_NAV[currentIndex + 1];

    const visibleItems = computeVisiblePeriods(MONTH_NAV, currentIndex);

    const activeMonthRef = useRef<HTMLAnchorElement | null>(null);
    useEffect(() => {
        if (position === "top" && activeMonthRef.current) {
            activeMonthRef.current.focus();
        }
    }, [currentPeriod]);

    return (
        <nav aria-label="Navigation entre les mois" className={wrapper(position)}>
            <div className={navBar}>
                {/* Plus récent */}
                {currentPeriod !== mostRecent.period ? (
                    <Link
                        href={`/quoi-de-neuf/${mostRecent.period}`}
                        className={fr.cx("fr-link")}
                    >
                        Plus récent
                    </Link>
                ) : (
                    <span>Plus récent</span>
                )}

                {/* Flèche gauche */}
                {prev ? (
                    <Link
                        href={`/quoi-de-neuf/${prev.period}`}
                        aria-label={`Aller à ${prev.accessibleLabel}`}
                        className={fr.cx("fr-link")}
                    >
                        ‹
                    </Link>
                ) : (
                    <span aria-hidden="true">‹</span>
                )}

                {/* Pills dynamiques + ellipses */}
                {visibleItems.map((item, index) => {
                    if (item.separator) {
                        return (
                            <span key={`sep-${index}`} aria-hidden="true">
                                …
                            </span>
                        );
                    }

                    const active = item.period === currentPeriod;

                    return (
                        <Link
                            key={item.period}
                            href={`/quoi-de-neuf/${item.period}`}
                            aria-label={`Aller aux nouveautés de ${item.accessibleLabel}`}
                            data-active={active}
                            className={fr.cx(
                                "fr-btn",
                                "fr-btn--sm",
                                !active ? "fr-btn--tertiary-no-outline" : undefined
                            )}
                            ref={active && position === "top" ? activeMonthRef : null}
                        >
                            {item.label}
                        </Link>
                    );
                })}

                {/* Flèche droite */}
                {next ? (
                    <Link
                        href={`/quoi-de-neuf/${next.period}`}
                        aria-label={`Aller à ${next.accessibleLabel}`}
                        className={fr.cx("fr-link")}
                    >
                        ›
                    </Link>
                ) : (
                    <span aria-hidden="true">›</span>
                )}

                {/* Plus ancien */}
                {currentPeriod !== oldest.period ? (
                    <Link href={`/quoi-de-neuf/${oldest.period}`} className={fr.cx("fr-link")}>
                        Plus ancien
                    </Link>
                ) : (
                    <span>Plus ancien</span>
                )}
            </div>
        </nav>
    );
};
