import { format } from 'date-fns';

// Utility function to format the date
export const formatDate = (date) => {
  if (!date) {
    return null;
  }
  let validDate;

  if (date.includes('-')) {
    const parts = date.split('-');

    if (parts[0].length === 4) {
      validDate = new Date(parts[0], parts[1] - 1, parts[2]);
    } else {
      validDate = new Date(parts[2], parts[1] - 1, parts[0]);
    }
  } else {
    return null;
  }

  if (isNaN(validDate)) {
    return null;
  }

  // Format the valid date using date-fns
  return format(validDate, 'do MMMM, yyyy');
};
