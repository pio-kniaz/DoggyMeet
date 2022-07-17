/* eslint-disable security/detect-object-injection */
type GetSortReturnType = Record<string, string>;

export const getSort = (data: string) => {
  return data.split(',').reduce<GetSortReturnType>((acc, elem) => {
    const key = elem.split(':')[0];
    const value = elem.split(':')[1];
    acc[key] = value;
    return acc;
  }, {});
};
