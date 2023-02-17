interface ErrorWithCause<T> {
  name: T;
  message: string;
  cause: any;
}

export class ErrorBase<T extends string> extends Error {
  name: T;
  message: string;
  cause: any;

  constructor(error: ErrorWithCause<T>) {
    super();
    this.name = error.name;
    this.message = error.message;
    this.cause = error.cause;
  }
}

export class NotFoundError extends ErrorBase<
  | "THEME_NOT_FOUND"
  | "TOOLS_NOT_FOUND"
  | "TOOL_NOT_FOUND"
  | "MODELE_NOT_FOUND"
  | "HIGHLIGHT_NOT_FOUND"
  | "AGREEMENT_NOT_FOUND"
  | "CONTRIB_NOT_FOUND"
> {}

export class InternalServerError extends ErrorBase<"TOO_MANY_TOOL_FOR_ONE_SLUG"> {}
