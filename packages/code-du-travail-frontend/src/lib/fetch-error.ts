export const handleError = (responseContainer) => {
  if (responseContainer.status === 404) return { notFound: true };
  throw Error(responseContainer.statusText);
};
