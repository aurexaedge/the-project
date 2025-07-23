export const generateBankDetails = () => {
  const accountNumber =
    '502' + Math.floor(1000000 + Math.random() * 9000000).toString();
  const routingNumber =
    '013' + Math.floor(100000 + Math.random() * 900000).toString();

  return {
    accountNumber,
    routingNumber,
  };
};
