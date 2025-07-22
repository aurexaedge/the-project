export const formatNin = (value) => {
  // Ensure the value is a string
  const strValue = value.toString();

  // Use a regular expression to insert spaces every 4 characters
  const formattedValue = strValue.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');

  return formattedValue;

  //!  Output: "5467 147 1200"
};
