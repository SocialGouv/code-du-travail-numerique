export const createError = (
  message: string,
  status = 500
): Error & { status: number } => {
  const error: any = new Error(message);
  error.status = status;
  return error;
};
