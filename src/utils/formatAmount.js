//! format amount e.g 1000 becomes 1,000
export const formatAmount = (amount) => {
  return amount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
