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

export const MonthNavigation = ({ currentPeriod, position }: Props) => {
    const MONTH_NAV = getMonthNav();
    const mostRecent = MONTH_NAV[0].period;
    const oldest = MONTH_NAV[MONTH_NAV.length - 1].period;

    const currentIndex = MONTH_NAV.findIndex(
        (m) => m.period === currentPeriod
    );

    const prev = MONTH_NAV[currentIndex - 1];
    const next = MONTH_NAV[currentIndex + 1];

    return (
        <nav aria-label="Navigation entre les mois" className={wrapper(position)}>
            <div className={navBar}>
                {currentPeriod !== mostRecent ? (
                    <Link
                        href={`/quoi-de-neuf/${mostRecent}`}
                        className={fr.cx("fr-link")}
                    >
                        Plus récent
                    </Link>
                ) : (
                    <span>Plus récent</span>
                )}
                {prev ? (
                    <Link
                        href={`/quoi-de-neuf/${prev.period}`}
                        aria-label={`Aller à ${prev.accessibleLabel}`}
                        className={fr.cx("fr-link")}
                    >
                        ‹
                    </Link>
                ) : (
                    <span>‹</span>
                )}
                {MONTH_NAV.map((m) => {
                    const active = m.period === currentPeriod;
                    return (
                        <Link
                            key={m.period}
                            href={`/quoi-de-neuf/${m.period}`}
                            aria-label={`Aller aux nouveautés de ${m.accessibleLabel}`}
                            data-active={active}
                            className={fr.cx(
                                "fr-btn",
                                !active ? "fr-btn--tertiary-no-outline" : undefined
                            )}
                        >
                            {m.label}
                        </Link>
                    );
                })}
                {next ? (
                    <Link
                        href={`/quoi-de-neuf/${next.period}`}
                        aria-label={`Aller à ${next.accessibleLabel}`}
                        className={fr.cx("fr-link")}
                    >
                        ›
                    </Link>
                ) : (
                    <span>›</span>
                )}
                {currentPeriod !== oldest ? (
                    <Link href={`/quoi-de-neuf/${oldest}`} className={fr.cx("fr-link")}>
                        Plus ancien
                    </Link>
                ) : (
                    <span>Plus ancien</span>
                )}
            </div>
        </nav>
    );
};
