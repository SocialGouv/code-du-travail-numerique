export interface IInegibility {
  getContractIneligibility: (
    args: Record<string, string | undefined>
  ) => string | undefined;
  getSeniorityIneligibility: (
    args: Record<string, string | undefined>
  ) => string | undefined;
  getIneligibility: (
    args: Record<string, string | undefined>
  ) => string | undefined;
}
