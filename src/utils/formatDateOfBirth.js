export const formatDateOfBirth = (inputDate) => {
  //! date in this format 04-04-1990 or  1992-07-28
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

  // Determine the format by checking the position of the hyphen
  let day, month, year;

  if (inputDate?.includes('-')) {
    const parts = inputDate?.split('-');

    if (inputDate?.indexOf('-') === 2) {
      // Format is DD-MM-YYYY
      day = parts[0];
      month = parts[1];
      year = parts[2];
    } else if (inputDate?.indexOf('-') === 4) {
      // Format is YYYY-MM-DD
      year = parts[0];
      month = parts[1];
      day = parts[2];
    }
  }

  // Convert month from number to short name
  const monthName = months[parseInt(month, 10) - 1];

  return `${day} ${monthName} ${year}`;
};
