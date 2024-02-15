export interface IInegibility {
  getIneligibility: (
    args: Record<string, string | undefined>
  ) => string | undefined;
}
