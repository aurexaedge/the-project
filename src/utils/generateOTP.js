const generateOTP = () => {
    const min = 100000;
    const max = 999999;
    const otpCode = Math.floor(Math.random() * (max - min + 1)) + min;
    return otpCode;
  };

  export default generateOTP