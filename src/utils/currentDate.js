export const currentDate = () => {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  const monthAbbr = months[month];

  const formattedDay = day < 10 ? '0' + day : day;

  return `${formattedDay} ${monthAbbr} ${year}`;
};
