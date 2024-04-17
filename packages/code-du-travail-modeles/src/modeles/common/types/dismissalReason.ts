export type DismissalReasonRule = {
  rule: string;
  value: string;
};

export type DismissalReason = {
  name: string;
  rules: DismissalReasonRule[];
};

export interface IDismissalReason {
  dismissalTypes: () => DismissalReason[];
  getDismissalRules: () => string[];
}
