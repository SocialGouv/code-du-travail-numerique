export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export const enumToArray = <T>(enumObject: any) => {
  return Object.keys(enumObject).map((key) => {
    return {
      label: key,
      value: enumObject[key as keyof typeof enumObject] as T,
    };
  });
};

export const mergeTwoArray = (
  left: Record<string, string>[],
  right: Record<string, string>[]
): Record<string, string>[] => {
  if (left.length === 0) {
    return right;
  }
  if (right.length === 0) {
    return left;
  }
  const merged = left.concat(right);
  return merged.reduce<Record<string, string>[]>((acc, current) => {
    const index = acc.findIndex(
      (data) => Object.keys(data)[0] === Object.keys(current)[0]
    );
    if (index === -1) {
      return acc.concat(current);
    }
    acc[index] = current;
    return acc;
  }, []);
};
