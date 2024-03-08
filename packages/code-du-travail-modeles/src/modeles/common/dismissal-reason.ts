import type {
  DismissalReason,
  IDismissalReason,
} from "./types/dismissalReason";

export class DismissalReasonDefault implements IDismissalReason {
  dismissalTypes(): DismissalReason[] {
    return [];
  }
}
