const formatDateTimeToLocal = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);

  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // for AM/PM format like "02:45 PM"
  };

  const formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(
    dateTime
  );

  return formattedDateTime;
};

export default formatDateTimeToLocal;
