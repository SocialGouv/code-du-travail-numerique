const ASCII_COMMA = 44;
const ASCII_DOT = 46;
const ASCII_MINUS = 45;
const ASCII_ZERO = 48;
const ASCII_NINE = 57;
const ASCII_SPACE = 32;
const NO_BREAK_SPACE = 160;
const NARROW_NO_BREAK_SPACE = 8239;

/*
 * Cette méthode est optimisée pour être la plus efficiente possible.
 * Elle s'occupe de parser les montants dans les contributions et il peut y en avoir des centaines.
 */
export const parseChallengerAmount = (text: string): number | undefined => {
  let decimalIndex = -1;

  for (let i = text.length - 1; i >= 0; i--) {
    const code = text.charCodeAt(i);

    if (code === ASCII_COMMA) {
      decimalIndex = i;
      break;
    }

    if (code === ASCII_DOT && decimalIndex === -1) {
      let digitsAfter = 0;

      for (let j = i + 1; j < text.length; j++) {
        const nextCode = text.charCodeAt(j);

        if (nextCode >= ASCII_ZERO && nextCode <= ASCII_NINE) {
          digitsAfter++;
          continue;
        }

        if (
          nextCode === ASCII_SPACE ||
          nextCode === NO_BREAK_SPACE ||
          nextCode === NARROW_NO_BREAK_SPACE
        ) {
          continue;
        }

        break;
      }

      if (digitsAfter !== 3) {
        decimalIndex = i;
        break;
      }
    }
  }

  let value = 0;
  let fraction = 0;
  let divisor = 1;
  let hasDigit = false;
  let isNegative = false;
  let isFraction = false;

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);

    if (code === ASCII_MINUS) {
      isNegative = true;
      continue;
    }

    if (i === decimalIndex) {
      isFraction = true;
      continue;
    }

    if (code < ASCII_ZERO || code > ASCII_NINE) {
      continue;
    }

    hasDigit = true;

    const digit = code - ASCII_ZERO;

    if (isFraction) {
      divisor *= 10;
      fraction += digit / divisor;
    } else {
      value = value * 10 + digit;
    }
  }

  if (!hasDigit) {
    return undefined;
  }

  const result = value + fraction;
  return isNegative ? -result : result;
};
