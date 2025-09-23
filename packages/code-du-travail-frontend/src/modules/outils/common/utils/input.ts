export const preventScroll = (e: React.WheelEvent) => {
  if (
    e.currentTarget instanceof HTMLElement &&
    document.activeElement === e.currentTarget
  ) {
    e.currentTarget.blur();
  }
};

export const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const cleanedValue = e.target.value.replace(/[^\d]/g, "");
  const intValue = cleanedValue ? parseInt(cleanedValue, 10) : "";
  return intValue.toString();
};
