export type Tooltip = {
  content: JSX.Element;
  help?: string;
  trackableFn?: (actualVisibility: boolean) => void;
};
