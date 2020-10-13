export const copyToClipboard = ({ text, input }) => {
  let usedInput = input;

  if (!input) {
    usedInput = document.createElement("input");
    document.body.appendChild(usedInput);
  }
  usedInput.value = text;
  usedInput.select();
  document.execCommand("copy");
  if (!input) {
    document.body.removeChild(usedInput);
  }
};
