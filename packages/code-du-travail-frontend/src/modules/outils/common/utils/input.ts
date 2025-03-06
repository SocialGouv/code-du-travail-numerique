export const preventScroll = (e: React.WheelEvent) => {
  e.preventDefault();
  (e.currentTarget as HTMLElement).blur();
};

export const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const cleanedValue = e.target.value.replace(/[^\d]/g, "");
  const intValue = cleanedValue ? parseInt(cleanedValue, 10) : "";
  return intValue.toString();
};
