export declare type PrecariteCriteria = Record<string, string | undefined>;
export declare type PrecariteSituation = {
    criteria: PrecariteCriteria;
    contractType: string;
    idcc: number;
    hasConventionalProvision: boolean | null;
    allowBonus: boolean | null;
    endMessage: string | null;
    rate: string | null;
    bonusLabel: string | null;
    refLabel: string | null;
    refUrl: string | null;
};
