//! changes 1,000 back to 1000
export const returnFormattedAmount = (amount) => {
  return parseFloat(amount?.replace(/,/g, ''));
};
