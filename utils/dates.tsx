export const currentYear = new Date().getFullYear();
export const currentMonth = new Date().getMonth() + 1;
export const currentMonthFormatted =
  currentMonth < 10 ? "0" + currentMonth : currentMonth;
export const currentDay = new Date().getDate();
export const currentDayFormatted =
  currentDay - 1 < 10 ? "0" + currentDay : currentDay;
// TODO: #21 Generate date from last data file downloaded. Current date in footer is wrong, reclecting current date of the viewer, not the deploy
