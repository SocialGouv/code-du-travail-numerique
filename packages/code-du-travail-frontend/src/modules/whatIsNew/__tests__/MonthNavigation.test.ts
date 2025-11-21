import { computeVisiblePeriods } from "../MonthNavigation";

describe("computeVisiblePeriods – pagination effet loupe", () => {
    function mockMonth(period: string) {
        return {
            period,
            label: period,
            accessibleLabel: period,
        };
    }

    test("Si total <= 7 mois → renvoie tous les mois, sans ellipses", () => {
        const months = ["11-2025", "10-2025", "09-2025", "08-2025", "07-2025"]
            .map(mockMonth);

        const result = computeVisiblePeriods(months, 2);
        expect(result.map((m: any) => m.period)).toEqual(
            months.map((m) => m.period)
        );
    });

    test("Fenêtre standard centrée autour du mois sélectionné (7 éléments)", () => {
        const months = [
            "11-2025", "10-2025", "09-2025", "08-2025", "07-2025",
            "06-2025", "05-2025", "04-2025", "03-2025", "02-2025", "01-2025"
        ].map(mockMonth);

        const currentIndex = 3; // sélection = 08-2025
        const result = computeVisiblePeriods(months, currentIndex);

        const mapped = result.map((m: any) => m.separator ? null : m.period);

        const expected = [
            "11-2025",
            "10-2025",
            "09-2025",
            "08-2025",
            "07-2025",
            "06-2025",
            "05-2025",
            null,
            "01-2025"
        ];

        expect(mapped).toEqual(expected);
    });


    test("Ajout du mois le plus récent + ellipsis si hors fenêtre", () => {
        const months = [
            "11-2025", "10-2025", "09-2025", "08-2025", "07-2025",
            "06-2025", "05-2025", "04-2025", "03-2025", "02-2025", "01-2025"
        ].map(mockMonth);

        const currentIndex = 7; // sélection = 04-2025
        const result = computeVisiblePeriods(months, currentIndex);

        const mapped = result.map((m: any) => m.separator ? null : m.period);

        const expected = [
            "11-2025",
            null,
            "07-2025",
            "06-2025",
            "05-2025",
            "04-2025",
            "03-2025",
            "02-2025",
            "01-2025",
        ];

        expect(mapped).toEqual(expected);
    });

    test("Ajout du mois le plus ancien + ellipsis si hors fenêtre", () => {
        const months = [
            "11-2025", "10-2025", "09-2025", "08-2025", "07-2025",
            "06-2025", "05-2025", "04-2025", "03-2025", "02-2025", "01-2025"
        ].map(mockMonth);

        const currentIndex = 2; // sélection = 09-2025
        const result = computeVisiblePeriods(months, currentIndex);

        const mapped = result.map((m: any) => m.separator ? null : m.period);

        const expected = [
            "11-2025",
            "10-2025",
            "09-2025",
            "08-2025",
            "07-2025",
            "06-2025",
            "05-2025",
            null,
            "01-2025",
        ];

        expect(mapped).toEqual(expected);
    });

    test("Sélection au tout début → fenêtre glissée et ellipses à droite", () => {
        const months = [
            "11-2025", "10-2025", "09-2025", "08-2025", "07-2025",
            "06-2025", "05-2025", "04-2025", "03-2025", "02-2025", "01-2025"
        ].map(mockMonth);

        const currentIndex = 0;
        const result = computeVisiblePeriods(months, currentIndex);

        const mapped = result.map((m: any) => m.separator ? null : m.period);

        const expected = [
            "11-2025",
            "10-2025",
            "09-2025",
            "08-2025",
            "07-2025",
            "06-2025",
            "05-2025",
            null,
            "01-2025",
        ];

        expect(mapped).toEqual(expected);
    });

    test("Sélection à la fin → fenêtre glissée et ellipses à gauche", () => {
        const months = [
            "11-2025", "10-2025", "09-2025", "08-2025", "07-2025",
            "06-2025", "05-2025", "04-2025", "03-2025", "02-2025", "01-2025"
        ].map(mockMonth);

        const currentIndex = months.length - 1;
        const result = computeVisiblePeriods(months, currentIndex);

        const mapped = result.map((m: any) => m.separator ? null : m.period);

        const expected = [
            "11-2025",
            null,
            "07-2025",
            "06-2025",
            "05-2025",
            "04-2025",
            "03-2025",
            "02-2025",
            "01-2025",
        ];

        expect(mapped).toEqual(expected);
    });
});
