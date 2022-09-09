export function dateToString(date: Date): string {
  const day = `0${date.getDay() + 1}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}
