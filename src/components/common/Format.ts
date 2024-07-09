/**
 *
 * @param number
 * @returns 07
 */
export const getTwoDigit = (number: number) => {
  return number < 10 ? `0${number}` : `${number}`;
};

/**
 *
 * @param date
 * @returns `2024.07.09`
 */
export const getDateFormat = (date: Date) => {
  return `${date.getFullYear()}.
  ${getTwoDigit(date.getMonth() + 1)}.
  ${getTwoDigit(date.getDate())}`;
};
