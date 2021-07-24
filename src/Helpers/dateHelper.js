// returns tomorrow' date, in this form:
// { day, month, year }
const getTomorrowsDate = () => {
  const currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  return { day, month, year };
};

export { getTomorrowsDate };
