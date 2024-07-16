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

/**
 *
 * @param endDate
 * @returns `D-52`
 */
export const getDday = (endDate: string): string => {
  const date = new Date(endDate);
  const today = new Date();
  const remain = Number(today) - Number(date);
  const remainDate = Math.floor(remain / 1000 / 60 / 60 / 24);
  if (remainDate == 0) {
    return `D-DAY`;
  } else if (remainDate > 0) {
    return `D+${remainDate}`;
  } else {
    return `D${remainDate}`;
  }
};

/**
 *
 * @param time
 * @returns `18:00`
 */
export const getTimeFormat = (time: Date) => {
  return time.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
