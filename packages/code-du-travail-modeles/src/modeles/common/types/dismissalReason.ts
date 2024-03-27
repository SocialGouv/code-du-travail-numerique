export type DismissalReason = {
  name: string;
  rule: string;
  value: string;
};

export interface IDismissalReason {
  dismissalTypes: () => DismissalReason[];
}
