import type {
  DismissalReason,
  IDismissalReason,
} from "./types/dismissalReason";

export class DismissalReasonDefault implements IDismissalReason {
  dismissalTypes(): DismissalReason[] {
    return [];
  }

  getDismissalRules(): string[] {
    const allRules = this.dismissalTypes().flatMap((type) =>
      type.rules.map((rule) => rule.rule)
    );
    const setOfRules = new Set(allRules);
    return Array.from(setOfRules);
  }
}
