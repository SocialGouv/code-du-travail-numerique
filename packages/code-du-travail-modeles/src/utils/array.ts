export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export const enumToArray = (enumObject: any) => {
  return Object.keys(enumObject).map((key) => {
    return {
      label: key,
      value: enumObject[key as keyof typeof enumObject],
    };
  });
};
