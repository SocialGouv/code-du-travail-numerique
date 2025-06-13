export interface IIneligibility {
  getIneligibility: (
    args: Record<string, string | undefined>
  ) => string | undefined;
}

export interface IIndemniteDepartIneligibility extends IIneligibility {
  getContractIneligibility: (
    args: Record<string, string | undefined>
  ) => string | undefined;
  getSeniorityIneligibility: (
    args: Record<string, string | undefined>
  ) => string | undefined;
}
